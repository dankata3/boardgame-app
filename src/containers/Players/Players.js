import React, { Component, Fragment } from 'react';
import PlayersForm from './PlayersForm/PlayersForm';
import Card from '../../components/Card/Card';

import { connect } from 'react-redux';
import { addPlayer } from '../../store/actions';

class Players extends Component {
  render() {
    const playerList = this.props.players.map((player) => (
      <Card key={player.id}>
        <p style={{ color: player.color }}>{player.name}</p>
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
    players: state.players,
  };
};

export default connect(mapStateToProps)(Players);
