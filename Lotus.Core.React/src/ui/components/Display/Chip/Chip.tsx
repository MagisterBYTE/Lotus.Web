import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlSize, TControlVariant } from 'ui/types';
import './Chip.css';
import { cx } from '@emotion/css';

export interface IChipProps extends ComponentPropsWithRef<'span'>
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
  variant?: TControlVariant;

  /**
   * Надпись
   */
  label: string;
}

export const Chip: React.FC<IChipProps> = ({ color = 'primary', size = 'medium', variant = 'filled', ...props }: IChipProps) => 
{
  const chipClass = cx('lotus-chip',
    `lotus-chip-${variant}-${color}`,
    `lotus-size-${size}`,
    variant == 'filled' ? `lotus-background-${color}` : `lotus-border-${color}`,
    `lotus-foreground-${color}`);
  return <span {...props} className={chipClass}>{props.label}</span>;
};
