import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmitEventHandler = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onSubmitEventHandler} className="input-login">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        placeholder="Silakan Masukkan Email Anda"
        value={email}
        onChange={onEmailChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Silakan Masukkan Password Anda"
        value={password}
        onChange={onPasswordChange}
      />
      <button>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
