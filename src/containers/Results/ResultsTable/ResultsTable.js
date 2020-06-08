import React, { useMemo } from 'react';
import ResultRow from './ResultRow/ResultRow';

const resultsTable = (props) => {
  const resultRows = useMemo(
    () =>
      props.gameSessions.map((session, i) => {
        console.log('RESULT TABLE');
        return (
          <ResultRow
            key={session.sessionId}
            index={i + 1}
            players={props.players}
            games={props.games}
            gameSession={session}
            maxPlayers={props.maxPlayers}
            deleteGameSession={props.deleteGameSessionHandler}
          />
        );
      }),
    [props.gameSessions, props.maxPlayers, props.players, props.games]
  );

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Game Name</th>
          <th>1st Place</th>
          <th>2nd Place</th>
          <th>3rd Place</th>
          <th>4th Place</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{resultRows}</tbody>
    </table>
  );
};

export default resultsTable;
