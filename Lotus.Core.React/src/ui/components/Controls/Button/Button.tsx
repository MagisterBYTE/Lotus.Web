import classNames from 'classnames';
import React, { ComponentPropsWithoutRef } from 'react';
import { TColorType, TControlVariant } from 'ui/types';
import { TControlSize } from 'ui/types/ControlSize';
import './Button.css';

export interface IButtonProps extends ComponentPropsWithoutRef<'button'>
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

  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = ({ color = 'primary', size = 'medium', variant = 'filled', ...props }: IButtonProps) =>
{
  const buttonClass = classNames('lotus-button', `lotus-size-${size}`, variant === 'filled' ? `lotus-background-${color}` : `lotus-border-${color}`);

  return <button type='button' {...props} className={buttonClass}>{props.label}</button>;
};
