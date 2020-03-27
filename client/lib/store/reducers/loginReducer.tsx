import produce from 'immer';

import {
  isLoginStartAction,
  isLoginSuccessAction,
  isLoginFail,
  isLogoutAction,
  isMeQueryUserUpdateAction
} from '../../utils';
import {
  isRegisterStartAction,
  isRegisterSuccessAction
} from '../../utils/reducerTypeGuards'; // clean up into just utils
import { IState, IAction } from '../../typescript/interfaces';

// import { IContextDispatchProps } from '../contexts/authContext';
// import { Reducer } from 'react';

// export interface
// ref: https://dev.to/stephencweiss/usereducer-with-typescript-2kf

// @TODO
// refactor out these 'isLoading' booleans, change to an enum:
//      ref:  https://egghead.io/lessons/react-use-a-status-enum-instead-of-booleans

const loginReducer = (draft: IState, action: IAction) => {
  console.log('loginReducer called -- action.type:::', action.type);
  console.log('loginReducer called -- draft:::', draft);
  console.log('loginReducer called -- action.payload:::', action.payload);
  // const actionType = action.type;
  //
  //

  if (isRegisterStartAction(action)) {
    draft.error = '';
    draft.isLoading = true;

    return;
  }

  if (isRegisterSuccessAction(action)) {
    draft.isLoggedIn = true;
    draft.isLoading = false;
    draft.user = action.payload;
    return;
  }

  if (isLoginStartAction(action)) {
    // need to take the handleSubmit logic from the component andput it in here...
    console.log('isLoginStartAction.action:::', action);
    console.log('isLoginStartAction.draft:::', draft);
    draft.error = '';
    draft.isLoading = true;
    return;
  }

  if (isLoginSuccessAction(action)) {
    // need to take the handleSubmit logic from the component andput it in here...
    console.log('isLoginSuccessAction.action:::', action);
    console.log('isLoginSuccessAction.draft:::', draft);
    draft.isLoggedIn = true;
    draft.isLoading = false;
    draft.user = action.payload;
    // draft.password = '';
    return;
  }
  if (isLoginFail(action)) {
    console.log('login-fail.action::', action);
    console.log('login-fail.draft', draft);
    draft.error = 'Incorrect username or password!';
    draft.isLoggedIn = false;
    draft.isLoading = false;
    draft.user = { email: '' };
    // draft.username = '';
    // draft.password = '';
    return;
  }
  if (isLogoutAction(action)) {
    draft.isLoggedIn = false;
    return;
  }

  if (isMeQueryUserUpdateAction(action)) {
    draft.isLoggedIn = true;
    draft.user = action.payload;
    return;
    //
  } else {
    throw new Error(`Unhandled action type:${action.type}`);
  }
};

export const curriedLoginReducer = produce(loginReducer);
