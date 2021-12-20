const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const positions = data.split(',').map((a) => parseInt(a.trim()));

/* find the most re-occuring integer in this array */

const largestPosition = Math.max(...positions);
let n = 0;
let sums = [];

function simpleFuelFormula(a, b) {
  return Math.abs(a - b);
}

function complexFormula(positionOne, positionTwo) {
  let diff = Math.abs(positionOne - positionTwo);
  let result = 0;
  while (diff) {
    result += diff;
    diff--;
  }
  return result;
}

function main(crabPositions, fuelCalculation = simpleFuelFormula) {
  let min = Math.min(...crabPositions);
  let max = Math.max(...crabPositions);
  const sims = [];
  for (let i = min; i <= max; i++) {
    const fuels = crabPositions.map((pos) => fuelCalculation(pos, i));
    const sums = fuels.reduce((acc, curr) => acc + curr);
    sims.push({ fuel: sums, position: i });
  }
  const result = sims.reduce(
    (acc, curr) => (curr.fuel < acc.fuel ? curr : acc),
    { fuel: Infinity }
  );
  return result;
}

const secondAnswer = main(positions, complexFormula);
console.log(secondAnswer);
