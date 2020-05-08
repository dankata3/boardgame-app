import axiosInstance from '../axios-instance';
import axios from 'axios';
import * as actionTypes from './actionTypes';

// Get initial data
export const initAppData = () => {
  return (dispatch) => {
    const gamesRequest = axiosInstance.get('/games.json');
    const playersRequest = axiosInstance.get('/players.json');
    const resultsRequest = axiosInstance.get('/gameSessions.json');

    axios
      .all([gamesRequest, playersRequest, resultsRequest])
      .then(
        axios.spread((...responses) => {
          const [gamesResponse, playersResponse, resultsResponse] = responses;
          let games = [];
          let players = [];
          let gameSessions = [];

          for (let key in gamesResponse.data) {
            games.push({
              id: key,
              name: gamesResponse.data[key].name,
              bggLink: gamesResponse.data[key].bggLink,
            });
          }

          for (let key in playersResponse.data) {
            players.push({
              id: key,
              name: playersResponse.data[key].name,
              color: playersResponse.data[key].color,
            });
          }

          for (let key in resultsResponse.data) {
            gameSessions.push({
              sessionId: key,
              gameDate: resultsResponse.data[key].gameDate,
              gameId: resultsResponse.data[key].gameId,
              sessionPlayers: resultsResponse.data[key].sessionPlayers,
            });
          }

          dispatch(setAppData(players, games, gameSessions));
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setAppData = (players, games, gameSessions) => {
  return {
    type: actionTypes.SET_DATA,
    players,
    games,
    gameSessions,
  };
};

// Add Player
export const recordNewPlayer = (player) => {
  return (dispatch) => {
    const formattedGameObj = {
      name: player.name.value,
      color: player.color.value,
    };

    axiosInstance
      .post('/players.json', formattedGameObj)
      .then((response) => {
        const formattedPlayer = {
          id: response.data.name,
          name: formattedGameObj.name,
          color: formattedGameObj.bggLink,
        };

        dispatch(addPlayer(formattedPlayer));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addPlayer = (player) => {
  return {
    type: actionTypes.ADD_PLAYER,
    player,
  };
};

// Add Game
export const recordNewGame = (game) => {
  return (dispatch) => {
    const formattedGameObj = {
      name: game.name.value,
      bggLink: game.bggLink.value,
    };
    axiosInstance
      .post('/games.json', formattedGameObj)
      .then((response) => {
        const formattedGame = {
          id: response.data.name,
          name: formattedGameObj.name,
          bggLink: formattedGameObj.bggLink,
        };
        dispatch(addGame(formattedGame));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addGame = (game) => {
  return {
    type: actionTypes.ADD_GAME,
    game,
  };
};

// Add Game Gession
export const recordNewSession = (gameSession) => {
  return (dispatch) => {
    const formattedGameSessionObj = {
      gameDate: gameSession.gameDate.value,
      gameId: gameSession.gameId.value,
      sessionPlayers: gameSession.sessionPlayers.map((player) => {
        return {
          playerId: player.playerId.value,
          score: player.score.value,
        };
      }),
    };
    axiosInstance
      .post('/gameSessions.json', formattedGameSessionObj)
      .then((response) => {
        const sessionFormattedObj = {
          sessionId: response.data.name,
          gameDate: formattedGameSessionObj.gameDate,
          gameId: formattedGameSessionObj.gameId,
          sessionPlayers: formattedGameSessionObj.sessionPlayers,
        };
        dispatch(addGameSession(sessionFormattedObj));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addGameSession = (gameSession) => {
  return {
    type: actionTypes.ADD_GAME_SESSION,
    gameSession,
  };
};
