import React, { Fragment } from 'react';
import GamesForm from './GamesForm/GamesForm';
import Card from '../../components/Card/Card';
import { openConfirmDeleteDialog } from '../../utils/utils';
import TrashButton from '../../components/TrashButton/TrashButton';

import { connect } from 'react-redux';
import { removeGame } from '../../store/actions/games';

const games = (props) => {
  const gamesList = props.games.map((game) => (
    <Card key={game.id}>
      <a href={game.bggLink}>{game.name}</a>
      <TrashButton
        click={() => openConfirmDeleteDialog('game', game.id, props.deleteGame)}
      />
    </Card>
  ));
  return (
    <Fragment>
      <GamesForm />
      <ul className="list-group">{gamesList}</ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    games: state.games.games,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteGame: (gameId) => dispatch(removeGame(gameId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(games);
