import { GraphQLError } from 'graphql';
import { IUser } from './IUser';

export interface IContextDispatchProps {
  state?: IState;
  dispatch?: ({ type }: { type: string }) => void;
}

export interface IDispatch {}

export interface IState {
  // need to look at all consumers of this interface and refactor this outs
  isAuth?: boolean;
  user?: IUser;
  error?: string;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  username?: string;
  // email?: string;
  // password?: string;
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
  // type: ActionType;
  type: string;
  payload?: any;
  // state?: IState;
  // dispatch?: IContextDispatchProps;
}

export interface IActionTypeGuard extends IAction {
  checkType: boolean;
}

// used in authContexts.ts
export type ActionType =
  | { type: 'login-start' }
  | { type: 'login-success' }
  | { type: 'login-fail' }
  | { type: 'logout' };

export type Dispatch = (action: IAction) => void;

export interface ExecutionResult<T = Record<string, any>> {
  data?: T;
  extensions?: Record<string, any>;
  errors?: GraphQLError[];
}
