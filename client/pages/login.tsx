import React from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useRouter } from 'next/router';
import Router from 'next/router';

export default (props: any) => {
  const router = useRouter();
  console.log('login page isServer', props);
  // console.log('login page props', pageProps);
  console.log('login.tsx -- router.::', router);
  console.log('Router::', Router);

  // if (isServer == false) {
  //   console.log('login window:::', window);
  // }

  return (
    <div>
      {/* {isServer === false ? <p>isServer: bah!</p> : <p> fish</p>} */}
      <LoginForm />
      <br />
      <RegisterForm />
    </div>
  );
};
