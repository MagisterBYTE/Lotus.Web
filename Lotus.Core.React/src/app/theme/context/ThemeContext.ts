import { createContext, CSSProperties } from 'react';
import { TControlSize } from 'ui/types';
import { TThemeMode } from '../types';

export interface IThemeContextType
{
  theme: TThemeMode;
  setTheme: (theme: TThemeMode) => void;
  sizeControl:Record<TControlSize, CSSProperties>
}

export const ThemeContext = createContext<IThemeContextType | undefined>(undefined);