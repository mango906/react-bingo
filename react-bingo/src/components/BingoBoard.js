import React from 'react';
import './BingoBoard.scss';

const BingoBoard = ({ data }) => {
  console.log(data);
  return (
    <div className="bingo-board">
      {data.map((d, i) => {
        return (
          <div key={i}>
            {d.map((d, i) => {
              return (
                <div key={i} className="bingo-board-item">
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
