import React, { Component } from 'react';
import Context from '../../../context/context';
import Input from '../../../components/Input/Input';
import Utils from '../../../utils/utils';

export class GamesForm extends Component {
  constructor() {
    super();

    this.state = {
      gamesForm: {
        name: {
          value: '',
          validation: {
            required: true,
            min: true,
          },
          valid: false,
          touched: false,
        },
        bggLink: {
          value: '',
          validation: {
            required: true,
            min: true,
          },
          valid: false,
          touched: false,
        },
      },
      isFormValid: false,
    };
  }
  static contextType = Context;

  inputChangeHandler = (value, inputIdentifier) => {
    const updatedGamesForm = { ...this.state.gamesForm };
    const updatedFormElement = { ...updatedGamesForm[inputIdentifier] };
    updatedFormElement.touched = true;
    updatedFormElement.value = value;
    updatedFormElement.valid = Utils.checkValidity(
      value,
      updatedFormElement.validation
    );
    let isFormValid = true;

    for (let inputIdentifier in updatedGamesForm) {
      isFormValid = updatedGamesForm[inputIdentifier].valid && isFormValid;
    }
    this.setState({
      [inputIdentifier]: updatedFormElement,
      isFormValid,
    });
  };

  // writeNameHandler = (e) => {
  //   this.setState({
  //     name: e.target.value,
  //   });
  // };

  // writeBggLinkHandler = (e) => {
  //   this.setState({
  //     bggLink: e.target.value,
  //   });
  // };

  addGameHandler = (e) => {
    e.preventDefault();

    this.context.addGame(this.state);
  };

  render() {
    return (
      <form
        className="card p-3 bg-light app-form"
        onSubmit={this.addGameHandler}
      >
        <legend>Add Game</legend>
        <div className="col-md-6 form-group">
          <Input
            label="Name"
            name="name"
            type="text"
            inputtype="input"
            invalid={!this.state.gamesForm.name.valid}
            touched={this.state.gamesForm.name.touched}
            value={this.state.gamesForm.name.value}
            changed={(event) =>
              this.inputChangeHandler(event.target.value, event.target.name)
            }
          />
        </div>
        <div className="col-md-6">
          <Input
            label="Link to BGG"
            name="bggLink"
            type="text"
            inputtype="input"
            invalid={!this.state.gamesForm.bggLink.valid}
            touched={this.state.gamesForm.bggLink.touched}
            value={this.state.gamesForm.bggLink.value}
            changed={(event) =>
              this.inputChangeHandler(event.target.value, event.target.name)
            }
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            disabled={!this.state.isFormValid}
            className="btn btn-success"
            type="submit"
          >
            Add Game
          </button>
        </div>
      </form>
    );
  }
}

export default GamesForm;
