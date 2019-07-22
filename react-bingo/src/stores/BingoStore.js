import { observable, action, computed } from 'mobx';
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

  winner = [];

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
    const columnChk1 = library.columnCheck(this.array1, num);
    if (columnChk1) this.bingo1.push(columnChk1);

    const columnChk2 = library.columnCheck(this.array2, num);
    if (columnChk2) this.bingo2.push(columnChk2);

    const rowChk1 = library.rowCheck(this.array1, num);
    if (rowChk1) this.bingo1.push(rowChk1);

    const rowChk2 = library.rowCheck(this.array2, num);
    if (rowChk2) this.bingo2.push(rowChk2);

    const leftDgChk1 = library.leftDiagonalCheck(this.array1, num);
    if (leftDgChk1) this.bingo1.push(leftDgChk1);

    const leftDgChk2 = library.leftDiagonalCheck(this.array2, num);
    if (leftDgChk2) this.bingo2.push(leftDgChk2);

    const rightDgChk1 = library.rightDiagonalCheck(this.array1, num);
    if (rightDgChk1) this.bingo1.push(rightDgChk1);

    const rightDgChk2 = library.rightDiagonalCheck(this.array2, num);
    if (rightDgChk2) this.bingo2.push(rightDgChk2);
  }

  @action.bound
  gameEnd(player) {
    this.winner.push(player);
    // let msg = player === 1 ? 'player1 승리!' : 'player2 승리!';
    // return msg;
  }

  @action.bound
  reset() {
    this.array1 = library.initialize();
    this.array2 = library.initialize();

    this.bingo1 = [];
    this.bingo2 = [];

    this.winner = [];

    this.isStarted = false;
  }

  @computed
  get winnerCount() {
    return this.winner.length;
  }

  @computed
  get getWinner() {
    return this.winner;
  }
}

export default BingoStore;
