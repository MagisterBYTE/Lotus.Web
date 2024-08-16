import { ISelectOption, TKey } from 'lotus-core';
import { ReactNode } from 'react';
import { Props } from 'react-select';
import { ILabelProps } from 'ui/components/Display/Label';
import { TColorType, TControlPadding, TControlSize, TCssWidth } from 'ui/types';
export interface ISelectProps<TValueOption extends TKey = TKey> extends Props<ISelectOption, false> {
    /**
     * Цвет
     */
    color?: TColorType;
    /**
     * Размер
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
     * Ширина
     */
    width?: TCssWidth;
    /**
     * Параметры надписи
     */
    labelProps?: ILabelProps;
    /**
     * Имеют ли опции иконки
     */
    hasIcons?: boolean;
    /**
     * Список опций
     */
    options: ISelectOption[];
    /**
     * Функция обратного вызова для установки выбранного значения
     * @param selectedValue Выбранное значение
     * @returns
     */
    onSetSelectedValue?: (selectedValue: TValueOption | undefined) => void;
    /**
     * Изначально выбранное значение
     */
    initialSelectedValue?: TValueOption;
    /**
     * Дополнительный элемент справа
     */
    rightElement?: ReactNode;
}
export declare const Select: <TValueOption extends TKey = TKey>({ color, size, isBackground, paddingControl, width, labelProps, hasIcons, options, onSetSelectedValue, initialSelectedValue, rightElement, ...propsReactSelect }: ISelectProps<TValueOption>) => import("react/jsx-runtime").JSX.Element;
