import React from 'react';

const playersContext = React.createContext({
  players: [],
  games: [],
  gameSessions: [],
  recordSession: null,
  addGame: null,
  addPlayer: null,
});

export default playersContext;
