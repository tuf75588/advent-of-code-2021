const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' });

const positions = data.trim().split('')
console.log(positions)