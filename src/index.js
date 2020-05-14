import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import playersReducer from './store/reducers/players';
import gamesReducer from './store/reducers/games';
import gameSessionsReducer from './store/reducers/results';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log(action);
      const result = next(action);
      console.log(store.getState());
      return result;
    };
  };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  players: playersReducer,
  games: gamesReducer,
  gameSessions: gameSessionsReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
