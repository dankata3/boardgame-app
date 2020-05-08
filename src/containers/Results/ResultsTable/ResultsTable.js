import React from 'react';
import ResultRow from './ResultRow/ResultRow';

const resultsTable = (props) => {
  const resultRows = props.gameSessions.map((session, i) => {
    return (
      <ResultRow
        key={session.sessionId}
        index={i + 1}
        players={props.players}
        games={props.games}
        gameSession={session}
        maxPlayers={props.maxPlayers}
      />
    );
  });

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Game Name</th>
          <th>1st Player</th>
          <th>2nd Player</th>
          <th>3rd Player</th>
          <th>4th Player</th>
        </tr>
      </thead>
      <tbody>{resultRows}</tbody>
    </table>
  );
};

export default resultsTable;
