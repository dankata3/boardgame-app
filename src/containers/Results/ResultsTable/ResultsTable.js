import React, { useContext } from 'react';
import ResultRow from './ResultRow/ResultRow';
import Context from '../../../context/context';

const resultsTable = (props) => {
  const { gameSessions } = useContext(Context);
  const resultRows = gameSessions.map((session, i) => {
    return (
      <ResultRow key={session.sessionId} index={i + 1} gameSession={session} />
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
