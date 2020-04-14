import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';
import Context from '../../../context/context';
import Input from '../../../components/Input/Input';
import Utils from '../../../utils/utils';

export class PlayersForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playersForm: {
        name: {
          value: '',
          validation: {
            required: true,
            min: true,
          },
          valid: false,
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
    const updatedFormElement = { ...this.state[inputIdentifier] };
    updatedFormElement.touched = true;
    updatedFormElement.value = value;
    updatedFormElement.valid = Utils.checkValidity(
      value,
      updatedFormElement.validation
    );

    this.setState({
      [inputIdentifier]: updatedFormElement,
    });
  };

  pickColorHandler = (colorObj) => {
    const color = colorObj.hex;
    const updatedColor = { ...this.state.color };
    updatedColor.value = color;

    this.setState({
      color: updatedColor,
    });
  };

  addPlayerHandler = (e) => {
    e.preventDefault();

    this.context.addPlayer(this.state);
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
            invalid={!this.state.playersForm.name.valid}
            touched={this.state.playersForm.name.touched}
            inputtype="input"
            value={this.state.playersForm.name.value}
            changed={(event) =>
              this.inputChangeHandler(event.target.value, event.target.name)
            }
          />
        </div>
        <div className="col-md-6 form-group">
          <label htmlFor="playerColor">Pick a color</label>
          <TwitterPicker
            color={this.state.playersForm.color.value}
            onChangeComplete={this.pickColorHandler}
          />
        </div>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-success" type="submit">
            Add Player
          </button>
        </div>
      </form>
    );
  }
}

export default PlayersForm;
