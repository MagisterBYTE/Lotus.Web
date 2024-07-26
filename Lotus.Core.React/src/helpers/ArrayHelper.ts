import { IGrouping } from 'types/Grouping';

export class ArrayHelper
{
  /**
   * Получить числовой массив в указанном диапазоне
   * @param from Начальное значение
   * @param to Конечное значение
   * @returns Числовой массив
   */
  public static getNumberArrayFromTo(from: number, to: number): number[]
  {
    const result: number[] = [];

    for (let i: number = from; i <= to; i++)
    {
      result.push(i);
    }

    return result;
  };

  /**
   * Проверка массива что он является строго числовым
   * @param array Проверяемый массив
   * @returns Статус проверки
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static checkIsNumbers(array: any[])
  {
    return array.every((element) =>
    {
      return typeof element === 'number';
    });
  }

  /**
   * Проверка на вхождение любого элемента проверяемого массива в исходном массиве
   * @param source Исходный массив
   * @param checked Проверяемый массив
   * @returns Статус проверки
   */
  public static checkInArrayAny<TItem>(source: TItem[], checked: TItem[]): boolean
  {
    let find: boolean = true;

    for (const element of source)
    {
      find = checked.includes(element);
      if (find)
      {
        break;
      }
    }

    return find;
  }

  /**
   * Группировка массива по указанному свойству
   * @param source Исходный массив
   * @param propertyName Имя свойства по которому будет произведена группировка
   * @returns Массив групп
   */
  public static groupByProperty<TItem>(source: TItem[], propertyName: string): IGrouping<TItem>[]
  {
    const result: IGrouping<TItem>[] = [];

    source.forEach((element) =>
    {
      // @ts-expect-error propertyName
      const key = element[propertyName];

      const exist = result.find((x) => x.groupKey === key);
      if (exist)
      {
        exist.items.push(element);
      }
      else
      {
        const newUserGroup: IGrouping<TItem> = { groupKey: key, items: [element] };
        result.push(newUserGroup);
      }
    });

    return result;
  }
}
