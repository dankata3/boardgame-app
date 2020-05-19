import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';

import Games from './containers/Games/Games';
import Players from './containers/Players/Players';
import Results from './containers/Results/Results';

import { connect } from 'react-redux';
import { initAppData } from './store/actions/results';

const app = (props) => {
  useEffect(() => {
    props.initAppData();
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Results} />
        <Route path="/players" component={Players} />
        <Route path="/games" component={Games} />
      </Switch>
    </Layout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initAppData: () => dispatch(initAppData()),
  };
};

export default connect(null, mapDispatchToProps)(app);
