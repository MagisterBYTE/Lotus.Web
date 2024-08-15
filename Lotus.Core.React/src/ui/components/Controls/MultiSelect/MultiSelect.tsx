/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISelectOption, SelectOptionHelper, TKey } from 'lotus-core';
import { ReactNode, useState } from 'react';
import ReactSelect, { ActionMeta, components, MultiValue, MultiValueProps, OptionProps, Props, StylesConfig } from 'react-select';
import { ILabelProps, Label } from 'ui/components/Display/Label';
import { TColorType, TControlPadding, TControlSize, TCssWidth } from 'ui/types';
import { ThemeHelper } from 'app/theme';
import { IconContext } from 'react-icons';
import { TypographyHelper } from 'ui/components/Display/Typography';
import { SelectHelper } from '../Select/SelectHelper';

export interface IMultiSelectProps<TValueOption extends TKey = TKey> extends Props<ISelectOption, true> 
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

export const MultiSelect = <TValueOption extends TKey = TKey>(
  {
    color = TColorType.Primary,
    size = TControlSize.Medium,
    isBackground = false,
    paddingControl = TControlPadding.Normal,
    width,
    labelProps,
    hasIcons = false,
    options,
    onSetSelectedValues,
    initialSelectedValues,
    rightElement,
    ...propsReactSelect
  }: IMultiSelectProps<TValueOption>) => 
{
  const [selectedOptions, setSelectedOptions] = useState<ISelectOption[]>(SelectOptionHelper.getSelectOptionsByValues(options,
    initialSelectedValues));

  const handleMultiSelect = (newValue: MultiValue<ISelectOption>, _actionMeta: ActionMeta<ISelectOption>) => 
  {
    if(newValue)
    {
      const values = newValue.map(x => x.value);
      setSelectedOptions(Array.from(newValue));
      if (onSetSelectedValues)
      {
        onSetSelectedValues(values);
      }
    }
    else
    {
      setSelectedOptions([]);
      if (onSetSelectedValues)
      {
        onSetSelectedValues([]);
      }
    }
  };

  const selectOptionStyles: StylesConfig<ISelectOption> = {
    container: (base) => ({
      ...base,
      width: width,
      minHeight: hasIcons ? `${SelectHelper.getMainContainerHeightFromSize(size)}px` : base.minHeight
    }),
    control: (styles, state) =>
      ({
        ...styles,
        minHeight: hasIcons ? `${SelectHelper.getMainContainerHeightFromSize(size)}px` : styles.minHeight,
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
      padding: '2px',
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
        marginLeft: 0,
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

    multiValue: (styles, { data, isDisabled }) =>
    {
      return {
        ...styles,
        backgroundColor: `var(--lotus-color-${color}Palest)`,
        borderColor: `var(--lotus-color-${color}Light)`,
        ...ThemeHelper.getBorderPropsAsCSS(),
        padding: hasIcons ? `var(--lotus-padding-${paddingControl}-${size})` : 1,
        marginLeft: '2px',
        ...ThemeHelper.getFontFamilyPropsAsCSS(),
        ...ThemeHelper.getFontSizeByControlSizeAsCSS(size),
        ...ThemeHelper.getTransitionPropsAsCSS(),
        ... (hasIcons ? SelectHelper.getFlexContainer(size) : {})
      };
    },

    multiValueRemove: (styles) =>
    {
      return {
        ...styles,
        ':hover':
        {
          backgroundColor: `var(--lotus-color-${color}Light)`
        }
      };
    },

    multiValueLabel: (styles) =>
    {
      return {
        ...styles,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '0.4rem'
      };
    }
  };

  const { Option, MultiValue } = components;
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

  const RenderMultiValue = (props: MultiValueProps<ISelectOption>) =>
  {
    if (props.data.icon)
    {
      if (typeof props.data.icon === 'string')
      {
        const sizeIcon = `${ThemeHelper.convertControlSizeToIconSizeInPixel(size)}px`;
        return (<MultiValue {...props}>
          <img src={props.data.icon} width={sizeIcon} height={sizeIcon} />
          {props.data.text}
        </MultiValue>)
      }
      else
      {
        return (<MultiValue {...props}>
          <IconContext.Provider value={{ size: `${ThemeHelper.convertControlSizeToIconSizeInRem(size)}rem`, style: { marginLeft: '-10x' } }}>
            {props.data.icon}
          </IconContext.Provider>
          {props.data.text}
        </MultiValue>)
      }
    }
    else
    {
      return (<MultiValue {...props}>
        {props.data.text}
      </MultiValue>)
    }
  }

  const RenderReactSelect = () =>
  {
    return <ReactSelect
      isMulti
      {...propsReactSelect}
      options={options}
      value={selectedOptions}
      styles={selectOptionStyles}
      classNamePrefix='react-multiSelect'
      getOptionLabel={(MultiSelectOption) => MultiSelectOption.text}
      getOptionValue={(MultiSelectOption) => MultiSelectOption.value}
      // @ts-expect-error handleMultiSelect
      onChange={handleMultiSelect}
      className='basic-multi-select'
      components={{ Option: RenderOption, MultiValue: RenderMultiValue }}
    />
  }

  if (labelProps)
  {
    return <Label {...labelProps} variant={labelProps.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)} >
      {RenderReactSelect()}
    </Label>
  }
  else
  {
    return RenderReactSelect();
  }
}