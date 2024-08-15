import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { ThemeHelper } from 'app/theme';
import { TChipVariant } from './ChipVariant';

export class ChipHelper
{
  public static getBorderColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string
  {
    switch (state)
    {
      case TControlState.Normal:
        {
          switch (variant)
          {
            case TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
            case TChipVariant.Outline: return `border-color: var(--lotus-color-${color});`;
          }
        } break;
      case TControlState.Hover:
        switch (variant)
        {
          case TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
          case TChipVariant.Outline: return `border-color: var(--lotus-color-${color}Dark);`;
        } break;
      case TControlState.Pressed:
        switch (variant)
        {
          case TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Darker);`;
          case TChipVariant.Outline: return `border-color: var(--lotus-color-${color}Darker);`;
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch (variant)
        {
          case TChipVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
          case TChipVariant.Outline: return `border-color: var(--lotus-color-${color});`;
        } break;
    }


    return ''
  }

  public static getBackgroundColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string
  {
    switch (state)
    {
      case TControlState.Normal:
        {
          switch (variant)
          {
            case TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Palest);`;
            case TChipVariant.Outline: return `background-color: var(--lotus-color-${'light'});`;
          }
        } break;
      case TControlState.Hover:
        switch (variant)
        {
          case TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Dark);`;
          case TChipVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case TControlState.Pressed:
        switch (variant)
        {
          case TChipVariant.Filled: return `background-color: var(--lotus-color-${color}Darker);`;
          case TChipVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch (variant)
        {
          case TChipVariant.Filled: return `background-color: var(--lotus-color-${color});`;
          case TChipVariant.Outline: return `background-color: var(--lotus-color-${'light'});`;
        } break;
    }

    return ''
  }

  public static getColorProps(color: TColorType, variant: TChipVariant, state: TControlState): string
  {
    switch (state)
    {
      case TControlState.Normal:
        {
          switch (variant)
          {
            case TChipVariant.Filled: return `color: var(--lotus-color-${color});`;
            case TChipVariant.Outline: return `color: var(--lotus-color-${color});`;
          }
        } break;
      case TControlState.Hover:
        switch (variant)
        {
          case TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TChipVariant.Outline: return `color: var(--lotus-color-${color}Dark);`;
        } break;
      case TControlState.Pressed:
        switch (variant)
        {
          case TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TChipVariant.Outline: return `color: var(--lotus-color-${color}Darker);`;
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch (variant)
        {
          case TChipVariant.Filled: return `color: var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)});`;
          case TChipVariant.Outline: return `color: var(--lotus-color-${color});`;
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
            case TControlPadding.Minimum: return 'padding: 0.08rem; font-size: x-small;'
            case TControlPadding.Normal: return 'padding: 0.1rem; font-size: x-small;'
            case TControlPadding.Enlarged: return 'padding: 0.15rem; font-size: x-small;'
          }
        } break;
      case TControlSize.Small:
        {
          switch (paddingControl)
          {
            case TControlPadding.Minimum: return 'padding: 0.1rem; font-size: small;'
            case TControlPadding.Normal: return 'padding: 0.15rem; font-size: small;'
            case TControlPadding.Enlarged: return 'padding: 0.2rem; font-size: small;'
          }
        } break;
      case TControlSize.Medium:
        {
          switch (paddingControl)
          {
            case TControlPadding.Minimum: return 'padding: 0.15rem; font-size: medium;'
            case TControlPadding.Normal: return 'padding: 0.2rem; font-size: medium;'
            case TControlPadding.Enlarged: return 'padding: 0.25rem; font-size: medium;'
          }
        } break;
      case TControlSize.Large:
        {
          switch (paddingControl)
          {
            case TControlPadding.Minimum: return 'padding: 0.2rem; font-size: large;'
            case TControlPadding.Normal: return 'padding: 0.3rem; font-size: large;'
            case TControlPadding.Enlarged: return 'padding: 0.4rem; font-size: large;'
          }
        } break;
    }

    return ''
  }
}
