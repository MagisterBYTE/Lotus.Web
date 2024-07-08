
export class BooleanHelper
{
  /**
   * Текстовые значение логического типа которые означает истинное значение
   */
  public static readonly TrueValues: string[] =
    [
      'True',
      'true',
      '1',
      'on',
      'On',
      'истина',
      'Истина',
      'да',
      'Да'
    ];

  public static Parse(text: string): boolean
  {
    return BooleanHelper.TrueValues.indexOf(text) > -1;
  }

  public static getBooleanValue(value: boolean, yes: string = 'Да', no: string = 'Нет')
  {
    return (value ? yes : no);
  }
}
