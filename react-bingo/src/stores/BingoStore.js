import { observable, action, computed } from 'mobx';

class BingoStore {
  @observable
  array1 = this.initialize();
  @observable
  array2 = this.initialize();

  @observable
  player = 1;

  numberData = [];

  setNumberData(numberData) {
    this.numberData = numberData;
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
    idx = this.findIdx(this.array1, num);
    if (idx) {
      array1[idx.row][idx.column].isChecked = true;
      this.array1 = array1;
    }

    let array2 = observable.array(this.array2);
    idx = this.findIdx(this.array2, num);
    if (idx) {
      array2[idx.row][idx.column].isChecked = true;
      this.array2 = array2;
    }
  }

  @action.bound
  gameStart() {
    this.numberSet(this.array1, 1);

    this.numberSet(this.array2, 2);
  }

  initialize() {
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
  }

  randoms() {
    return this.numberData[0];
  }

  shuffle() {
    let numberData = [];
    for (let i = 1; i <= 25; i++) numberData.push(i); // numberData initialize

    numberData.sort(() => {
      return 0.5 - Math.random();
    });

    this.setNumberData(numberData);
  }

  findIdx(array, num) {
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
  }

  numberSet(board, boardIdx) {
    let array = observable.array(board);
    this.shuffle();
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
}

export default BingoStore;
