import React, { FC, useEffect } from 'react';
// import Link from 'next/link';
// get generated custom GraphQL hooks
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
// get app libraries
// import { setAccessToken } from '../lib/utils';
import {
  useAuthState,
  useAuthDispatch,
  useCustomTheme
} from '../lib/store/contexts';
// import { Button } from './form-controls';
import { setAccessToken } from '../lib/utils';
// import { HeaderContainer } from '../lib/theme/header-styles';
// import { Nav } from './Nav';
// import { theme } from '../lib/theme';
// import { ThemeContext } from 'styled-components';
// import { AppBar, Toolbar, IconButton } from 'material-ui';
// import classes from '*.module.css';
//
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { Button } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

interface Props {}

export const Header: FC<Props> = () => {
  const { data, loading } = useMeQuery(); // @TODO need to memoize this result
  const [logout, { client }] = useLogoutMutation();

  const { authStateContext } = useAuthState();
  const authDispatch = useAuthDispatch();
  const { themeContext } = useCustomTheme();

  //
  //
  let body = <div></div>;

  console.log('loading.before.call:::', loading);
  console.log('data.before call::', data);
  if (loading) {
    body = <div>Loading</div>;
  } else if (data && data.me) {
    console.log('loading.after.call:::', loading);
    console.log('data.after call:::', data);
    // authDispatch({ type: 'me-query-user-update', payload: data.me });
    console.log(
      'after authDispatch.type.me-quer-user-update -- authState:::',
      authStateContext
    );
    body = (
      <div className="row">
        you are logged in as: {authStateContext.user?.email}
      </div>
    );
  } else {
    console.log('not logged in.authState:: ', authStateContext);
    body = <div>not logged in</div>;
  }

  // @TODO figureout the reason this keeps rerunning...
  useEffect(() => {
    authDispatch({ type: 'me-query-user-update', payload: data?.me });
    console.log('data ** should only run once **:::', data);
  }),
    [data?.me?.email]; // selected data from the destructure of the useMutation query b/c that represents that portion of the app state frmo the Apollo cache

  const handleClick = async (event: {
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

  return (
    <>
      <div className={themeContext.palette.primary.main}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              // className={classes.menuButton}
              style={{ margin: '1rem' }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              // className={classes.title}
              style={{ flex: 1 }}
            ></Typography>

            <Typography
              variant="h6"
              // className={classes.title}
              style={{ flex: 1 }}
            >
              News
            </Typography>
            <Button color="inherit">Login</Button>
            <div className="">
              {!loading && data && data.me ? (
                <button
                  type="button"
                  name="Logout"
                  className="item"
                  onClick={handleClick}
                />
              ) : null}
            </div>
          </Toolbar>
        </AppBar>
      </div>

      {/* 
      <HeaderContainer>
        <header id="page-header">
          <Nav handleClick={handleClick} data={data} loading={loading} />
          {body}
        </header>
      </HeaderContainer> */}
    </>
  );
};
