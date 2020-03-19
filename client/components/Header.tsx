import React, { FC, useEffect } from 'react';
import Link from 'next/link';
// get generated custom GraphQL hooks
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
// get app libraries
import { setAccessToken } from '../lib/utils';
import { useAuthState } from '../lib/store/contexts';

interface Props {}

export const Header: FC<Props> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const authState = useAuthState();
  let body = <div></div>;

  useEffect(() => {
    console.log('loading.before.call:::', loading);
    console.log('data.before call::', data);
    if (loading) {
      body = <div>Loading</div>;
    } else if (data && data.me) {
      console.log('loading.after.call:::', loading);
      console.log('data.after call:::', data);
      body = <div className="row">you are logged in as: {data.me.email}</div>;
    } else {
      body = <div>not logged in</div>;
    }
  }),
    [body];

  console.log('auth:::', authState);

  const handleClick = async () => {
    await logout();
    setAccessToken('');
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
              <button className="item login" onClick={handleClick}>
                logout
              </button>
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
