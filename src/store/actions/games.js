import axiosInstance from '../../axios-instance';
import * as actionTypes from './actionTypes';

export const recordNewGame = (game) => {
  return (dispatch) => {
    dispatch(addGameStart());
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

export const addGameStart = () => {
  return {
    type: actionTypes.ADD_GAME_START,
  };
};

export const removeGame = (gameId) => {
  return (dispatch) => {
    dispatch(deleteGameStart());

    axiosInstance
      .delete(`/games/${gameId}.json`)
      .then(() => {
        dispatch(deleteGame(gameId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deleteGame = (gameId) => {
  return {
    type: actionTypes.DELETE_GAME,
    gameId,
  };
};

export const deleteGameStart = () => {
  return {
    type: actionTypes.DELETE_GAME_START,
  };
};

export const setGames = (games) => {
  return {
    type: actionTypes.SET_GAMES,
    games,
  };
};
