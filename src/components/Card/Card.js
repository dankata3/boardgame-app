import React from 'react';

const card = (props) => (
  <li className="list-group-item list-group-item-action d-flex justify-content-between">
    {props.children}
  </li>
);

export default card;
