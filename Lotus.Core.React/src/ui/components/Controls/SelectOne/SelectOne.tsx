import classNames from 'classnames';
import { ISelectOption, SelectOptionHelper } from 'modules/selectOption';
import { ComponentPropsWithRef, useState } from 'react';
import { TKey } from 'types';
import { TColorType, TControlSize } from 'ui/types';
import './SelectOne.css';

export interface ISelectOneProps<TValueOption extends TKey = TKey> extends Omit<ComponentPropsWithRef<'select'>, 'size'>
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
   * Дополнительные свойства элемента select
   */
  selectProps?: Omit<ComponentPropsWithRef<'select'>, 'size'>
}

 
export const SelectOne = <TValueOption extends TKey = TKey>(props: ISelectOneProps<TValueOption>) =>
{
  const {options, initialSelectedValue, onSetSelectedValue} = props;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedValue, setSelectedValue] = useState<TValueOption>(SelectOptionHelper.getDefaultValue(options, initialSelectedValue));

   
  // const [selectedText, setSelectedText] = useState<string>(SelectOptionHelper.getDefaultText(options, initialSelectedValue));

   
  // const [selectedIcon, setSelectedIcon] = useState<ReactNode>(SelectOptionHelper.getDefaultIcon(options, initialSelectedValue));

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => 
  {
    const value = event.target.value as TValueOption;
    // setSelectedValue(value);
    // setSelectedText(SelectOptionHelper.getTextByValue(options, value));
    // setSelectedIcon(SelectOptionHelper.getTextByValue(options, value));
    if (onSetSelectedValue)
    {
      onSetSelectedValue(value);
    }
  };

  const renderItem = (option: ISelectOption) =>
  {
    if (option.icon)
    {
      if (typeof option.icon === 'string')
      {
        return (<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img src={option.icon} width="32" height="32" />
          <span style={{ paddingLeft: 8 }}>{option.text}</span>
        </div>)
      }
      else
      {
        return (<div>
          <div>
            {option.icon}
          </div>
          <span>{option.text}</span>
        </div>)
      }
    }
    else
    {
      return <span>{option.text}</span>;
    }
  }

  const selectClass = classNames('lotus-select-one',
    `lotus-select-one-${props.color}`,
    `lotus-size-${props.size}`,
    `lotus-border-${props.color}`);

  return (
    <select {...props.selectProps} onChange={handleSelect} className={selectClass}>
      {
        options.map((option) => <option>{renderItem(option)}</option>)
      }
    </select>);
};
