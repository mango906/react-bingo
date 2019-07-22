import { observable, action } from 'mobx';
import library from '../lib/library';

class BingoStore {
  @observable
  array1 = library.initialize();
  @observable
  array2 = library.initialize();

  @observable
  bingo1 = [];
  @observable
  bingo2 = [];

  @observable
  player = 1;

  @observable
  isStarted = false;

  numberData = [];

  setNumberData(numberData) {
    this.numberData = numberData;
  }

  randoms() {
    return this.numberData[0];
  }

  numberSet(board, player) {
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

    player === 1 ? (this.array1 = array) : (this.array2 = array);
  }

  @action.bound
  switchPlayer() {
    this.player = this.player === 1 ? 2 : 1;
  }

  @action.bound
  choose(num) {
    let pos = null;

    let array1 = observable.array(this.array1);
    pos = library.findPos(this.array1, num);
    if (pos) {
      array1[pos.row][pos.column].isChecked = true;
      this.array1 = array1;
    }

    let array2 = observable.array(this.array2);
    pos = library.findPos(this.array2, num);
    if (pos) {
      array2[pos.row][pos.column].isChecked = true;
      this.array2 = array2;
    }
    this.bingoCheck(num);
  }

  @action.bound
  gameStart() {
    this.numberSet(this.array1, 1);

    this.numberSet(this.array2, 2);

    this.player = 1;

    this.isStarted = true;
  }

  @action.bound
  bingoCheck(num) {
    if (library.columnCheck(this.array1, num))
      this.bingo1.push(library.columnCheck(this.array1, num));

    if (library.columnCheck(this.array2, num))
      this.bingo2.push(library.columnCheck(this.array2, num));

    if (library.rowCheck(this.array1, num)) this.bingo1.push(library.rowCheck(this.array1, num));

    if (library.rowCheck(this.array2, num)) this.bingo2.push(library.rowCheck(this.array2, num));

    if (library.rightDiagonalCheck(this.array1, num))
      this.bingo1.push(library.rightDiagonalCheck(this.array1, num));

    if (library.rightDiagonalCheck(this.array2, num))
      this.bingo2.push(library.rightDiagonalCheck(this.array2, num));

    if (library.leftDiagonalCheck(this.array1, num))
      this.bingo1.push(library.leftDiagonalCheck(this.array1, num));

    if (library.leftDiagonalCheck(this.array2, num))
      this.bingo2.push(library.leftDiagonalCheck(this.array2, num));
  }

  @action.bound
  gameEnd(player) {
    let msg = player === 1 ? 'player1 승리!' : 'player2 승리!';
    return msg;
  }

  @action.bound
  reset() {
    this.array1 = library.initialize();
    this.array2 = library.initialize();

    this.bingo1 = [];
    this.bingo2 = [];

    this.isStarted = false;
  }
}

export default BingoStore;
