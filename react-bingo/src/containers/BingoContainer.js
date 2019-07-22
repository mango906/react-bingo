import React from 'react';
import { inject, observer } from 'mobx-react';

import BingoBoard from './../components/BingoBoard';

import './BingoContainer.scss';

@inject('bingo')
@observer
class BingoContainer extends React.Component {
  componentDidMount() {}

  handleClick = (e, player) => {
    const { bingo } = this.props;
    if (!bingo.isStarted) {
      return;
    }

    if (player !== bingo.player) {
      alert('잘못된 차레입니다');
      return;
    }
    bingo.choose(e.target.innerHTML);
    bingo.switchPlayer();
  };

  handleStart = () => {
    const { bingo } = this.props;
    bingo.gameStart();
  };

  render() {
    const { bingo } = this.props;

    const bingos =
      bingo.bingos &&
      bingo.bingos.map(b => {
        return <div>{b}</div>;
      });

    return (
      <div className="bingo-container">
        <button onClick={this.handleStart}>게임 시작</button>
        <div className="bingo-container-board">
          <BingoBoard player={1} data={bingo.array1} handleClick={this.handleClick} />
          <BingoBoard player={2} data={bingo.array2} handleClick={this.handleClick} />
        </div>
        {bingos}
      </div>
    );
  }
}

export default BingoContainer;
