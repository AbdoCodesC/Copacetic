import React from "react";

function History({ attempts, history }) {
  const historyKeys = Object.keys(history);

  return (
    <div className="card history-card">
      <h4>History</h4>
      {historyKeys.length === 0 ? (
        <p>
          You have no attempts! Press <b>Start</b> to begin 💫
        </p>
      ) : (
        <div className="history-list">
          {historyKeys.map((item, itemIdx) => {
            const dateKey = new Date(item)
              .toString()
              .split(" ")
              .slice(1, 4)
              .join(" ");
            return (
              <div className="card-button-secondary" key={itemIdx}>
                <div>
                  <p>Started</p>
                  <h6>{dateKey}</h6>
                </div>
                <div>
                  <p>Streak</p>
                  <h6>{history[item]}</h6>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default History;
