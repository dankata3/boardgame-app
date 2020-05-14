import * as actionTypes from '../../store/actions/actionTypes';

const initialState = {
  players: [],
  maxPlayers: 4,
  loadingPlayers: false,
};

const reducer = (state = initialState, action) => {
  let players;
  switch (action.type) {
    case actionTypes.SET_PLAYERS:
      return {
        ...state,
        players: action.players,
      };
    case actionTypes.ADD_PLAYER:
      players = state.players.concat(action.player);
      return {
        ...state,
        players,
        loadingPlayers: false,
      };

    case actionTypes.ADD_PLAYER_START:
      return {
        ...state,
        loadingPlayers: true,
      };
    case actionTypes.DELETE_PLAYER:
      players = state.players.filter((player) => player.id !== action.playerId);
      return {
        players,
        loadingPlayers: false,
      };
    case actionTypes.DELETE_PLAYER_START:
      return {
        ...state,
        loadingPlayers: true,
      };

    default:
      return state;
  }
};

export default reducer;
