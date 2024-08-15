import { TControlSize } from 'ui/types';
import { TTypographyVariant } from './TypographyVariant';

export class TypographyHelper
{
  /**
   * Получение оптимального варианта текста при указанном размере элемента UI
   * @param size Размере элемента UI
   * @returns Оптимальный варианта текста
   */
  public static getTypographyVariantByControlSize(size?: TControlSize): TTypographyVariant
  {
    if (size)
    {
      switch (size)
      {
        case TControlSize.Smaller: return TTypographyVariant.TitleSmaller;
        case TControlSize.Small: return TTypographyVariant.TitleSmall;
        case TControlSize.Medium: return TTypographyVariant.TitleMedium;
        case TControlSize.Large: return TTypographyVariant.TitleLarge;
      }
    }

    return TTypographyVariant.TitleMedium;
  }
}