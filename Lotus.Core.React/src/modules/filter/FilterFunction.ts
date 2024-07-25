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
      abbr: localizationCore.filtres.equalsAbbr,
      desc: localizationCore.filtres.equals
    },

    /**
     * Не равно аргументу
     */
    NotEqual:
    {
      id: 1,
      name: 'notEquals',
      abbr: localizationCore.filtres.notEqualAbbr,
      desc: localizationCore.filtres.notEqual
    },

    /**
     * Меньше аргумента
     */
    LessThan:
    {
      id: 2,
      name: 'lessThan',
      abbr: localizationCore.filtres.lessThanAbbr,
      desc: localizationCore.filtres.lessThan
    },

    /**
     * Меньше или равно аргумента
     */
    LessThanOrEqual:
    {
      id: 3,
      name: 'lessThanOrEqualTo',
      abbr: localizationCore.filtres.lessThanOrEqualAbbr,
      desc: localizationCore.filtres.lessThanOrEqual
    },

    /**
     * Больше аргумента
     */
    GreaterThan:
    {
      id: 4,
      name: 'greaterThan',
      abbr: localizationCore.filtres.greaterThanAbbr,
      desc: localizationCore.filtres.greaterThan
    },

    /**
     * Больше или равно аргумента
     */
    GreaterThanOrEqual:
    {
      id: 5,
      name: 'greaterThanOrEqualTo',
      abbr: localizationCore.filtres.greaterThanOrEqualAbbr,
      desc: localizationCore.filtres.greaterThanOrEqual
    },

    /**
     * Между первым аргументом (меньшим) и вторым аргументом (большим)
     */
    Between:
    {
      id: 6,
      name: 'between',
      abbr: localizationCore.filtres.betweenAbbr,
      desc: localizationCore.filtres.between
    },

    /**
    * Aргумент(строка) может находиться в любом месте c учетом регистра
    */
    Contains:
    {
      id: 7,
      name: 'contains',
      abbr: localizationCore.filtres.contains,
      desc: localizationCore.filtres.contains
    },

    /**
    * Aргумент(строка) может находиться в любом месте c учетом регистра
    */
    StartsWith:
    {
      id: 8,
      name: 'startsWith',
      abbr: localizationCore.filtres.startsWith,
      desc: localizationCore.filtres.startsWith
    },

    /**
     * Aргумент(строка) должна находится в конце c учетом регистра
     */
    EndsWith:
    {
      id: 9,
      name: 'endsWith',
      abbr: localizationCore.filtres.endsWith,
      desc: localizationCore.filtres.endsWith
    },

    /**
     * Не равно пустой строке. Аргумент пустая строка
     */
    NotEmpty:
    {
      id: 10,
      name: 'notEmpty',
      abbr: localizationCore.filtres.notEmpty,
      desc: localizationCore.filtres.notEmpty
    },

    /**
     * Любой из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAny:
    {
      id: 11,
      name: 'includeAny',
      abbr: localizationCore.filtres.includeAny,
      desc: localizationCore.filtres.includeAny
    },

    /**
     * Все из проверяемых элементов списка должен находиться в массиве аргумента
     */
    IncludeAll:
    {
      id: 12,
      name: 'includeAll',
      abbr: localizationCore.filtres.includeAll,
      desc: localizationCore.filtres.includeAll
    },

    /**
     * Проверяемые элементы списка должен быть равны массиву аргумента
     */
    IncludeEquals:
    {
      id: 13,
      name: 'includeEquals',
      abbr: localizationCore.filtres.includeEquals,
      desc: localizationCore.filtres.includeEquals
    },

    /**
     * Ни один из проверяемых элементов списка не должен находится в массиве аргумента
     */
    IncludeNone:
    {
      id: 14,
      name: 'includeNone',
      abbr: localizationCore.filtres.includeNone,
      desc: localizationCore.filtres.includeNone
    }
  } as const;

/**
 * Тип функция для фильтрации данных
 */
export type TFilterFunction = keyof typeof FilterFunctionEnum;