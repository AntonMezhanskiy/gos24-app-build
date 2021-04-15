'use strict';
/* eslint-disable */
// eslint-disable-next-line no-unused-vars
import {app, BrowserWindow, screen, ipcMain, Notification, Tray, Menu} from 'electron';
import updateApp from './updater';
const path = require('path');

// app.commandLine.appendSwitch("in-process-gpu");

const isDevelopment = process.env.NODE_ENV !== 'production';

if (!isDevelopment) {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const icon = path.join(__static, 'icons/icon.png');
let mainWindow;
const windowSize = {
  width: 80,
  height: 80,
  x: 150,
  y: 150,
};
const winURL = isDevelopment ? `http://localhost:9080` : `file://${__dirname}/index.html`;

// for Tray
let isQuiting;
let tray = null;
const trayIcon = path.join(__static, 'icons/icon16x16.png');
const trayContextMenu = [
  {
    label: 'Показать приложение',
    click: function () {
      mainWindow.show();
    }
  },
  {
    label: 'Выйти из аккаунта',
    visible: false,
    click: () => {
      mainWindow.show();
      mainWindow.webContents.send('logout')
    }
  },
  {
    label: 'Выйти из приложение',
    click: function () {
      isQuiting = true;
      app.quit();
    }
  }
];

app.on('before-quit', function () {
  isQuiting = true;
});

ipcMain.on('notify-on', (event, args) => {
  const Notify = new Notification({
    title: 'ИТС Госсектор24',
    body: 'У вас новое уведомление на сайте gos24.kz',
    icon: icon
  });
  Notify.show();
});
ipcMain.on('show-logout-btn', (event, args) => {
  trayContextMenu[1].visible = args;
  tray.setContextMenu(Menu.buildFromTemplate(trayContextMenu));
});
ipcMain.on('close-app', (event, args) => {
  app.quit()
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});

function createWindow () {
  const display = screen.getPrimaryDisplay();
  const width = display.bounds.width;
  const height = display.bounds.height;

  mainWindow = new BrowserWindow({
    width: windowSize.width,
    height: windowSize.height,
    x: width - windowSize.x,
    y: height - windowSize.y,
    resizable: isDevelopment, // изменение ширины
    transparent: true,
    maximizable: false,
    fullscreenable: false,
    fullscreen: false, // полноэкран
    minimizable: false,
    alwaysOnTop: false,
    frame: false,
    icon: icon,
    webPreferences: {
      nodeIntegration: true,
      defaultEncoding: 'UTF-8'
    }
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  if (isDevelopment) {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus();
      });
      mainWindow.webContents.openDevTools();
    });
  }

  app.setAppUserModelId('kz.gos24');

  ipcMain.on('set-window-position', (event, {width = windowSize.width, height = windowSize.height}) => {
    mainWindow.setSize(width, height);
    const widthDisplay = (display.bounds.width - width - windowSize.x) + 63;
    const heightDisplay = (display.bounds.height - height - windowSize.y) + 63;
    mainWindow.setPosition(widthDisplay, heightDisplay);
  });

  mainWindow.on('close', function (event) {
    if (!isQuiting) {
      event.preventDefault();
      mainWindow.hide();
      event.returnValue = false;
    }
  });

  tray = new Tray(trayIcon);
  tray.setToolTip('gos24.kz');
  tray.on('click', tray.popUpContextMenu);
  tray.setContextMenu(Menu.buildFromTemplate(trayContextMenu));

  if (!isDevelopment) {
      updateApp(mainWindow)
  }
}

app.on('ready', createWindow);
