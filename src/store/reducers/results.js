import * as actionTypes from '../actions/actionTypes';

const initialState = {
  gameSessions: [],
  loadingSessions: false,
  recordingSession: false,
};

const reducer = (state = initialState, action) => {
  let gameSessions;

  switch (action.type) {
    case actionTypes.FETCH_DATA_START:
      return {
        ...state,
        loadingSessions: true,
      };
    case actionTypes.SET_GAME_SESSIONS:
      return {
        ...state,
        gameSessions: action.gameSessions,
        loadingSessions: false,
      };
    case actionTypes.ADD_GAME_SESSION:
      gameSessions = state.gameSessions.concat(action.gameSession);
      return {
        ...state,
        gameSessions,
        recordingSession: false,
      };
    case actionTypes.ADD_GAME_SESSION_START:
      return {
        ...state,
        recordingSession: true,
      };
    case actionTypes.DELETE_GAME_SESSION:
      gameSessions = state.gameSessions.filter(
        (session) => session.sessionId !== action.sessionId
      );
      return {
        ...state,
        gameSessions,
        loadingSessions: false,
      };
    case actionTypes.DELETE_GAME_SESSION_START:
      return {
        ...state,
        loadingSessions: true,
      };

    default:
      return state;
  }
};

export default reducer;
