import * as React from 'react';
// import Head from "next/head";
import { Header } from '../Header';
// import { useTheme } from 'styled-components';
import { GlobalStyle } from '../../lib/theme';
import { CustomThemeProvider } from '../../lib/store/providers';
import { useCustomTheme } from '../../lib/store/contexts';

interface ILayoutProps {
  title?: string;
  isServer?: boolean;
  Component?: any;
  pageProps?: any;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({
  Component,
  pageProps,
  children
}) => {
  // const themeObj = useTheme();
  // console.log('theme:::', themeObj)
  const { themeContext } = useCustomTheme(); // this might be redundant

  console.log('Layout.Component:::', Component);
  console.log('Layout.pageProps:::', pageProps);
  console.log('Layout.theme:::', themeContext);
  return (
    <div>
      <Header />

      <CustomThemeProvider value={themeContext}>
        <GlobalStyle />
        {children}
      </CustomThemeProvider>
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
