import React from 'react';
import moment from 'moment';
import { mapObject, openConfirmDeleteDialog } from '../../../../utils/utils';
import TrashButton from '../../../../components/TrashButton/TrashButton';

const resultRow = (props) => {
  const { players, games, gameSession, maxPlayers, deleteGameSession } = props;
  const { gameId, gameDate, sessionPlayers } = gameSession;

  const gamesMap = mapObject(games);
  const playersMap = mapObject(players);

  const formattedDate = moment(gameDate).format('DD/MM/YYYY');
  const sessionGame = gamesMap[gameId].name;
  const playersScoresCells = [];

  for (let i = 0; i < maxPlayers; i++) {
    if (sessionPlayers[i]) {
      playersScoresCells.push(sessionPlayers[i]);
    } else {
      playersScoresCells.push('');
    }
  }
  const playerScoreColumns = playersScoresCells.map((player, i) => {
    if (player) {
      const playerName = playersMap[player.playerId]['name'];
      const playerColor = playersMap[player.playerId]['color'];
      const playerScore = player.score;
      return (
        <td key={i}>
          <span style={{ color: playerColor }}>{playerName}</span> /
          <span>{playerScore}</span>
        </td>
      );
    } else {
      return <td key={i}>-</td>;
    }
  });

  return (
    <tr>
      <td>{props.index}</td>
      <td>{formattedDate}</td>
      <td>{sessionGame}</td>
      {playerScoreColumns}
      <td>
        <TrashButton
          click={() =>
            openConfirmDeleteDialog(
              'result',
              gameSession.sessionId,
              deleteGameSession
            )
          }
        />
      </td>
    </tr>
  );
};

export default resultRow;
