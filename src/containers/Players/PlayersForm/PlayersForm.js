import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
import Input from '../../../components/Input/Input';
import { checkValidity, validateForm } from '../../../utils/utils';
import Spinner from '../../../components/Spinner/Spinner';

import { connect } from 'react-redux';
import { recordNewPlayer } from '../../../store/actions/players';

class PlayersForm extends Component {
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
        color: {
          value: '#000000',
        },
      },
      isFormValid: false,
    };
    this.initialState = this.state;
  }

  inputChangeHandler = (value, inputIdentifier) => {
    const updatedForm = { ...this.state.form };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    let isFormValid = false;

    updatedFormElement.touched = true;
    updatedFormElement.value = value;

    if (updatedFormElement.validation) {
      updatedFormElement.valid = checkValidity(
        value,
        updatedFormElement.validation
      );
    }
    updatedForm[inputIdentifier] = updatedFormElement;
    isFormValid = validateForm(updatedForm);

    this.setState({
      form: updatedForm,
      isFormValid,
    });
  };

  addPlayerHandler = (e) => {
    e.preventDefault();

    this.props.addPlayer(this.state.form);
    this.setState(this.initialState);
  };

  render() {
    let spinner = this.props.loadingPlayers ? (
      <div className="backdrop">
        <Spinner />
      </div>
    ) : null;
    return (
      <form
        className="card p-3 bg-light app-form"
        onSubmit={(e) => this.addPlayerHandler(e)}
      >
        {spinner}
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

const mapStateToProps = (state) => {
  return {
    loadingPlayers: state.players.loadingPlayers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlayer: (player) => dispatch(recordNewPlayer(player)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayersForm);
