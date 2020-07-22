const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const fs = require('fs');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');
}

let pathName = path.join(__dirname, 'public');

function chkTitle(li) {
    return li === li.toUpperCase();
}

let content = fs.readFileSync(path.join(pathName, 'german_vocab.txt')).toString().split('\r\n');

app.on('ready', () => {
    createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
