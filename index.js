arr = line.split(' : ');
wordDE = document.getElementById('word-de');
wordEN = document.getElementById('word-en');
exampleDE = document.getElementById('example-de');
exampleEN = document.getElementById('example-en');

wordDE.innerHTML = arr[0].split(' = ')[0];
wordEN.innerHTML = arr[0].split(' = ')[1];
exampleDE.innerHTML = arr[1];
exampleEN.innerHTML = arr[2];
