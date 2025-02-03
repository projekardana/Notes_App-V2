import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GrLogout } from 'react-icons/gr';
import { LocaleConsumer } from '../context/LocaleContext';

function Navigation({ id, title, logout, name }) {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <nav className="navigation">
            <ul>
              <li>
                <Link to="/arsives">
                  {locale === 'id' ? 'Terarsip' : 'Archived'}
                </Link>
              </li>
              <li>
                <Link to="/"></Link>
              </li>
              <li>
                <Link to="/add"></Link>
              </li>
              <li>
                <Link to={`/detail/${id}`}>
                  <span style={{ fontSize: 'xx-large', fontWeight: 'bold' }}>
                    {title}
                  </span>
                </Link>
              </li>
              <li>
                <button
                  className="button-logout"
                  type="button"
                  onClick={logout}
                >
                  <GrLogout />
                  {name}
                </button>
              </li>
            </ul>
          </nav>
        );
      }}
    </LocaleConsumer>
  );
}

Navigation.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
