import React from 'react';
import { inject, observer } from 'mobx-react';

import BingoBoard from './../components/BingoBoard';

import './BingoContainer.scss';

@inject('bingo')
@observer
class BingoContainer extends React.Component {
  handleClick = (e, player) => {
    const { bingo } = this.props;

    if (!bingo.isStarted) {
      return;
    }

    if (player !== bingo.player) {
      alert('잘못된 차레입니다');
      return;
    }

    bingo.choose(parseInt(e.target.innerHTML));
    bingo.switchPlayer();
  };

  handleStart = () => {
    const { bingo } = this.props;
    bingo.gameStart();
  };

  handleEnd = player => {
    const { bingo } = this.props;
    alert(bingo.gameEnd(player));
    bingo.reset();
  };

  render() {
    const { bingo } = this.props;

    return (
      <div className="bingo-container">
        <button onClick={this.handleStart}>{bingo.isStarted ? '게임 재시작' : '게임 시작'}</button>
        <div className="bingo-container-board">
          <BingoBoard
            player={1}
            data={bingo.array1}
            bingos={bingo.bingo1}
            handleClick={this.handleClick}
            handleEnd={this.handleEnd}
          />
          <BingoBoard
            player={2}
            data={bingo.array2}
            bingos={bingo.bingo2}
            handleClick={this.handleClick}
            handleEnd={this.handleEnd}
          />
        </div>
      </div>
    );
  }
}

export default BingoContainer;
