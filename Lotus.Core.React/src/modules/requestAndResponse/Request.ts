import { IFilterObject } from './FilterProperty';
import { IPageInfoRequest } from './PageInfo';
import { ISortObject } from './SortProperty';

/**
 * Базовый интерфейс для запроса данных
 */
export interface IRequest
{
  /**
   * Параметры запрашиваемой страницы
   */
  pageInfo?: IPageInfoRequest;

  /**
   * Параметры фильтрации данных
   */
  filtering?: IFilterObject;

  /**
   * Параметры сортировки данных
   */
  sorting?: ISortObject;
}