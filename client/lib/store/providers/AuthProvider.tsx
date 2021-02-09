import { useImmerReducer } from 'use-immer';
import { AuthDispatchContext, AuthStateContext } from '../contexts/AuthContext';
import { curriedLoginReducer } from '../reducers/loginReducer';

// import { IState } from '../../typescript';

let initialState = {
  // fix this typing
  user: {
    email: '',
    password: '',
    linksArray: []
  }
};

export const AuthProvider = ({ children }: any) => {
  // const [state, dispatch] = useImmerReducer(loginReducer, initialState);
  const [state, dispatch] = useImmerReducer(curriedLoginReducer, initialState);
  // ref: https://medium.com/javascript-in-plain-english/react-context-patterns-with-usecontext-hook-62085b90c7eb
  // ref: find the other one w/ useImmerReducer examctly
  // ref: https://github.com/hswolff/youtube/blob/master/videos/why-i-love-usereducer/src/LoginWithContext.js

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
