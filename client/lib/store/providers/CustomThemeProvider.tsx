import { CustomThemeContext, useCustomTheme } from '../contexts';
import { CustomThemeProviderProps } from '../../typescript/types';

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
  const { themeContext } = useCustomTheme();
  console.log('themeContext from <Provider>:::', themeContext);

  return (
    <CustomThemeContext.Provider value={themeContext}>
      {children}
    </CustomThemeContext.Provider>
  );
};
