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

/* part two */

const getNumber = (length) => (patterns) =>
  patterns.find((p) => p.length === length);

const getOne = getNumber(2);
const getSeven = getNumber(3);
const getFour = getNumber(4);
const getEight = getNumber(7);

function partTwo(signals) {
  const sortedSignals = signals.map(([patterns, outputs]) => {
    const sortedPatterns = patterns.map((p) => [...p].sort().join(''));
    const sortedOutputs = outputs.map((o) => [...o].sort().join(''));
    return [sortedPatterns, sortedOutputs];
  });
  const decodedOutputValues = sortedSignals.map((signal) => {
    return decipherOutput(signal);
  });

  const result = decodedOutputValues.reduce((acc, curr) => acc + curr, 0);
  return result;
}

function union(setA, setB) {
  const result = new Set(setA);

  for (let element of setB) {
    result.add(element);
  }
  return result;
}

function difference(setA, setB) {
  const result = new Set();
  for (let element of setA) {
    if (!setB.has(element)) result.add(element);
  }
  return result;
}

function decipherOutput(signal) {
  const [patterns, output] = signal;
  const one = getOne(patterns);
  const four = getFour(patterns);
  const seven = getSeven(patterns);
  const eight = getEight(patterns);

  const segmentsKnown = {
    top: null,
    upperRight: null,
    lowerRight: null,
  };
  segmentsKnown.top = [...difference(new Set(seven), new Set(one))][0];

  // six - 6 segments

  const [six] = patterns.filter(
    (pattern) =>
      pattern.length === 6 &&
      [...one].filter((l) => pattern.includes(l)).length === 1
  );

  segmentsKnown.upperRight = [...difference(new Set(one), new Set(six))][0];
  segmentsKnown.lowerRight = [
    ...difference(new Set(one), new Set(segmentsKnown.upperRight)),
  ][0];

  const [three] = patterns.filter(
    (pattern) =>
      pattern.length === 5 &&
      pattern.includes(segmentsKnown.upperRight) &&
      pattern.includes(segmentsKnown.lowerRight)
  );

  const nine = [...union(new Set(three), new Set(four))].sort().join('');

  const [two] = patterns.filter(
    (pattern) =>
      pattern.length === 5 &&
      pattern !== three &&
      pattern.includes(segmentsKnown.upperRight)
  );

  const [five] = patterns.filter((pattern) => {
    return pattern.length === 5 && pattern !== two && pattern !== three;
  });
  const decipheredOutputs = output.map((val) => {
    if (val === one) return 1;
    if (val === two) return 2;
    if (val === three) return 3;
    if (val === four) return 4;
    if (val === five) return 5;
    if (val === six) return 6;
    if (val === seven) return 7;
    if (val === eight) return 8;
    if (val === nine) return 9;

    return 0;
  });
  return Number(decipheredOutputs.join(''));
}

const secondAnswer = partTwo(segments); // 936117
