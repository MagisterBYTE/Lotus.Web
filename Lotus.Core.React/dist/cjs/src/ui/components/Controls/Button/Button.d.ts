import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlPadding } from 'ui/types';
import { TControlSize } from 'ui/types/ControlSize';
import { TButtonVariant } from './ButtonVariant';
export interface IButtonProps extends ComponentPropsWithRef<'button'> {
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
    /**
     * Внутренний отступ
     */
    paddingControl?: TControlPadding;
}
export declare const Button: React.FC<IButtonProps>;
