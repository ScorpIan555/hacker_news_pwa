import { authStateContext, authDispatchContext } from '../contexts/authContext';
import { curriedLoginReducer } from '../reducers/loginReducer';

import { useImmerReducer } from 'use-immer';
import { IState } from '../../typescript';

let initialState: IState = {
  email: '',
  password: ''
};

export const AuthProvider = ({ children }: any) => {
  // const [state, dispatch] = useImmerReducer(loginReducer, initialState);
  const [state, dispatch] = useImmerReducer(curriedLoginReducer, initialState);
  // ref: https://medium.com/javascript-in-plain-english/react-context-patterns-with-usecontext-hook-62085b90c7eb
  // ref: find the other one w/ useImmerReducer examctly
  // ref: https://github.com/hswolff/youtube/blob/master/videos/why-i-love-usereducer/src/LoginWithContext.js

  return (
    <authStateContext.Provider value={state}>
      <authDispatchContext.Provider value={dispatch}>
        {children}
      </authDispatchContext.Provider>
    </authStateContext.Provider>
  );
};
