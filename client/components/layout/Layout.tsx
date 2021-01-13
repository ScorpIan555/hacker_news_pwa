import * as React from 'react';
// import app components
// import { Header } from '../Header';
import { AdminLayout } from '../../lib/layout/Layout';

interface ILayoutProps {
  title?: string;
  isServer?: boolean;
  Component?: any;
  pageProps?: any;
}

const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {

  return (
  
        <AdminLayout>
        {children}
        </AdminLayout>

  );
};

export default Layout;
