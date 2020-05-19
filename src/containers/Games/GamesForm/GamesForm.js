import React, { useState, useEffect } from 'react';
import Input from '../../../components/Input/Input';
import {
  validateForm,
  createItemObject,
  inputChangeHandler,
} from '../../../utils/utils';
import Spinner from '../../../components/Spinner/Spinner';

import { connect } from 'react-redux';
import { recordNewGame } from '../../../store/actions/games';

const gamesForm = (props) => {
  const nameState = createItemObject('', ['required', 'min']);
  const bggLinkState = createItemObject('', ['required', 'min']);

  const [name, setName] = useState({ ...nameState });
  const [bggLink, setBggLink] = useState({ ...bggLinkState });
  const [isFormValid, setIsFormValid] = useState(false);

  let initialNameState = { ...nameState };
  let initialBggLinkState = { ...bggLinkState };

  useEffect(() => {
    setIsFormValid(validateForm({ name, bggLink }));
  }, [name, bggLink]);

  const addGameHandler = (e) => {
    e.preventDefault();

    props.addGame({ name, bggLink });
    setName(initialNameState);
    setBggLink(initialBggLinkState);
  };

  let spinner = props.loadingGames ? (
    <div className="backdrop">
      <Spinner />
    </div>
  ) : null;

  return (
    <form
      className="card p-3 bg-light app-form"
      onSubmit={(e) => addGameHandler(e)}
    >
      {spinner}
      <legend>Add Game</legend>
      <div className="col-md-6 form-group">
        <Input
          label="Name"
          name="name"
          type="text"
          inputtype="input"
          validation={name.valid}
          touched={name.touched}
          value={name.value}
          changed={(event) =>
            inputChangeHandler(event.target.value, name, setName)
          }
        />
      </div>
      <div className="col-md-6">
        <Input
          label="Link to BGG"
          name="bggLink"
          type="text"
          inputtype="input"
          validation={bggLink.valid}
          touched={bggLink.touched}
          value={bggLink.value}
          changed={(event) =>
            inputChangeHandler(event.target.value, bggLink, setBggLink)
          }
        />
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button
          disabled={!isFormValid}
          className="btn btn-success"
          type="submit"
        >
          Add Game
        </button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    loadingGames: state.games.loadingGames,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addGame: (game) => dispatch(recordNewGame(game)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(gamesForm);
