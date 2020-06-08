import axiosInstance from '../../axios-instance';
import axios from 'axios';
import * as actionTypes from './actionTypes';
import { setGames } from './games';
import { setPlayers } from './players';

export const initAppData = () => {
  return (dispatch) => {
    dispatch(fetchDataStart());
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

          dispatch(setPlayers(players));
          dispatch(setGames(games));
          dispatch(setGameSessions(gameSessions));
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setGameSessions = (gameSessions) => {
  return {
    type: actionTypes.SET_GAME_SESSIONS,
    gameSessions,
  };
};

export const fetchDataStart = () => {
  return {
    type: actionTypes.FETCH_DATA_START,
  };
};

export const recordNewSession = (gameSession) => {
  return (dispatch) => {
    dispatch(addGameSessionStart());

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

export const addGameSessionStart = () => {
  return {
    type: actionTypes.ADD_GAME_SESSION_START,
  };
};

export const removeGameSession = (sessionId) => {
  return (dispatch) => {
    dispatch(deleteGameSessionStart());

    axiosInstance
      .delete(`/gameSessions/${sessionId}.json`)
      .then(() => {
        dispatch(deleteGameSession(sessionId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteGameSession = (sessionId) => {
  return {
    type: actionTypes.DELETE_GAME_SESSION,
    sessionId,
  };
};

export const deleteGameSessionStart = () => {
  return {
    type: actionTypes.DELETE_GAME_SESSION_START,
  };
};
