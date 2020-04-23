import React, { Fragment, useContext, useEffect } from 'react';
import GamesForm from './GamesForm/GamesForm';
import Context from '../../context/context';

const games = () => {
  const { games } = useContext(Context);
  const gameCard = games.map((game) => <li key={game.id}>{game.name}</li>);

  return (
    <Fragment>
      <GamesForm />
      <ul>{gameCard}</ul>
    </Fragment>
  );
};

export default games;
