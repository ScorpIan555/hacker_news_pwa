import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { useCustomTheme } from '../../lib/store/contexts';
// import app libraries
import { GlobalStyle } from '../../lib/theme';
// import app components
import { Header } from '../Header';


interface ILayoutProps {
  title?: string;
  isServer?: boolean;
  Component?: any;
  pageProps?: any;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {
  // const themeObj = useTheme();
  // console.log('theme:::', themeObj)
  const { themeContext } = useCustomTheme(); // this might be redundant

  // console.log('Layout.Component:::', Component);
  // console.log('Layout.pageProps:::', pageProps);
  console.log('Layout.theme:::', themeContext);
  return (
    <>
      <ThemeProvider theme={themeContext}>
        <GlobalStyle />
        <Header />
        {children}
      </ThemeProvider>

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
    </>
  );
};

export default Layout;
