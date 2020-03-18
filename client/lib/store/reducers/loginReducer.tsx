import produce from 'immer';
import {
  IAction,
  ILoginAction,
  ILogoutAction,
  IState,
  Action
} from '../../typescript';
// import { IContextDispatchProps } from '../contexts/authContext';
// import { Reducer } from 'react';

// export interface
// ref: https://dev.to/stephencweiss/usereducer-with-typescript-2kf

// The Type Guard Functions
const isLoginStartAction = (action: IAction): action is ILoginAction => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-start';
};
const isLoginSuccessAction = (action: IAction): action is ILoginAction => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-success';
};
const isLoginFail = (action: IAction): action is ILoginAction => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-fail';
};
const isLogoutAction = (action: IAction): action is ILogoutAction => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'logout';
};

const loginReducer = (draft: IState, action: Action) => {
  console.log('loginReducer called -- action.type:::', action.type);
  console.log('loginReducer called -- draft:::', draft);
  console.log('loginReducer called -- action.payload:::', action.payload);
  //
  //
  //
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
    draft.email = 'fake email';
    // draft.password = '';
    return;
  }
  if (isLoginFail(action)) {
    console.log('login-fail.action::', action);
    console.log('login-fail.draft', draft);
    draft.error = 'Incorrect username or password!';
    draft.isLoggedIn = false;
    draft.isLoading = false;
    draft.username = '';
    draft.password = '';
    return;
  }
  if (isLogoutAction(action)) {
    draft.isLoggedIn = false;
    return;
  }

  switch (action.type) {
    // case 'field': {
    //   // let { fieldName } = action;
    //   if (action) {
    //     if (action != undefined) {
    //       let index: string = action.fieldName || 'fish';
    //       draft[index] = action.payload;
    //     }
    //   }

    //   return;
    // }

    // case 'login': {
    //   draft.error = '';
    //   draft.isLoading = true;
    //   return;
    // }
    // case 'success': {
    //   draft.isLoggedIn = true;
    //   draft.isLoading = false;
    //   draft.username = '';
    //   draft.password = '';
    //   return;
    // }
    // case 'error': {
    //   draft.error = 'Incorrect username or password!';
    //   draft.isLoggedIn = false;
    //   draft.isLoading = false;
    //   draft.username = '';
    //   draft.password = '';
    //   return;
    // }
    // case 'logOut': {
    //   draft.isLoggedIn = false;
    //   return;
    // }
    default:
      throw new Error(`Unhandled action type:${action.type}`);
  }
};

export const curriedLoginReducer = produce(loginReducer);
