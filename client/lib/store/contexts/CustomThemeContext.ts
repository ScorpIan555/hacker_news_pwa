import { createContext, useContext } from 'react';
// import { ITheme } from '../../typescript/interfaces';
import { theme } from '../../theme/';

export const CustomThemeContext = createContext(theme);
// export const CustomThemeContext = createContext({});
// there is a {ThemeContext} import in styled components

// need to add in default values

export const useCustomTheme = () => {
  // there is a {useTheme} import in styled components
  const themeContext = useContext(CustomThemeContext);
  // console.log('themeContext from <ThemeContext>', themeContext);

  if (themeContext === undefined) {
    throw new Error(
      'useThemeContext must be used within the ThemeProvider component'
    );
  }
  return { themeContext };
};
