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
      form: {
        gameDate: {
          value: Date.now(),
        },
        gameId: {
          value: null,
          validation: {
            required: true,
          },
          valid: {
            value: false,
            error: null,
          },
          touched: false,
        },
        sessionPlayers: [
          {
            playerId: {
              value: null,
              validation: {
                required: true,
                different: true,
              },
              valid: {
                value: false,
                error: null,
              },
              touched: false,
            },
            score: {
              value: null,
              validation: {
                required: true,
                numeric: true,
              },
              valid: {
                value: false,
                error: null,
              },
              touched: false,
            },
          },
          {
            playerId: {
              value: null,
              validation: {
                required: true,
                different: true,
              },
              valid: {
                value: false,
                error: null,
              },
              touched: false,
            },
            score: {
              value: null,
              validation: {
                required: true,
                numeric: true,
              },
              valid: {
                value: false,
                error: null,
              },
              touched: false,
            },
          },
        ],
      },
      isFormValid: false,
    };

    this.initialState = this.state;
    this.selectedPlayers = [];
  }

  static contextType = Context;

  addPlayerCardHandler = () => {
    const emptyPlayerObj = {
      playerId: {
        value: null,
        validation: {
          required: true,
          different: true,
        },
        valid: {
          value: false,
          error: null,
        },
        touched: false,
      },
      score: {
        value: null,
        validation: {
          required: true,
          numeric: true,
        },
        valid: {
          value: false,
          error: null,
        },
        touched: false,
      },
    };
    const sessionPlayers = [...this.state.form.sessionPlayers];
    const updatedSessionPlayers = sessionPlayers.concat(emptyPlayerObj);
    const updatedForm = {
      ...this.state.form,
      sessionPlayers: updatedSessionPlayers,
    };
    let isFormValid = Utils.validateForm(updatedForm);

    this.setState((prevState) => {
      return {
        form: {
          ...prevState.form,
          sessionPlayers: updatedSessionPlayers,
        },
        isFormValid,
      };
    });
  };

  deletePlayerCardHandler = (id) => {
    const sessionPlayers = [...this.state.form.sessionPlayers];
    const updatedSessionPlayers = sessionPlayers.slice(0, id - 1);
    const updatedForm = {
      ...this.state.form,
      sessionPlayers: updatedSessionPlayers,
    };
    let isFormValid = Utils.validateForm(updatedForm);

    this.setState((prevState) => {
      return {
        form: {
          ...prevState.form,
          sessionPlayers: updatedSessionPlayers,
        },
        isFormValid,
      };
    });
  };

  inputChangeHandler = (value, inputIdentifier) => {
    const updatedFormElement = { ...this.state.form[inputIdentifier] };
    updatedFormElement.value = value;

    if (updatedFormElement.validation) {
      updatedFormElement.touched = true;
      updatedFormElement.valid = Utils.checkValidity(
        value,
        updatedFormElement.validation
      );
    }
    const updatedForm = {
      ...this.state.form,
      [inputIdentifier]: updatedFormElement,
    };
    let isFormValid = Utils.validateForm(updatedForm);

    this.setState({
      form: updatedForm,
      isFormValid,
    });
  };

  selectPlayersHandler = async (value, position) => {
    const stringifiedForm = JSON.stringify(this.state.form);
    const form = JSON.parse(stringifiedForm);
    const sessionPlayers = [...form.sessionPlayers];
    const selectedPlayers = this.selectedPlayers;
    let isPlayerSelectedTwice = false;

    const updatedSessionPlayers = sessionPlayers.map((player, i) => {
      if (i === position) {
        if (!selectedPlayers.includes(value)) {
          selectedPlayers.push(value);
        } else {
          isPlayerSelectedTwice = true;
        }

        player.playerId.touched = true;
        player.playerId.valid = Utils.checkValidity(
          value,
          player.playerId.validation,
          isPlayerSelectedTwice
        );

        if (player.playerId.valid.value) {
          player.playerId.value = value;
        } else {
          player.playerId.value = null;
          selectedPlayers.splice(position, 1);
        }
      }
      return player;
    });

    const updatedForm = {
      ...this.state.form,
      sessionPlayers: updatedSessionPlayers,
    };
    let isFormValid = Utils.validateForm(updatedForm);

    this.setState({
      form: updatedForm,
      isFormValid,
    });
  };

  playersScoresHandler = async (value, position) => {
    const stringifiedForm = JSON.stringify(this.state.form);
    const form = JSON.parse(stringifiedForm);
    const sessionPlayers = [...form.sessionPlayers];

    const updatedSessionPlayers = sessionPlayers.map((player, i) => {
      if (i === position) {
        player.score.touched = true;
        player.score.valid = Utils.checkValidity(
          value,
          player.score.validation
        );
        if (player.score.valid.value) {
          player.score.value = value;
        } else {
          player.score.value = null;
        }
      }
      return player;
    });

    const updatedForm = {
      ...this.state.form,
      sessionPlayers: updatedSessionPlayers,
    };
    let isFormValid = Utils.validateForm(updatedForm);

    this.setState(
      {
        form: updatedForm,
        isFormValid,
      },
      () => {
        console.log(this.state);
      }
    );
  };

  recordSessionHandler = (e) => {
    e.preventDefault();

    this.context.recordSession(this.state.form);
    this.setState(this.initialState);
  };

  render() {
    const isAddPlayerBtnDisabled =
      this.state.form.sessionPlayers.length >= this.context.maxPlayers;

    const inputPlayerCards = this.state.form.sessionPlayers.map(
      (sPlayer, i) => (
        <PlayerScoreInputCard
          key={i}
          index={i + 1}
          players={this.context.players}
          sessionPlayer={sPlayer}
          selectName={this.selectPlayersHandler.bind(this)}
          writeScore={this.playersScoresHandler.bind(this)}
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
              selected={this.state.form.gameDate.value}
              onChange={(value) => this.inputChangeHandler(value, 'gameDate')}
            />
          </div>
          <div className="col-md-6">
            <Input
              label="Game"
              name="gameId"
              type="text"
              validation={this.state.form.gameId.valid}
              touched={this.state.form.gameId.touched}
              inputtype="select"
              items={this.context.games}
              value={this.state.form.gameId.value || ''}
              changed={(event) =>
                this.inputChangeHandler(event.target.value, event.target.name)
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
            onClick={this.addPlayerCardHandler}
          >
            + Add Player
          </button>
          <button
            disabled={!this.state.isFormValid}
            className="btn btn-success"
            type="submit"
          >
            Submit Results
          </button>
        </div>
      </form>
    );
  }
}

export default ResultsForm;
