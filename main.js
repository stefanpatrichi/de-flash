const { app, BrowserWindow, Menu, MenuItem, ipcMain } = require('electron');
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
  topics.forEach((item) => {
    var topic = item;
    template[0].submenu.push({ label: item[0], click: () => {
      var word = topic[Math.floor(Math.random() * (topic.length - 1)) + 1].split(" : ");
      if(word[1] === undefined && word[2] === undefined) word[1] = word[2] = '(no example)';
      win.webContents.send('render', word);
    } });
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);  
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