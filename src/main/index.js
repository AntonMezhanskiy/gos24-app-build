'use strict';
/* eslint-disable */

import {app, ipcMain, Notification, Tray, Menu, remote, protocol} from 'electron';
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

let mainWindow;
let childWindow;
let tray = null;

app.on('before-quit', function () {
  changeIsQuiting(true)
});

ipcMain.on('notify-on', (event, args) => {
  const Notify = new Notification({
    title: 'ИТС Госсектор24',
    body: 'У вас новое уведомление на сайте gos24.kz',
    icon: icon
  });
  Notify.show();
});

ipcMain.on('close-app', (event, args) => {
  app.quit()
});

// [Баг?] Когда авторизуемся с другого окна, store не обновляется.
// связал обновленные данные таким образом
ipcMain.on('update-user', (event, data) => {
  mainWindow.webContents.send('update-client-user', data)
});

// Показываем страницу авторизации
// с его настройками
ipcMain.on('page-auth', (event, args) => {
  childWindow = createBrowserOtherWindow();

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
  const contextMenu = createContextMenu(mainWindow);
  contextMenu[1].visible = args;
  tray.setContextMenu(Menu.buildFromTemplate(contextMenu));
});


function createWindow () {
  // Проверяем в каком ось запущен приложение
  if (isOldWindows()) {
    mainWindow = createBrowserOtherWindow({
      width: 230,
      height: 510,
    });

    // Скрываем дефолтное меню `File | ... | Help`
    mainWindow.setMenu(null);

    // Показываем страницу для Старый версии винда
    mainWindow.loadURL(getUrl('/#/home-for-old', '#home-for-old'));
  } else {
    mainWindow = createBrowserWindow();

    // Показываем Главную страницу
    mainWindow.loadURL(getUrl('', ''));
  }

  // Унижтожаем окно полностью
  mainWindow.on('closed', () => {
    mainWindow = null
  });

  // Модель надо установить обязательно
  // в нашем случае пока показываем уведомление
  app.setAppUserModelId('kz.gos24');

  // Закрываем не польностью а сворачиваем в `Tray`
  mainWindow.on('close', (event) => {
    closeApp(mainWindow, event)
  });

  mainWindow.once('ready-to-show',()=>{
    mainWindow.show()
  });

  // создаем новый `Tray`
  // *** переменную `tray` объявил глобально, потому что
  // *** винде запускается мусорщик, в определенную интервал времени и очищает `Tray`
  tray = new Tray(trayIcon);
  tray.setToolTip('gos24.kz — v' + currentVersion);

  tray.on('click', () => mainWindow.show());

  tray.setContextMenu(Menu.buildFromTemplate(createContextMenu(mainWindow)));

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
