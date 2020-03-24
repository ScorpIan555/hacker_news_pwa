import App, { AppContext } from 'next/app';
import React from 'react';
// state mgt
import { enableMapSet, enablePatches } from 'immer';
import { ApolloProvider } from '@apollo/react-hooks';

// import app components
import { withApollo } from '../lib/apollo';
import Layout from '../components/layout/Layout';
import { AuthProvider } from '../lib/store/providers/AuthProvider';
import { authStateContext } from '../lib/store/contexts';

// import {} from 'styled-components'
// import { NextPageContext } from "next";

// @TODO
// ref: profiling https://www.bbc.com/mundo/noticias-51921093

// @TODO
// refactor into a functional component, if possible
// the issue has been linking apollo client up w/ _app.js as a func component
class MyApp extends App<any> {
  constructor(props: any) {
    super(props);
  }

  // https://spectrum.chat/next-js/general/app-js-getinitialprops-explained~539bdc35-a8b0-4dfa-972b-0dd9a0f1ac67
  // https://www.kohei.dev/posts/7-tips-of-next-js-9-with-typescript?hl=en-US
  static async getInitialProps({ Component, ctx }: AppContext): Promise<any> {
    console.log('Component:::', Component.displayName);

    return {
      isServer: ctx.hasOwnProperty('req')
    };
  }

  static contextType: any = authStateContext;

  componentDidMount() {
    // opt-in to immer plugins
    enableMapSet();
    enablePatches();

    console.log('_app.js: contextType::', this.props.contextType);
  }

  render() {
    const { Component, isServer, apolloClient } = this.props;
    console.log('_app.this.props.isServer:::', this.props.isServer);

    return (
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...isServer} />
          </Layout>
        </ApolloProvider>
      </AuthProvider>
    );
  }
}

export default withApollo(MyApp);
