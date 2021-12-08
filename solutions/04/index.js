const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const [numStr, ...board] = data.split('\n\n');
const numbers = numStr.split(',').map(Number);
console.log(numbers);

function parseBoard(board) {}
