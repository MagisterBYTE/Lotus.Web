import { CSSProperties } from 'react';
import { TColorType, TControlSize } from 'ui/types';

export class SelectHelper
{
  private static getGapFromSize(size: TControlSize): number
  {
    switch (size) 
    {
      case TControlSize.Smaller: return 0.3;
      case TControlSize.Small: return 0.35;
      case TControlSize.Medium: return 0.5;
      case TControlSize.Large: return 0.65;
    }

    return 0.5;
  }

  public static getMainContainerHeightFromSize(size: TControlSize): number
  {
    switch (size) 
    {
      case TControlSize.Smaller: return 22;
      case TControlSize.Small: return 28;
      case TControlSize.Medium: return 36;
      case TControlSize.Large: return 44;
    }

    return 36;
  }

  public static getBorderColorProps(color: TColorType, isDisabled: boolean, isFocused: boolean): CSSProperties
  {
    if (isDisabled)
    {
      return { borderColor: 'var(--lotus-color-border)' };
    }
    else
    {
      if (isFocused)
      {
        return { borderColor: `var(--lotus-color-${color})` };
      }
      else
      {
        return { borderColor: 'var(--lotus-color-border)' };
      }
    }
  }

  public static getBoxShadowProps(color: TColorType, isDisabled: boolean, isFocused: boolean): CSSProperties
  {
    if (isDisabled)
    {
      return {};
    }
    else
    {
      if (isFocused)
      {
        return { boxShadow: `0px 0px 0px 3px var(--lotus-shadow-${color})` }
      }
      else
      {
        return {};
      }
    }
  }

  public static getFlexContainer(size: TControlSize): CSSProperties
  {
    return {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: `${SelectHelper.getGapFromSize(size)}rem`
    }
  }

  public static getMarginOffsetInput(size: TControlSize): number
  {
    switch (size) 
    {
      case TControlSize.Smaller: return 14;
      case TControlSize.Small: return 18;
      case TControlSize.Medium: return 22;
      case TControlSize.Large: return 24;
    }

    return 32;
  }

  public static getMarginOffsetSingleValue(size: TControlSize): number
  {
    switch (size) 
    {
      case TControlSize.Smaller: return -4;
      case TControlSize.Small: return -4;
      case TControlSize.Medium: return -4;
      case TControlSize.Large: return -6;
    }

    return -4;
  }

  public static getPaddingLeftOption(size: TControlSize): number
  {
    switch (size) 
    {
      case TControlSize.Smaller: return 6;
      case TControlSize.Small: return 8;
      case TControlSize.Medium: return 10;
      case TControlSize.Large: return 12;
    }

    return 12;
  }
}
