import { IRequest } from './Request';

export class RequestHelper
{
  public static createURLSearchParams = (request?: IRequest):URLSearchParams =>
  {
    if(request)
    {
      const search:URLSearchParams = new URLSearchParams();
  
      if(request.pageInfo)
      {
        search.append('pageInfo.pageNumber', request.pageInfo.pageNumber.toString())
        search.append('pageInfo.pageSize', request.pageInfo.pageSize.toString());
      }
  
      if(request.sorting)
      {
        let index = 0;
        request.sorting.forEach((value) =>
        {
          search.append(`sorting[${index}].propertyName`, value.propertyName);
          if(value.isDesc && value.isDesc === true)
          {
            search.append(`sorting[${index}].isDesc`, 'true');
          }
          index++;
        })
      }
      if(request.filtering)
      {
        let index = 0;
        request.filtering.forEach((filter) =>
        {
          if(filter.value)
          {
            const value = filter.value;
            search.append(`filtering[${index}].propertyName`, filter.propertyName);
            search.append(`filtering[${index}].function`, filter.function.id.toString());
            search.append(`filtering[${index}].propertyType`, filter.propertyType.id.toString());
            search.append(`filtering[${index}].value`, value);
  
            if(filter.isSensativeCase)
            {
              search.append(`filtering[${index}].isSensativeCase`, 'true');
            }
          
            index++;
          }
          else
          {
            if(filter.values)
            {
              const values = filter.values;
              search.append(`filtering[${index}].propertyName`, filter.propertyName);
              search.append(`filtering[${index}].function`, filter.function.id.toString());
              search.append(`filtering[${index}].propertyType`, filter.propertyType.id.toString());
              for (let iv = 0; iv < values.length; iv++) 
              {
                const val = values[iv]!;
                search.append(`filtering[${index}].values[${iv}]`, val);
              }            
            }
          }
        })
      }
  
      return search;
    }
    else
    {
      const search:URLSearchParams = new URLSearchParams();
      search.append('pageInfo.pageNumber', '0')
      search.append('pageInfo.pageSize', '9999');
      return search;
    }
  }
}