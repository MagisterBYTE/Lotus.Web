import { TColorType, TControlState } from 'ui/types';
import { TButtonVariant } from './ButtonVariant';

export class ButtonHelper
{
  public static getBorderColorProps(color: TColorType, variant: TButtonVariant, state: TControlState)
  {
    switch(state)
    {
      case TControlState.Normal:
        {
          switch(variant)
          {
            case TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
            case TButtonVariant.Outline: return `border-color: var(--lotus-color-${color});`;
            case TButtonVariant.Text: return 'border: none !important;';
          }
        } break;
      case TControlState.Hover:
        switch(variant)
        {
          case TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Outline: return `border-color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Text: return 'border: none !important;';
        } break;
      case TControlState.Pressed:
        switch(variant)
        {
          case TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Darker);`;
          case TButtonVariant.Outline: return `border-color: var(--lotus-color-${color}Darker);`;
          case TButtonVariant.Text: return 'border: none !important;';
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch(variant)
        {
          case TButtonVariant.Filled: return `border-color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Outline: return `border-color: var(--lotus-color-${color});`;
          case TButtonVariant.Text: return 'border: none !important;';
        } break;
    }


    return ''
  }

  public static getBackgroundColorProps(color: TColorType, variant: TButtonVariant, state: TControlState)
  {
    switch(state)
    {
      case TControlState.Normal:
        {
          switch(variant)
          {
            case TButtonVariant.Filled: return `background-color: var(--lotus-color-${color});`;
            case TButtonVariant.Outline: return `background-color: var(--lotus-color-${'white'});`;
            case TButtonVariant.Text: return `background-color: var(--lotus-color-${'white'});`;
          }
        } break;
      case TControlState.Hover:
        switch(variant)
        {
          case TButtonVariant.Filled: return `background-color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
          case TButtonVariant.Text: return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case TControlState.Pressed:
        switch(variant)
        {
          case TButtonVariant.Filled: return `background-color: var(--lotus-color-${color}Darker);`;
          case TButtonVariant.Outline: return `background-color: var(--lotus-color-${color}Palest);`;
          case TButtonVariant.Text: return `background-color: var(--lotus-color-${color}Palest);`;
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch(variant)
        {
          case TButtonVariant.Filled: return `background-color: var(--lotus-color-${color});`;
          case TButtonVariant.Outline: return `background-color: var(--lotus-color-${'white'});`;
          case TButtonVariant.Text: return `background-color: var(--lotus-color-${'white'});`;
        } break;
    }

    return ''
  }

  public static getColorProps(color: TColorType, variant: TButtonVariant, state: TControlState)
  {
    switch(state)
    {
      case TControlState.Normal:
        {
          switch(variant)
          {
            case TButtonVariant.Filled: return `color: var(--lotus-color-${'light'});`;
            case TButtonVariant.Outline: return `color: var(--lotus-color-${color});`;
            case TButtonVariant.Text: return `color: var(--lotus-color-${color});`;
          }
        } break;
      case TControlState.Hover:
        switch(variant)
        {
          case TButtonVariant.Filled: return `color: var(--lotus-color-${'light'});`;
          case TButtonVariant.Outline: return `color: var(--lotus-color-${color}Dark);`;
          case TButtonVariant.Text: return `color: var(--lotus-color-${color}Dark);`;;
        } break;
      case TControlState.Pressed:
        switch(variant)
        {
          case TButtonVariant.Filled: return `color: var(--lotus-color-${'light'});`;
          case TButtonVariant.Outline: return `color: var(--lotus-color-${color}Darker);`;
          case TButtonVariant.Text: return `color: var(--lotus-color-${color}Darker);`;;
        } break;
      case TControlState.Selected:
      case TControlState.Focus:
      case TControlState.Disabled:
        switch(variant)
        {
          case TButtonVariant.Filled: return `color: var(--lotus-color-${'light'});`;
          case TButtonVariant.Outline: return `color: var(--lotus-color-${color});`;
          case TButtonVariant.Text: return `color: var(--lotus-color-${color});`;;
        } break;
    }

    return ''
  }
}
