import { FilterFunctionEnum, IFilterFunctionDesc } from './FilterFunction';

/**
 * Группа функций фильтрации для числовых типов
 */
export const GroupFilterFunctionsNumber: IFilterFunctionDesc[] =
  [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.NotEqual,
    FilterFunctionEnum.LessThan,
    FilterFunctionEnum.LessThanOrEqual,
    FilterFunctionEnum.GreaterThan,
    FilterFunctionEnum.GreaterThanOrEqual,
    FilterFunctionEnum.Between
  ];

/**
 * Группа функций фильтрации для строк
 */
export const GroupFilterFunctionsString: IFilterFunctionDesc[] =
  [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.Contains,
    FilterFunctionEnum.StartsWith,
    FilterFunctionEnum.EndsWith,
    FilterFunctionEnum.NotEqual,
    FilterFunctionEnum.NotEmpty
  ];

/**
 * Группа функций фильтрации для перечисления
 */
export const GroupFilterFunctionsEnum: IFilterFunctionDesc[] =
  [
    FilterFunctionEnum.Equals,
    FilterFunctionEnum.NotEqual
  ];

/**
 * Группа функций фильтрации для массива
 */
export const GroupFilterFunctionsArray: IFilterFunctionDesc[] =
  [
    FilterFunctionEnum.IncludeAll,
    FilterFunctionEnum.IncludeAny,
    FilterFunctionEnum.IncludeEquals,
    FilterFunctionEnum.IncludeNone
  ];
