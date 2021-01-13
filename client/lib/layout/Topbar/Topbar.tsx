// import { AuthContext } from 'context/auth';
import React from 'react';
import Button from '../../../components/Button/Button';
import NavLink from '../../../components/form-controls/NavLink';
import {
  Logo,








  TopbarRightSide, TopbarWrapper
} from './Topbar.style';
// import Logoimage from 'assets/image/PickBazar.png';
// import UserImage from 'assets/image/user.jpg';
// import { useDrawerDispatch } from 'context/DrawerContext';
// import Drawer, { ANCHOR } from 'components/Drawer/Drawer';
// import Sidebar from '../Sidebar/Sidebar';

const data = [
  {
    title: 'Delivery Successful',
    time: '5m',
    message: 'Order #34567 had been placed',
  },
];
const Topbar = ({ refs }: any) => {
  // const dispatch = useDrawerDispatch();
  // const { signout } = React.useContext(AuthContext);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const openDrawer = useCallback(
  //   () => dispatch({ type: 'OPEN_DRAWER', drawerComponent: 'PRODUCT_FORM' }),
  //   [dispatch]
  // );

  return (
    <TopbarWrapper ref={refs}>
      <Logo>
        <NavLink to="/" href="/">
          {/* <LogoImage src={Logoimage} alt="pickbazar-admin" /> */}
          <h2>Hacker_Nooz</h2>
        </NavLink>
      </Logo>

      {/* <DrawerWrapper>
        <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
          <MenuIcon />
        </DrawerIcon>
        <Drawer
          isOpen={isDrawerOpen}
          anchor={ANCHOR.left}
          onClose={() => setIsDrawerOpen(false)}
          overrides={{
            Root: {
              style: {
                zIndex: '1',
              },
            },
            DrawerBody: {
              style: {
                marginRight: '0',
                marginLeft: '0',
                '@media only screen and (max-width: 767px)': {
                  marginLeft: '30px',
                },
              },
            },
            DrawerContainer: {
              style: {
                width: '270px',
                '@media only screen and (max-width: 767px)': {
                  width: '80%',
                },
              },
            },
            Close: {
              component: () => (
                <CloseButton onClick={() => setIsDrawerOpen(false)}>
                  <ArrowLeftRound />
                </CloseButton>
              ),
            },
          }}
        >
          <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
        </Drawer>
      </DrawerWrapper> */}

      <TopbarRightSide>
        <Button >Add Products</Button>

        {/* <Popover
          content={({ close }) => <Notification data={data} onClear={close} />}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: {
                width: '330px',
                zIndex: 2,
              },
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          <NotificationIconWrapper>
            <NotificationIcon />
            <AlertDot>
              <AlertDotIcon />
            </AlertDot>
          </NotificationIconWrapper>
        </Popover>

        <Popover
          content={({ close }) => (
            <UserDropdowItem>
              <NavLink to={STAFF_MEMBERS} exact={false} onClick={close}>
                Staff
              </NavLink>
              <NavLink to={SETTINGS} exact={false} onClick={close}>
                Settings
              </NavLink>
              <LogoutBtn
                onClick={() => {
                  signout();
                  close();
                }}
              >
                Logout
              </LogoutBtn>
            </UserDropdowItem>
          )}
          accessibilityType={'tooltip'}
          placement={PLACEMENT.bottomRight}
          overrides={{
            Body: {
              style: () => ({
                width: '220px',
                zIndex: 2,
              }),
            },
            Inner: {
              style: {
                backgroundColor: '#ffffff',
              },
            },
          }}
        >
          {/* <ProfileImg> */}
            {/* <Image src={UserImage} alt="user" /> */}
            
          {/* </ProfileImg> */}
        {/* </Popover> */} */}
        <h2>HN</h2>
      </TopbarRightSide>
    </TopbarWrapper>
  );
};

export default Topbar;
