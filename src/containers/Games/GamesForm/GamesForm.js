import React, { Component } from 'react';
import Context from '../../../context/context';
import Input from '../../../components/Input/Input';
import Utils from '../../../utils/utils';

export class GameForm extends Component {
  constructor() {
    super();

    this.state = {
      form: {
        name: {
          value: '',
          validation: {
            required: true,
            min: true,
          },
          valid: {
            value: false,
            error: null,
          },
          touched: false,
        },
        bggLink: {
          value: '',
          validation: {
            required: true,
            min: true,
          },
          valid: {
            value: false,
            error: null,
          },
          touched: false,
        },
      },
      isFormValid: false,
    };
    this.initialState = this.state;
  }
  static contextType = Context;

  inputChangeHandler = (value, inputIdentifier) => {
    const updatedForm = { ...this.state.form };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    let isFormValid = false;

    updatedFormElement.touched = true;
    updatedFormElement.value = value;

    if (updatedFormElement.validation) {
      updatedFormElement.valid = Utils.checkValidity(
        value,
        updatedFormElement.validation
      );
    }
    updatedForm[inputIdentifier] = updatedFormElement;
    isFormValid = Utils.validateForm(updatedForm);

    this.setState({
      form: updatedForm,
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

    this.context.addGame(this.state.form);
    this.setState(this.initialState);
  };

  render() {
    return (
      <form
        className="card p-3 bg-light app-form"
        onSubmit={(e) => this.addGameHandler(e)}
      >
        <legend>Add Game</legend>
        <div className="col-md-6 form-group">
          <Input
            label="Name"
            name="name"
            type="text"
            inputtype="input"
            validation={this.state.form.name.valid}
            touched={this.state.form.name.touched}
            value={this.state.form.name.value}
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
            validation={this.state.form.bggLink.valid}
            touched={this.state.form.bggLink.touched}
            value={this.state.form.bggLink.value}
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

export default GameForm;
