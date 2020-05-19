import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PlayerScoreInputCard from './PlayerScoreInputCard/PlayerScoreInputCard';
import Input from '../../../components/Input/Input';
import Spinner from '../../../components/Spinner/Spinner';
import {
  checkValidity,
  validateForm,
  createItemObject,
  inputChangeHandler,
} from '../../../utils/utils';

import { connect } from 'react-redux';
import { recordNewSession } from '../../../store/actions/results';

const resultsForm = (props) => {
  // this.state = {
  //   form: {
  //     gameDate: {
  //       value: Date.now(),
  //     },
  //     gameId: {
  //       value: null,
  //       validation: {
  //         required: true,
  //       },
  //       valid: {
  //         value: false,
  //         error: null,
  //       },
  //       touched: false,
  //     },
  //     sessionPlayers: [
  //       {
  //         playerId: {
  //           value: null,
  //           validation: {
  //             required: true,
  //             different: true,
  //           },
  //           valid: {
  //             value: false,
  //             error: null,
  //           },
  //           touched: false,
  //         },
  //         score: {
  //           value: null,
  //           validation: {
  //             required: true,
  //             numeric: true,
  //           },
  //           valid: {
  //             value: false,
  //             error: null,
  //           },
  //           touched: false,
  //         },
  //       },
  //       {
  //         playerId: {
  //           value: null,
  //           validation: {
  //             required: true,
  //             different: true,
  //           },
  //           valid: {
  //             value: false,
  //             error: null,
  //           },
  //           touched: false,
  //         },
  //         score: {
  //           value: null,
  //           validation: {
  //             required: true,
  //             numeric: true,
  //           },
  //           valid: {
  //             value: false,
  //             error: null,
  //           },
  //           touched: false,
  //         },
  //       },
  //     ],
  //   },
  //   isFormValid: false,

  // this.initialState = this.state;
  const initialPlayersNumber = 2;
  const emptyPlayerObject = {
    playerId: createItemObject('', ['required', 'different']),
    score: createItemObject('', ['required', 'numeric']),
  };

  const setSessionPlayersState = (playersNumber) => {
    return Array(playersNumber)
      .fill()
      .map((_, i) => {
        return { ...emptyPlayerObject };
      });
  };

  const gameDateState = createItemObject(Date.now(), []);
  const gameIdState = createItemObject('', ['required']);
  const sessionPlayersState = setSessionPlayersState(initialPlayersNumber);

  const [gameDate, setGameDate] = useState({ ...gameDateState });
  const [gameId, setGameId] = useState({ ...gameIdState });
  const [sessionPlayers, setSessionPlayers] = useState([
    ...sessionPlayersState,
  ]);
  const [isFormValid, setIsFormValid] = useState(false);

  debugger;

  let selectedPlayers = [];

  useEffect(() => {
    console.log('validate', sessionPlayers);
    setIsFormValid(validateForm({ gameDate, gameId, sessionPlayers }));
  }, [gameDate, gameId, sessionPlayers]);

  const addPlayerCardHandler = () => {
    const updatedSessionPlayers = sessionPlayers.concat(emptyPlayerObject);
    setSessionPlayers(updatedSessionPlayers);
  };

  const deletePlayerCardHandler = (id) => {
    const updatedSessionPlayers = sessionPlayers.slice(0, id - 1);
    setSessionPlayers(updatedSessionPlayers);
  };

  // const inputChangeHandler = (value, inputIdentifier) => {
  //   // const updatedFormElement = { ...this.state.form[inputIdentifier] };
  //   // updatedFormElement.value = value;
  //   // if (updatedFormElement.validation) {
  //   //   updatedFormElement.touched = true;
  //   //   updatedFormElement.valid = checkValidity(
  //   //     value,
  //   //     updatedFormElement.validation
  //   //   );
  //   // }
  //   // const updatedForm = {
  //   //   ...this.state.form,
  //   //   [inputIdentifier]: updatedFormElement,
  //   // };
  //   // let isFormValid = validateForm(updatedForm);
  //   // this.setState({
  //   //   form: updatedForm,
  //   //   isFormValid,
  //   // });
  // };

  const selectPlayersHandler = async (value, position) => {
    // const stringifiedForm = JSON.stringify(this.state.form);
    // const form = JSON.parse(stringifiedForm);
    // const sessionPlayers = [...form.sessionPlayers];
    // const selectedPlayers = selectedPlayers;
    // let isPlayerSelectedTwice = false;
    // const updatedSessionPlayers = sessionPlayers.map((player, i) => {
    //   if (i === position) {
    //     if (!selectedPlayers.includes(value)) {
    //       selectedPlayers.push(value);
    //     } else {
    //       isPlayerSelectedTwice = true;
    //     }
    //     player.playerId.touched = true;
    //     player.playerId.valid = checkValidity(
    //       value,
    //       player.playerId.validation,
    //       isPlayerSelectedTwice
    //     );
    //     if (player.playerId.valid.value) {
    //       player.playerId.value = value;
    //     } else {
    //       player.playerId.value = null;
    //       selectedPlayers.splice(position, 1);
    //     }
    //   }
    //   return player;
    // });
    // const updatedForm = {
    //   ...this.state.form,
    //   sessionPlayers: updatedSessionPlayers,
    // };
    // let isFormValid = validateForm(updatedForm);
    // this.setState({
    //   form: updatedForm,
    //   isFormValid,
    // });
  };

  const playersScoresHandler = async (value, position) => {
    // const stringifiedForm = JSON.stringify(this.state.form);
    // const form = JSON.parse(stringifiedForm);
    // const sessionPlayers = [...form.sessionPlayers];
    // const updatedSessionPlayers = sessionPlayers.map((player, i) => {
    //   if (i === position) {
    //     player.score.touched = true;
    //     player.score.valid = checkValidity(value, player.score.validation);
    //     if (player.score.valid.value) {
    //       player.score.value = value;
    //     } else {
    //       player.score.value = null;
    //     }
    //   }
    //   return player;
    // });
    // const updatedForm = {
    //   ...this.state.form,
    //   sessionPlayers: updatedSessionPlayers,
    // };
    // let isFormValid = validateForm(updatedForm);
    // this.setState({
    //   form: updatedForm,
    //   isFormValid,
    // });
  };

  const recordSessionHandler = (e) => {
    e.preventDefault();

    props.addGameSession({ gameDate, gameId, sessionPlayers });
    // selectedPlayers = [];
    // setState(initialState);
  };

  const isAddPlayerBtnDisabled = sessionPlayers.length >= props.maxPlayers;

  const inputPlayerCards = sessionPlayers.map((sPlayer, i) => (
    <PlayerScoreInputCard
      key={i}
      index={i + 1}
      players={props.players}
      sessionPlayer={sPlayer}
      selectName={selectPlayersHandler.bind(this)}
      writeScore={playersScoresHandler.bind(this)}
      deletePlayerCard={deletePlayerCardHandler.bind(this)}
    />
  ));

  let spinner = props.recordingSession ? (
    <div className="backdrop">
      <Spinner />
    </div>
  ) : null;

  return (
    <form
      className="card p-3 bg-light app-form"
      onSubmit={recordSessionHandler}
    >
      {spinner}
      <legend className="mb-3">Enter Game Results</legend>
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
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    maxPlayers: state.players.maxPlayers,
    recordingSession: state.gameSessions.recordingSession,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addGameSession: (gamesSession) => dispatch(recordNewSession(gamesSession)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(resultsForm);
