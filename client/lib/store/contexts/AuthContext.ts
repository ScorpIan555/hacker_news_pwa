import { createContext, useContext } from 'react';
import { IState, Dispatch } from '../../typescript';

export const AuthStateContext = createContext({} as IState);
export const AuthDispatchContext = createContext({} as Dispatch);

export const useAuthState = () => {
  const useAuthStateContext = useContext(AuthStateContext);

  if (useAuthStateContext === undefined) {
    throw new Error('useAuthState must be used within a Provider');
  }
  return { useAuthStateContext };
};

export const useAuthDispatch = () => {
  const useAuthDispatchContext = useContext(AuthDispatchContext);
  if (useAuthDispatchContext === undefined) {
    throw new Error('useAuthDispatch must be used within a Provider');
  }
  return useAuthDispatchContext;
};
