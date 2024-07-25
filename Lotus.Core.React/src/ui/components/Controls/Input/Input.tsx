import classNames from 'classnames';
import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlSize } from 'ui/types';
import './Input.css';

export interface IInputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'>
{
  /**
   * Цвет
   */
  color?: TColorType;

  /**
   * Размер поля
   */
  size?: TControlSize;
}

 
export const Input: React.FC<IInputProps> = ({ color = 'primary', size = 'medium', ...props }: IInputProps) =>
{
  const inputClass = classNames('lotus-input',
    `lotus-input-${color}`,
    `lotus-size-${size}`,
    `lotus-border-${color}`);

  return <input type='text' {...props} className={inputClass} />;
};
