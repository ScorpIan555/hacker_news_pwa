import { CustomThemeContext, useCustomTheme } from '../contexts';
import { CustomThemeProviderProps } from '../../typescript/types';


export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const { themeContext } = useCustomTheme();

  return (
    <CustomThemeContext.Provider value={themeContext}>
      {children}
    </CustomThemeContext.Provider>
  );
};
