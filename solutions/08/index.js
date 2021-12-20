const fs = require('fs').readFileSync;

const _data = fs(require('path').resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

let segments = _data
  .trim()
  .split('\n')
  .map((line) => line.split(' | '))
  .map(([patterns, output]) => [patterns.split(' '), output.split(' ')]);

function partOne(signals) {
  return signals
    .map(([, outputs]) => {
      return simpleNumberCount(outputs);
    })
    .reduce((a, b) => a + b);
}

function simpleNumberCount(patterns) {
  const oneFourSevenEights = patterns.filter((pattern) => {
    switch (pattern.length) {
      case 2:
      case 3:
      case 4:
      case 7:
        return true;
      default:
        return false;
    }
  });
  return oneFourSevenEights.length;
}

const firstAnswer = partOne(segments); // 352
