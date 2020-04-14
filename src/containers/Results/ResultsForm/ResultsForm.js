import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Context from '../../../context/context';
import PlayerScoreInputCard from './PlayerScoreInputCard/PlayerScoreInputCard';
import Input from '../../../components/Input/Input';
import Utils from '../../../utils/utils';

class ResultsForm extends Component {
  constructor() {
    super();

    this.state = {
      resultsForm: {
        gameDate: {
          value: Date.now(),
        },
        gameId: {
          value: null,
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        sessionPlayers: [
          {
            id: {
              value: null,
              validation: {
                required: true,
                different: true,
              },
              valid: false,
              touched: false,
              selected: false,
            },
            score: {
              value: null,
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
            },
          },
          {
            id: {
              value: null,
              validation: {
                required: true,
                different: true,
                selected: false,
              },
              valid: false,
              touched: false,
            },
            score: {
              value: null,
              validation: {
                required: true,
              },
              valid: false,
              touched: false,
            },
          },
        ],
      },
      isFormValid: false,
    };

    this.initialState = this.state;
  }

  static contextType = Context;

  addPlayerCardHandler = () => {
    const updatedForm = { ...this.state.resultsForm };
    const sessionPlayers = [...updatedForm.sessionPlayers];
    const emptyPlayerObj = {
      id: {
        value: null,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        selected: false,
      },
      score: {
        value: null,
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
    };
    const updatedSessionPlayers = sessionPlayers.concat(emptyPlayerObj);

    this.setState((prevState) => {
      return {
        ...prevState,
        resultsForm: {
          ...prevState.resultsForm,
          sessionPlayers: updatedSessionPlayers,
        },
      };
    });
  };

  // validateSessionPlayers = (sessionPlayers) => {
  //   let isValid = true;

  //   sessionPlayers.sort((a, b) => (isValid = a.id.value !== b.id.value));

  //   return isValid;
  // };

  deletePlayerCardHandler = (id) => {
    const updatedForm = { ...this.state.resultsForm };
    const sessionPlayers = [...updatedForm.sessionPlayers];
    const updatedSessionPlayers = sessionPlayers.slice(0, id - 1);

    this.setState((prevState) => {
      return {
        ...prevState,
        resultsForm: {
          ...prevState.resultsForm,
          sessionPlayers: updatedSessionPlayers,
        },
      };
    });
  };

  inputChangeHandler = (value, inputIdentifier) => {
    const updatedForm = { ...this.state.resultsForm };
    const updatedFormElement = updatedForm[inputIdentifier];
    updatedFormElement.value = value;

    if (updatedFormElement.validation) {
      updatedFormElement.touched = true;
      updatedFormElement.valid = Utils.checkValidity(
        value,
        updatedFormElement.validation
      );
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        resultsForm: updatedForm,
      };
    });
  };

  playerSelectedHandler = (value, position) => {
    const stringifiedObj = JSON.stringify(this.state.resultsForm);
    const updatedForm = JSON.parse(stringifiedObj);
    const updatedSessionPlayers = [...updatedForm.sessionPlayers];

    updatedSessionPlayers[position].id.value = value;
    updatedSessionPlayers[position].id.touched = true;
    // updatedSessionPlayers[position].id.chosen = true;
    updatedSessionPlayers[position].id.valid = Utils.checkValidity(
      value,
      updatedSessionPlayers[position].id.validation,
      updatedSessionPlayers
    );

    if (!updatedSessionPlayers[position].id.valid) {
      updatedSessionPlayers[position].id.value = null;
      updatedSessionPlayers[position].id.errorMessage = 'Select another player';
    }

    this.setState((prevState) => {
      return {
        ...prevState,
        resultsForm: updatedForm,
      };
    });
  };

  changePlayerScoreHandler = (playerScore, position) => {
    const updatedSessionPlayers = [...this.state.resultsForm.sessionPlayers];

    updatedSessionPlayers[position] = {
      ...updatedSessionPlayers[position],
      score: playerScore,
    };

    this.setState((prevState) => ({
      ...prevState,
      sessionPlayers: updatedSessionPlayers,
    }));
  };

  recordSessionHandler = (e) => {
    e.preventDefault();

    this.context.recordSession(this.state);
    this.setState(this.initialState);
  };

  render() {
    const inputPlayerCards = this.state.resultsForm.sessionPlayers.map(
      (sPlayer, i) => (
        <PlayerScoreInputCard
          key={i}
          index={i + 1}
          players={this.context.players}
          sessionPlayer={sPlayer}
          selectName={this.playerSelectedHandler.bind(this)}
          writeScore={this.changePlayerScoreHandler.bind(this)}
          deletePlayerCard={this.deletePlayerCardHandler.bind(this)}
        />
      )
    );

    return (
      <form
        className="card p-3 bg-light app-form"
        onSubmit={this.recordSessionHandler}
      >
        <legend className="mb-3">Enter Game Results</legend>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="gameDate" className="d-block">
              Date
            </label>
            <DatePicker
              className=""
              selected={this.state.resultsForm.gameDate.value}
              onChange={(value) => this.inputChangeHandler(value, 'gameDate')}
            />
          </div>
          <div className="col-md-6">
            <Input
              label="Game"
              name="gameId"
              type="text"
              invalid={!this.state.resultsForm.gameId.valid}
              touched={this.state.resultsForm.gameId.touched}
              inputtype="select"
              items={this.context.games}
              value={this.state.resultsForm.gameId.value || ''}
              changed={(event) =>
                this.inputChangeHandler(event.target.value, event.target.name)
              }
            />
          </div>
        </div>
        {inputPlayerCards}

        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-info mr-3"
            type="button"
            onClick={this.addPlayerCardHandler}
          >
            + Add Player
          </button>
          <button className="btn btn-success" type="submit">
            Submit Results
          </button>
        </div>
      </form>
    );
  }
}

export default ResultsForm;
