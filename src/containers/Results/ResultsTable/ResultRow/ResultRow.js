import React from 'react';
import moment from 'moment';
import Utils from '../../../../utils/utils';

const resultRow = (props) => {
  const { players, games, gameSession, maxPlayers } = props;
  const { gameId, gameDate, sessionPlayers } = gameSession;

  const gamesMap = Utils.mapObjectById(games);
  const playersMap = Utils.mapObjectById(players);

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
    </tr>
  );
};

export default resultRow;
