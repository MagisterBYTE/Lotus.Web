import { CSSProperties, useEffect, useState } from 'react';
import { TControlSize } from 'ui/types';
import { TThemeMode } from '../types';
import { ThemeHelper } from '../helpers';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = (props: { children: React.ReactNode }) => 
{
  const sizeControl: Record<TControlSize, CSSProperties> =
  {
    smaller: {
      padding: '0.25em 0.25em',
      fontSize: 'smaller'
    },
    small: {
      padding: '0.35em 0.35em',
      fontSize: 'small'
    },
    medium: {
      padding: '0.45em 0.45em',
      fontSize: 'medium'
    },
    large: {
      padding: '0.5em 0.5em',
      fontSize: 'large'
    }
  }

  const [theme, setTheme] = useState<TThemeMode>(ThemeHelper.loadFromStorage());

  useEffect(() => 
  {
    ThemeHelper.saveToStorage(theme)
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        sizeControl,
        setTheme
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};
