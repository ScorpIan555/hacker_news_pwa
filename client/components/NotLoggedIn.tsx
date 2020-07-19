import React, { FC } from 'react';
import Link from 'next/link';

export const NotLoggedIn: FC = () => {
  return (
    <div>
      <h3>You must be logged in to do that</h3>
      <Link href="/login">Login</Link>
    </div>
  );
};
