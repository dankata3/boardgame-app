import React, { Fragment, useState, useEffect } from 'react';
import ResultsTable from './ResultsTable/ResultsTable';
import ResultsForm from './ResultsForm/ResultsForm';
import Spinner from '../../components/Spinner/Spinner';
import useToggleForm from '../../hooks/toggleForm';

import { useDispatch, useSelector } from 'react-redux';
import { removeGameSession } from '../../store/actions/results';

const Results = () => {
  const [isFormOpened, toggleForm] = useToggleForm(false);

  const dispatch = useDispatch();
  const deleteGameSession = (sessionId) => {
    dispatch(removeGameSession(sessionId));
  };

  const players = useSelector((state) => {
    return state.players.players;
  });
  const games = useSelector((state) => {
    return state.games.games;
  });
  const gameSessions = useSelector((state) => {
    return state.gameSessions.gameSessions;
  });
  const maxPlayers = useSelector((state) => {
    return state.players.maxPlayers;
  });
  const loadingSessions = useSelector((state) => {
    return state.gameSessions.loadingSessions;
  });

  let table = <Spinner />;

  if (!loadingSessions) {
    table = (
      <Fragment>
        <button onClick={toggleForm} className="btn btn-secondary mb-3">
          Add new result
        </button>
        <ResultsTable
          gameSessions={gameSessions}
          maxPlayers={maxPlayers}
          players={players}
          games={games}
          deleteGameSessionHandler={deleteGameSession}
        />
      </Fragment>
    );
  }
  return (
    <Fragment>
      <ResultsForm
        games={games}
        players={players}
        closeForm={toggleForm}
        isFormOpened={isFormOpened}
      />
      {table}
    </Fragment>
  );
};

export default Results;
