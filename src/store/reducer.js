import * as actionTypes from './actionTypes';

const initialState = {
  games: [
    //   {
    //     gameId: 'M61ZDAxXir2z009-gtc',
    //     name: 'Terraforming Mars',
    //     bggLink: 'https://boardgamegeek.com/boardgame/167791/terraforming-mars',
    //   },
    //   {
    //     gameId: 'M61ZEjfHGA-zb3hEaTe',
    //     name: 'Seasons',
    //     bggLink: 'https://boardgamegeek.com/boardgame/108745/seasons',
    //   },
  ],
  players: [
    //   {
    //     playerId: 'M61XPgXHMRvrifNKaDo',
    //     name: 'Daniel',
    //     color: '#0693e3',
    //   },
    //   {
    //     playerId: 'M61XSrf6TFzsXlkwTr0',
    //     name: 'Vlado',
    //     color: '#eb144c',
    //   },
    //   {
    //     playerId: 'M61XUblfX2NuPv8qFrt',
    //     name: 'Petya',
    //     color: '#00d084',
    //   },
  ],
  gameSessions: [
    //   {
    //     sessionId: 'M6UxQcBS6SrJ_DhyTq9',
    //     gameDate: 1588107226718,
    //     gameId: 'M61ZDAxXir2z009-gtc',
    //     sessionPlayers: [
    //       {
    //         playerId: 'M61XPgXHMRvrifNKaDo',
    //         score: 212,
    //       },
    //       {
    //         playerId: 'M61XSrf6TFzsXlkwTr0',
    //         score: 111,
    //       },
    //     ],
    //   },
  ],
  maxPlayers: 4,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return {
        ...state,
        players: action.players,
        games: action.games,
        gameSessions: action.gameSessions,
      };
    case actionTypes.ADD_PLAYER:
      const players = state.players.concat(action.player);
      return {
        ...state,
        players,
      };
    case actionTypes.ADD_GAME:
      const games = state.games.concat(action.game);
      return {
        ...state,
        games,
      };
    case actionTypes.ADD_GAME_SESSION:
      const gameSessions = state.gameSessions.concat(action.gameSession);
      return {
        ...state,
        gameSessions,
      };
    default:
      return state;
  }
};

export default reducer;
