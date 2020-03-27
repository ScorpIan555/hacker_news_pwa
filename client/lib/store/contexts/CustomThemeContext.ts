import { createContext, useContext } from 'react';
import { ITheme } from '../../typescript/interfaces';

export const CustomThemeContext = createContext({} as ITheme);
// export const CustomThemeContext = createContext({});
// there is a {ThemeContext} import in styled components

// need to add in default values

export const useCustomTheme = () => {
  // there is a {useTheme} import in styled components
  const themeContext = useContext(CustomThemeContext);

  if (themeContext === undefined) {
    throw new Error(
      'useThemeContext must be used within the ThemeProvider component'
    );
  }
  return { themeContext };
};
