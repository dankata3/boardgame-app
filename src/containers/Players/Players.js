import React, { Fragment, useContext } from 'react';
import PlayersForm from './PlayersForm/PlayersForm';
import Context from '../../context/context';
import Card from '../../components/Card/Card';

const players = () => {
  const { players } = useContext(Context);
  const playerList = players.map((player) => (
    <Card key={player.id}>
      <p style={{ color: player.color }}>{player.name}</p>
    </Card>
  ));

  return (
    <Fragment>
      <PlayersForm />
      <ul className="list-group">{playerList}</ul>
    </Fragment>
  );
};

export default players;
