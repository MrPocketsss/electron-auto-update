const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire project
contextBridge.exposeInMainWorld('api', {
  // this sends FROM render-side
  push: (channel, data) => {
    let validChannels = ['app_version', 'restart_app'];
    if (validChannels.includes(channel)) ipcRenderer.send(channel, data);
  },
  // this sends TO render-side
  listen: (channel, func) => {
    let validChannels = ['app_version', 'update_available', 'update_downloaded'];
    if (validChannels.includes(channel)) ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});
