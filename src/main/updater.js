import {autoUpdater} from 'electron-updater'
import {Notification} from 'electron';
import logger from 'electron-log'
import {icon} from './utils';

let mainWindow;
process.env.GH_TOKEN = '';

autoUpdater.logger = logger;
autoUpdater.logger.transports.file.level = 'info';
logger.info('======================================================================');
logger.info('App starting... -- ' + new Date());
autoUpdater.autoDownload = true;

function sendStatusToWindow (obj) {
    logger.info(obj);
    mainWindow.webContents.send('updateStatus', obj);
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow({
        text: 'Проверка обновлений ...',
        type: 'check'
    });
});
autoUpdater.on('update-available', () => {
    sendStatusToWindow({
        text: 'Найдено новая версия.',
        type: 'found'
    });
});
autoUpdater.on('update-not-available', () => {
    sendStatusToWindow({
        text: 'Нет доступных обновлений.',
        type: 'not-found'
    });
});
autoUpdater.on('error', (err) => {
    sendStatusToWindow({
        text: 'Ошибка при обновлении. ' + err,
        type: 'error'
    });
});
autoUpdater.on('download-progress', (progressObj) => {
    sendStatusToWindow({
        text: 'Скачивается...',
        type: 'process',
        process: {
            transfer: progressObj.transferred,
            total: progressObj.total,
            percent: progressObj.percent.toFixed(0),
            speed: (progressObj.bytesPerSecond / 1048576).toFixed(2)
        }
    });
});
autoUpdater.on('update-downloaded', async (info) => {
    const Notify = new Notification({
        title: 'ИТС Госсектор24',
        body: 'У вас новое уведомление на сайте gos24.kz'
    });

    await sendStatusToWindow({
        text: 'Обновление скачалось.',
        type: 'downloaded'
    });
    await Notify.show();
    await autoUpdater.quitAndInstall();
});

export default function (win) {
    if (!win) return;
    mainWindow = win;
    autoUpdater.checkForUpdates()
}
