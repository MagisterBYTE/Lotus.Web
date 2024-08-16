import React, { ComponentPropsWithRef, ReactNode } from 'react';
import { TColorType } from 'ui/types';
import { TTypographyVariant } from '../Typography';
import './Label.css';
export interface ILabelProps extends ComponentPropsWithRef<'p'> {
    /**
     * Параметры надписи
     */
    label?: ReactNode;
    /**
     * Цвет
     */
    color?: TColorType;
    /**
     * Вариант отображения
     */
    variant?: TTypographyVariant;
    /**
     * Размещать надпись сверху
     */
    isTopLabel?: boolean;
}
export declare const Label: React.FC<ILabelProps>;
