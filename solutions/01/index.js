const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const numbers = data.trim().split('\n').map(Number);

/**
 * Named after the purpose in the puzzle, this function takes an array of
 * numbers and sums 3 numbers at a time in a sliding window. So the first
 * sum is of indexes 0, 1, and 2, the next sum is indexes 1, 2, 3, the next
 * sum is indexes 2, 3, 4 and so on.
 */
function convertSlidingWindow(numbersArray) {
  let [a, b, ...otherNumbers] = numbersArray;
  let c;
  const sums = [];

  for (const number of otherNumbers) {
    c = number;
    const sum = a + b + c;
    sums.push(sum);
    a = b;
    b = c;
  }
  return sums;
}

function increasingCountValues(numbersArray) {
  const [firstValue, ...otherValues] = numbersArray;
  let count = 0;
  let prevValue = firstValue;
  for (const value of otherValues) {
    if (value > prevValue) count++;
    prevValue = value;
  }
  return count;
}

const a = increasingCountValues(convertSlidingWindow(numbers));
const b = increasingCountValues(numbers);

console.log({ a, b });
