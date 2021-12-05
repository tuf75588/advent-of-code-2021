const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'input.txt');
const input = fs.readFileSync(file, { encoding: 'utf-8' }).split('\n');
console.log(input);

function getSeaLevel(inputArray) {
  let y = 0; //depth
  let x = 0; // horizontal position
  const entry = Object.entries(inputArray);
  return entry;
}

console.log(getSeaLevel(input));
