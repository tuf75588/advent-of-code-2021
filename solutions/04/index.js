const fs = require('fs');
const path = require('path');

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), {
  encoding: 'utf-8',
});

const [numStr, ...boards] = data.split('\n\n');
const numbers = numStr.split(',').map(Number);

function parseBoard(board) {
  const parsedBoard = board
    .split('\n')
    .filter(Boolean)
    .map((row) => {
      row
        .split(/\s/)
        .filter(Boolean)
        .map(Number)
        .map((num) => ({ value: num, isMarked: false }));
    });
  const index = {};
  for (const item of parsedBoard.flat()) {
    index[item.value] = item;
  }
  return { board: parsedBoard, index };
}

// parseBoard(numbers);

function updateBoard(board, number) {
  if (board.index[number]) {
    board.index[number].isMarked = true;
  }
}
