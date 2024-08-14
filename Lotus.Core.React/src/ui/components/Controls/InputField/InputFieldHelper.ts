import { TColorType, TControlState } from 'ui/types';

export class InputFieldHelper
{
  public static getBorderColorProps(color: TColorType, state: TControlState)
  {
    switch (state)
    {
      case TControlState.Normal:
        return `border-color: var(--lotus-color-${'border'});`
      case TControlState.Hover:
        return `border-color: var(--lotus-color-${color});`
      case TControlState.Pressed:
        return `border-color: var(--lotus-color-${color});`
      case TControlState.Selected:
      case TControlState.Focus:
        return `border-color: var(--lotus-color-${color}); box-shadow: 0px 0px 0px 3px var(--lotus-shadow-${color});`
      case TControlState.Disabled:
        return `border-color: var(--lotus-color-${'border'});`
    }

    return ''
  }

  public static getBackgroundProps(color: TColorType, isBackground?: boolean)
  {
    if (isBackground && isBackground === true)
    {
      return `background-color: var(--lotus-color-${color}Palest);`
    }

    return ''
  }
}
