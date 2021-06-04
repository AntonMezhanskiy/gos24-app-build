/* eslint-disable */
const path = require('path');
// const DataStore = require('./DataStore').default;
export const isDevelopment = process.env.NODE_ENV !== 'production';
const DataStore = require('./DataStore').default;
const Store = new DataStore()

if (!isDevelopment) {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

import {app, BrowserWindow, screen} from 'electron';
const os = require('os');
let isQuiting = false;

export const currentVersion = app.getVersion();

export const icon = path.join(__static, 'icons/icon.png');

export const trayIcon = path.join(__static, 'icons/icon16x16.png');

const defaultBrowserWindowOptions = {
    resizable: isDevelopment, // изменение ширины
    maximizable: false, // полноэкран
    fullscreenable: false,
    fullscreen: false, // полноэкран
    minimizable: false,
    alwaysOnTop: !isDevelopment, // Поверх всего
    skipTaskbar: !isDevelopment,
    icon: icon,
    show: false,
    focusable: false,
    webPreferences: {
        webSecurity: true,
        enableRemoteModule: true,
        nodeIntegration: true,
        defaultEncoding: 'UTF-8'
    },
}

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
    const width = 70,
        height = 70;
    let x, y;

    if (Store.position.isDefault) {
        const display = screen.getPrimaryDisplay();
        const w = display.bounds.width;
        const h = display.bounds.height;
        x = w - width * 2
        y = h - height * 2
    } else {
        x = Store.position.x
        y = Store.position.y
    }

    return new BrowserWindow({
        ...defaultBrowserWindowOptions,
        width: width,
        minWidth: width,
        maxWidth: width,
        height: height,
        minHeight: height,
        maxHeight: height,
        x: x,
        y: y,
        transparent: true,
        frame: false,
        ...options
    })
}

export function createBrowserOtherWindow (options = {}) {
    // Установливаем цвет дефолтного задного фона
    if (options && !options.transparent) {
        options.backgroundColor = options.backgroundColor ? options.backgroundColor : '#f2f2f2'
    }

    return new BrowserWindow({
        ...defaultBrowserWindowOptions,
        width: 400,
        height: 680,
        ...options
    })
}

// Сворачиваем в `Tray`
export function closeApp (win, event) {
    if (!isQuiting) {
        event.preventDefault();
        win.hide();
        event.returnValue = false;
    }
}
