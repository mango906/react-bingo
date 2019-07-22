import React from 'react';
import './BingoBoardItem.scss';

const BingoBoardItem = ({ data, player, handleClick }) => {
  return (
    <div
      className={`bingo-board-item ${data && data.isChecked && 'check'}`}
      onClick={e => {
        data && !data.isChecked && handleClick(e, player);
      }}
    >
      {data && data.num}
    </div>
  );
};

export default BingoBoardItem;
