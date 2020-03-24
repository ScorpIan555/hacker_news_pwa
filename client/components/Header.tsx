import React, { FC, useEffect } from 'react';
import Link from 'next/link';
// get generated custom GraphQL hooks
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
// get app libraries
import { setAccessToken } from '../lib/utils';
import { useAuthState, useAuthDispatch } from '../lib/store/contexts';
import { ButtonC } from './form-controls';

interface Props {}

export const Header: FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const { useAuthStateContext } = useAuthState();
  const authDispatch = useAuthDispatch();
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
      useAuthStateContext
    );
    body = (
      <div className="row">
        you are logged in as: {useAuthStateContext.user?.email}
      </div>
    );
  } else {
    console.log('not logged in.authState:: ', useAuthStateContext);
    body = <div>not logged in</div>;
  }

  useEffect(() => {
    authDispatch({ type: 'me-query-user-update', payload: data?.me });
  }),
    [data]; // selected data from the destructure of the useMutation query b/c that represents that portion of the app state frmo the Apollo cache

  const handleClick = async () => {
    await logout();
    setAccessToken('');
    authDispatch({ type: 'logout' });
    await client!.resetStore();
  };

  return (
    <>
      <header id="page-header">
        <nav className="container">
          <div className="item">
            <Link href="/">
              <a>Home</a>
            </Link>{' '}
            |{' '}
          </div>
          <div className="item">
            <Link href="/register">
              <a>Register</a>
            </Link>{' '}
            |{' '}
          </div>
          <div className="item">
            <Link href="/login">
              <a>Login</a>
            </Link>{' '}
            |{' '}
          </div>
          <div className="item">
            <Link href="/bye">
              <a>bye</a>
            </Link>{' '}
            |{' '}
          </div>
          <div className="">
            {!loading && data && data.me ? (
              <ButtonC
                name="Logout"
                className="item login" //
                onClick={handleClick}
              />
            ) : null}
          </div>
        </nav>
        {body}
        <style jsx>{`
          // component
          // background-color: blue;
          color: black;
          width: 100%;
          height: 50px;

          // flex: 1;
          // flex-direction: column

          // classes
          .container {
            display: flex;
            margin-bottom: 2rem;
          }

          #page-header {
            margin-bottom: 5rem;
          }

          .item {
            flex-basis: ;
          }

          .login {
            order: 0;
            align-self: flex-end;
            width: 20%;
          }
        `}</style>
      </header>
    </>
  );
};
