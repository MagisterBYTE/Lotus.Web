import { ISelectOption, SelectOptionHelper, TKey } from 'lotus-core';
import { ReactNode, useState } from 'react';
import { ActionMeta, InputActionMeta, MultiValue, OptionProps, Props } from 'react-select';
import Select from 'react-select/base';
import { ILabelProps, Label } from 'ui/components/Display/Label';
import { HorizontalStack } from 'ui/components/Layout/HorizontalStack';
import { TColorType, TControlSize } from 'ui/types';


export interface ISelectMultiProps<TValueOption extends TKey = TKey> extends ILabelProps, Props<ISelectOption, true>
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

export const SelectMulti = <TValueOption extends TKey = TKey>({ options, onSetSelectedValues, initialSelectedValues,
  textInfo, textInfoKey, labelStyle, isTopLabel, rightElement, ...props }: ISelectMultiProps<TValueOption>) =>
{
  const [selectedOptions, setSelectedOptions] = useState<ISelectOption[]>(
    SelectOptionHelper.getSelectOptionsByValues(options, initialSelectedValues));

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelect = (newValue: MultiValue<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => 
  {
    const selectedValues = newValue.map(x => x.value);
    setSelectedOptions(newValue.map(x => x));
    if (onSetSelectedValues)
    {
      onSetSelectedValues(selectedValues);
    }
  };

  const RenderItem = (props: OptionProps<ISelectOption>) => 
  {
    const {
      className,
      cx,
      isDisabled,
      isFocused,
      isSelected,
      innerRef,
      innerProps,
      data
    } = props;

    if (data.icon)
    {
      if (typeof data.icon === 'string')
      {
        return (
          <div
            ref={innerRef}
            className={cx(
              {
                option: true,
                'option--is-disabled': isDisabled,
                'option--is-focused': isFocused,
                'option--is-selected': isSelected
              },
              className
            )}
            {...innerProps}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <img src={data.icon} width='32' height='32' />
              <span style={{ paddingLeft: 8 }}>{data.text}</span>
            </div>
          </div>);
      }
      else
      {
        return (
          <div
            ref={innerRef}
            className={cx(
              {
                option: true,
                'option--is-disabled': isDisabled,
                'option--is-focused': isFocused,
                'option--is-selected': isSelected
              },
              className
            )}
            {...innerProps}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <>
                {data.icon}
              </>
              <span style={{ paddingLeft: 8 }}>{data.text}</span>
            </div>
          </div>);
      }
    }
    else
    {
      return (
        <div
          ref={innerRef}
          className={cx(
            {
              option: true,
              'option--is-disabled': isDisabled,
              'option--is-focused': isFocused,
              'option--is-selected': isSelected
            },
            className
          )}
          {...innerProps}
        >
          <span>{data.text}</span>
        </div>
      );
    }
  }

  return (
    <Label
      label={props.label}
      labelStyle={labelStyle}
      isTopLabel={isTopLabel}
      fullWidth={props.fullWidth}
      textInfo={textInfo}
      textInfoKey={textInfoKey} >
      <HorizontalStack fullWidth>
        <Select
          isMulti
          options={options}
          {...props}
          value={selectedOptions}
          onChange={handleSelect}
          components={{ Option: RenderItem }}
          inputValue=''
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onInputChange={function (newValue: string, actionMeta: InputActionMeta): void
          {
            throw new Error('Function not implemented.');
          }}
          onMenuOpen={function (): void
          {
            throw new Error('Function not implemented.');
          }} onMenuClose={function (): void
          {
            throw new Error('Function not implemented.');
          }} />
        {rightElement}
      </HorizontalStack>
    </Label>
  );
};
