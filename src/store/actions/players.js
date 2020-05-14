import axiosInstance from '../../axios-instance';
import * as actionTypes from './actionTypes';

export const recordNewPlayer = (player) => {
  return (dispatch) => {
    dispatch(addPlayerStart());
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

export const addPlayerStart = () => {
  return {
    type: actionTypes.ADD_PLAYER_START,
  };
};

export const removePlayer = (playerId) => {
  return (dispatch) => {
    dispatch(deletePlayerStart());

    axiosInstance
      .delete(`/players/${playerId}.json`)
      .then(() => {
        dispatch(deletePlayer(playerId));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const deletePlayer = (playerId) => {
  return {
    type: actionTypes.DELETE_PLAYER,
    playerId,
  };
};

export const deletePlayerStart = () => {
  return {
    type: actionTypes.DELETE_PLAYER_START,
  };
};

export const setPlayers = (players) => {
  return {
    type: actionTypes.SET_PLAYERS,
    players,
  };
};
