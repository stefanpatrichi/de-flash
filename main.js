const { app, BrowserWindow, Menu, MenuItem, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');

function chkTitle(li) {
  return li === li.toUpperCase();
}

let pathName = path.join(__dirname, 'public');
let content = fs.readFileSync(path.join(pathName, 'german_vocab.txt')).toString().split('\r\n');
let topics = []; // topics will become a 2d array with its elements being of the form: [title, line1, line2 etc.]
let title_index = -1;
let i;

// run thru content array
for(i = 0; i < content.length; i++) {
  if(chkTitle(content[i])) { topics.push([content[i]]); title_index++; }
  else topics[title_index].push(content[i]);
}

title_index = -1;

app.on('ready', () => {
  const win = new BrowserWindow({
    width: 500,
    height: 500,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile('index.html');

  const template = [
    {
      label: 'Lessons',
      submenu: []
    }
  ];
  // for each element of topics array, make its first element (the title) a submenu
  topics.forEach((item, index) => {
    template[0].submenu.push({ label: item[0], click: () => {
      var word = item[Math.floor(Math.random() * (item.length - 1)) + 1].split(" : ");
      title_index = index;
      if(word[1] === undefined && word[2] === undefined) word[1] = word[2] = '(no example)';
      win.webContents.send('render', word);
    } });
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);  
});

ipcMain.on('clicked-next', (e, arg) => {
  if(title_index == -1) {
    dialog.showErrorBox('Lesson not selected', 'Please select a lesson.');
    return;
  }
  var word = topics[title_index][Math.floor(Math.random() * (topics[title_index].length - 1)) + 1].split(" : ");
  if(word[1] === undefined && word[2] === undefined) word[1] = word[2] = '(no example)';
  e.sender.send('render', word);
});

// mac stuff
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