import { createContext } from 'react';
import { TThemeMode } from '../types';

export interface IThemeContextType
{
  theme: TThemeMode;
  setTheme: (theme: TThemeMode) => void;
}

export const ThemeContext = createContext<IThemeContextType | undefined>(undefined);