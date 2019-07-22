import React from 'react';
import './BingoBoard.scss';

const BingoBoard = ({ data, player, handleClick, bingos, handleEnd }) => {
  if (bingos.length >= data.length) {
    handleEnd(player);
  }

  const bingoList = bingos.map((bingo, i) => {
    return (
      <div className="bingo-list" key={i}>
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
                <div
                  className={`bingo-board-item ${d && d.isChecked && 'check'}`}
                  key={i}
                  onClick={e => {
                    d && !d.isChecked && handleClick(e, player);
                  }}
                >
                  {d && d.num}
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
