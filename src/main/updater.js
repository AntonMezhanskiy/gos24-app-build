import {autoUpdater} from 'electron-updater'
import logger from 'electron-log'

let mainWindow;
process.env.GH_TOKEN = '5eedb4b317fec9c791dd11dc75aab9bc4491df98';

autoUpdater.logger = logger;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.logger.transports.file.appName = 'private repo';
logger.info('======================================================================');
logger.info('App starting... -- ' + new Date());
autoUpdater.autoDownload = true;

function sendStatusToWindow (text) {
  // logger.info(text);
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
  let logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
  logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%';
  logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  sendStatusToWindow(logMessage);
});
autoUpdater.on('update-downloaded', async (info) => {
  await sendStatusToWindow('Update downloaded');
  await autoUpdater.quitAndInstall();
});

export default function (win) {
  if (!win) return;
  mainWindow = win;
  autoUpdater.checkForUpdates()
}
