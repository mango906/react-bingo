import { observable, action, computed } from 'mobx';

class BingoStore {
  @observable
  array1 = this.initialize();
  @observable
  array2 = this.initialize();

  @observable
  player = 1;

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
  choose(player, num) {
    let array = [];
    let idx = -1;
    switch (player) {
      case 1:
        array = observable.array(this.array1);
        idx = this.findIdx(player, num);
        array[idx.row][idx.column].isChecked = true;
        this.array1 = array;
        break;
      case 2:
        array = observable.array(this.array2);
        idx = this.findIdx(player, num);
        array[idx.row][idx.column].isChecked = true;
        this.array2 = array;
        break;
      default:
        break;
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

  arrays() {
    let data = new Array(5);

    for (let i = 0; i < data.length; i++) {
      data[i] = new Array(5);
      for (let j = 0; j < data[i].length; j++) {
        data[i][j] = {
          isChecked: false,
          num: this.randoms()
        };
      }
    }
    return data;
  }

  randoms() {
    return Math.floor(Math.random() * 25);
  }

  findIdx(player, num) {
    let idx;
    switch (player) {
      case 1:
        this.array1.forEach((data, i) => {
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
      case 2:
        this.array2.forEach((data, i) => {
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
      default:
        break;
    }
  }

  numberSet(board, boardIdx) {
    let array = observable.array(board);
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        array[i][j] = {
          num: this.randoms(),
          isChecked: false
        };
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
