/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISelectOption, TKey } from 'lotus-core';
import { ReactNode, useState } from 'react';
import ReactSelect, { ActionMeta, components, OptionProps, Props, SingleValue, SingleValueProps, StylesConfig } from 'react-select';
import { ILabelProps, Label } from 'ui/components/Display/Label';
import { TColorType, TControlPadding, TControlSize, TCssWidth } from 'ui/types';
import { ThemeHelper } from 'app/theme';
import { IconContext } from 'react-icons';
import { SelectHelper } from './SelectHelper';

export interface ISelectProps<TValueOption extends TKey = TKey> extends Props<ISelectOption, false> 
{
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
  labelProps?: ILabelProps

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
  onSetSelectedValue?: (selectedValue: TValueOption) => void;

  /**
   * Изначально выбранное значение
   */
  initialSelectedValue?: TValueOption;

  /**
   * Дополнительный элемент справа
   */
  rightElement?: ReactNode;
}

export const Select = <TValueOption extends TKey = TKey>(
  {
    color = TColorType.Primary,
    size = TControlSize.Medium,
    isBackground = false,
    paddingControl = TControlPadding.Normal,
    width,
    labelProps,
    hasIcons = false,
    options,
    onSetSelectedValue,
    initialSelectedValue,
    rightElement,
    ...propsReactSelect }: ISelectProps<TValueOption>) => 
{
  const [selectedOption, setSelectedOption] = useState<ISelectOption | undefined>(options.find(x => x.value === initialSelectedValue));

  const handleSelect = (newValue: SingleValue<ISelectOption>, _actionMeta: ActionMeta<ISelectOption>) => 
  {
    const value = newValue?.value;
    setSelectedOption(newValue!);
    if (onSetSelectedValue)
    {
      onSetSelectedValue(value);
    }
  };

  const selectOptionStyles: StylesConfig<ISelectOption> = {
    container: (base) => ({
      ...base,
      width: width
    }),
    control: (styles, state) =>
    ({
      ...styles,
      minHeight: 'unset',
      paddingTop: 0,
      paddingBottom: 0,
      ...ThemeHelper.getFontFamilyPropsAsCSS(),
      ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
      ...ThemeHelper.getTransitionPropsAsCSS(),
      ...ThemeHelper.getBorderPropsAsCSS(),
      ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused),
      ...SelectHelper.getBoxShadowProps(color, state.isDisabled, state.isFocused),
      ':hover':
      {
        ...SelectHelper.getBorderColorProps(color, state.isDisabled, state.isFocused)
      },
      ':disabled':
      {
        ...ThemeHelper.getOpacityPropsForDisabledAsCSS()
      }
    }),
    dropdownIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    valueContainer: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    clearIndicator: (base) => ({
      ...base,
      paddingTop: 0,
      paddingBottom: 0
    }),
    input: (base) => (
      {
        ...base,
        marginLeft: hasIcons ? `${SelectHelper.getMarginOffsetInput(size)}px` : 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
        padding: `var(--lotus-padding-${paddingControl}-${size})`
      }
    ),

    option: (styles, { data, isDisabled, isFocused, isSelected }) => 
    {
      return {
        ...styles,
        padding: `var(--lotus-padding-${paddingControl}-${size})`,
        paddingLeft: `${SelectHelper.getPaddingLeftOption(size)}px`,
        ...ThemeHelper.getFontFamilyPropsAsCSS(),
        ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
        ...ThemeHelper.getTransitionPropsAsCSS(),
        ... (hasIcons ? SelectHelper.getFlexContainer(size) : {}),
        backgroundColor: isDisabled
          ? undefined
          : isSelected
            ? `var(--lotus-color-${color})`
            : isFocused
              ? `var(--lotus-color-${color}Light)`
              : undefined,
        color: isDisabled
          ? 'gray'
          : isSelected
            ? `var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)})`
            : isFocused
              ? `var(--lotus-color-${ThemeHelper.getOptimalForegroundColor(color)})`
              : 'black',
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? 'inherit'
              : `var(--lotus-color-${color}Dark)`
            : undefined
        }
      };
    },

    singleValue: (styles, { data, isDisabled }) =>
    {
      return {
        ...styles,
        padding: hasIcons ? `var(--lotus-padding-${paddingControl}-${size})` : 0,
        marginLeft: hasIcons ? `${SelectHelper.getMarginOffsetSingleValue(size)}px` : '2px',
        ...ThemeHelper.getFontFamilyPropsAsCSS(),
        ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
        ...ThemeHelper.getTransitionPropsAsCSS(),
        ... (hasIcons ? SelectHelper.getFlexContainer(size) : {})
      };
    }
  };

  const { Option, SingleValue } = components;
  const RenderOption = (props: OptionProps<ISelectOption>) => 
  {
    if (props.data.icon)
    {
      if (typeof props.data.icon === 'string')
      {
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
        return (<Option {...props}>
          <img src={props.data.icon} width={sizeIcon} height={sizeIcon} />
          {props.data.text}
        </Option>)
      }
      else
      {
        return (<Option {...props}>
          <IconContext.Provider value={{ size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem` }}>
            {props.data.icon}
          </IconContext.Provider>
          {props.data.text}
        </Option>)
      }
    }
    else
    {
      return (<Option {...props}>
        {props.data.text}
      </Option>)
    }
  }

  const RenderSingleValue = (props: SingleValueProps<ISelectOption>) =>
  {
    if (props.data.icon)
    {
      if (typeof props.data.icon === 'string')
      {
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
        return (<SingleValue {...props}>
          <img src={props.data.icon} width={sizeIcon} height={sizeIcon} />
          {props.data.text}
        </SingleValue>)
      }
      else
      {
        return (<SingleValue {...props}>
          <IconContext.Provider value={{ size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`, style: { marginLeft: '-10x' } }}>
            {props.data.icon}
          </IconContext.Provider>
          {props.data.text}
        </SingleValue>)
      }
    }
    else
    {
      return (<SingleValue {...props}>
        {props.data.text}
      </SingleValue>)
    }
  }


  if (labelProps)
  {
    return <Label {...labelProps} variant={labelProps.variant ?? ThemeHelper.getTypographyVariantByControlSize(size)}>
      <ReactSelect
        {...propsReactSelect}
        options={options}
        value={selectedOption}
        styles={selectOptionStyles}
        classNamePrefix='react-select'
        getOptionLabel={(selectOption) => selectOption.text}
        getOptionValue={(selectOption) => selectOption.value}
        // @ts-expect-error onChange
        onChange={handleSelect}
        components={{ Option: RenderOption, SingleValue: RenderSingleValue }}
      />
    </Label>
  }
  else
  {
    return <ReactSelect
      {...propsReactSelect}
      options={options}
      value={selectedOption}
      styles={selectOptionStyles}
      classNamePrefix='react-select'
      getOptionLabel={(selectOption) => selectOption.text}
      getOptionValue={(selectOption) => selectOption.value}
      // @ts-expect-error onChange
      onChange={handleSelect}
      components={{ Option: RenderOption, SingleValue: RenderSingleValue }}
    />
  }
}