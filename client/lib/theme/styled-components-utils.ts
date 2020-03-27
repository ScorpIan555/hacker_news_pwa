import * as styledComponents from 'styled-components';
import { ITheme } from '../typescript/interfaces';

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>;

export default styled;
export { css, createGlobalStyle, keyframes, ThemeProvider };
