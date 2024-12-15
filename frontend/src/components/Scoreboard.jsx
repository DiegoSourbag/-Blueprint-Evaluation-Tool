import React from "react";

function Scoreboard({ data }) {
  return (
    <div>
      <h2>Scoreboard</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No scores available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Scoreboard;
