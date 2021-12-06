const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const directions = data
  .trim()
  .split('\n')
  .map((direction) => {
    const split = direction.split(' ');
    const [dir, value] = split;
    return [dir, Number(value)];
  });

let x = 0;
let y = 0;
for (const [direction, value] of directions) {
  if (direction === 'forward') x += value;
  if (direction === 'down') y += value;
  if (direction === 'up') y -= value;
}

function calculateComplexWaypoint(values) {
  let aim = 0;
  let y = 0; //depth
  let x = 0;
  for (const [direction, value] of values) {
    if (direction === 'forward') {
      x += value;
      y += aim * value;
    }
    if (direction === 'up') {
      aim -= value;
    }
    if (direction === 'down') {
      aim += value;
    }
  }
  return { x, y, aim, y2: x * y };
}

const x2 = calculateComplexWaypoint(directions);
console.log(x2);
