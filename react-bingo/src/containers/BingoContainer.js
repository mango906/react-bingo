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
    if (player !== bingo.player) {
      alert('Not your turn!!!');
      return;
    }
    bingo.choose(bingo.player, e.target.innerHTML);
    bingo.switchPlayer();
  };

  render() {
    const { bingo } = this.props;

    return (
      <div className="bingo-container">
        <div className="bingo-container-board">
          <BingoBoard player={1} data={bingo.array1} handleClick={this.handleClick} />
          <BingoBoard player={2} data={bingo.array2} handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default BingoContainer;
