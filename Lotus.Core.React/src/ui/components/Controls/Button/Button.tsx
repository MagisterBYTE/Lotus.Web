import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlVariant } from 'ui/types';
import { TControlSize } from 'ui/types/ControlSize';
import './Button.css';

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
  label: string;
}

export const Button: React.FC<IButtonProps> = ({ color = 'primary', size = 'medium', variant = 'filled', ...props }: IButtonProps) =>
{
  const buttonClass = classNames('lotus-button',
    `lotus-button-${variant}-${color}`,
    `lotus-size-${size}`,
    variant == 'filled' ? `lotus-background-${color}` : `lotus-border-${color}`,
    `lotus-foreground-${color}`);

  return <button type='button' {...props} className={buttonClass}>{props.label}</button>;
};
