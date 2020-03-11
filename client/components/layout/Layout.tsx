import * as React from "react";
// import Head from "next/head";
import { Header } from "../Header";

type Props = {
  title?: string;
  isServer?: boolean;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => (
  <div>
    {/* <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head> */}
    <Header />
    {children}
    <style jsx>{`
      #_next {
        margin: 0px;
        padding: 0px;
      }
    `}</style>
    <style jsx global>{`
      html {
        font-size: 62.5%;
      }
    `}</style>
  </div>
);

export default Layout;
