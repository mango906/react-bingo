import React from 'react';
import { inject, observer } from 'mobx-react';

import BingoBoard from './../components/BingoBoard';

import './BingoContainer.scss';

@inject('bingo')
@observer
class BingoContainer extends React.Component {
  componentDidMount() {}

  render() {
    const { bingo } = this.props;
    return (
      <div className="bingo-container">
        <div className="bingo-container-board">
          <BingoBoard data={bingo.arrays()} />
          <BingoBoard data={bingo.arrays()} />
        </div>
      </div>
    );
  }
}

export default BingoContainer;
