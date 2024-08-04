import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { TColorType, TControlVariant } from 'ui/types';
import { TControlSize } from 'ui/types/ControlSize';
import useRipple from 'use-ripple-hook';
import './Button.css';
import { css } from '@emotion/css';
import classNames from 'classnames';

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
  variant?: TControlVariant;

  /**
   * Надпись
   */
  label: ReactNode;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Button: React.FC<IButtonProps> = ({ color = 'primary', size = 'medium', variant = 'filled', ...props }: IButtonProps) =>
{
  // const {sizeControl} = useThemeSelector();


  const buttonMain = css`
    font-family: var(--lotus-font-main);
    font-weight: bold;
    cursor: pointer;
    display: inline-block;
    line-height: 1;
    border-color: var(--lotus-color-${color}Dark);
    border-width: var(--lotus-border-width);
    border-style: var(--lotus-border-style);
    border-radius: var(--lotus-border-radius);
    color: white;
    background-color: var(--lotus-color-${color});
    transition: background-color 400ms cubic-bezier(0.4, 0, 0.2, 1), 
    box-shadow 400ms cubic-bezier(0.4, 0, 0.2, 1), 
    border-color 400ms cubic-bezier(0.4, 0, 0.2, 1), 
    color 400ms cubic-bezier(0.4, 0, 0.2, 1);
      &:hover {
        background-color: var(--lotus-color-${color}Dark);
      }
  `;
  

  const buttonClass = classNames(buttonMain, `lotus-size-${size}`);

  const [ripple, event] = useRipple({duration: 400, color: 'rgba(255, 255, 255, 0.5)', disabled: props.disabled});

  return (
    <button {...props} ref={ripple} className={buttonClass} onPointerDown={event}>
      {props.label}
    </button>);
};
