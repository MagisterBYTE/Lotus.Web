import { IResult } from 'types/Result';
import { IPageInfoResponse } from './PageInfo';

/**
 * Интерфейса для получения данных
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IResponse<TPayload = any>
{
  /**
   * Результат
   */
  result?: IResult;

  /**
   * Данные
   */
  payload?: TPayload;
}

/**
 * Интерфейс для постраничного получения данных
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IResponsePage<TPayload = any>
{
  /**
   * Результат
   */
  result?: IResult;

  /**
  * Данные
  */
  payload?: TPayload[];

  /**
   * Информация о странице
   */
  pageInfo?: IPageInfoResponse;
}