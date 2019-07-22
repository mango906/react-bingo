import React from 'react';
import './BingoBoard.scss';

const BingoBoard = ({ data, player, handleClick, bingos, handleEnd }) => {
  if (bingos.length >= data.length) {
    handleEnd(player);
  }

  const bingoList = bingos.map(bingo => {
    return (
      <div className="bingo-list">
        {bingo.map(b => (
          <div>{b.num}</div>
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
                <div
                  className={`bingo-board-item ${d.isChecked && 'check'}`}
                  key={i}
                  onClick={e => {
                    !d.isChecked && handleClick(e, player);
                  }}
                >
                  {d.num}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {bingoList}
    </div>
  );
};

export default BingoBoard;
