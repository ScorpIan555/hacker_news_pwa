import { IError, IUser } from '../../typescript/interfaces';
import UserActionTypes from './userTypes';

export const signInSuccess = (data: IUser) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: data,
});

export const signInFailure = (error: IError) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signInStart = (data: IUser) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: data,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error: IError) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (data: IUser) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: data,
});

export const signUpSuccess = ({ user, additionalData }: any) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error: IError) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
