/**
 * Интерфейс для сортировки по одному свойству
 */
export interface ISortProperty
{
  /**
   * Имя свойства по которому осуществляется сортировки
   */
  propertyName: string;

  /**
   * Статус сортировки по убыванию
   */
  isDesc?:boolean;
}

/**
 * Тип для сортировки объектов
 */
export type ISortObject = ISortProperty[];
