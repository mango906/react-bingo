const initialize = () => {
  let data = new Array(5);
  for (let i = 0; i < data.length; i++) {
    data[i] = new Array(5);
    for (let j = 0; j < data[i].length; j++) {
      data[i][j] = {
        isChecked: false
      };
    }
  }
  return data;
};

const shuffle = () => {
  let numberData = [];
  for (let i = 1; i <= 25; i++) numberData.push(i); // numberData initialize

  numberData.sort(() => {
    return 0.5 - Math.random();
  });

  return numberData;
};

const findPos = (array, num) => {
  let pos = null;
  array.forEach((data, i) => {
    data.forEach((d, j) => {
      console.log(d.num, num);
      if (d.num === num) {
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
  const rowNum = findPos(board, num).row;
  let isBingo = true;
  board[rowNum].forEach(el => {
    if (el.isChecked === false) {
      isBingo = false;
      return;
    }
  });

  return isBingo ? board[rowNum] : false;
};

const rowCheck = (board, num) => {
  const columnNum = findPos(board, num).column;
  let isBingo = true;
  let rowData = [];

  board.forEach(el => {
    if (el[columnNum].isChecked === false) {
      isBingo = false;
      return;
    }
    rowData.push(el[columnNum]);
  });

  return isBingo ? rowData : false;
};
const leftDiagonalCheck = (board, num) => {
  const location = findPos(board, num);

  let isBingo = true;
  let diagonalData = [];

  if (location.row + location.column !== board.length - 1) return;

  board.forEach((el, i) => {
    el.forEach((e, j) => {
      if (i + j !== board.length - 1) return;

      if (board[i][j].isChecked === false) {
        isBingo = false;
        return;
      }
      diagonalData.push(board[i][j]);
    });
  });
  return isBingo ? diagonalData : false;
};

const rightDiagonalCheck = (board, num) => {
  const location = findPos(board, num);

  if (location.row !== location.column) return;

  let isBingo = true;
  let diagonalData = [];

  board.forEach((el, i) => {
    el.forEach((e, j) => {
      if (i !== j) return;

      if (board[i][j].isChecked === false) {
        isBingo = false;
        return;
      }
      diagonalData.push(board[i][j]);
    });
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
