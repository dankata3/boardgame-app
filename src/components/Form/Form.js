import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

const form = (props) => (
  <CSSTransition
    in={props.isFormOpened}
    timeout={300}
    classNames="slide"
    unmountOnExit
  >
    <form className="card p-3 bg-light form" onSubmit={(e) => props.submit(e)}>
      <legend className="mb-3">{props.title}</legend>
      <span className="close-card-btn close" onClick={props.closeForm}>
        &times;
      </span>
      {props.children}
    </form>
  </CSSTransition>
);

export default form;
