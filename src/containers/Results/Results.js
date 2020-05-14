import React, { Fragment, Component } from 'react';
import ResultsTable from './ResultsTable/ResultsTable';
import ResultsForm from './ResultsForm/ResultsForm';
import Spinner from '../../components/Spinner/Spinner';

import { connect } from 'react-redux';
import { removeGameSession } from '../../store/actions/results';

class Results extends Component {
  render() {
    let table = <Spinner />;

    if (!this.props.loadingSessions) {
      table = (
        <ResultsTable
          gameSessions={this.props.gameSessions}
          maxPlayers={this.props.maxPlayers}
          players={this.props.players}
          games={this.props.games}
          deleteGameSessionHandler={this.props.deleteGameSession}
        />
      );
    }
    return (
      <Fragment>
        <ResultsForm games={this.props.games} players={this.props.players} />
        {table}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.players.players,
    games: state.games.games,
    gameSessions: state.gameSessions.gameSessions,
    maxPlayers: state.players.maxPlayers,
    loadingSessions: state.gameSessions.loadingSessions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteGameSession: (sessionId) => {
      dispatch(removeGameSession(sessionId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
