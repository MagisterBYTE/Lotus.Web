/**
 * Описание типа свойства
 */
export interface IPropertyTypeDesc
{
  id: number,
  name: string,
}

/**
 * Перечисление для типа свойства
 */
export const PropertyTypeEnum =
{
  /**
   * Логический тип
   */
  Boolean:
  {
    id: 0,
    name: 'Boolean' 
  },

  /**
   * Целый тип
   */
  Integer:
  {
    id: 1,
    name: 'Integer' 
  },  

  /**
   * Вещественный тип
   */
  Float:
  {
    id: 2,
    name: 'Float' 
  },

  /**
   * Строковый тип
   */
  String:
  {
    id: 3,
    name: 'String' 
  },

  /**
   * Перечисление
   */
  Enum:
  {
    id: 4,
    name: 'Enum' 
  }, 
  
  /**
   * Тип даты-времени
   */
  DateTime:
  {
    id: 5,
    name: 'DateTime' 
  }, 
  
  /**
   * Глобальный идентификатор в формате UUID
   */
  Guid:
  {
    id: 6,
    name: 'Guid' 
  },  
  
  /**
   * Объект
   */  
  Object:
  {
    id: 7,
    name: 'Object' 
  }    
} as const;

/**
 * Тип свойства
 */
export type TPropertyType = keyof typeof PropertyTypeEnum;