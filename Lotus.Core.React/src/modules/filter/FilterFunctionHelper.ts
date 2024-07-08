import { FilterFunctionEnum, IFilterFunctionDesc } from './FilterFunction';

export class FilterFunctionHelper
{
  public static getDescByName(name: string):IFilterFunctionDesc
  {
    switch(name)
    {
      case 'equals': return FilterFunctionEnum.Equals; 
      case 'notEquals': return FilterFunctionEnum.NotEqual;
      case 'lessThan': return FilterFunctionEnum.LessThan; 
      case 'lessThanOrEqualTo': return FilterFunctionEnum.LessThanOrEqual;
      case 'greaterThan': return FilterFunctionEnum.GreaterThan;
      case 'greaterThanOrEqualTo': return FilterFunctionEnum.GreaterThanOrEqual;
      case 'between': return FilterFunctionEnum.Between;
      case 'contains': return FilterFunctionEnum.Contains;
      case 'startsWith': return FilterFunctionEnum.StartsWith;
      case 'endsWith': return FilterFunctionEnum.EndsWith;
      case 'notEmpty': return FilterFunctionEnum.NotEmpty;
      case 'includeAny': return FilterFunctionEnum.IncludeAny; 
      case 'includeAll': return FilterFunctionEnum.IncludeAll;
      case 'includeEquals': return FilterFunctionEnum.IncludeEquals;          
      case 'includeNone': return FilterFunctionEnum.IncludeNone;                         
    }

    return FilterFunctionEnum.Equals; 
  }
}