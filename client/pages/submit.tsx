import React from 'react';
import SubmitLinkForm from '../components/SubmitLinkForm';
import { useAuthState } from '../lib/store/contexts';
import { NotLoggedIn } from '../components/NotLoggedIn';

/* 
  redirect unauthenticated users to the login page
*/

export default () => {
  const { authStateContext } = useAuthState();
  console.log('authState::', authStateContext);

  if (authStateContext.isLoggedIn) {
    return (
      <div>
        <SubmitLinkForm />
      </div>
    );
  } else {
    return <NotLoggedIn />;
  }
};
