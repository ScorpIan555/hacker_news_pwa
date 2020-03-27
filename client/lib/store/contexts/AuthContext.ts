import { createContext, useContext } from 'react';
import { IState } from '../../typescript/interfaces';
import { Dispatch } from '../../typescript/types';

export const AuthStateContext = createContext({} as IState);
export const AuthDispatchContext = createContext({} as Dispatch);

export const useAuthState = () => {
  const authStateContext = useContext(AuthStateContext);

  if (authStateContext === undefined) {
    // s/b changed to authStateContext
    throw new Error('useAuthState must be used within a Provider');
  }
  return { authStateContext };
};

export const useAuthDispatch = () => {
  const authDispatchContext = useContext(AuthDispatchContext);
  if (authDispatchContext === undefined) {
    throw new Error('useAuthDispatch must be used within a Provider');
  }
  return authDispatchContext;
};
