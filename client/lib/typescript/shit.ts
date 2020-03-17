export interface IContextDispatchProps {
  state?: IState;
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
  type: string;
  payload?: any;
  // state?: IState;
  // dispatch?: IContextDispatchProps;
}

export interface ILoginAction extends IAction {
  payload: boolean;
}

export interface ILogoutAction extends IAction {
  payload: boolean;
}

// used in authContexts.ts
export type Action =
  | { type: 'login-start' }
  | { type: 'login-success' }
  | { type: 'login-fail' }
  | { type: 'logout' };

export type Dispatch = (action: Action) => void;
