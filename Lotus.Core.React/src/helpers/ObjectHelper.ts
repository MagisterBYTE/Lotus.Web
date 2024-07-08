export class ObjectHelper
{
  /**
   * Проверка значения на undefined или null
   * @param value Проверяемое значение
   * @returns Статус проверки
   */
  public static isNullOrUndefined = (value: unknown) => 
  {
    return value === undefined || value === null;
  }

  /**
   * Проверка объекта на то, что все его свойства имеют значения undefined
   * @param object Проверяемый объект
   * @returns Статус проверки
   */
  public static isObjectValuesEmpty = (object: object): boolean => 
  {
    return !Object.values(object).some((value) => value !== undefined)
  }
}
