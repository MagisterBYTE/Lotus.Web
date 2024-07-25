import { ArrayHelper } from 'helpers/ArrayHelper';
import { TKey } from 'types/Key';
import { ReactNode } from 'react';
import { ISelectOption } from './SelectOption';

export class SelectOptionHelper
{
  /**
   * Преобразование в типизированный массив
   * @param options Список опций
   * @returns 
   */
  public static convertToNumber(options: ISelectOption[]): ISelectOption[]
  {
    const result = options.map((x) =>
    {
      const value: ISelectOption = { text: x.text, value: Number(x.value) };
      return value;
    });

    return result;
  }

  /**
   * Преобразование в типизированный массив
   * @param options Список опций
   * @returns 
   */
  public static convertToString(options: ISelectOption[]): ISelectOption[]
  {
    const result = options.map((x) =>
    {
      const value: ISelectOption = { text: x.text, value: String(x.value) };
      return value;
    });

    return result;
  }

  /**
   * Получение корректного значения по умолчанию или начального значения
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns 
   */
  public static getDefaultValue<TValueOption extends TKey = TKey>(options: ISelectOption[], initialSelectedValue?: TValueOption): TValueOption
  {
    if (initialSelectedValue)
    {
      return initialSelectedValue;
    }

    return options[0]!.value as TValueOption;
  }

  /**
   * Получение корректного текста по умолчанию или начального значения текста
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns 
   */
  public static getDefaultText<TValueOption extends TKey = TKey>(options: ISelectOption[], initialSelectedValue?: TValueOption): string
  {
    if (initialSelectedValue)
    {
      let text = '';
      options.forEach(element => 
      {
        if (element.value === initialSelectedValue)
        {
          text = element.text;
        }
      });

      return text;
    }

    return options[0]!.text;
  }

  /**
   * Получение корректной иконки по умолчанию или начальной иконки
   * @param options Список опций
   * @param initialSelectedValue Начальное значение
   * @returns 
   */
  public static getDefaultIcon<TValueOption extends TKey = TKey>(options: ISelectOption[], initialSelectedValue?: TValueOption): ReactNode
  {
    if (initialSelectedValue)
    {
      let icon: ReactNode = undefined;
      options.forEach(element => 
      {
        if (element.value === initialSelectedValue)
        {
          icon = element.icon;
        }
      });

      return icon;
    }

    return options[0]!.icon;
  }

  /**
   * Получение корректного текста по умолчанию или начального значения текста
   * @param options Список опций
   * @param initialSelectedValues Начальное значение
   * @returns Массив текста выбранных значений
   */
  public static getDefaultTexts<TValueOption extends TKey = TKey>(options: ISelectOption[], initialSelectedValues?: TValueOption[]): string[]
  {
    if (initialSelectedValues && initialSelectedValues.length > 0)
    {
      const texts: string[] = [];

      options.forEach(element => 
      {
        if (initialSelectedValues.find((x) => x === element.value))
        {
          texts.push(element.text)
        }
      });

      return texts;
    }
    else
    {
      return [];
    }
  }

  /**
   * Получение текста из значения опций
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Текст выбранного значения
   */
  public static getTextByValue(options: ISelectOption[], selectedValue?: TKey): string
  {
    let text = '';
    if (selectedValue)
    {
      options.forEach(element => 
      {
        if (element.value === selectedValue)
        {
          text = element.text;
        }
      });
    }

    return text;
  }

  /**
   * Получение иконки из значения опций
   * @param options Массив всех опций
   * @param selectedValue Выбранное значение
   * @returns Иконка выбранного значения
   */
  public static getIconByValue(options: ISelectOption[], selectedValue?: TKey): ReactNode
  {
    let icon: ReactNode = undefined;
    if (selectedValue)
    {
      options.forEach(element => 
      {
        if (element.value === selectedValue)
        {
          icon = element.icon;
        }
      });
    }

    return icon;
  }

  /**
   * Получение массива текста из выбранных значений опций
   * @param options Массив всех опций
   * @param selectedValues Выбранные значения
   * @returns Массив текста выбранных значений
   */
  public static getTextsByValues(options: ISelectOption[], selectedValues?: TKey[]): string[]
  {
    if (selectedValues && selectedValues.length > 0)
    {
      const texts: string[] = [];

      options.forEach(element => 
      {
        if (selectedValues.find((x) => x === element.value))
        {
          texts.push(element.text)
        }
      });

      return texts;
    }
    else
    {
      return [];
    }
  }

  /**
   * Получение массива текста из неопределённого значения(свойства объекта)
   * @param options Массив всех опций
   * @param item Неопределённое значение
   * @returns Массив текста выбранных значений
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getTextsByUnknownValues = (options: ISelectOption[], item: any): string[] =>
  {
    if (Array.isArray(item))
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const massive: any[] = item;
      if (ArrayHelper.checkIsNumbers(massive))
      {
        const numbers = massive.map((x) => 
        {
          const value: number = Number(x);
          return value;
        });

        const result = SelectOptionHelper.getTextsByValues(options, numbers);
        return result;
      }
      else
      {
        const texts = massive.map((x) => 
        {
          const value: string = String(x)
          return value;
        });

        const result = SelectOptionHelper.getTextsByValues(options, texts);
        return result;
      }
    }

    return [];
  }
}