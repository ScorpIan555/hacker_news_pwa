import * as React from 'react';
// import Head from "next/head";
import { Header } from '../Header';
import { useTheme } from 'styled-components';
import { ThemeProvider, theme } from '../../lib/theme';

type Props = {
  title?: string;
  isServer?: boolean;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  const themeObj = useTheme();
  console.log('theme:::', themeObj);
  return (
    <div>
     
      <Header />

      <ThemeProvider theme={theme}>{children}</ThemeProvider>

      {/* <style jsx>{`
        #_next {
          margin: 0px;
          padding: 0px;
        }
      `}</style>
      <style jsx global>{`
        html {
          font-size: 62.5%;
        }
      `}</style> */}
    </div>
  );
};

export default Layout;
