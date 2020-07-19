import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default () => {
  return (
    <div>
      <RegisterForm />
      <br />
      <LoginForm />
    </div>
  );
};
