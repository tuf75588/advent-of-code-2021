const fs = require('fs');
const path = require('path');
const pathname = path.join(__dirname, 'input.txt');

const data = fs.readFileSync(pathname, { encoding: 'utf-8' });

const numList = data.split('\n').map((num) => num * 1);

// // find how many times we are strictly increasing depth
function strictlyIncreasing(arr) {
  let count = 0;
  const isIncreasing = arr.reduce((count, _, index, arr) => {
    const nextValue = arr[index + 1];
    if (nextValue > arr[index]) count++;
    return count;
  }, count);

  return isIncreasing;
}
start at index 1, index 0 has no previous measurement

console.log(strictlyIncreasing(numList));

/* part two */

function addSums(array) {
  return array
    .filter((x) => x.length === 3)
    .map((element, index, arr) => {
      return element.reduce((accu, curr) => {
        return accu + curr;
      }, 0);
    });
}

function sliceArray(arr) {
  // break our array into three windows
  let data = [];
  arr.forEach((_, index, array) => {
    data.push(arr.slice(index, index + 3));
  });
  return addSums(data);
}

function compareNextAndPrevious(array) {
  return array.reduce((accumulator, currentValue, index, arr) => {
    let count = 0;
    if (array[index + 1] > array[index]) accumulator++;
    return accumulator;
  }, 0);
}
console.log(compareNextAndPrevious(sliceArray(numList)));
