import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlPadding, TControlSize, TControlState } from 'ui/types';
import { css, cx } from '@emotion/css';
import { ILabelProps, Label, TypographyHelper } from 'ui/components/Display';
import { ThemeHelper } from 'app/theme';
import { InputFieldHelper } from './InputFieldHelper';

export interface IInputFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Размер поля
   */
  size?: TControlSize;

  /**
   * Фон поля
   */
  isBackground?: boolean;

  /**
   * Внутренний отступ
   */
  paddingControl?: TControlPadding;

  /**
   * Параметры надписи
   */
  labelProps?: ILabelProps
}

export const InputField: React.FC<IInputFieldProps> = ({ color = TColorType.Primary, isBackground = false, size = TControlSize.Medium,
  paddingControl = TControlPadding.Normal, labelProps, ...propsInput }: IInputFieldProps) =>
{
  const InputFieldMain = css`
    ${ThemeHelper.getFontFamilyPropsAsText()}
    ${ThemeHelper.getBorderPropsAsText()}
    ${ThemeHelper.getTransitionPropsAsText()}
    ${InputFieldHelper.getBackgroundProps(color, isBackground)}
    ${InputFieldHelper.getBorderColorProps(color, TControlState.Normal)}
      &:hover {
        ${InputFieldHelper.getBorderColorProps(color, TControlState.Hover)}
      }
      &:focus {
        ${InputFieldHelper.getBorderColorProps(color, TControlState.Focus)}
        outline: 0;
      }
      &:disabled {
        ${InputFieldHelper.getBorderColorProps(color, TControlState.Disabled)}
        ${ThemeHelper.getOpacityPropsForDisabledAsText()}
      }
  `;
  const InputFieldClass = cx(InputFieldMain, `lotus-size-${size}-${paddingControl}`);

  if (labelProps)
  {
    return <Label {...labelProps} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}>
      <input type='text' {...propsInput} className={InputFieldClass} />
    </Label>
  }
  else
  {
    return <input type='text' {...propsInput} className={InputFieldClass} />
  }
};
