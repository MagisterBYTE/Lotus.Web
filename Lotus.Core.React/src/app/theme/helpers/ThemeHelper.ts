import { ThemeConstants } from '../constants';
import { TThemeMode } from '../types';

export class ThemeHelper
{
  /**
   * Загрузка темы из локального хранилища 
   * @returns Тема или тема по умолчанию по умолчанию
   */
  public static loadFromStorage = (): TThemeMode =>
  {
    const value = localStorage.getItem(ThemeConstants.SaveKey);
    if (value)
    {
      return value as TThemeMode;
    }
    else
    {
      return 'light';
    }
  }

  /**
   * Сохранение темы в локальное хранилище
   * @param theme Тема
   */
  public static saveToStorage = (theme: TThemeMode) =>
  {
    localStorage.setItem(ThemeConstants.SaveKey, theme);
  }
}