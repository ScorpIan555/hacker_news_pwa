// import { useReducer } from 'react';
import {
  // useAuth,
  authStateContext,
  authDispatchContext
  // authContextDispatch
} from '../contexts/authContext';
import {
  // loginReducer,
  IState,
  curriedLoginReducer
} from '../reducers/login-reducer';

import { useImmerReducer } from 'use-immer';

let initialState: IState = {
  email: '',
  password: ''
};

export const AuthProvider = ({ children }: any) => {
  // const [state, dispatch] = useImmerReducer(loginReducer, initialState);
  const [state, dispatch] = useImmerReducer(curriedLoginReducer, initialState);

  return (
    <authStateContext.Provider value={state}>
      <authDispatchContext.Provider value={dispatch}>
        {children}
      </authDispatchContext.Provider>
    </authStateContext.Provider>
  );
};
