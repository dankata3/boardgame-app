import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';
import Input from '../../../components/Input/Input';
import {
  validateForm,
  createItemObject,
  inputChangeHandler,
} from '../../../utils/utils';
import Spinner from '../../../components/Spinner/Spinner';

import { connect } from 'react-redux';
import { recordNewPlayer } from '../../../store/actions/players';

const playersForm = (props) => {
  const nameState = createItemObject('', ['required', 'min']);
  const colorState = createItemObject('#000000', []);

  const [name, setName] = useState(nameState);
  const [color, setColor] = useState(colorState);
  const [isFormValid, setIsFormValid] = useState(false);

  let initialNameState = { ...nameState };
  let initialColorState = { ...colorState };

  useEffect(() => {
    setIsFormValid(validateForm({ name, color }));
  }, [name, color]);

  const addPlayerHandler = (e) => {
    e.preventDefault();

    props.addPlayer({ name, color });
    setName(initialNameState);
    setColor(initialColorState);
  };

  let spinner = props.loadingPlayers ? (
    <div className="backdrop">
      <Spinner />
    </div>
  ) : null;

  return (
    <form
      className="card p-3 bg-light app-form"
      onSubmit={(e) => addPlayerHandler(e)}
    >
      {spinner}
      <legend>Add Player</legend>
      <div className="col-md-6 form-group">
        <Input
          label="Name"
          name="name"
          type="text"
          validation={name.valid}
          touched={name.touched}
          inputtype="input"
          value={name.value}
          changed={(event) =>
            inputChangeHandler(event.target.value, name, setName)
          }
        />
      </div>
      <div className="col-md-6 form-group">
        <label htmlFor="playerColor">Pick a color</label>
        <TwitterPicker
          color={color.value}
          onChangeComplete={(value) =>
            inputChangeHandler(value.hex, color, setColor)
          }
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          disabled={!isFormValid}
          className="btn btn-success"
          type="submit"
        >
          Add Player
        </button>
      </div>
    </form>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(playersForm);
