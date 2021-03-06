import React from 'react';
import LinkFeed from '../components/link-feed/LinkFeed';
import { useUsersQuery } from '../generated/graphql';

export default () => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' });

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {/* <div>users:</div>
      <ul>
        {data.users.map(x => {
          return (
            <li key={x.id}>
              {x.email}, {x.id}
            </li>
          );
        })}
      </ul> */}
      <LinkFeed />
    </div>
  );
};
