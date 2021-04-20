'use strict';
/* eslint-disable */

import {app, ipcMain, Notification, Tray, Menu, remote} from 'electron';
import updateApp from './updater';

import {
  showDevTools,
  currentVersion,
  isDevelopment,
  icon,
  trayIcon,
  closeApp,
  changeIsQuiting,
  createContextMenu,
  createBrowserWindow,
  createBrowserChildWindow,
  setWindowPosition,
  getUrl
} from './utils';

let mainWindow;
let childWindow;

// for Tray
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

ipcMain.on('update-user', (event, data) => {
  mainWindow.webContents.send('update-client-user', data)
});

ipcMain.on('page-auth', (event, args) => {
  childWindow = createBrowserChildWindow();

  if (isDevelopment) {
    showDevTools(childWindow)
  }
  childWindow.loadURL(getUrl('/#/login', '#login'));

  childWindow.on('close', function () {
    childWindow = null;
  });

});

ipcMain.on('close-child-window', () => {
  if (childWindow) {
    childWindow.close();
  }
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

ipcMain.on('show-logout-btn', (event, args) => {
  const contextMenu = createContextMenu(mainWindow);
  contextMenu[1].visible = args;
  tray.setContextMenu(Menu.buildFromTemplate(contextMenu));
});


function createWindow () {

  mainWindow = createBrowserWindow();

  mainWindow.loadURL(getUrl('', ''));

  mainWindow.on('closed', () => {
    mainWindow = null
  });

  if (isDevelopment) {
    showDevTools(mainWindow)
  }

  app.setAppUserModelId('kz.gos24');

  ipcMain.on('set-window-position', (event, val) => {
    setWindowPosition(mainWindow, val)
  });

  mainWindow.on('close', function (event) {
    closeApp(mainWindow, event)
  });

  tray = new Tray(trayIcon);
  tray.setToolTip('gos24.kz — v' + currentVersion);

  tray.on('click', () => mainWindow.show());

  tray.setContextMenu(Menu.buildFromTemplate(createContextMenu(mainWindow)));
  // trayClickAndAppShow('click');
  // trayClickAndAppShow('right-click');

  if (!isDevelopment) {
      updateApp(mainWindow)
  }
}

app.on('ready', createWindow);
