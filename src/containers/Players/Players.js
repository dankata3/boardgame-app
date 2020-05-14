import React, { Component, Fragment } from 'react';
import PlayersForm from './PlayersForm/PlayersForm';
import Card from '../../components/Card/Card';
import TrashButton from '../../components/TrashButton/TrashButton';
import { openConfirmDeleteDialog } from '../../utils/utils';

import { connect } from 'react-redux';
import { removePlayer } from '../../store/actions/players';
class Players extends Component {
  render() {
    const playerList = this.props.players.map((player) => (
      <Card key={player.id}>
        <p style={{ color: player.color }}>{player.name}</p>
        <TrashButton
          click={() =>
            openConfirmDeleteDialog('game', player.id, this.props.deletePlayer)
          }
        />
      </Card>
    ));

    return (
      <Fragment>
        <PlayersForm />
        <ul className="list-group">{playerList}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.players.players,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePlayer: (playerId) => dispatch(removePlayer(playerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
