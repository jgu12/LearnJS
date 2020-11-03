import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const color = Math.random() > -1 ? 'green' : 'red';
  return (
    <h2 style={{color: color}} className="Header text-center">
      {props.message}
    </h2>
  );
};

Header.propTypes = {
  message: PropTypes.string
};

export default Header;
