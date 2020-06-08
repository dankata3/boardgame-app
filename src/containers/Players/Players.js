import React, { useMemo, Fragment } from 'react';
import PlayersForm from './PlayersForm/PlayersForm';
import Card from '../../components/Card/Card';
import TrashButton from '../../components/TrashButton/TrashButton';
import { openConfirmDeleteDialog } from '../../utils/utils';
import useToggleForm from '../../hooks/toggleForm';

import { useDispatch, useSelector } from 'react-redux';
import { removePlayer } from '../../store/actions/players';

const Players = () => {
  const [isFormOpened, toggleForm] = useToggleForm(false);

  const dispatch = useDispatch();
  const deletePlayer = (playerId) => dispatch(removePlayer(playerId));

  const players = useSelector((state) => {
    return state.players.players;
  });

  const playerList = useMemo(
    () =>
      players.map((player) => (
        <Card key={player.id}>
          <p style={{ color: player.color }}>{player.name}</p>
          <TrashButton
            click={() =>
              openConfirmDeleteDialog('game', player.id, deletePlayer)
            }
          />
        </Card>
      )),
    [players]
  );

  return (
    <Fragment>
      <PlayersForm closeForm={toggleForm} isFormOpened={isFormOpened} />
      <button onClick={toggleForm} className="btn btn-secondary mb-3">
        Add new player
      </button>
      <ul className="list-group">{playerList}</ul>
    </Fragment>
  );
};

export default Players;
