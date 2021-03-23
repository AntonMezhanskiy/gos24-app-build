'use strict';
/* eslint-disable */
// eslint-disable-next-line no-unused-vars
import {app, BrowserWindow, ipcMain, Notification, Tray, Menu, dialog} from 'electron'
import { autoUpdater } from 'electron-updater'
import logger from 'electron-log'
const path = require('path');

const isDevelopment = process.env.NODE_ENV !== 'production';

if (!isDevelopment) {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;
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
    title: 'gos24.kz',
    body: 'У вас новое уведомление на сайте gos24.kz'
    // icon: 'build/icons/icon1.ico'
  });
  Notify.show();
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
  mainWindow = new BrowserWindow({
    width: isDevelopment ? 1000 : 400,
    height: 680,
    resizable: isDevelopment, // изменение ширины
    backgroundColor: '#e8e8e8',
    maximizable: false,
    fullscreenable: false,
    fullscreen: false, // полноэкран
    minimizable: false,
    icon: path.join(__static, 'icons/icon1.ico'),
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
    // mainWindow.webContents.openDevTools();
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus();
      });
      mainWindow.webContents.openDevTools();
    });
  }

  app.setAppUserModelId('kz.gos24');

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
}

app.on('ready', createWindow);

// if (process.env.NODE_ENV === 'production') {
    autoUpdater.setFeedURL({
        provider: 'github',
        repo: 'gos24-app-build',
        owner: 'baha96',
        private: true,
        token: 'e924b0abd4dd4dd97f75ea2571a093f03c181717'
    });
    // autoUpdater.checkForUpdates();
// }

/*

  "publish": [
    {
      "provider": "github",
      "private": true,
      "owner": "baha96",
      "repo": "gos24-app-build",
      "token": "e924b0abd4dd4dd97f75ea2571a093f03c181717"
    }
  ],
 */
// autoUpdater.logger = logger;
// autoUpdater.logger.transports.file.level = 'info';
// logger.info('App starting...');

function sendStatusToWindow(text) {
  logger.info(text);
  mainWindow.webContents.send('message', text);
}
autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
  sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
  sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (err) => {
  sendStatusToWindow('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  sendStatusToWindow(log_message);
});
autoUpdater.on('update-downloaded', async (info) => {
  await sendStatusToWindow('Update downloaded');
  await autoUpdater.quitAndInstall();
});


autoUpdater.channel = 'latest';
autoUpdater.allowDowngrade = false;

autoUpdater.logger = logger;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.logger.transports.file.appName = 'private repo';
logger.info('======================================================================');
logger.info('App starting... -- ' + new Date());
autoUpdater.autoDownload = true;
// ,
//       "token": "e924b0abd4dd4dd97f75ea2571a093f03c181717"

// autoUpdater.on('update-downloaded', () => {
//     dialog.showMessageBox({
//         message: 'update Downloaded !!'
//     })
// });
//
// autoUpdater.on('checking-for-update', () => {
//     dialog.showMessageBox({
//         message: 'CHECKING FOR UPDATES !!'
//     })
// });
//
// autoUpdater.on('update-available', () => {
//     dialog.showMessageBox({
//         message: ' update-available !!'
//     })
// });
//
// autoUpdater.on('error', (error) => {
//     autoUpdater.logger.debug(error)
// });

app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
});
