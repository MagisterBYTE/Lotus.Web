import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { ThemeHelper } from 'app/theme';
import { TButtonVariant } from './ButtonVariant';

export class ButtonHelper
{
  public static getBorderColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string
  {
    switch (state)
    {
      case TControlState.Normal:
        {
          switch (variant)
          {
            case TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
            case TButtonVariant.Outline: return `border-color: var(--lotus-color-${color});`;
            case TButtonVariant.Text: return 'border: none !important;';
          }
        } break;
      case TControlState.Hover:
        switch (variant)
        {
          case TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Outline: return `border-color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Text: return 'border: none !important;';
        } break;
      case TControlState.Pressed:
        switch (variant)
        {
          case TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Darker);`;
          case TButtonVariant.Outline: return `border-color: var(--lotus-color-${color}Darker);`;
          case TButtonVariant.Text: return 'border: none !important;';
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch (variant)
        {
          case TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Outline: return `border-color: var(--lotus-color-${color});`;
          case TButtonVariant.Text: return 'border: none !important;';
        } break;
    }


    return ''
  }

  public static getBackgroundColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string
  {
    switch (state)
    {
      case TControlState.Normal:
        {
          switch (variant)
          {
            case TButtonVariant.Filled: return `background-color: var(--lotus-color-${color});`;
            case TButtonVariant.Outline: return `background-color: var(--lotus-color-${'white'});`;
            case TButtonVariant.Text: return `background-color: var(--lotus-color-${'white'});`;
          }
        } break;
      case TControlState.Hover:
        switch (variant)
        {
          case TButtonVariant.Filled: return `background-color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
          case TButtonVariant.Text: return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case TControlState.Pressed:
        switch (variant)
        {
          case TButtonVariant.Filled: return `background-color: var(--lotus-color-${color}Darker);`;
          case TButtonVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
          case TButtonVariant.Text: return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch (variant)
        {
          case TButtonVariant.Filled: return `background-color: var(--lotus-color-${color});`;
          case TButtonVariant.Outline: return `background-color: var(--lotus-color-${'white'});`;
          case TButtonVariant.Text: return `background-color: var(--lotus-color-${'white'});`;
        } break;
    }

    return ''
  }

  public static getColorProps(color: TColorType, variant: TButtonVariant, state: TControlState): string
  {
    switch (state)
    {
      case TControlState.Normal:
        {
          switch (variant)
          {
            case TButtonVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
            case TButtonVariant.Outline: return `color: var(--lotus-color-${color});`;
            case TButtonVariant.Text: return `color: var(--lotus-color-${color});`;
          }
        } break;
      case TControlState.Hover:
        switch (variant)
        {
          case TButtonVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TButtonVariant.Outline: return `color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Text: return `color: var(--lotus-color-${color}Dark);`;;
        } break;
      case TControlState.Pressed:
        switch (variant)
        {
          case TButtonVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TButtonVariant.Outline: return `color: var(--lotus-color-${color}Darker);`;
          case TButtonVariant.Text: return `color: var(--lotus-color-${color}Darker);`;;
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch (variant)
        {
          case TButtonVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TButtonVariant.Outline: return `color: var(--lotus-color-${color});`;
          case TButtonVariant.Text: return `color: var(--lotus-color-${color});`;;
        } break;
    }

    return ''
  }

  public static getPaddingSidesProps(size: TControlSize, paddingControl: TControlPadding): string
  {
    switch (size)
    {
      case TControlSize.Smaller:
        {
          switch (paddingControl)
          {
            case TControlPadding.Minimum: return 'padding-left: 0.1rem; padding-right: 0.1rem;'
            case TControlPadding.Normal: return 'padding-left: 0.2rem; padding-right: 0.2rem;'
            case TControlPadding.Enlarged: return 'padding-left: 0.35rem; padding-right: 0.35rem;'
          }
        } break;
      case TControlSize.Small:
        {
          switch (paddingControl)
          {
            case TControlPadding.Minimum: return 'padding-left: 0.15rem; padding-right: 0.15rem;'
            case TControlPadding.Normal: return 'padding-left: 0.25rem; padding-right: 0.25rem;'
            case TControlPadding.Enlarged: return 'padding-left: 0.35rem; padding-right: 0.35rem;'
          }
        } break;
      case TControlSize.Medium:
        {
          switch (paddingControl)
          {
            case TControlPadding.Minimum: return 'padding-left: 0.2rem; padding-right: 0.2rem;'
            case TControlPadding.Normal: return 'padding-left: 0.5rem; padding-right: 0.5rem;'
            case TControlPadding.Enlarged: return 'padding-left: 0.75rem; padding-right: 0.75rem;'
          }
        } break;
      case TControlSize.Large:
        {
          switch (paddingControl)
          {
            case TControlPadding.Minimum: return 'padding-left: 0.25rem; padding-right: 0.25rem;'
            case TControlPadding.Normal: return 'padding-left: 0.55rem; padding-right: 0.55rem;'
            case TControlPadding.Enlarged: return 'padding-left: 0.8rem; padding-right: 0.8rem;'
          }
        } break;
    }

    return ''
  }
}
