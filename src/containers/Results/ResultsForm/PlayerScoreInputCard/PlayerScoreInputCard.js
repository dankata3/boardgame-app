import React from 'react';
import Input from '../../../../components/Input/Input';

const playerScoreInputCard = (props) => {
  const {
    index,
    players,
    sessionPlayer,
    selectName,
    writeScore,
    deletePlayerCard,
  } = props;

  const closeCardBtn =
    index > 2 ? (
      <span
        className="close-card-btn close"
        aria-label="Close"
        onClick={() => deletePlayerCard(index)}
      >
        &times;
      </span>
    ) : null;

  return (
    <div className="card p-3 mb-3 position-relative">
      <h4>{index} Place</h4>
      {closeCardBtn}
      <div className="row">
        <div className="col-md-6">
          <Input
            label="Player"
            name="playerId"
            error={sessionPlayer.playerId.error || ''}
            validation={sessionPlayer.playerId.valid}
            touched={sessionPlayer.playerId.touched}
            inputtype="select"
            items={players}
            value={sessionPlayer.playerId.value || ''}
            changed={(event) => selectName(event.target.value, index - 1)}
          />
        </div>
        <div className="col-md-6">
          <Input
            label="Score"
            name="score"
            type="number"
            validation={sessionPlayer.score.valid}
            touched={sessionPlayer.score.touched}
            inputtype="input"
            value={sessionPlayer.score.value || ''}
            changed={(event) => writeScore(event.target.value, index - 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default playerScoreInputCard;
