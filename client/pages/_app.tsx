import App, { AppContext } from 'next/app';
import React, { Context } from 'react';
// state mgt
import { enableMapSet, enablePatches } from 'immer';
import { ApolloProvider } from '@apollo/react-hooks';

// import app components
import { withApollo } from '../lib/apollo';
import Layout from '../components/layout/Layout';
import { AuthProvider } from '../lib/store/providers/AuthProvider';
import { AuthStateContext } from '../lib/store/contexts';
import { IState } from '../lib/typescript';

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

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    console.log('pageProps:::', pageProps);

    return {
      isServer: ctx.hasOwnProperty('req'),
      pageProps
    };
  }

  static contextType: Context<IState> = AuthStateContext;

  componentDidMount() {
    // opt-in to immer plugins
    enableMapSet();
    enablePatches();

    console.log('_app.js: contextType::', this.props.contextType);
  }

  render() {
    const { Component, isServer, apolloClient, pageProps } = this.props;
    console.log('_app.this.props.isServer:::', this.props.isServer);
    console.log('render.pageProps:::', pageProps);

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
