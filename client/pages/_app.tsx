import App, { AppContext } from 'next/app';
import React from 'react';
// state mgt
import { enableMapSet, enablePatches } from 'immer';
import { ApolloProvider } from '@apollo/react-hooks';

// import app components
import { withApollo } from '../lib/apollo';
import Layout from '../components/layout/Layout';
import { AuthProvider } from '../lib/state-management/providers/AuthProvider';
// import { NextPageContext } from "next";

class MyApp extends App<any> {
  constructor(props: any) {
    super(props);
  }

  // https://spectrum.chat/next-js/general/app-js-getinitialprops-explained~539bdc35-a8b0-4dfa-972b-0dd9a0f1ac67
  // https://www.kohei.dev/posts/7-tips-of-next-js-9-with-typescript?hl=en-US
  static async getInitialProps({ Component, ctx }: AppContext): Promise<any> {
    console.log('Component:::', Component);

    return {
      isServer: ctx.hasOwnProperty('req')
    };
  }

  componentDidMount() {
    // opt-in to immer plugins
    enableMapSet();
    enablePatches();
  }

  render() {
    const { Component, isServer, apolloClient } = this.props;
    console.log('this.props.pageProps:::', this.props.pageProps);

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
