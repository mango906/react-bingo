import { observable, action } from 'mobx';
import library from '../lib/library';

class BingoStore {
  @observable
  array1 = library.initialize();
  @observable
  array2 = library.initialize();

  @observable bingo1 = [];
  @observable bingo2 = [];

  @observable
  player = 1;

  isStarted = false;

  numberData = [];

  setNumberData(numberData) {
    this.numberData = numberData;
  }

  randoms() {
    return this.numberData[0];
  }

  numberSet(board, boardIdx) {
    let array = observable.array(board);
    this.setNumberData(library.shuffle());
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        array[i][j] = {
          num: this.randoms(),
          isChecked: false
        };
        this.numberData.splice(0, 1);
      }
    }

    if (boardIdx === 1) {
      this.array1 = array;
    } else {
      this.array2 = array;
    }
  }

  @action.bound
  switchPlayer() {
    switch (this.player) {
      case 1:
        this.player = 2;
        break;
      case 2:
        this.player = 1;
        break;
      default:
        break;
    }
  }

  @action.bound
  choose(num) {
    let idx = null;
    let array1 = observable.array(this.array1);
    idx = library.findIdx(this.array1, num);
    if (idx) {
      array1[idx.row][idx.column].isChecked = true;
      this.array1 = array1;
    }

    let array2 = observable.array(this.array2);
    idx = library.findIdx(this.array2, num);
    if (idx) {
      array2[idx.row][idx.column].isChecked = true;
      this.array2 = array2;
    }
    this.bingoCheck(num);
  }

  @action.bound
  gameStart() {
    this.numberSet(this.array1, 1);

    this.numberSet(this.array2, 2);

    this.isStarted = true;
  }

  @action.bound
  bingoCheck = num => {
    if (library.columnCheck(this.array1, num))
      this.bingo1.push(library.columnCheck(this.array1, num));

    if (library.columnCheck(this.array2, num))
      this.bingo2.push(library.columnCheck(this.array2, num));

    if (library.rowCheck(this.array1, num)) this.bingo1.push('123');

    if (library.rowCheck(this.array2, num)) this.bingo2.push('123');

    if (library.diagonalCheck(this.array1, num)) this.bingo1.push('123');

    if (library.diagonalCheck(this.array2, num)) this.bingo2.push('123');
  };
}

export default BingoStore;
