import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { register } from '../utils/api';
import { LocaleConsumer } from '../context/LocaleContext';

function RegisterPage() {
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    const { error } = await register(user);

    if (!error) {
      navigate('/*');
    }
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <section>
          <h2>
            {locale === 'id'
              ? 'Isi form untuk mendaftarkan akun.'
              : 'Fill the form to register account.'}
          </h2>
          <RegisterInput register={onRegisterHandler} />
          <p>
            {locale === 'id'
              ? 'Sudah Punya Akun ?'
              : 'Already have an account?'}
            <Link to="/*">
              {locale === 'id' ? 'Login disini' : 'Login here'}
            </Link>
          </p>
        </section>
      )}
    </LocaleConsumer>
  );
}

export default RegisterPage;
