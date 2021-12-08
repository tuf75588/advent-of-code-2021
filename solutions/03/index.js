const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const binList = data
  .trim()
  .split('\n')
  .map((a) => a.split(''));

function getBitCountsPerColumn(rows) {
  const cols = rows[0].length;
  let rowIdx;
  let colIdx = 0;
  const counts = {};
  while (colIdx < cols) {
    counts[colIdx] = { 0: 0, 1: 0 };

    for (rowIdx = 0; rowIdx < rows.length; rowIdx++) {
      const rowValue = rows[rowIdx][colIdx];
      counts[colIdx][rowValue]++;
    }
    colIdx++;
  }
  return counts;
}
const countsPerCol = getBitCountsPerColumn(binList);

function getWinner(obj) {
  const [one, zero] = Object.values(obj);
  return zero > one ? '0' : '1';
}

const winners = Object.values(countsPerCol).map(getWinner);
const gammaStr = winners.join('');

function flipBitStr(bitStr) {
  return [...bitStr]
    .map(Number)
    .map((bit) => (bit ? '0' : '1'))
    .join('');
}
const epsilonStr = flipBitStr(gammaStr);

const gamma = parseInt(gammaStr, 2);
const epsilon = parseInt(epsilonStr, 2);

const firstPart = gamma * epsilon; // first answer

/* 
PART TWO
*/
function getOxygenCountIndex(count) {
  const [zero, one] = Object.values(count);
  if (zero > one) {
    return '0';
  }
  return '1';
}

function getCO2CountIndex(count) {
  const [zero, one] = Object.values(count);
  if (one < zero) {
    return '1';
  }
  return '0';
}

function getRating(rows, getCountIndex) {
  let currentRows = rows;
  let currentCounts = getBitCountsPerColumn(rows);
  let colIdx = 0;
  const cols = rows[0].length;
  let result;

  while (colIdx < cols && !result) {
    const count = currentCounts[colIdx];
    const countIndex = getCountIndex(count);
    currentRows = currentRows.filter((row) => row[colIdx] === countIndex);

    if (currentRows.length === 1) {
      result = currentRows[0];
      return result;
    }
    currentCounts = getBitCountsPerColumn(currentRows);
    colIdx++;
  }
  return result;
}

const oxygenBitStr = getRating(binList, getOxygenCountIndex).join('');
const co2BitStr = getRating(binList, getCO2CountIndex).join('');
const oxygen = parseInt(oxygenBitStr, 2);
const co2 = parseInt(co2BitStr, 2);

const combined = oxygen * co2; //second answer
console.log(combined);
