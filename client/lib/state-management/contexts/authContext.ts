import { createContext, useContext } from 'react';
// import { IUser } from '../../interfaces/IUser';
import { IState } from '../reducers/login-reducer';

// const initialState: IUser = {
//   email: '',
//   password: ''
// };

// export interface IContextStateProps {
//   state?: IState;
// }

export const authStateContext = createContext({} as IState);
export const authDispatchContext = createContext({});

export const useAuth = () => {
  const useAuthStateContext = useContext(authStateContext);
  const useAuthDispatchContext = useContext(authDispatchContext);
  return { useAuthStateContext, useAuthDispatchContext };
};
