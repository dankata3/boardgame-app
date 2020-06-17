import React, { useState, useEffect, useMemo, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PlayerScoreInputCard from './PlayerScoreInputCard/PlayerScoreInputCard';
import Input from '../../../components/Input/Input';
import Form from '../../../components/Form/Form';
import Spinner from '../../../components/Spinner/Spinner';
import {
  checkValidity,
  validateForm,
  createItemObject,
  inputChangeHandler,
} from '../../../utils/utils';

import { useDispatch, useSelector } from 'react-redux';
import { recordNewSession } from '../../../store/actions/results';

const resultsForm = (props) => {
  const initialPlayersNumber = 2;
  const emptyPlayerObject = {
    playerId: createItemObject('', ['required', 'different']),
    score: createItemObject('', ['required', 'numeric']),
  };

  const setSessionPlayersState = (playersNumber) => {
    return Array(playersNumber)
      .fill()
      .map((_, i) => {
        return emptyPlayerObject;
      });
  };
  const stringifiedSessionPlayersState = JSON.stringify(
    setSessionPlayersState(initialPlayersNumber)
  );
  const sessionPlayersState = JSON.parse(stringifiedSessionPlayersState);

  const initialGameDateState = createItemObject(Date.now(), []);
  const initialGameIdState = createItemObject('', ['required']);

  const [gameDate, setGameDate] = useState({ ...initialGameDateState });
  const [gameId, setGameId] = useState({ ...initialGameIdState });
  const [sessionPlayers, setSessionPlayers] = useState([
    ...sessionPlayersState,
  ]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const dispatch = useDispatch();
  const addGameSession = (gamesSession) =>
    dispatch(recordNewSession(gamesSession));

  const maxPlayers = useSelector((state) => {
    return state.players.maxPlayers;
  });
  const recordingSession = useSelector((state) => {
    return state.gameSessions.recordingSession;
  });

  useEffect(() => {
    setIsFormValid(validateForm({ gameDate, gameId, sessionPlayers }));
  }, [gameDate, gameId, sessionPlayers]);

  const resetForm = () => {
    setGameDate(initialGameDateState);
    setGameId(initialGameIdState);
    setSessionPlayers(sessionPlayersState);
  };

  const closeFormHandler = () => {
    resetForm();
    props.closeForm();
  };

  const addPlayerCardHandler = () => {
    const updatedSessionPlayers = sessionPlayers.concat(emptyPlayerObject);
    setSessionPlayers(updatedSessionPlayers);
  };

  const deletePlayerCardHandler = (id) => {
    const updatedSessionPlayers = sessionPlayers.slice(0, id - 1);
    setSessionPlayers(updatedSessionPlayers);
  };

  const selectPlayersHandler = (value, position) => {
    let isPlayerSelectedTwice = false;
    const newSessionPlayers = [...sessionPlayers];
    const updatedSessionPlayers = newSessionPlayers.map((player, i) => {
      if (i === position) {
        if (selectedPlayers.includes(value)) {
          isPlayerSelectedTwice = true;
        } else {
          setSelectedPlayers((prevState) => prevState.concat(value));
        }
        player.playerId.touched = true;
        player.playerId.valid = checkValidity(
          value,
          player.playerId.validation,
          isPlayerSelectedTwice
        );
        if (player.playerId.valid.value) {
          player.playerId.value = value;
        } else {
          player.playerId.value = null;
          setSelectedPlayers((prevState) => prevState.splice(position, 1));
        }
      }
      return player;
    });
    setSessionPlayers(updatedSessionPlayers);
  };

  const playersScoresHandler = (value, position) => {
    const newSessionPlayers = [...sessionPlayers];
    const updatedSessionPlayers = newSessionPlayers.map((player, i) => {
      if (i === position) {
        player.score.touched = true;
        player.score.valid = checkValidity(value, player.score.validation);
        if (player.score.valid.value) {
          player.score.value = value;
        } else {
          player.score.value = null;
        }
      }
      return player;
    });
    setSessionPlayers(updatedSessionPlayers);
  };

  const recordSessionHandler = (e) => {
    e.preventDefault();

    addGameSession({ gameDate, gameId, sessionPlayers });
    closeFormHandler();
  };

  const isAddPlayerBtnDisabled = sessionPlayers.length >= maxPlayers;

  const inputPlayerCards = useMemo(
    () =>
      sessionPlayers.map((sPlayer, i) => (
        <PlayerScoreInputCard
          key={i}
          index={i + 1}
          players={props.players}
          sessionPlayer={sPlayer}
          selectName={selectPlayersHandler.bind(this)}
          writeScore={playersScoresHandler.bind(this)}
          deletePlayerCard={deletePlayerCardHandler.bind(this)}
        />
      )),
    [props.players, sessionPlayers]
  );

  let spinner = recordingSession ? (
    <div className="backdrop">
      <Spinner />
    </div>
  ) : null;

  return (
    <Form
      title="Add Result"
      submit={recordSessionHandler}
      closeForm={closeFormHandler}
      isFormOpened={props.isFormOpened}
    >
      {spinner}
      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="gameDate" className="d-block">
            Date
          </label>
          <DatePicker
            className=""
            selected={gameDate.value}
            onChange={(value) =>
              inputChangeHandler(value, gameDate, setGameDate)
            }
          />
        </div>
        <div className="col-md-6">
          <Input
            label="Game"
            name="gameId"
            type="text"
            validation={gameId.valid}
            touched={gameId.touched}
            inputtype="select"
            items={props.games}
            value={gameId.value || ''}
            changed={(event) =>
              inputChangeHandler(event.target.value, gameId, setGameId)
            }
          />
        </div>
      </div>
      {inputPlayerCards}

      <div className="d-flex justify-content-center mt-3">
        <button
          disabled={isAddPlayerBtnDisabled}
          className="btn btn-info mr-3"
          type="button"
          onClick={addPlayerCardHandler}
        >
          + Add Player
        </button>
        <button
          disabled={!isFormValid}
          className="btn btn-success"
          type="submit"
        >
          Submit Results
        </button>
      </div>
    </Form>
  );
};

export default React.memo(resultsForm);
