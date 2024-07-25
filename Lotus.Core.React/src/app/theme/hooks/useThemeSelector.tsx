import * as React from 'react';
import { IThemeContextType, ThemeContext } from '../context/ThemeContext';

export const useThemeSelector = (): IThemeContextType => 
{
  const context = React.useContext(ThemeContext);

  if (!context) 
  {
    throw new Error(
      'You can use "useTheme" hook only within a <ThemeProvider> component.'
    );
  }

  return context;
};
