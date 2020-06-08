import React, { useEffect, useCallback } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';

import Games from './containers/Games/Games';
import Players from './containers/Players/Players';
import Results from './containers/Results/Results';

import { useDispatch } from 'react-redux';
import { initAppData } from './store/actions/results';

const App = () => {
  const dispatch = useDispatch();
  const onInitAppData = () => dispatch(initAppData());

  useEffect(() => {
    onInitAppData();
  }, [onInitAppData]);

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

export default App;
