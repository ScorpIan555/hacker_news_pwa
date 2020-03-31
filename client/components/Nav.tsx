import React, { FC } from 'react';
import Link from 'next/link';
import { Button } from './form-controls';

interface NavProps {
  data: any;
  loading?: any;
  handleClick: any;
}

export const Nav: FC<NavProps> = ({ data, loading, handleClick }) => {
  return (
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
          <Button
            buttonType="button"
            name="Logout"
            className="item" //
            handleClick={handleClick}
          />
        ) : null}
      </div>
    </nav>
  );
};
