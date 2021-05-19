'use strict';
/* eslint-disable */

import {app, ipcMain, Notification, Tray, Menu, screen, shell} from 'electron';
import updateApp from './updater';

app.disableHardwareAcceleration();

import {
  showDevTools,
  isOldWindows,
  currentVersion,
  isDevelopment,
  icon,
  trayIcon,
  closeApp,
  changeIsQuiting,
  createContextMenu,
  createBrowserWindow,
  createBrowserOtherWindow,
  getUrl
} from './utils';

let mainWindow, childWindow, modalWindow, tray = null;

app.on('before-quit', function () {
  changeIsQuiting(true)
});

ipcMain.on('notify-on', (event, args) => {
  const Notify = new Notification({
    title: 'ИТС Госсектор24',
    body: 'У вас новое уведомление на сайте gos24.kz',
    icon: icon
  });
  Notify.on('click', ()=> {
    shell.openExternal('https://gos24.kz/notification');
  });
  Notify.show();
});

ipcMain.on('close-app', (event, args) => {
  app.quit()
});

// Когда закрываем другие окна то сообщаем главному окну что, что то изменилось
ipcMain.on('close-window', (e, args) => {
  mainWindow.close();
  mainWindow.webContents.send('close-window')
})

// [FIX ME] В разных окнах электорна создается новый экземпляр Vue и между ними нет связи...
ipcMain.on('update-client', (e, prefix, data) => {
  [mainWindow, modalWindow, childWindow].forEach(wind => {
    if (wind) {
      wind.webContents.send('update-client:'+prefix, data)
    }
  })
})

// Показываем страницу авторизации
// с его настройками
ipcMain.on('page-auth', (event, args) => {
  childWindow = createBrowserOtherWindow({
    focusable: true,
  });

  if (isDevelopment) {
    showDevTools(childWindow)
  }

  // Показываем страницу Авторизации
  childWindow.loadURL(getUrl('/#/login', '#login'));

  // Унижтожаем окно полностью
  childWindow.on('close',  () => {
    childWindow = null;
  });

  childWindow.once('ready-to-show',()=>{
    childWindow.show()
  });

});

// Закрываем всех других окон
ipcMain.on('close-child-window', () => {
  if (childWindow) {
    childWindow.close();
  }
});

// FIX ME
// Пока не понял в какой момент этот метод вызывается,
// надо проверить вызывается ли этот события,
// если не вызывается то надо убрать...
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

// это для установщика
// подробнее потом напишу
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});

// У `tray` контекстное меню не реактивная
// по этому с клиента я признак отправляю что пользователь авторизован или нет
// если авторизован то в контексте `tray` показываем кнопку `Cменить аккаунт`
ipcMain.on('show-logout-btn', (event, args) => {
  const contextMenu = createContextMenu(mainWindow, modalWindow);
  contextMenu[1].visible = args;
  tray.setContextMenu(Menu.buildFromTemplate(contextMenu));
});

//  Открываем/закрываем модалку
ipcMain.on('toogle-modal', (e, args) => {
  modalWindow.webContents.send('modal-show', args)
  if (args) {
    modalWindow.show()
  } else {
    modalWindow.hide();
  }
});

// Перезаписываем перемещение программы
ipcMain.on('windowMoving', (e, {mouseX, mouseY}) => {
  const { x, y } = screen.getCursorScreenPoint()
  mainWindow.setPosition(x - mouseX, y - mouseY)
});

