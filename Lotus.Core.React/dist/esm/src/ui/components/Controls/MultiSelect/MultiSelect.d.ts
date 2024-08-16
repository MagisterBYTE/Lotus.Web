import { ISelectOption, TKey } from 'lotus-core';
import { ReactNode } from 'react';
import { Props } from 'react-select';
import { ILabelProps } from 'ui/components/Display/Label';
import { TColorType, TControlPadding, TControlSize, TCssWidth } from 'ui/types';
export interface IMultiSelectProps<TValueOption extends TKey = TKey> extends Props<ISelectOption, true> {
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
     * Функция обратного вызова для установки выбранных значений
     * @param selectedValues Выбранные значения или пустой массив
     * @returns
     */
    onSetSelectedValues?: (selectedValues: TValueOption[]) => void;
    /**
     * Изначально выбранные значения
     */
    initialSelectedValues?: TValueOption[];
    /**
     * Дополнительный элемент справа
     */
    rightElement?: ReactNode;
}
export declare const MultiSelect: <TValueOption extends TKey = TKey>({ color, size, isBackground, paddingControl, width, labelProps, hasIcons, options, onSetSelectedValues, initialSelectedValues, rightElement, ...propsReactSelect }: IMultiSelectProps<TValueOption>) => import("react/jsx-runtime").JSX.Element;
