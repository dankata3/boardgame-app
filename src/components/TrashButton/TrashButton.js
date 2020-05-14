import React from 'react';
import trashIcon from '../../assets/images/trash-can-icon.png';

const trashButton = (props) => (
  <span className="trash-icon" onClick={props.click}>
    <img src={trashIcon} height="24" alt="Trash icon" />
  </span>
);

export default trashButton;
