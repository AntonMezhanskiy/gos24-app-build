'use strict'
import {app, Tray, Menu} from 'electron';
import {
    changeIsQuiting,
    currentVersion,
    trayIcon
} from './utils';

const defaultOptions = {
    textToolTip: 'gos24.kz — v' + currentVersion
}

class TrayLocal {
    constructor (mainWindow, modalWindow, options = defaultOptions) {
        this.mainWindow = mainWindow
        this.modalWindow = modalWindow
        this.tray = new Tray(trayIcon);
        this.options = {...options};
        this.menuContext = [
            {
                label: 'Показать приложение',
                click: () => {
                    this.mainWindow.show();
                }
            },
            {
                label: 'Сменить аккаунт',
                visible: false,
                click: () => {
                    this.mainWindow.show();
                    this.mainWindow.webContents.send('logout')
                    this.modalWindow.webContents.send('logout')
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

    // Текст при навидение на иконку в трее
    setToolTip () {
        this.tray.setToolTip(this.options.textToolTip);
    }

    // Событие когда кликаем на иконку
    click () {
        this.tray.on('click', () => this.mainWindow.show());
    }

    // Установливаем меню
    setContextMenu () {
        console.log('setContextMenu', this.tray)
        this.tray.setContextMenu(Menu.buildFromTemplate(this.menuContext));
    }

    // Изменение по индексу. option принимает названия ключа и значение
    changeContextMenu (index, option = {}) {
        console.log('menuContext index', index, option)
        if (!option.field || option.value === undefined) throw new Error(`field и option: обязательные поля`);
        console.log('menuContext', this.menuContext[index])
        this.menuContext[index][option.field] = option.value
        return this
    }

    init () {
        this.setToolTip()
        this.click()
        this.setContextMenu()
    }
}
export default TrayLocal
