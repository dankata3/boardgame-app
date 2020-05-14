import * as actionTypes from '../../store/actions/actionTypes';

const initialState = {
  games: [],
  loadingGames: false,
};

const reducer = (state = initialState, action) => {
  let games;
  switch (action.type) {
    case actionTypes.SET_GAMES:
      return {
        ...state,
        games: action.games,
      };
    case actionTypes.ADD_GAME:
      games = state.games.concat(action.game);
      return {
        games,
        loadingGames: false,
      };
    case actionTypes.ADD_GAME_START:
      return {
        ...state,
        loadingGames: true,
      };
    case actionTypes.DELETE_GAME:
      games = state.games.filter((player) => player.id !== action.gameId);
      return {
        games,
        loadingGames: false,
      };

    case actionTypes.DELETE_GAME_START:
      return {
        ...state,
        loadingGames: true,
      };

    default:
      return state;
  }
};

export default reducer;
