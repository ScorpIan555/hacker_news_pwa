import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
// import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
// import {  } from 'apollo-link';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
// import {  } from 'apollo-link-http';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import cookie from 'cookie';
import fetch from 'isomorphic-unfetch';
import jwtDecode from 'jwt-decode';
import Head from 'next/head';
import React from 'react';
import { getAccessToken, setAccessToken } from './utils/accessToken';

/*
DOCS:
1) ApolloClient changelog
  https://github.com/apollographql/apollo-client/blob/main/CHANGELOG.md
2) Migration guide v2.6 to 3.x
  https://www.apollographql.com/docs/react/migrating/apollo-client-3-migration/
3) ApolloClient cache configuration
  https://www.apollographql.com/docs/react/caching/cache-configuration/
4) Reading and writing data to the cache
  https://www.apollographql.com/docs/react/caching/cache-interaction/

*/

const isServer = () => typeof window === 'undefined';

const PORT = 4040;

// const refreshTokenEndpointVarLoader: any =
//   process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT;
// // let refreshTokenEndpoint: any = { (refreshTokenEndpointVarLoader !== undefined) ? refreshTokenEndpointVarLoader : 'string'}
// let refreshTokenEndpoint: string = 'string';
// const isVarUndefined = () => typeof refreshTokenEndpointVarLoader === undefined;

// if (isVarUndefined) {
//   refreshTokenEndpoint = '';
// } else {
//   refreshTokenEndpoint = process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT;
// }

console.log(
  'process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT:::',
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT
);

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({
    apolloClient,
    serverAccessToken,
    apolloState,
    ...pageProps
  }: any) => {
    if (!isServer() && !getAccessToken()) {
      console.log('lib/utils/apollo.tsx - setAccessToken', serverAccessToken);
      setAccessToken(serverAccessToken);
    }
    const client = apolloClient || initApolloClient(apolloState);
    return <PageComponent {...pageProps} apolloClient={client} />;
  };

  if (process.env.NODE_ENV !== 'production') {
    // Find correct display name
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    // Warn if old way of installing apollo is used
    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    // Set correct display name for devtools
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      const {
        AppTree,
        ctx: { req, res },
      } = ctx;

      let serverAccessToken = '';

      if (isServer()) {
        let c = req.headers.cookie;

        const cookies =
          typeof c === 'string' ? cookie.parse(c) : cookie.parse('');
        if (cookies.jid) {
          const response = await fetch(
            `http://localhost:${PORT}/refresh_token`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                cookie: 'jid=' + cookies.jid,
              },
            }
          );
          const data = await response.json();
          serverAccessToken = data.accessToken;
        }
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = (ctx.ctx.apolloClient = initApolloClient(
        {},
        serverAccessToken
      ));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      // Only on the server
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
          return {};
        }

        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import(
              '@apollo/client/react/ssr'
            );
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
                apolloClient={apolloClient}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken,
      };
    };
  }

  return WithApollo;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(initState: any, serverAccessToken?: string) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (isServer()) {
    return createApolloClient(initState, serverAccessToken);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    // setAccessToken(cookie.parse(document.cookie).test);
    apolloClient = createApolloClient(initState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 * @param  {Object} config
 */
function createApolloClient(initialState = {}, serverAccessToken?: string) {
  const httpLink = new HttpLink({
    uri: `http://localhost:${PORT}/graphql`,
    credentials: 'include',
    fetch,
  });

  // https://www.npmjs.com/package/apollo-link-token-refresh
  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp }: { exp: number } = jwtDecode<any>(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      // if (isServer) {
      //   const path = process.env.REFRESH_TOKEN_ENDPOINT;
      // } else {
      //   const path = process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT;
      // }
      return fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include',
      });
    },
    handleFetch: (accessToken) => {
      setAccessToken(accessToken);
    },
    handleError: (err) => {
      console.warn('Your refresh token is invalid. Try to relogin');
      console.error(err);
    },
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([refreshLink, authLink, errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState),
  });
}
