import React, { Fragment, useContext } from 'react';
import PlayersForm from './PlayersForm/PlayersForm';
import Context from '../../context/context';

const players = () => {
  const { players } = useContext(Context);
  const playerCard = players.map((player) => (
    <li key={player.id} style={{ color: player.color }}>
      {player.name}
    </li>
  ));

  return (
    <Fragment>
      <PlayersForm />
      <ul>{playerCard}</ul>
    </Fragment>
  );
};

export default players;
