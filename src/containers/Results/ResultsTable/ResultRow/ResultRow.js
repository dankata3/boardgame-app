import React, { useContext } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Context from '../../../../context/context';
import Utils from '../../../../utils/utils';

const resultRow = (props) => {
  const { gameId, date, sessionPlayers } = props.gameSession;

  const { players, games } = useContext(Context);
  const gamesMap = Utils.mapObjectById(games);
  const playersMap = Utils.mapObjectById(players);

  const maxPlayersNumber = 4;

  const formattedDate = moment(date).format('DD/MM/YYYY');
  const sessionGame = gamesMap[gameId].name;
  const playersScoresCells = [];

  for (let i = 0; i < maxPlayersNumber; i++) {
    if (sessionPlayers[i]) {
      playersScoresCells.push(sessionPlayers[i]);
    } else {
      playersScoresCells.push('');
    }
  }

  const playerScoreColumns = playersScoresCells.map((player, i) => {
    if (player) {
      const playerName = playersMap[player.id]['name'];
      const playerColor = playersMap[player.id]['color'];
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

// resultRow.propTypes = {
//   sessionId: PropTypes.number,
//   gameId: PropTypes.number,
//   date: PropTypes.string,
//   sessionPlayers: PropTypes.array,
// };

export default resultRow;
