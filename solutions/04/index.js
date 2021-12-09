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

function checkForWin(board) {
  const cols = board[0].length;
  for (const row of board) {
    // every item is marked
    if (row.every((number) => number.isMarked)) return true;
  }
  for (let colIdx = 0; colIdx < cols; colIdx++) {
    const items = board.map((row) => row[colIdx]);
    if (items.every((item) => item.isMarked)) return true;
  }
  return false;
}


