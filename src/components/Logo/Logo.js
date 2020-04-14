import React from 'react';
import { Link } from 'react-router-dom';
import tableLogo from '../../assets/images/logo.png';

const logo = props => (
  <Link to="/">
    <img src={tableLogo} height="70" alt="Table Logo" />
  </Link>
);

export default logo;
