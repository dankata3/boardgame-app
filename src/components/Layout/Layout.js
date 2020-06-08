import React, { Fragment } from 'react';
import Header from '../Header/Header';

const layout = (props) => (
  <Fragment>
    <Header />
    <div className="container main-container position-relative">
      {props.children}
    </div>
  </Fragment>
);

export default layout;
