const fs = require('fs');
const path = require('path');
const pathname = path.join(__dirname, 'input.txt');

const data = fs.readFileSync(pathname, { encoding: 'utf-8' });

const numList = data.split('\n').map((num) => num * 1);

// find how many times we are strictly increasing depth
function strictlyIncreasing(arr) {
  let count = 0;
  const isIncreasing = arr.reduce((count, _, index, arr) => {
    const nextValue = arr[index + 1];
    if (nextValue > arr[index]) count++;
    return count;
  }, count);

  return isIncreasing;
}
// start at index 1, index 0 has no previous measurement

console.log(strictlyIncreasing(numList));
