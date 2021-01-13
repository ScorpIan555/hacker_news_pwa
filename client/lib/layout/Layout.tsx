import React from 'react';
import { useMedia } from '../../settings/use-media';
import useComponentSize from '../../settings/useComponentSize';
// import DrawerItems from '../DrawerItems/DrawerItems';
// import { DrawerProvider } from 'context/DrawerContext';
import {
  ContentInnerWrapper, ContentWrapper, LayoutWrapper
} from './Layout.style';
import Topbar from './Topbar/Topbar';


const AdminLayout = ({ children }: any) => {
  let [topbarRef, { height }] = useComponentSize();
  let [sidebarRef, { width }] = useComponentSize();
  
  const desktop = useMedia('(min-width: 992px)');

  return (
    
    <>
        <Topbar refs={topbarRef} />
        { typeof window !== 'undefined' ? 
        <LayoutWrapper
        style={{
          height: `calc(100vh - ${height}px)`,
        }}
      >
        {desktop ? (
          <>
        
            <ContentWrapper
              style={{
                width: `calc(100% - ${width}px)`,
              }}
            >
              <ContentInnerWrapper>{children}</ContentInnerWrapper>
            </ContentWrapper>
          </>
        ) : (
          <ContentWrapper
            style={{
              width: '100%',
            }}
          >
            <ContentInnerWrapper>{children}</ContentInnerWrapper>
          </ContentWrapper>
        )}
      </LayoutWrapper> : null
      }
        
  </>
  );
};

export { AdminLayout };

