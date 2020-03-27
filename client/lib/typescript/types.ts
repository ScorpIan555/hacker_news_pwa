import { IAction, ITheme } from './interfaces';

export type CustomThemeProviderProps = {
  children: React.ReactNode;
  value: ITheme;
};

// used in authContexts.ts
export type ActionType =
  | { type: 'login-start' }
  | { type: 'login-success' }
  | { type: 'login-fail' }
  | { type: 'logout' }
  | { type: 'me-query-user-update' };

export type Dispatch = (action: IAction) => void;
