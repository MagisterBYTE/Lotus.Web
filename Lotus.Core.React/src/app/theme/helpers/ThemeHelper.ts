import { TColorType, TControlSize, TCssFontSize } from 'ui/types';
import { CSSProperties } from 'react';
import { ThemeConstants } from '../constants';
import { TThemeMode } from '../types';

export class ThemeHelper
{
  /**
   * Загрузка темы из локального хранилища 
   * @returns Тема или тема по умолчанию по умолчанию
   */
  public static loadFromStorage(): TThemeMode
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
  public static saveToStorage(theme: TThemeMode)
  {
    localStorage.setItem(ThemeConstants.SaveKey, theme);
  }

  /**
   * Получение оптимального цвета текста при указанном фоновом цвете
   * @param background Цвет фона
   * @returns Оптимальный цвет текста
   */
  public static getOptimalForegroundColor(background?: TColorType): TColorType
  {
    if (background)
    {
      switch (background)
      {
        case TColorType.Primary: return TColorType.Light;
        case TColorType.Secondary: return TColorType.Light;
        case TColorType.Success: return TColorType.Light;
        case TColorType.Danger: return TColorType.Light;
        case TColorType.Warning: return TColorType.Dark;
        case TColorType.Info: return TColorType.Dark;
        case TColorType.Accent: return TColorType.Light;
        case TColorType.Light: return TColorType.Dark;
        case TColorType.Dark: return TColorType.Light;
      }
    }

    return TColorType.Light;
  }

  /**
   * Получение оптимального размера шрифта при указанном размере элемента UI
   * @param size Размере элемента UI
   * @returns Оптимальный размера шрифта
   */
  public static getFontSizeByControlSize(size?: TControlSize): TCssFontSize
  {
    if (size)
    {
      switch (size)
      {
        case TControlSize.Smaller: return 'x-small'
        case TControlSize.Small: return 'small'
        case TControlSize.Medium: return 'medium'
        case TControlSize.Large: return 'large'
      }
    }

    return 'medium';
  }

  /**
   * Получение оптимального размера шрифта при указанном размере элемента UI как свойства CSS
   * @param size Размере элемента UI
   * @returns Оптимальный размера шрифта как свойства CSS
   */
  public static getFontSizeByControlSizeAsCSS(size?: TControlSize): CSSProperties
  {
    if (size)
    {
      switch (size)
      {
        case TControlSize.Smaller: return { fontSize: 'x-small' };
        case TControlSize.Small: return { fontSize: 'small' };
        case TControlSize.Medium: return { fontSize: 'medium' };
        case TControlSize.Large: return { fontSize: 'large' };
      }
    }

    return { fontSize: 'medium' };
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер шрифта в пикселях
   * @param size Размере элемента UI
   * @returns Соответствующий размер шрифта в пикселях
   */
  public static convertControlSizeToFontSizeInPixel(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case TControlSize.Smaller: return 10;
        case TControlSize.Small: return 13;
        case TControlSize.Medium: return 16;
        case TControlSize.Large: return 19;
      }
    }

    return 16;
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер шрифта в rem
   * @param size Размере элемента UI
   * @returns Соответствующий размер шрифта в rem
   */
  public static convertControlSizeToFontSizeInRem(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case TControlSize.Smaller: return 10 / 16;
        case TControlSize.Small: return 13 / 16;
        case TControlSize.Medium: return 1;
        case TControlSize.Large: return 19 / 16;
      }
    }

    return 1;
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер иконки в rem
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в rem
   */
  public static convertControlSizeToIconSizeInRem(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case TControlSize.Smaller: return 10 / 16 * 1.5;
        case TControlSize.Small: return 13 / 16 * 1.5;
        case TControlSize.Medium: return 1.5;
        case TControlSize.Large: return 19 / 16 * 1.5;
      }
    }

    return 1.5;
  }

  /**
   * Конвертация размера элемента UI в соответствующий размер иконки в пикселя
   * @param size Размере элемента UI
   * @returns Соответствующий размер иконки в пикселя
   */
  public static convertControlSizeToIconSizeInPixel(size?: TControlSize): number
  {
    if (size)
    {
      switch (size)
      {
        case TControlSize.Smaller: return 10 * 1.5;
        case TControlSize.Small: return 13 * 1.5;
        case TControlSize.Medium: return 16 * 1.5;
        case TControlSize.Large: return 19 * 1.5;
      }
    }

    return 16 * 1.5;
  }

  /**
   * Получить свойства CSS по семейству шрифтов в виде текста
   * @returns Свойства CSS по семейству шрифтов в виде текста
   */
  public static getFontFamilyPropsAsText(): string
  {
    return 'font-family: var(--lotus-font-main);'
  }

  /**
   * Получить свойства CSS по семейству шрифтов в виде CSSProperties
   * @returns Свойства CSS по семейству шрифтов в виде CSSProperties
   */
  public static getFontFamilyPropsAsCSS(): CSSProperties
  {
    return { fontFamily: 'var(--lotus-font-main);' }
  }

  /**
   * Получить свойства CSS по границе в виде текста
   * @returns Свойства CSS по границе в виде текста
   */
  public static getBorderPropsAsText(): string
  {
    return `border-width: var(--lotus-border-width);
    border-style: var(--lotus-border-style);
    border-radius: var(--lotus-border-radius);`
  }

  /**
   * Получить свойства CSS по границе в виде CSSProperties
   * @returns Свойства CSS по границе в виде CSSProperties
   */
  public static getBorderPropsAsCSS(): CSSProperties
  {
    return {
      borderWidth: 'var(--lotus-border-width);',
      borderStyle: 'var(--lotus-border-style);',
      borderRadius: 'var(--lotus-border-radius);'
    }
  }


  /**
   * Получить свойства CSS по переходу в виде текста
   * @returns Свойства CSS по переходу в виде текста
   */
  public static getTransitionPropsAsText(): string
  {
    return `transition: background-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`;
  }

  /**
   * Получить свойства CSS по переходу в виде CSSProperties
   * @returns Свойства CSS по переходу в виде CSSProperties
   */
  public static getTransitionPropsAsCSS(): CSSProperties
  {
    return {
      transition: `background-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1), 
    color ${ThemeConstants.TransitionSpeed}ms cubic-bezier(0.4, 0, 0.2, 1);`
    }
  }

  /**
   * Получить свойства CSS по прозрачности для неактивного элемента UI в виде текста
   * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде текста
   */
  public static getOpacityPropsForDisabledAsText(): string
  {
    return `opacity: ${ThemeConstants.OpacityForDisabled};`;
  }

  /**
   * Получить свойства CSS по прозрачности для неактивного элемента UI в виде текста
   * @returns Свойства CSS по прозрачности для неактивного элемента UI в виде текста
   */
  public static getOpacityPropsForDisabledAsCSS(): CSSProperties
  {
    return { opacity: `${ThemeConstants.OpacityForDisabled};` }
  }
}