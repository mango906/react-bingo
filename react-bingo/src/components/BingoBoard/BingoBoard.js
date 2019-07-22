import React from 'react';
import './BingoBoard.scss';

import BingoBoardItem from './BingoBoardItem';

const BingoBoard = ({ data, player, handleClick, bingos, handleEnd }) => {
  if (bingos.length >= data.length) {
    handleEnd(player);
  }

  const bingoList = bingos.map((bingo, i) => {
    return (
      <div key={i}>
        {bingo.map((b, i) => (
          <div key={i}>{b.num}</div>
        ))}
      </div>
    );
  });

  return (
    <div className="bingo-board">
      <div className="bingo-board-items">
        {data.map((d, i) => {
          return (
            <div key={i}>
              {d.map((d, i) => (
                <BingoBoardItem key={i} data={d} player={player} handleClick={handleClick} />
                // <div
                //   className={`bingo-board-item ${d && d.isChecked && 'check'}`}
                //   key={i}
                //   onClick={e => {
                //     d && !d.isChecked && handleClick(e, player);
                //   }}
                // >
                //   {d && d.num}
                // </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="bingo-score">내가 맞춘 빙고</div>
      <div className="bingo-list">{bingoList}</div>
    </div>
  );
};

export default BingoBoard;
