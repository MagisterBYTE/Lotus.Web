import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { css, cx } from '@emotion/css';
import { ThemeHelper } from 'app/theme';
import { TChipVariant } from './ChipVariant';
import { ChipHelper } from './ChipHelper';

export interface IChipProps extends Omit<ComponentPropsWithRef<'span'>, 'children'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Размер чипа
   */
  size?: TControlSize;

  /**
   * Вариант отображения
   */
  variant?: TChipVariant;

  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;

  /**
   * Надпись
   */
  label: ReactNode;
}

export const Chip: React.FC<IChipProps> = (
  { 
    color = TColorType.Secondary, 
    size = TControlSize.Medium, 
    variant = TChipVariant.Filled, 
    paddingControl = TControlPadding.Normal,
    label,
    ...propsSpan
  }: IChipProps) => 
{
  const chipMain = css`
  ${ThemeHelper.getFontFamilyPropsAsText()}
  border-width: var(--lotus-border-width);
  border-style: var(--lotus-border-style);
  border-radius: 0.2rem;
  ${ChipHelper.getBorderColorProps(color, variant, TControlState.Normal)}
  ${ChipHelper.getColorProps(color, variant, TControlState.Normal)}
  ${ChipHelper.getBackgroundColorProps(color, variant, TControlState.Normal)}
  ${ChipHelper.getPaddingSidesProps(size, paddingControl)}
    &:hover {
      ${ChipHelper.getBorderColorProps(color, variant, TControlState.Hover)}
      ${ChipHelper.getBackgroundColorProps(color, variant, TControlState.Hover)}
      ${ChipHelper.getColorProps(color, variant, TControlState.Hover)}
    }
    &:active {
      ${ChipHelper.getBorderColorProps(color, variant, TControlState.Pressed)}
      ${ChipHelper.getBackgroundColorProps(color, variant, TControlState.Pressed)}
      ${ChipHelper.getColorProps(color, variant, TControlState.Pressed)}
    }
    &:disabled {
      ${ChipHelper.getBorderColorProps(color, variant, TControlState.Disabled)}
      ${ChipHelper.getBackgroundColorProps(color, variant, TControlState.Disabled)}
      ${ChipHelper.getColorProps(color, variant, TControlState.Disabled)}
      ${ThemeHelper.getOpacityPropsForDisabledAsText()}
    }
`;

  const chipClass = cx(chipMain);

  return <span {...propsSpan} className={chipClass}>{label}</span>;
};
