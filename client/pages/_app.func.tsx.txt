// import React from "react";
import { NextPage } from "next";
import { AppProps, AppContext } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
// import { AppProps } from "next/app";

// import app components
import { withApollo } from "../lib/apollo";
import Layout from "../components/Layout";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  // https://spectrum.chat/next-js/general/app-js-getinitialprops-explained~539bdc35-a8b0-4dfa-972b-0dd9a0f1ac67
  // https://www.kohei.dev/posts/7-tips-of-next-js-9-with-typescript?hl=en-US
  const getInitialProps = async ({
    Component,
    ctx
  }: AppContext): Promise<any> => {
    console.log("Component:::", Component);
    console.log("getIntialProps", getInitialProps);

    return {
      isServer: ctx.hasOwnProperty("req")
    };
  };

  //   return {}
  const { apolloClient } = pageProps;

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
};

export default withApollo(App);
