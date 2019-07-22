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

const findIdx = (array, num) => {
  let idx = null;
  array.forEach((data, i) => {
    data.forEach((d, j) => {
      if (d.num == num) {
        idx = {
          row: i,
          column: j
        };
      }
    });
  });
  return idx;
};

const columnCheck = (board, num) => {
  const rowNum = findIdx(board, num).row;
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
  const columnNum = findIdx(board, num).column;
  let isBingo = true;
  board.forEach(el => {
    if (el[columnNum].isChecked === false) {
      isBingo = false;
      return;
    }
  });
  if (isBingo) {
  }
  return isBingo;
};

const diagonalCheck = (board, num) => {
  const location = findIdx(board, num);
  let isBingo = true;

  if (location.row !== location.column) return;

  for (let i = 0; i < board.length; i++) {
    if (board[i][i].isChecked === false) {
      isBingo = false;
      return;
    }
  }
  return isBingo;
};

export default {
  initialize: initialize,
  shuffle: shuffle,
  findIdx: findIdx,
  columnCheck: columnCheck,
  rowCheck: rowCheck,
  diagonalCheck: diagonalCheck
};
