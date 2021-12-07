const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const binList = data
  .trim()
  .split('\n')
  .map((a) => a);

// console.log(binList[0][0]);
// console.log(binList[1][0]);
// console.log(binList[2][0]);
// console.log(binList[3][0]);
// console.log(binList[4][0]);
// console.log(binList[5][0]);
// console.log(binList[6][0]);
const r = binList.reduce((acc, curr, indx, arr) => {}, {});
