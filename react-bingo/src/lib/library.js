const initialize = () => {
  let data = new Array(5);
  for (let i = 0; i < data.length; i++) {
    data[i] = new Array(5);
  }
  return data;
};

const shuffle = () => {
  let numberData = [];
  for (let i = 1; i <= 25; i++) numberData.push(i); // numberData initialize

  numberData.sort(() => {
    return 0.5 - Math.random(); // array shuffle
  });

  return numberData;
};

const findPos = (array, num) => {
  let pos = null;
  array.forEach((row, i) => {
    row.forEach((column, j) => {
      if (column.num === num) {
        pos = {
          row: i,
          column: j
        };
      }
    });
  });
  return pos;
};

const columnCheck = (board, num) => {
  const rowPos = findPos(board, num).row;
  let isBingo = true;

  board[rowPos].forEach(el => {
    if (!el.isChecked) {
      isBingo = false;
      return;
    }
  });

  return isBingo ? board[rowPos] : false;
};

const rowCheck = (board, num) => {
  const columnPos = findPos(board, num).column;
  let isBingo = true;
  let rowData = [];

  board.forEach(el => {
    if (!el[columnPos].isChecked) {
      isBingo = false;
      return;
    }
    rowData.push(el[columnPos]);
  });

  return isBingo ? rowData : false;
};

const leftDiagonalCheck = (board, num) => {
  const pos = findPos(board, num);
  let isBingo = true;
  let diagonalData = [];

  if (pos.row + pos.column !== board.length - 1) return;

  board.forEach((el, i) => {
    if (!board[i][board.length - 1 - i].isChecked) {
      isBingo = false;
      return;
    }
    diagonalData.push(board[i][board.length - 1 - i]);
  });

  return isBingo ? diagonalData : false;
};

const rightDiagonalCheck = (board, num) => {
  const pos = findPos(board, num);
  let isBingo = true;
  let diagonalData = [];

  if (pos.row !== pos.column) return;

  board.forEach((el, i) => {
    if (!board[i][i].isChecked) {
      isBingo = false;
      return;
    }
    diagonalData.push(board[i][i]);
  });

  return isBingo ? diagonalData : false;
};

export default {
  initialize: initialize,
  shuffle: shuffle,
  findPos: findPos,
  columnCheck: columnCheck,
  rowCheck: rowCheck,
  leftDiagonalCheck: leftDiagonalCheck,
  rightDiagonalCheck: rightDiagonalCheck
};
