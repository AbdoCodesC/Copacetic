import React from "react";

export default function ProgressBar({ text, remainder }) {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="level">
      <div>
        <h4>{text}</h4>
      </div>

      {arr.map((el, elIndex) => (
        <div className="level-bar" key={elIndex}></div>
      ))}

      <div className="xp" style={{ width: `${remainder}%` }}></div>
    </div>
  );
}
