import { createContext, useContext } from 'react';
import { IState, Dispatch } from '../../typescript';

// const initialState: IUser = {
//   email: '',
//   password: ''
// };

// export interface IContextStateProps {
//   state?: IState;
// }

export const authStateContext = createContext({} as IState);
export const authDispatchContext = createContext({} as Dispatch);

export const useAuthState = () => {
  const useAuthStateContext = useContext(authStateContext);
  if (useAuthStateContext === undefined) {
    throw new Error('useAuthState must be used within a Provider');
  }
  return { useAuthStateContext };
};

export const useAuthDispatch = () => {
  const useAuthDispatchContext = useContext(authDispatchContext);
  if (useAuthDispatchContext === undefined) {
    throw new Error('useAuthDispatch must be used within a Provider');
  }
  return useAuthDispatchContext;
};
