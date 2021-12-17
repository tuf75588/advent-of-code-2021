const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const positions = data.split(',').map((a) => parseInt(a.trim()));

/* find the most re-occuring integer in this array */

const largestPosition = Math.max(...positions);
function getMax(object) {
  return Object.keys(object).filter((x) => {
    return object[x] == Math.max.apply(null, Object.values(object));
  });
}

let n = 0;
let sums = [];


let getFuelCost = (x) => positions.map((element) => (element > x ? element - x : x - element)).reduce((a,b) => a + b);

while (n < largestPosition) {
    sums.push(getFuelCost(n));
    n++
}
console.log(Math.min(...sums));
