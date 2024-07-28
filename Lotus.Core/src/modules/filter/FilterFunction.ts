import { localizationCore } from 'localization';

/**
 * Описание функции фильтрации
 */
export interface IFilterFunctionDesc
{
  id: number,
  name: string,
  abbr: string,
  desc: string
}

/**
 * Перечисление для типа функции для фильтрации данных
 */
export const FilterFunctionEnum =
  {
    /**
     * Равно аргументу
     */
    Equals:
    {
      id: 0,
      name: 'equals',
      abbr: localizationCore.filters.equalsAbbr,
      desc: localizationCore.filters.equals
    },

    /**
     * Не равно аргументу
     */
    NotEqual:
    {
      id: 1,
      name: 'notEquals',
      abbr: localizationCore.filters.notEqualAbbr,
      desc: localizationCore.filters.notEqual
    },

    /**
     * Меньше аргумента
     */
    LessThan:
    {
      id: 2,
      name: 'lessThan',
      abbr: localizationCore.filters.lessThanAbbr,
      desc: localizationCore.filters.lessThan
    },

    /**
     * Меньше или равно аргумента
     */
    LessThanOrEqual:
    {
      id: 3,
      name: 'lessThanOrEqualTo',
      abbr: localizationCore.filters.lessThanOrEqualAbbr,
      desc: localizationCore.filters.lessThanOrEqual
    },

    /**
     * Больше аргумента
     */
    GreaterThan:
    {
      id: 4,
      name: 'greaterThan',
      abbr: localizationCore.filters.greaterThanAbbr,
      desc: localizationCore.filters.greaterThan
    },

    /**
     * Больше или равно аргумента
     */
    GreaterThanOrEqual:
    {
      id: 5,
      name: 'greaterThanOrEqualTo',
      abbr: localizationCore.filters.greaterThanOrEqualAbbr,
      desc: localizationCore.filters.greaterThanOrEqual
    },

    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    Between:
    {
      id: 6,
      name: 'between',
      abbr: localizationCore.filters.betweenAbbr,
      desc: localizationCore.filters.between
    },

    /**
    * Аргумент (строка) может находиться в любом месте c учетом регистра
    */
    Contains:
    {
      id: 7,
      name: 'contains',
      abbr: localizationCore.filters.contains,
      desc: localizationCore.filters.contains
    },

    /**
    * Аргумент(строка) может находиться в любом месте c учетом регистра
    */
    StartsWith:
    {
      id: 8,
      name: 'startsWith',
      abbr: localizationCore.filters.startsWith,
      desc: localizationCore.filters.startsWith
    },

    /**
     * Аргумент(строка) должна находится в конце c учетом регистра
     */
    EndsWith:
    {
      id: 9,
      name: 'endsWith',
      abbr: localizationCore.filters.endsWith,
      desc: localizationCore.filters.endsWith
    },

    /**
     * Не равно пустой строке. Аргумент пустая строка
     */
    NotEmpty:
    {
      id: 10,
      name: 'notEmpty',
      abbr: localizationCore.filters.notEmpty,
      desc: localizationCore.filters.notEmpty
    },

    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAny:
    {
      id: 11,
      name: 'includeAny',
      abbr: localizationCore.filters.includeAny,
      desc: localizationCore.filters.includeAny
    },

    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAll:
    {
      id: 12,
      name: 'includeAll',
      abbr: localizationCore.filters.includeAll,
      desc: localizationCore.filters.includeAll
    },

    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    IncludeEquals:
    {
      id: 13,
      name: 'includeEquals',
      abbr: localizationCore.filters.includeEquals,
      desc: localizationCore.filters.includeEquals
    },

    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    IncludeNone:
    {
      id: 14,
      name: 'includeNone',
      abbr: localizationCore.filters.includeNone,
      desc: localizationCore.filters.includeNone
    }
  } as const;

/**
 * Тип функция для фильтрации данных
 */
export type TFilterFunction = keyof typeof FilterFunctionEnum;