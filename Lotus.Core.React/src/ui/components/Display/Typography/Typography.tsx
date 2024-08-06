import { cx } from '@emotion/css';
import React, { ComponentPropsWithRef } from 'react';
import { TColorType } from 'ui/types';
import { TTypographyVariant } from './TypographyVariant';
import './Typography.css';

export interface ITypographyProps extends ComponentPropsWithRef<'p'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Фоновый цвет
   */
  backgroundColor?: TColorType;

  /**
   * Вариант отображения
   */
  variant?: TTypographyVariant;
}

export const Typography: React.FC<ITypographyProps> = ({variant = TTypographyVariant.Body1, ...props }: ITypographyProps) => 
{
  const typographyClass = cx(`lotus-typography-${variant}`, props.color &&  `lotus-foreground-${props.color}`);

  switch(variant)
  {
    case TTypographyVariant.Heading3:  return <h3 {...props} className={typographyClass}>{props.children}</h3>;
    case TTypographyVariant.Heading4:  return <h4 {...props} className={typographyClass}>{props.children}</h4>;
    case TTypographyVariant.Heading5:  return <h5 {...props} className={typographyClass}>{props.children}</h5>;
    case TTypographyVariant.Heading6:  return <h6 {...props} className={typographyClass}>{props.children}</h6>;
    case TTypographyVariant.Subtitle1: return <h6 {...props} className={typographyClass}>{props.children}</h6>;
    case TTypographyVariant.Subtitle2: return <h6 {...props} className={typographyClass}>{props.children}</h6>;
    case TTypographyVariant.Body1: return <p {...props} className={typographyClass}>{props.children}</p>;
    case TTypographyVariant.Body2: return <p {...props} className={typographyClass}>{props.children}</p>;
    case TTypographyVariant.Caption1: return <span {...props} className={typographyClass}>{props.children}</span>;
  }

  return <></>;
};
