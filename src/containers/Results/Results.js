import React, { Fragment, Component } from 'react';
import ResultsTable from './ResultsTable/ResultsTable';
import ResultsForm from './ResultsForm/ResultsForm';

import { connect } from 'react-redux';

class Results extends Component {
  render() {
    return (
      <Fragment>
        <ResultsForm games={this.props.games} players={this.props.players} />
        <ResultsTable
          gameSessions={this.props.gameSessions}
          maxPlayers={this.props.maxPlayers}
          players={this.props.players}
          games={this.props.games}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    players: state.players,
    games: state.games,
    gameSessions: state.gameSessions,
    maxPlayers: 4,
  };
};

export default connect(mapStateToProps)(Results);
