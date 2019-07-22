import { observable, action, computed } from 'mobx';

class BingoStore {
  @observable
  array1 = this.arrays();
  @observable
  array2 = this.arrays();

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
    const array = observable.array(this.array1);
    const idx = this.findIdx(player, num);
    console.log(idx);
    array[idx.row][idx.column].isChecked = true;
    this.array1 = array;
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
    this.array1.forEach((data, i) => {
      data.forEach((d, j) => {
        if (d.num == num) {
          idx = {
            column: i,
            row: j
          };
        }
      });
    });
    return idx;
  }
}

export default BingoStore;
