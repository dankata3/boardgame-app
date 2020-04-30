import React, { Fragment, useContext, useEffect } from 'react';
import Context from '../../context/context';
import GamesForm from './GamesForm/GamesForm';
import Card from '../../components/Card/Card';

const games = () => {
  const { games } = useContext(Context);
  const gamesList = games.map((game) => (
    <Card key={game.id}>
      <a href={game.bggLink}>{game.name}</a>
    </Card>
  ));

  return (
    <Fragment>
      <GamesForm />
      <ul className="list-group">{gamesList}</ul>
    </Fragment>
  );
};

export default games;
