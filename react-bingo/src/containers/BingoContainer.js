import React from 'react';
import { inject, observer } from 'mobx-react';

import BingoBoard from './../components/BingoBoard';

import './BingoContainer.scss';

@inject('bingo')
@observer
class BingoContainer extends React.Component {
  componentDidMount() {}

  handleClick = e => {
    const { bingo } = this.props;
    bingo.choose(bingo.player, e.target.innerHTML);
    bingo.switchPlayer();
  };

  render() {
    const { bingo } = this.props;

    return (
      <div className="bingo-container">
        <div className="bingo-container-board">
          <BingoBoard data={bingo.array1} handleClick={this.handleClick} />
          <BingoBoard data={bingo.array2} handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

export default BingoContainer;
