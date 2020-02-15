import App, { AppContext } from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";

// import app components
import { withApollo } from "../lib/apollo";
import Layout from "../components/Layout";
// import { NextPageContext } from "next";

// type AppProps = {
//   isServer: Boolean;
//   apolloClient: any;
//   getInitialProps: any;
// };

class MyApp extends App<any> {
  constructor(props: any) {
    super(props);
  }

  // https://spectrum.chat/next-js/general/app-js-getinitialprops-explained~539bdc35-a8b0-4dfa-972b-0dd9a0f1ac67
  // https://www.kohei.dev/posts/7-tips-of-next-js-9-with-typescript?hl=en-US
  static async getInitialProps({ Component, ctx }: AppContext): Promise<any> {
    console.log("Component:::", Component);

    return {
      isServer: ctx.hasOwnProperty("req")
    };
  }

  componentDidMount() {
    // console.log("_app.this.props:::", this.props);
  }

  render() {
    const { Component, isServer, apolloClient } = this.props;
    console.log("this.props.pageProps:::", this.props.pageProps);

    return (
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...isServer} />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default withApollo(MyApp);
