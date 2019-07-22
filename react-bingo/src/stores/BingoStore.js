import { observable, action, computed } from 'mobx';

class BingoStore {
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
}

export default BingoStore;
