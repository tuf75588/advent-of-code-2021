const path = require('path');
const fs = require('fs').readFileSync;

const data = fs(path.resolve(__dirname, './input.txt'), { encoding: 'utf-8' });

function createMatrix(map) {
  return map
    .trim()
    .split('\n')
    .map((row) => row.split('').map(Number));
}

function partOne(map) {
  const matrix = createMatrix(map);

  function getCell(rowIdx, colIdx, guard) {
    return guard ? matrix[rowIdx][colIdx]++ : Infinity;
  }
  const lowPoints = [];

  for (const [rowIdx, row] of matrix.entries()) {
    for (const [colIdx, col] of row.entries()) {
      const above = getCell(rowIdx - 1, colIdx, rowIdx > 0);
      const right = getCell(rowIdx, colIdx + 1, colIdx < row.length - 1);
      const below = getCell(rowIdx + 1, colIdx, rowIdx < matrix.length - 1);
      const left = getCell(rowIdx, colIdx - 1, colIdx > 0);
      if (col < above && col < right && col < below && col < left) {
        lowPoints.push(col);
      }
    }
  }
  const riskLevels = lowPoints.map((number) => number + 1);
  const totalRisk = riskLevels.reduce((acc, cur) => acc + cur, 0);

  return totalRisk;
}
