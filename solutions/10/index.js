const path = require('path');
const fs = require('fs');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const OPENERS = ['(', '[', '{', '<'];
const CLOSERS = [')', ']', '}', '>'];

const CLOSE_TO_OPEN_MAP = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const OPEN_TO_CLOSE_MAP = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const CHAR_TO_VALUE_MAP = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};

function createStack() {
  const stack = [];

  return {
    push(x) {
      stack.push(x);
    },
    pop() {
      if (stack.length === 0) {
        return undefined;
      }
      return stack.pop();
    },
    get length() {
      return stack.length;
    },
    isEmpty() {
      return stack.length === 0;
    },
  };
}

function testLine(line) {
  const stack = createStack();

  for (const char of line) {
    if (OPENERS.includes(char)) {
      stack.push(char);
      continue;
    }
    if (CLOSERS.includes(char)) {
      const closer = char;
      const opener = CLOSE_TO_OPEN_MAP[char];
      const lastOpener = stack.pop();
      if (lastOpener !== opener) {
        return {
          result: 'corrupted',
          expected: OPEN_TO_CLOSE_MAP[lastOpener],
          found: closer,
        };
      }
    }
  }
  if (stack.isEmpty()) {
    return { result: 'complete' };
  }
  const unclosed = [];

  while (!stack.isEmpty()) {
    unclosed.push(stack.pop());
  }
  return { result: 'incomplete', unclosed };
}

function partOne(input) {
  const lines = input.trim().split('\n');
  const testedLines = lines.map(testLine);

  const corruptedLines = testedLines.filter(
    ({ result }) => result === 'corrupted'
  );
  const scores = corruptedLines.map(({ found }) => CHAR_TO_VALUE_MAP[found]);

  const total = scores.reduce((acc, curr) => acc + curr, 0);

  return total;
}

const firstAnswer = partOne(data); // 390993
console.log(firstAnswer);