// После перемещение указываем позицую
ipcMain.on('windowMoved', (e, data) => {

  // Текущая позиция Курсора
  const { x, y } = screen.getCursorScreenPoint(),

      // Размеры Экрана
      { size: { width, height } } = screen.getPrimaryDisplay(),

      // Получить новую позициую приложение
      [mainX, mainY] = mainWindow.getPosition(),

      // Оступы от экрана
      limitation = 400,

      // Ограниченные размеры
      windwoSize = {
          x,
          y,
          width: width - limitation,
          height: height - limitation
      },

      // Узнаем позицию приложение
      position = {
          left: windwoSize.x < limitation,
          right: windwoSize.x > windwoSize.width,
          top: windwoSize.y < limitation,
          bottom: windwoSize.y > windwoSize.height,
          default: !(windwoSize.x < limitation || windwoSize.x > windwoSize.width || windwoSize.y < limitation || windwoSize.y > windwoSize.height)
      };

  // Дальше указываем новую позицию относительно
  // от ограниченных размеров
  let positionNEW = {
    x: 0,
    y: y,
  }

  positionNEW.x = mainX - 260 + 70
  positionNEW.y = mainY - 410

  if (position.top) {
    positionNEW.y = mainY + 80
  }
  if (position.left) {
    positionNEW.x = mainX
  }

  // Установливаем новую позицию бля Модального
  modalWindow.setPosition(positionNEW.x, positionNEW.y);

  // Сообщаем нужным окнам что было перемещение окон
  [mainWindow, modalWindow].forEach(winItem => winItem.webContents.send('windowMoved', position))
});

// Авто-запуск приложение при старте windows
if (!isDevelopment) {
  app.setLoginItemSettings({
    openAtLogin: true,
  });
}

// Создаем модалку
function MainModal () {
  const display = screen.getPrimaryDisplay();
  const width = display.bounds.width;
  const height = display.bounds.height;

  modalWindow = createBrowserWindow({
    width: 260,
    height: 400,
    x: width - 330,
    y: height - 550,
  });

  // Ссылка на Модал
  modalWindow.loadURL(getUrl('/#/home-modal', '#home-modal'));

  if (isDevelopment) {
    // Дев тулс показываем только в режиме разработки
    showDevTools(modalWindow)
  }
}

// создаем главное окно
function createWindow () {
  // Проверяем в каком ось запущен приложение
  if (isOldWindows()) {
    mainWindow = createBrowserOtherWindow({
      width: 180,
      height: 490,
    });

    // Показываем страницу для Старый версии винда
    mainWindow.loadURL(getUrl('/#/home-for-old', '#home-for-old'));
  } else {
    mainWindow = createBrowserWindow({
      clickThrough: 'pointer-events'
    });

    // Ссылка Главную страницу
    mainWindow.loadURL(getUrl('', ''));

    // Modal
    MainModal()
  }

  // Скрываем дефолтное меню `File | ... | Help`
  mainWindow.setMenu(null);

  // Унижтожаем окно полностью
  mainWindow.on('closed', () => {
    mainWindow = null
    modalWindow = null
  });

  // Модель надо установить обязательно
  // в нашем случае пока показываем уведомление
  app.setAppUserModelId('kz.gos24');

  // Закрываем не польностью а сворачиваем в `Tray`
  mainWindow.on('close', (event) => {
    closeApp(mainWindow, event)
  });

  // Тут все понятно
  mainWindow.once('ready-to-show',()=>{
    mainWindow.show()
  });

  // создаем новый `Tray`
  // *** переменную `tray` объявил глобально, потому что
  // *** винде запускается мусорщик, в определенную интервал времени и обновляет `Tray`
  // *** и во время обновление он должен удалить текущую и создать новое
  // *** крч как то так :D если что почитайте  в инете
  tray = new Tray(trayIcon);
  tray.setToolTip('gos24.kz — v' + currentVersion);

  // Событие когда кликаем на иконку
  tray.on('click', () => mainWindow.show());

  // Установливаем меню когда нажимаем ПКМ
  tray.setContextMenu(Menu.buildFromTemplate(createContextMenu(mainWindow, modalWindow)));

  if (isDevelopment) {
    // Дев тулс показываем только в режиме разработки
    showDevTools(mainWindow)
  } else {
    // автообновление приложение
    // *** запускается фоновом режиме
    updateApp(mainWindow)
  }
}

app.on('ready', createWindow);
