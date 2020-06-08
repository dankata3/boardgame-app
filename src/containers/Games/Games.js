import React, { Fragment, useMemo } from 'react';
import GamesForm from './GamesForm/GamesForm';
import Card from '../../components/Card/Card';
import { openConfirmDeleteDialog } from '../../utils/utils';
import TrashButton from '../../components/TrashButton/TrashButton';
import useToggleForm from '../../hooks/toggleForm';

import { useDispatch, useSelector } from 'react-redux';
import { removeGame } from '../../store/actions/games';

const Games = () => {
  const [isFormOpened, toggleForm] = useToggleForm(false);

  const dispatch = useDispatch();
  const deleteGame = (gameId) => dispatch(removeGame(gameId));

  const games = useSelector((state) => {
    return state.games.games;
  });

  const gamesList = useMemo(
    () =>
      games.map((game) => (
        <Card key={game.id}>
          <a href={game.bggLink}>{game.name}</a>
          <TrashButton
            click={() => openConfirmDeleteDialog('game', game.id, deleteGame)}
          />
        </Card>
      )),
    [games]
  );
  return (
    <Fragment>
      <GamesForm closeForm={toggleForm} isFormOpened={isFormOpened} />
      <button onClick={toggleForm} className="btn btn-secondary mb-3">
        Add new game
      </button>
      <ul className="list-group">{gamesList}</ul>
    </Fragment>
  );
};

export default Games;
