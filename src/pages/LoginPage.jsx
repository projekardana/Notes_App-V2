import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { LocaleConsumer } from '../context/LocaleContext';
import { MdGTranslate } from 'react-icons/md';
import { login } from '../utils/api';

function LoginPage({ loginSuccess }) {
  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });

    if (error) {
      loginSuccess(data);
    } else {
      console.error('Login failed: ', data);
    }
  };

  return (
    <LocaleConsumer>
      {({ locale, toggleLocale }) => (
        <section>
          <h2>
            {locale === 'id'
              ? 'Yuk, login untuk melanjutkan aplikasi.'
              : 'Login to use app, please.'}
          </h2>
          <LoginInput login={onLogin} />
          <p>
            {locale === 'id' ? 'Belum Punya Akun' : "Don't have an account?"}{' '}
            <Link to="/register">
              {locale === 'id' ? 'Daftar disini.' : 'Register here'}
            </Link>
          </p>
        </section>
      )}
    </LocaleConsumer>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
