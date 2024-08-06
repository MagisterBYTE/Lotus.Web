import { css, cx } from '@emotion/css';
import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlState } from 'ui/types';
import { TControlSize } from 'ui/types/ControlSize';
import useRipple from 'use-ripple-hook';
import { ButtonHelper } from './ButtonHelper';
import { TButtonVariant } from './ButtonVariant';

export interface IButtonProps extends ComponentPropsWithRef<'button'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Размер кнопки
   */
  size?: TControlSize;

  /**
   * Вариант отображения
   */
  variant?: TButtonVariant;
}

export const Button: React.FC<IButtonProps> = ({ color = TColorType.Primary, size = TControlSize.Medium, variant = TButtonVariant.Filled, 
  ...props }: IButtonProps) =>
{
  const buttonMain = css`
    font-family: var(--lotus-font-main);
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    border-width: var(--lotus-border-width);
    border-style: var(--lotus-border-style);
    border-radius: var(--lotus-border-radius);
    ${ButtonHelper.getBorderColorProps(color, variant, TControlState.Normal)}
    ${ButtonHelper.getColorProps(color, variant, TControlState.Normal)}
    ${ButtonHelper.getBackgroundColorProps(color, variant, TControlState.Normal)}
    transition: background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color 400ms cubic-bezier(0.4, 0, 0.2, 1), 
    color 400ms cubic-bezier(0.4, 0, 0.2, 1);
      &:hover {
        ${ButtonHelper.getBorderColorProps(color, variant, TControlState.Hover)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, TControlState.Hover)}
        ${ButtonHelper.getColorProps(color, variant, TControlState.Hover)}
      }
      &:active {
        ${ButtonHelper.getBorderColorProps(color, variant, TControlState.Pressed)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, TControlState.Pressed)}
        ${ButtonHelper.getColorProps(color, variant, TControlState.Pressed)}
      }
      &:disabled {
        ${ButtonHelper.getBorderColorProps(color, variant, TControlState.Disabled)}
        ${ButtonHelper.getBackgroundColorProps(color, variant, TControlState.Disabled)}
        ${ButtonHelper.getColorProps(color, variant, TControlState.Disabled)}
        opacity: 0.65;
      }
  `;
  
  const buttonClass = cx(buttonMain, `lotus-size-${size}`);

  const [ripple, event] = useRipple({duration: 400, color: 'rgba(255, 255, 255, 0.5)', disabled: props.disabled});

  return (
    <button {...props} ref={ripple} className={buttonClass} onPointerDown={event}>
      {props.children}
    </button>);
};
