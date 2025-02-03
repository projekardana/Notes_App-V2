import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [passwordConfirm, onPasswordConfirmChange] = useInput('');

  const onSubmitEventHandler = (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      alert('Password and confirm password do not match!');
      return;
    }

    register({ name, email, password, passwordConfirm });
  };

  return (
    <form onSubmit={onSubmitEventHandler} className="input-register">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Masukkan Nama"
        value={name}
        onChange={onNameChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Masukkan Email"
        value={email}
        onChange={onEmailChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="Masukkan Password"
        value={password}
        onChange={onPasswordChange}
      />
      <label htmlFor="passwordConfirm">Confirm Password</label>
      <input
        type="password"
        placeholder="Masukkan Ulang Password"
        value={passwordConfirm}
        onChange={onPasswordConfirmChange}
      />
      <button>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
