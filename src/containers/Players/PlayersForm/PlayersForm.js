import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
import Context from '../../../context/context';
import Input from '../../../components/Input/Input';
import Utils from '../../../utils/utils';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions';

export class PlayersForm extends Component {
  constructor(props) {
    super(props);

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
        color: {
          value: '#000000',
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

  addPlayerHandler = (e) => {
    e.preventDefault();

    this.context.addPlayer(this.state.form);
    this.setState(this.initialState);
  };

  render() {
    return (
      <form
        className="card p-3 bg-light app-form"
        onSubmit={this.addPlayerHandler}
      >
        <legend>Add Player</legend>
        <div className="col-md-6 form-group">
          <Input
            label="Name"
            name="name"
            type="text"
            validation={this.state.form.name.valid}
            touched={this.state.form.name.touched}
            inputtype="input"
            value={this.state.form.name.value}
            changed={(event) =>
              this.inputChangeHandler(event.target.value, event.target.name)
            }
          />
        </div>
        <div className="col-md-6 form-group">
          <label htmlFor="playerColor">Pick a color</label>
          <TwitterPicker
            color={this.state.form.color.value}
            onChangeComplete={(value) =>
              this.inputChangeHandler(value.hex, 'color')
            }
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button
            disabled={!this.state.isFormValid}
            className="btn btn-success"
            type="submit"
          >
            Add Player
          </button>
        </div>
      </form>
    );
  }
}

export default PlayersForm;
