import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IEmptyProps } from 'lib/typescript/interfaces';
import React, { FC, useEffect } from 'react';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { useAuthDispatch, useAuthState } from '../lib/store/contexts';
import { setAccessToken } from '../lib/utils';
import NavLink from './form-controls/NavLink';

// this isn't working because it's client-side only.

export const Header: FC<IEmptyProps> = () => {
  const { data, loading } = useMeQuery(); // @TODO need to memoize this result
  const [logout, { client }] = useLogoutMutation();

  const { authStateContext } = useAuthState(); // I could prob refactor this hook so I can pull both State/Dispatch out in one destructure
  const authDispatch = useAuthDispatch();

  let body = <div></div>;

  if (loading) {
    body = <div>Loading</div>;
  } else if (data && data.me) {
    body = (
      <div className="row">
        you are logged in as: {authStateContext.user?.email}
      </div>
    );
  } else {
    body = <div>not logged in</div>;
  }

  // @TODO figureout the reason this keeps rerunning...
  useEffect(() => {
    authDispatch({ type: 'me-query-user-update', payload: data?.me });
    console.log('data ** should only run once **:::', data);
    console.log('user:;:', authStateContext.user);
  }),
    [data?.me?.email]; // selected data from the destructure of the useMutation query b/c that represents that portion of the app state frmo the Apollo cache

  const handleClickForLogout = async (event: {
    preventDefault: () => void;
    target: any;
  }) => {
    event.preventDefault();
    console.log('click!', event.target);

    try {
      await logout();
      setAccessToken('');
      authDispatch({ type: 'logout' });
      await client!.resetStore();
    } catch (error) {
      console.log('error::', error);
      throw new Error('error logging out');
    }
  };

  // @TODO need to set a minimum width2
  return (
    <>
      <div
      // className={themeContext.palette.primary.main}

      // style={{ flexGrow: 1 }}
      >
        <AppBar position="static" style={{ width: '100%' }}>
          <Toolbar className="toolbar">
            <Typography variant="h4">
              <NavLink className="header-link" href="/" label="Hacker_News" />
            </Typography>

            <Typography variant="h6" className="header-link">
              <NavLink className="menu-item" href="/submit" label="Submit" />
            </Typography>

            {!loading && data && data.me ? (
              <Typography variant="button" className="logout-button">
                <Button color="inherit" onClick={handleClickForLogout}>
                  {' '}
                  Logout{' '}
                </Button>
              </Typography>
            ) : (
              <div className="login-signup">
                <Button color="inherit" href="/login">
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {body}
      </div>
    </>
  );
};
