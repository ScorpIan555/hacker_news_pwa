import React, { FC, useEffect } from 'react';
// import Link from 'next/link';
// get generated custom GraphQL hooks
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
// get app libraries
// import { setAccessToken } from '../lib/utils';
import {
  useAuthState,
  useAuthDispatch,
  // useCustomTheme
} from '../lib/store/contexts';
// import { Button } from './form-controls';
import { setAccessToken } from '../lib/utils';
// import { HeaderContainer } from '../lib/theme/header-styles';
// import { Nav } from './Nav';
import { theme } from '../lib/theme';
// import { ThemeContext } from 'styled-components';
// import { AppBar, Toolbar, IconButton } from 'material-ui';
// import classes from '*.module.css';
//
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import {
  Button,
  makeStyles,
  createStyles,
  Theme,
  // ButtonBase
} from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import Link from 'next/link';
import NavLink from './form-controls/NavLink';
// import MenuIcon from '@material-ui/icons/Menu';

interface Props {}

// probably need to get rid of this. it's cllient side only
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: 'safe',
      // backgroundColor:
      // display: 'flex',
      // justifyContent: 'flex-end',
    },
    // toolbar: {
    //   // display: 'flex',
    //   flexWrap: 'wrap',
    //   // backgroundColor: theme.palette.background.paper,
    //   // color: theme.palette.info.contrastText,
    // },
    menuButton: {
      // not in use
      marginRight: theme.spacing(2),
      color: 'red',
    },
    // title: {
    //   marginLeft: '.1rem',
    // },

    // logoutButton: {
    //   // color: 'default',
    //   // flex: 'flex-end',
    //   // alignSelf: 'flex-end',
    // },
    loginLogoutButton: {
      // justifyContent: 'flex-end',
      // justifySelf: 'flex-end',
      position: 'absolute',
      right: '0',
      // color: theme.palette.info.main,
    },
  })
);

export const Header: FC<Props> = () => {
  const { data, loading } = useMeQuery(); // @TODO need to memoize this result
  const [logout, { client }] = useLogoutMutation();

  const { authStateContext } = useAuthState(); // I could prob refactor this hook so I can pull both State/Dispatch out in one destructure
  const authDispatch = useAuthDispatch();
  // const { themeContext } = useCustomTheme();

  const classes = useStyles(theme);
  console.log('theme:::', theme);
  console.log('classes:::', classes);

  //
  //
  let body = <div></div>;

  // console.log('loading.before.call:::', loading);
  // console.log('data.before call::', data);
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
        className={classes.root}
        // style={{ flexGrow: 1 }}
      >
        <AppBar position="static" style={{ width: '100%' }}>
          <Toolbar className="toolbar">
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              style={{ margin: '1rem' }}
              color="inherit"
              aria-label="menu"
            >
              
            </IconButton> */}

            <Typography
              variant="h6"
              // className={classes.title}
              // style={{ flex: 1 }}
            >
              <NavLink className="header-link" href="/" label="Hacker_News" />
            </Typography>

            <Typography variant="h6" className="header-link">
              <NavLink className="menu-item" href="/submit" label="Submit" />
            </Typography>
            {/* 
            <Typography variant="button" className="login-logout-button">
              <Button color="inherit" onClick={handleClickForLogout}>
                {' '}
                Logout{' '}
              </Button>
            </Typography> */}

            {/* 
            <Button
              color="inherit"
              onClick={handleClickForLogout}
              className={classes.loginLogoutButton}
            >
              Logout
            </Button> */}

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
                <span> or </span>
                <Button color="inherit" href="/register">
                  Sign Up
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
        {body}
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
