const fs = require('fs');
const path = require('path');
const { title } = require('process');

let pathName = path.join(__dirname, 'public');

function chkTitle(li) {
    return li === li.toUpperCase();
}

let content = fs.readFileSync(path.join(pathName, 'german_vocab.txt')).toString().split('\n');
console.log(content[1]);

titleArr = new Array(content.length);
titleArr.fill(false);

titleArr.forEach((item, index) => {
    if(chkTitle(content[index])) titleArr[index] = true; 
});

arr = line.split(' : ');
wordDE = document.getElementById('word-de');
wordEN = document.getElementById('word-en');
exampleDE = document.getElementById('example-de');
exampleEN = document.getElementById('example-en');

wordDE.innerHTML = arr[0].split(' = ')[0];
wordEN.innerHTML = arr[0].split(' = ')[1];
exampleDE.innerHTML = arr[1];
exampleEN.innerHTML = arr[2];
