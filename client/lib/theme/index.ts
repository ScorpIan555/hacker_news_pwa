import {
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} from './styled-components-utils';
import styled from './styled-components-utils';
import { StyledButton } from './button';
import { LinkFeedGrid } from './linkfeed-styles';
// import { GlobalStyle } from './global.styles.ts.txt';
import { oldTheme } from './old-theme';
import theme from './mui-theme';
import { GlobalStyle } from './global.style';

export {
  styled,
  oldTheme,
  theme,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  StyledButton,
  LinkFeedGrid, // wanna change this to a container
  // need to fix it so whatever I'm using here will fit into the theme...
  GlobalStyle,
};
