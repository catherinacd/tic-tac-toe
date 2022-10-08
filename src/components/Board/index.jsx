import React from "react";
import Square from "../Square";
import  "./board.css";

const Board = (props) => {
  return (
    <div className="board">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => {
        return (
        <Square
          key={item}
          value={props.squares[item]} 
          onClick={() => props.onClick(item)}
          winnerSquare={props.winLines && props.winLines.includes(item)}
        />
      )})}
    </div>
  );
}

export default Board;