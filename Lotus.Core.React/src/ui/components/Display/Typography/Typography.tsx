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
   * Вариант отображения
   */
  variant?: TTypographyVariant;
}

export const Typography: React.FC<ITypographyProps> = ({ color = undefined, variant = TTypographyVariant.Body1, ...propsElem }: ITypographyProps) => 
{
  const typographyClass = cx(`lotus-typography-${variant}`, color && `lotus-foreground-${color}`);

  switch (variant)
  {
    case TTypographyVariant.Heading3: return <h3 {...propsElem} className={typographyClass}>{propsElem.children}</h3>;
    case TTypographyVariant.Heading4: return <h4 {...propsElem} className={typographyClass}>{propsElem.children}</h4>;
    case TTypographyVariant.Heading5: return <h5 {...propsElem} className={typographyClass}>{propsElem.children}</h5>;
    case TTypographyVariant.Heading6: return <h6 {...propsElem} className={typographyClass}>{propsElem.children}</h6>;
    case TTypographyVariant.TitleLarge: return <span {...propsElem} className={typographyClass}>{propsElem.children}</span>;
    case TTypographyVariant.TitleMedium: return <span {...propsElem} className={typographyClass}>{propsElem.children}</span>;
    case TTypographyVariant.TitleSmall: return <span {...propsElem} className={typographyClass}>{propsElem.children}</span>;
    case TTypographyVariant.TitleSmaller: return <span {...propsElem} className={typographyClass}>{propsElem.children}</span>;
    case TTypographyVariant.Body1: return <p {...propsElem} className={typographyClass}>{propsElem.children}</p>;
    case TTypographyVariant.Body2: return <p {...propsElem} className={typographyClass}>{propsElem.children}</p>;
  }

  return <></>;
};
