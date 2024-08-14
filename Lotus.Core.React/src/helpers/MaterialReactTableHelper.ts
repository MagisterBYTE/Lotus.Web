import
  {
    FilterFunctionEnum, IFilterFunctionDesc, IFilterObject, IFilterProperty, IObjectInfo,
    IPropertyDescriptor, PropertyTypeEnum, StringHelper
  } from 'lotus-core';
import { MRT_ColumnDef, MRT_ColumnFiltersState, MRT_FilterOption } from 'material-react-table';

export class MaterialReactTableHelper
{
  public static getDefaultFilterFunction(property: IPropertyDescriptor): MRT_FilterOption
  {
    switch (property.propertyType)
    {
      case PropertyTypeEnum.String: return 'contains';
      case PropertyTypeEnum.Enum: return 'arrIncludesSome';
    }

    return 'equals';
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static convertPropertyDescriptorToColumn<TItem extends Record<string, any>>(property: IPropertyDescriptor): MRT_ColumnDef<TItem>
  {
    const column: MRT_ColumnDef<TItem> =
    {
      accessorKey: property.fieldName,
      header: property.name,

      // Фильтрация
      enableColumnFilter: (property.filtering && property.filtering.enabled) ?? false,
      filterVariant: property.filtering && property.filtering.variant,
      filterFn: MaterialReactTableHelper.getDefaultFilterFunction(property),
      filterSelectOptions: property.options,

      // Сортировка
      enableSorting: (property.sorting && property.sorting.enabled) ?? false,

      // Редактирование
      enableEditing: (property.editing && property.editing.enabled) ?? false
    }

    return column;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static convertObjectInfoToColumns<TItem extends Record<string, any>>(objectInfo: IObjectInfo): MRT_ColumnDef<TItem>[]
  {
    const properties = objectInfo.getProperties();

    const columns = properties.map((x) =>
    {
      const column = MaterialReactTableHelper.convertPropertyDescriptorToColumn<TItem>(x);
      return column;
    });

    return columns;
  }

  public static convertColumnsFilterToFilterObjects(objectInfo: IObjectInfo, columnFilters: MRT_ColumnFiltersState,
    columnFiltersFns: Record<string, MRT_FilterOption> | undefined): IFilterObject
  {
    const properties = objectInfo.getProperties();

    const filteringAll: IFilterObject = columnFilters.map((column) => 
    {
      const filter: IFilterProperty =
      {
        propertyName: '',
        propertyType: PropertyTypeEnum.Boolean,
        function: FilterFunctionEnum.Equals,
        value: ''
      };

      const property = properties.find((x) => x.fieldName === column.id)

      if (property?.filtering && property?.filtering.enabled && columnFiltersFns) 
      {
        const filterFn = columnFiltersFns[column.id];

        filter.propertyName = StringHelper.capitalizeFirstLetter(column.id);
        filter.propertyType = property.propertyType!;
        filter.function = MaterialReactTableHelper.convertToFilterFunctionDesc(filterFn);

        if (filter.function === FilterFunctionEnum.IncludeAll ||
          filter.function === FilterFunctionEnum.IncludeAny ||
          filter.function === FilterFunctionEnum.IncludeEquals ||
          filter.function === FilterFunctionEnum.IncludeNone)
        {
          filter.values = (column.value as string[]);
        }
        else
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filter.value = (column.value as any).toString();
        }
        filter.function = MaterialReactTableHelper.convertToFilterFunctionDesc(filterFn);
      }

      return filter;
    });

    const filtering = filteringAll.filter((x) => x.propertyName !== '');

    return filtering;
  }

  public static convertToFilterFunctionDesc(filterFn: MRT_FilterOption): IFilterFunctionDesc
  {
    switch (filterFn)
    {
      case 'equals': return FilterFunctionEnum.Equals;
      case 'equalsString': return FilterFunctionEnum.Equals;
      case 'notEquals': return FilterFunctionEnum.NotEqual;
      case 'lessThan': return FilterFunctionEnum.LessThan;
      case 'greaterThan': return FilterFunctionEnum.GreaterThan;
      case 'greaterThanOrEqualTo': return FilterFunctionEnum.LessThanOrEqual;
      case 'between': return FilterFunctionEnum.Between;
      case 'betweenInclusive': return FilterFunctionEnum.Between;
      case 'contains': return FilterFunctionEnum.Contains;
      case 'startsWith': return FilterFunctionEnum.StartsWith;
      case 'endsWith': return FilterFunctionEnum.EndsWith;
      case 'notEmpty': return FilterFunctionEnum.NotEmpty;
      case 'includeAny': return FilterFunctionEnum.IncludeAny;
      case 'includeAll': return FilterFunctionEnum.IncludeAll;
      case 'includeEquals': return FilterFunctionEnum.IncludeEquals;
      case 'includeNone': return FilterFunctionEnum.IncludeNone;
      default: return FilterFunctionEnum.Equals;
    }
  }

  public static convertFromFilterFunctionDesc(filterFn: IFilterFunctionDesc): MRT_FilterOption
  {
    switch (filterFn)
    {
      case FilterFunctionEnum.Equals: return 'equals';
      case FilterFunctionEnum.NotEqual: return 'notEquals';
      case FilterFunctionEnum.LessThan: return 'lessThan';
      case FilterFunctionEnum.LessThanOrEqual: return 'lessThanOrEqualTo';
      case FilterFunctionEnum.GreaterThan: return 'greaterThan';
      case FilterFunctionEnum.GreaterThanOrEqual: return 'greaterThanOrEqualTo';
      case FilterFunctionEnum.Between: return 'between';
      case FilterFunctionEnum.Contains: return 'contains';
      case FilterFunctionEnum.StartsWith: return 'startsWith';
      case FilterFunctionEnum.EndsWith: return 'endsWith';
      case FilterFunctionEnum.NotEmpty: return 'notEmpty';
      case FilterFunctionEnum.IncludeAny: return 'includeAny';
      case FilterFunctionEnum.IncludeAll: return 'includeAll';
      case FilterFunctionEnum.IncludeEquals: return 'includeEquals';
      case FilterFunctionEnum.IncludeNone: return 'includeNone';
      default: return 'equals';
    }
  }

  /**
   * Получение списка функций фильтрации для свойств
   */
  public static getFilterOptions(objectInfo: IObjectInfo): Record<string, MRT_FilterOption>
  {
    const filterFunctions: Record<string, MRT_FilterOption> = {};

    objectInfo.getProperties().forEach((x) => 
    {
      if (x.filtering && x.filtering.enabled)
      {
        filterFunctions[`${x.fieldName}`] = MaterialReactTableHelper.convertFromFilterFunctionDesc(x.filtering.functionDefault);
      }
    })

    return filterFunctions;
  }
}