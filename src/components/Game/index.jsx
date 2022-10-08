import React, {useState} from "react";
import {calculateWinner} from "./helpers"
import Board from "../Board";
import './game.css'

const Game = () => {
  // useState
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
  }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNest] = useState(true);

  // variables
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status;

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNest((step % 2) === 0);
  }

  const handleClick = (i) => {
    const currentHistory = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    
    setHistory(currentHistory.concat([{squares: squares}]));
    setStepNumber(currentHistory.length);
    setXIsNest(!xIsNext);
  }
  if (winner) {
    status = "Winner is " + winner.squares;
  } else if(history.length !== 10)
    status = "Next step: " + (xIsNext ? "X" : "O");
  else {
    status = "That's a draw!";
  }

  const moves = history.map((step, move) => {
    const desc = move ?
      "Go to move #" + move :
      "Go to game start";
    const currentMove = history[move];
    let lastMove = false;

    if (calculateWinner(currentMove.squares)) {
      lastMove = true;
    }
    
    return (
      <li key={move} className="game-move">
        <button 
          type="button"
          className="game-button"
          onClick={() => jumpTo(move)}
        >
          {desc}
        </button>
        <div>
          <Board 
            squares={currentMove.squares}
            onClick={(i) => handleClick(i)}
            winLines={winner && lastMove && winner.winLines}
          />
        </div>
      </li>
    );
  });

  return (
    <div className="game">
      <h3>{status}</h3>
      <div className="game-wrapper">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => handleClick(i)}
            winLines={winner && winner.winLines}
          />
        </div>
        <div className="game-info">
          <ol className="game-moves-list">{moves}</ol>
        </div>
      </div>
    </div>
  );
}

export default Game;