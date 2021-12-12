const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const makeLines = (x1, y1, x2, y2) => ({ x1, y1, x2, y2 });

const lines = data
  .trim()
  .split('\n')
  .map((line) =>
    line
      .replace('->', ',')
      .split(',')
      .map((str) => str.trim())
      .map(Number)
  )
  .map((coords) => makeLines(...coords));

function applyLinesToGrid(lines) {
  const maxX = Math.max(...lines.flatMap(({ x1, x2 }) => [x1, x2]));
  const maxY = Math.max(...lines.flatMap(({ y1, y2 }) => [y1, y2]));

  const grid = generateEmptyGrid(maxX + 1, maxY + 1);
}

function generatePointsForLines({ x1, y1, x2, y2 }) {
  const result = [];
  const xDiff = x1 - x2;
  const yDiff = y1 - y2;

  if (!xDiff) {
    for (let i = 0; i < Math.abs(yDiff); i++) {
      const nextY = yDiff < 0 ? y1 + i : y1 - i;
      result.push([x1, nextY]);
    }
    return result;
  }
  if (!yDiff) {
    for (let i = 0; i <= Math.abs(xDiff); i++) {
      const nextX = xDiff > 0 ? x1 + i : x1 - i;
      result.push([nextX, y1]);
    }
    return result;
  }
}
function generateEmptyGrid(cols, rows) {
  return Array(rows)
    .fill()
    .map(() => Array(cols).fill(0));
}

function getLineIntersections(grid) {
  return grid.flat().filter((item) => item > 1);
}
