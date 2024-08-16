import React, { ComponentPropsWithRef } from 'react';
import { TColorType, TControlPadding, TControlSize } from 'ui/types';
import { ILabelProps } from 'ui/components/Display';
export interface IInputFieldProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
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
    labelProps?: ILabelProps;
}
export declare const InputField: React.FC<IInputFieldProps>;
