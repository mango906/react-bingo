import React from 'react';
import './BingoBoard.scss';

const BingoBoard = ({ data, player, handleClick }) => {
  return (
    <div className="bingo-board">
      {data.map((d, i) => {
        return (
          <div key={i}>
            {d.map((d, i) => {
              return (
                <div
                  className={`bingo-board-item ${d.isChecked && 'check'}`}
                  key={i}
                  onClick={e => {
                    handleClick(e, player);
                  }}
                >
                  {d.num}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default BingoBoard;
