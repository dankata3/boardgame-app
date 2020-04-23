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
  }

  static contextType = Context;

  validateForm = (form) => {
    let isFormValid = true;

    for (let inputIdentifier in form) {
      const inputField = form[inputIdentifier];
      if (!inputField.validation && !Array.isArray(inputField)) {
        continue;
      }

      if (!Array.isArray(inputField)) {
        isFormValid = inputField.valid.value && isFormValid;
        if (!isFormValid) {
          break;
        }
      } else {
        inputField.map((input) => {
          for (let nestedInput in input) {
            isFormValid = input[nestedInput].valid.value && isFormValid;
          }
        });
        if (!isFormValid) {
          break;
        }
      }
    }
    return isFormValid;
  };

  addPlayerCardHandler = () => {
    const emptyPlayerObj = {
      playerId: {
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
      score: {
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
    };
    const sessionPlayers = [...this.state.form.sessionPlayers];
    const updatedSessionPlayers = sessionPlayers.concat(emptyPlayerObj);
    const updatedForm = {
      ...this.state.form,
      sessionPlayers: updatedSessionPlayers,
    };
    let isFormValid = this.validateForm(updatedForm);

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
    let isFormValid = this.validateForm(updatedForm);

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
    let isFormValid = this.validateForm(updatedForm);

    this.setState({
      form: updatedForm,
      isFormValid,
    });
  };

  sessionPlayersChangeHandler = (value, position, inputIdentifier) => {
    // const updatedFormElement = { ...this.state.form[inputIdentifier] };
    // const stringifiedForm = JSON.stringify(this.state.form);
    // const updatedForm = JSON.parse(stringifiedForm);
    const sessionPlayers = [...this.state.form.sessionPlayers];
    debugger;
    // const updatedPlayerPosition = sessionPlayers[position];
    // updatedPlayerPosition[inputIdentifier].value = value;
    // updatedPlayerPosition[inputIdentifier].touched = true;

    // console.log(updatedPlayerPosition);

    let players = [];
    debugger;
    const updatedSessionPlayers = sessionPlayers.map((player, i) => {
      if (i === position) {
        player[inputIdentifier].value = value;
        player[inputIdentifier].touched = true;
      }
      debugger;
      return player;
    });
    // const updatedSessionPlayers = [
    //   ...sessionPlayers,
    //   (sessionPlayers[position][inputIdentifier]: updatedPlayerItem),
    // ];
    // debugger;
    // updatedPlayerItem.valid = Utils.checkValidity(
    //   value,
    //   updatedPlayerItem.validation,
    //   updatedSessionPlayers
    // );

    const updatedForm = {
      ...this.state.form,
      sessionPlayers: updatedSessionPlayers,
    };
    // let isFormValid = this.validateForm(updatedForm);
    debugger;
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          // form: updatedForm,
          // isFormValid,
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  recordSessionHandler = (e) => {
    e.preventDefault();

    this.context.recordSession(this.state);
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
          selectName={this.sessionPlayersChangeHandler.bind(this)}
          writeScore={this.sessionPlayersChangeHandler.bind(this)}
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
