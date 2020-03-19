import {
  IAction,
  ILoginAction,
  ILogoutAction
  // IState,
  // Action
} from '../typescript';

// The Type Guard Functions
export const isLoginStartAction = (action: IAction): action is ILoginAction => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-start';
};
export const isLoginSuccessAction = (
  action: IAction
): action is ILoginAction => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-success';
};
export const isLoginFail = (action: IAction): action is ILoginAction => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-fail';
};
export const isLogoutAction = (action: IAction): action is ILogoutAction => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'logout';
};
