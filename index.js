const { ipcRenderer } = require('electron');

wordDE = document.getElementById('word-de');
wordEN = document.getElementById('word-en');
exampleDE = document.getElementById('example-de');
exampleEN = document.getElementById('example-en');
next_btn = document.getElementById('next');

ipcRenderer.on('render', (e, arg) => {
  wordDE.innerHTML = arg[0].split(' = ')[0];
  wordEN.innerHTML = arg[0].split(' = ')[1];
  exampleDE.innerHTML = arg[1];
  exampleEN.innerHTML = arg[2];
});

next_btn.addEventListener("click", () => {
  ipcRenderer.send('clicked-next');
});

