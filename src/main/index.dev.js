import { app } from 'electron'

import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
app.on('ready', async () => {
  try {
    await installExtension(VUEJS_DEVTOOLS)
  } catch (e) {
    console.error('Vue Devtools failed to install:', e.toString())
  }
});

require('./index');
