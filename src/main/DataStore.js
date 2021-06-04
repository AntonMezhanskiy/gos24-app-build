'use strict'

const Store = require('electron-store')

const defaultProps = {
    storeName: 'Main store',
    positionApp: {
        x: 0,
        y: 0,
        isDefault: true
    }
}

// TODO FIX me! Выходить ошибка когда пишу так
// class DataStore extends Store {
//    constructor (settings) {
//    super(settings)
//    ...
//    }
// }
// Ошибка: `TypeError: Class constructor ElectronStore cannot be invoked without 'new'`
// Временное решение: `this.store = new Store(settings)`

class DataStore {
    store

    constructor (settings = {}) {
        if (!settings.name) settings.name = defaultProps.storeName
        this.store = new Store(settings)
        this.position = this.store.get('position-app') || defaultProps.positionApp
    }
    setPosition () {
        this.store.set('position-app', this.position)
        return this
    }
    changePosition (position = {}) {
        // чтоб всегда нужные данные хранились даже когда не правильные данные отправляем;
        this.position = {
            x: position.x,
            y: position.y,
            isDefault: false
        }
        this.setPosition()
        return this
    }
}
export default DataStore
