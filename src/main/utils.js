import {app, BrowserWindow, screen} from 'electron';

export const path = require('path');
export const isDevelopment = process.env.NODE_ENV !== 'production';

if (!isDevelopment) {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

export const icon = path.join(__static, 'icons/icon.png');
export const trayIcon = path.join(__static, 'icons/icon16x16.png');
let isQuiting = false;
const windowSize = {
    width: 80,
    height: 80,
    x: 150,
    y: 150
};

export function changeIsQuiting (val) {
    isQuiting = val
}

export function getUrl (path, pathFile) {
    return isDevelopment ? `http://localhost:9080${path}` : `file://${__dirname}/index.html${pathFile}`;
}

export function showDevTools (win) {
    win.webContents.on('did-frame-finish-load', () => {
        win.webContents.once('devtools-opened', () => {
            win.focus();
        });
        win.webContents.openDevTools();
    });
}
export function createBrowserWindow () {
    const display = screen.getPrimaryDisplay();
    const width = display.bounds.width;
    const height = display.bounds.height;

    return new BrowserWindow({
        width: windowSize.width,
        height: windowSize.height,
        x: width - windowSize.x,
        y: height - windowSize.y,
        transparent: true,
        alwaysOnTop: false,
        frame: false,
        icon: icon,
        webPreferences: {
            nodeIntegration: true,
            defaultEncoding: 'UTF-8'
        }
    })
}
export function createBrowserChildWindow () {
    return new BrowserWindow({
        width: 400,
        height: 680,
        backgroundColor: '#e8e8e8',
        resizable: isDevelopment, // изменение ширины
        maximizable: false,
        fullscreenable: false,
        fullscreen: false, // полноэкран
        minimizable: false,
        icon: icon,
        webPreferences: {
            webSecurity: false
        }
    })
}

export function createContextMenu (win) {
    return [
        {
            label: 'Показать приложение',
            click: function () {
                win.show();
            }
        },
        {
            label: 'Выйти из аккаунта',
            visible: false,
            click: () => {
                win.show();
                win.webContents.send('logout')
            }
        },
        {
            label: 'Выйти из приложение',
            click: function () {
                changeIsQuiting(true);
                app.quit();
            }
        }
    ];
}

export function setWindowPosition (win, {width = windowSize.width, height = windowSize.height}) {
    const display = screen.getPrimaryDisplay();
    win.setSize(width, height);
    const widthDisplay = (display.bounds.width - width - windowSize.x) + 63;
    const heightDisplay = (display.bounds.height - height - windowSize.y) + 63;
    win.setPosition(widthDisplay, heightDisplay);
}

export function closeApp (win, event) {
    if (!isQuiting) {
        event.preventDefault();
        win.hide();
        event.returnValue = false;
    }
}
