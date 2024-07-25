
export class NumberHelper
{
  // #region Integer

  /**
   * Проверка на установленный флаг
   * @param value Значение
   * @param flag Проверяемый флаг
   * @returns Статус установки флага
   */
  public static IsFlagSet(value: number, flag: number): boolean
  {
    return (value & flag) != 0;
  }

  /**
   * Установка флага
   * @param value Значение
   * @param flag Флаг
   * @returns Новое значение
   */
  public static SetFlag(value: number, flags: number): number
  {
    value |= flags;
    return value;
  }

  /**
   * Очистка флага
   * @param value Значение
   * @param flags Флаг
   * @returns Новое значение
   */
  public static ClearFlag(value: number, flags: number): number
  {
    value &= ~flags;
    return value;
  }

  /**
   * Преобразование в текст который можно сконвертировать в целый тип
   * @param text Текст
   * @returns Текст
   */
  public static ParseableTextInt(text: string): string
  {
    let numberText: string = '';

    let add_minus = false;
    const max = 11;
    for (let i = 0; i < text.length; i++)
    {
      const c = text[i]!;

      if (c == '-' && (i != text.length - 1) && add_minus == false)
      {
        numberText += c;
        add_minus = true;
        continue;
      }

      if (c >= '0' && c <= '9')
      {
        numberText += c;
      }

      if (numberText.length > max)
      {
        break;
      }
    }

    return numberText;
  }

  /**
   * Преобразование текста в целое число
   * @param text Текст
   * @param defaultValue Значение по умолчанию если преобразовать не удалось
   * @returns Значение
   */
  public static ParseInt(text: string, defaultValue: number = 0): number
  {
    text = NumberHelper.ParseableTextInt(text);

    const resultValue = Number.parseInt(text);

    if (Number.isNaN(resultValue))
    {
      return defaultValue;
    }

    return resultValue;
  }
  // #endregion

  // #region Float

  /**
   * Преобразование в текст который можно сконвертировать в вещественный тип
   * @param text Текст
   * @returns Текст
   */
  public static ParseableTextFloat(text: string): string
  {
    let numberText = '';

    let add_minus = false;
    let add_dot = false;
    for (let i = 0; i < text.length; i++)
    {
      const c = text[i]!;

      if (c == '-' && (i != text.length - 1) && add_minus == false)
      {
        numberText += c;
        add_minus = true;
        continue;
      }

      if ((c == ',' || c == '.') && (i != text.length - 1) && add_dot == false)
      {
        numberText += '.';
        add_dot = true;
        continue;
      }

      if (c >= '0' && c <= '9')
      {
        numberText += c;
      }
    }

    return numberText;
  }

  /**
   * Преобразование текста в вещественное число
   * @param text Текст
   * @param defaultValue Значение по умолчанию если преобразовать не удалось
   * @returns Значение
   */
  public static ParseFloat(text: string, defaultValue: number = 0): number
  {
    text = NumberHelper.ParseableTextFloat(text);

    const resultValue = Number.parseFloat(text);

    if (Number.isNaN(resultValue))
    {
      return defaultValue;
    }

    return resultValue;
  }

  // #endregion
}
