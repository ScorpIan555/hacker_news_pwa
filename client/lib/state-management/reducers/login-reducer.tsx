import produce from 'immer';
// import { IContextDispatchProps } from '../contexts/authContext';
// import { Reducer } from 'react';

export interface IContextDispatchProps {
  dispatch?: ({ type }: { type: string }) => void;
}

export interface IDispatch {}

export interface IState {
  isAuth?: boolean;
  user?: string;
  error?: string;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  username?: string;
  email?: string;
  password?: string;
  // action?: FieldName;
  // index?: FieldName;
  // dispatch?: IContextDispatchProps;
}

export enum FieldName {
  password = 'password',
  username = 'username',
  email = 'email'
}

export interface IAction {
  type?: string;
  payload?: any;
  // state?: IState;
  // dispatch?: IContextDispatchProps;
}

export interface ILoginAction extends IAction {
  payload: void;
}

export interface ILogoutAction extends IAction {
  payload: void;
}

// export interface

// The Type Guard Functions
const isLoginAction = (action: IAction): action is ILoginAction => {
  return action.type === 'login';
};
const isLogoutAction = (action: IAction): action is ILogoutAction => {
  return action.type === 'logout';
};

export const loginReducer = (draft: IState, action: any) => {
  if (isLoginAction(action)) {
    draft.error = '';
    draft.isLoading = true;
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
    case 'success': {
      draft.isLoggedIn = true;
      draft.isLoading = false;
      draft.username = '';
      draft.password = '';
      return;
    }
    case 'error': {
      draft.error = 'Incorrect username or password!';
      draft.isLoggedIn = false;
      draft.isLoading = false;
      draft.username = '';
      draft.password = '';
      return;
    }
    // case 'logOut': {
    //   draft.isLoggedIn = false;
    //   return;
    // }
    default:
      throw new Error(`Unhandled action type:${action.type}`);
  }
};

export const curriedLoginReducer = produce(loginReducer);
