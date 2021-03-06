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
    .map((row) =>
      row
        .split(/\s/)
        .filter(Boolean)
        .map(Number)
        .map((num) => ({ value: num, isMarked: false }))
    );

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
    if (row.every((item) => item.isMarked)) return true;
  }

  let colIdx;
  for (colIdx = 0; colIdx < cols; colIdx++) {
    const items = board.map((row) => row[colIdx]);
    if (items.every((item) => item.isMarked)) return true;
  }

  return false;
}

function runGame(nums, boards) {
  const parsedBoards = boards.map(parseBoard);

  for (const num of nums) {
    for (const board of parsedBoards) {
      updateBoard(board, num);
      const result = checkForWin(board.board);
      if (result) {
        return { num, board };
      }
    }
  }
}

function sumUnmarkedNumbers(board) {
  return board
    .flat()
    .filter((item) => !item.isMarked)
    .reduce((acc, item) => acc + item.value, 0);
}
function runSecondGame(nums, boards) {
  let result;
  let parsedBoards = boards.map(parseBoard);

  for (const num of nums) {
    for (const board of parsedBoards) {
      updateBoard(board, num);

      const hasWon = checkForWin(board.board);

      if (hasWon) {
        result = { num, board };
      }
    }

    parsedBoards = parsedBoards.filter((board) => !checkForWin(board.board));
  }

  return result;
}

const firstBingo = runGame(numbers, boards);
const firstBingoUnmarkedSum = sumUnmarkedNumbers(firstBingo.board.board);

const firstAnswer = firstBingo.num * firstBingoUnmarkedSum;
const lastBingo = runSecondGame(numbers, boards);
const lastBingoUnmarkedSum = sumUnmarkedNumbers(lastBingo.board.board);

const secondAnswer = lastBingo.num * lastBingoUnmarkedSum;
secondAnswer;
