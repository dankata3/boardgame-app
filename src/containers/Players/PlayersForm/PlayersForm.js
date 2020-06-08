import React, { useState, useEffect } from 'react';
import { TwitterPicker } from 'react-color';
import Input from '../../../components/Input/Input';
import Form from '../../../components/Form/Form';
import {
  validateForm,
  createItemObject,
  inputChangeHandler,
} from '../../../utils/utils';
import Spinner from '../../../components/Spinner/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import { recordNewPlayer } from '../../../store/actions/players';

const playersForm = (props) => {
  const nameState = createItemObject('', ['required', 'min']);
  const colorState = createItemObject('#000000', []);

  const [name, setName] = useState(nameState);
  const [color, setColor] = useState(colorState);
  const [isFormValid, setIsFormValid] = useState(false);

  const initialNameState = { ...nameState };
  const initialColorState = { ...colorState };

  const dispatch = useDispatch();
  const addPlayer = (player) => dispatch(recordNewPlayer(player));

  const loadingPlayers = useSelector((state) => {
    return state.players.loadingPlayers;
  });

  useEffect(() => {
    setIsFormValid(validateForm({ name, color }));
  }, [name, color]);

  const resetForm = () => {
    setName(initialNameState);
    setColor(initialColorState);
  };

  const addPlayerHandler = (e) => {
    e.preventDefault();

    addPlayer({ name, color });
    closeFormHandler();
  };

  const closeFormHandler = () => {
    resetForm();
    props.closeForm();
  };

  let spinner = loadingPlayers ? (
    <div className="backdrop">
      <Spinner />
    </div>
  ) : null;

  return (
    <Form
      title="Add Player"
      submit={addPlayerHandler}
      closeForm={closeFormHandler}
      isFormOpened={props.isFormOpened}
    >
      {spinner}
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
    </Form>
  );
};

export default playersForm;
