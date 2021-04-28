/* eslint-disable */
const path = require('path');

export const isDevelopment = process.env.NODE_ENV !== 'production';

if (!isDevelopment) {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

import {app, BrowserWindow, screen} from 'electron';
const os = require('os');
let isQuiting = false;

export const currentVersion = app.getVersion();

export const icon = path.join(__static, 'icons/icon.png');

export const trayIcon = path.join(__static, 'icons/icon16x16.png');

export function changeIsQuiting (val) {
    isQuiting = val
}

export function getUrl (url, hashUrl) {
    return isDevelopment ? `http://localhost:9080${url}` : `file://${__dirname}/index.html${hashUrl}`;
}

export function isOldWindows () {
     // #Platforms                                 | #Version
     // ------------------------------------------ | -------------
     // Windows 10, Windows Server 2016            | 10.0
     // Windows 8.1, Windows Server 2012 R2        | 6.3
     // Windows 8, Windows Server 2012             | 6.2
     // Windows 7, Windows Server 2008 R2          | 6.1
     // Windows Vista, Windows Server 2008         | 6.0
     // Windows XP Professional x64 Edition,       | 5.2
     // Windows Server 2003, Windows Home Server   |
     // Windows XP                                 | 5.1
     // Windows 2000                               | 5.0

    // Check `Platforms` => os.platform() Number.parseFloat(data.release)
    // Check `Version` => os.release()

    const release = Number.parseFloat(os.release());
    return release < 6.2
}

export function showDevTools (win) {
    win.webContents.on('did-frame-finish-load', () => {
        // Открываем инструмент разработчика в отдельной окне `mode: 'detach'`
        win.webContents.openDevTools({mode: 'detach'});

        // Установливаем фокус на него
        win.webContents.once('devtools-opened', () => {
            win.focus();
        });
    });
}
export function createBrowserWindow (options = {} ) {
    const display = screen.getPrimaryDisplay();
    const width = display.bounds.width;
    const height = display.bounds.height;
    return new BrowserWindow({
        width: 250,
        height: 500,
        x: width - 350,
        y: height - 500,
        transparent: true,
        frame: false,
        focusable: false,
        resizable: false,
        alwaysOnTop: !isDevelopment,
        skipTaskbar: !isDevelopment,
        icon: icon,
        show: false,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true,
            defaultEncoding: 'UTF-8'
        },
        ...options
    })
}
export function createBrowserOtherWindow (options = {}) {
    return new BrowserWindow({
        width: 400,
        height: 680,
        backgroundColor: '#f2f2f2',
        resizable: isDevelopment, // изменение ширины
        maximizable: false,
        fullscreenable: false,
        fullscreen: false, // полноэкран
        minimizable: false,
        icon: icon,
        show: false,
        webPreferences: {
            webSecurity: false
        },
        ...options
    })
}

export function createContextMenu (win) {
    return [
        {
            label: 'Показать приложение',
            click: () => {
                win.show();
            }
        },
        {
            label: 'Сменить аккаунт',
            visible: false,
            click: () => {
                win.show();
                win.webContents.send('logout')
            }
        },
        {
            label: 'Выйти из приложения',
            click: function () {
                changeIsQuiting(true);
                app.quit();
            }
        }
    ];
}

// Сворачиваем в `Tray`
export function closeApp (win, event) {
    if (!isQuiting) {
        event.preventDefault();
        win.hide();
        event.returnValue = false;
    }
}
