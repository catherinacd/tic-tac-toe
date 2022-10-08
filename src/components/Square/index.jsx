import React from "react";
import "./square.css";

const Square = props =>
  <button
    type="button"
    className={`square ${props.winnerSquare && "square--win"}`}
    onClick={props.onClick}
  >
    {props.value}
  </button>

export default Square;