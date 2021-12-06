const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const binList = data.trim().split('\n').map(a => a.split(''));

console.log(binList);


