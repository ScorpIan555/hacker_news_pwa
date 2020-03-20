import { IAction, IActionTypeGuard } from '../typescript';

/* 

*/

/* 
  User Action Type Guard Functions
*/

//
// User Registration Actions
//

export const isRegisterStartAction = (
  action: IAction
): action is IActionTypeGuard => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'register-start';
};

export const isRegisterSuccessAction = (
  action: IAction
): action is IActionTypeGuard => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'register-success';
};

//
// User Login Actions
//

export const isLoginStartAction = (
  action: IAction
): action is IActionTypeGuard => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-start';
};

export const isLoginSuccessAction = (
  action: IAction
): action is IActionTypeGuard => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-success';
};

export const isLoginFail = (action: IAction): action is IActionTypeGuard => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'login-fail';
};

export const isLogoutAction = (action: IAction): action is IActionTypeGuard => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'logout';
};

//
// User State Management Actions
//

export const isMeQueryUserUpdateAction = (
  action: IAction
): action is IActionTypeGuard => {
  console.log('type check run -- action.type', action.type);
  return action.type === 'me-query-user-update';
};
