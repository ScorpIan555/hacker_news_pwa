import { GraphQLError } from 'graphql';

export interface IContextDispatchProps {
  state?: IState;
  dispatch?: ({ type }: { type: string }) => void;
}

export interface IDispatch {} // check, possibly replaced w/ type Dispatch

export interface IState {
  // need to look at all consumers of this interface and refactor this outs
  isAuth?: boolean;
  user?: IUser;
  error?: string;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  // username?: string;
  // email?: string;
  // password?: string;
  // action?: FieldName;
  // index?: FieldName;
  // dispatch?: IContextDispatchProps;
}

export interface IAction {
  // type: ActionType;  @TODO, need to get this into the Action/Dispatch interfaces
  /// just need to sit and figure out how to resolve the conflict

  type: string; // temporary hack, want to change to the ActionType type, not string
  payload?: any;
  // state?: IState;
  // dispatch?: IContextDispatchProps;
}

export interface IActionTypeGuard extends IAction {
  checkType: boolean;
}

export interface ExecutionResult<T = Record<string, any>> {
  data?: T;
  extensions?: Record<string, any>;
  errors?: GraphQLError[];
}

export interface IError {
  message: string;
}

export interface IItem {
  id?: number;
  url?: string;
  description?: string;
  postedBy?: string;
  key?: string;
  votes?: number;
}

export interface ILoginUser {
  id?: number; // optional for development, in production, prefer to pull the email & id from the payload
  email: string;
  password: string;
  type?: string;
  linksUserHAsVotedFor?: string;
}

export interface IUser {
  id?: number; // optional for development, in production, prefer to pull the email & id from the payload
  email: string;
  password?: string; // shouldn't be required b/c don't wanna pass this around client state
  type?: string;
  linksUserHasVotedFor?: string;
}

export interface ITheme {
  primaryColor?: string;
  main?: string;
  button: JSX.Element;
  // useTheme: any;
}

export interface ButtonProps {
  buttonType?: any;
  theme?: any; // think I prefer this, but...
  name: string;
  onClick?: any;
  className?: any;
  onSubmit?: any;
  handleClick?: any;
}
