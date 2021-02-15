import produce from 'immer';
import { IAction, IState } from '../../typescript/interfaces';
import {
  isLoginFail,
  isLoginStartAction,
  isLoginSuccessAction,
  isLogoutAction,
  isMeQueryUserUpdateAction,
} from '../../utils';
import {
  isRegisterStartAction,
  isRegisterSuccessAction,
} from '../../utils/reducerTypeGuards'; // clean up into just utils

// export interface
// ref: https://dev.to/stephencweiss/usereducer-with-typescript-2kf

// @TODO
// refactor out these 'isLoading' booleans, change to an enum:
//      ref:  https://egghead.io/lessons/react-use-a-status-enum-instead-of-booleans

const loginReducer = (draft: IState, action: IAction) => {
  console.log('loginReducer called -- action.type:::', action.type);
  console.log('loginReducer called -- draft:::', draft);
  console.log('loginReducer called -- action.payload:::', action.payload);

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
    return;
  }
  if (isLoginFail(action)) {
    draft.isLoggedIn = false;
    draft.isLoading = false;
    draft.user = { email: '' };
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
