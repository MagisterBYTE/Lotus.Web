import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { TColorType } from 'ui/types';
import { TTypographyVariant, Typography } from '../Typography';
import './Label.css';

export interface ILabelProps extends ComponentPropsWithRef<'p'>
{
  /**
   * Параметры надписи
   */
  label?: ReactNode;

  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Вариант отображения
   */
  variant?: TTypographyVariant;

  /**
   * Размещать надпись сверху
   */
  isTopLabel?: boolean;
}

export const Label: React.FC<ILabelProps> = (
  {
    label,
    color,
    variant = TTypographyVariant.TitleMedium,
    isTopLabel,
    ...propsLabel
  }: ILabelProps) => 
{
  if (label)
  {
    if (isTopLabel)
    {
      return (
        <div className={`lotus-label-container-v lotus-gap-v-${variant}`}>
          <Typography color={color} variant={variant} {...propsLabel}>
            {label}
          </Typography>
          {propsLabel.children}
        </div>
      )
    }
    else
    {
      return (<div className={`lotus-label-container-h lotus-gap-h-${variant}`}>
        <Typography color={color} variant={variant} {...propsLabel}>
          {label}
        </Typography>
        {propsLabel.children}
      </div>)
    }
  }
  else
  {
    return propsLabel.children
  }
}