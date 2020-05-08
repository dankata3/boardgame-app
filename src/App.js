import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';

import Games from './containers/Games/Games';
import Players from './containers/Players/Players';
import Results from './containers/Results/Results';
import Spinner from './components/Spinner/Spinner';

import { connect } from 'react-redux';
import { initAppData } from './store/actions';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.props.initAppData();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={Results} />
            <Route path="/players" component={Players} />
            <Route path="/games" component={Games} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initAppData: () => dispatch(initAppData()),
  };
};

export default connect(null, mapDispatchToProps)(App);
