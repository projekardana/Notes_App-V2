import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ id, title }) {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/"></Link>
        </li>
        <li>
          <Link to="/add"></Link>
        </li>
        <li>
          <Link to="/arsives">Arsip</Link>
        </li>
        <li>
          <Link to={`/detail/${id}`}>
            <span style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>
              {title}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};

export default Navigation;
