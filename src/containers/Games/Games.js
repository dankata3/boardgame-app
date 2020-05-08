import React, { Component, Fragment } from 'react';
import GamesForm from './GamesForm/GamesForm';

import Card from '../../components/Card/Card';

import { connect } from 'react-redux';

class Games extends Component {
  render() {
    const gamesList = this.props.games.map((game) => (
      <Card key={game.id}>
        <a href={game.bggLink}>{game.name}</a>
      </Card>
    ));
    return (
      <Fragment>
        <GamesForm />
        <ul className="list-group">{gamesList}</ul>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
  };
};

export default connect(mapStateToProps)(Games);
