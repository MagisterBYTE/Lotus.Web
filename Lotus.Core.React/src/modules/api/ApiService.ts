import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { IResult, instanceOfResult } from 'types/Result';

/**
 * Базовый класс для сервисов Api
 */
export abstract class ApiService
{
  protected api: AxiosInstance;

  constructor() 
  {
    const api = axios.create({
      baseURL: process.env['REACT_APP_API_URI']
    });

    api.interceptors.request.use(this.handleRequest, this.handleRequestError);
    api.interceptors.response.use(this.handleResponse, this.handleResponseError);

    this.api = api;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected handleRequest(config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>
  {
    config.timeout = 10 * 60 * 1000;
    config.cancelToken = axios.CancelToken.source().token;

    return config;
  }

  protected handleRequestError(error: AxiosError): Promise<AxiosError> 
  {
    console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  }

  protected handleResponse(response: AxiosResponse) 
  {
    return response;
  }

  protected handleResponseError(error: AxiosError) 
  {
    // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
    if (error.response) 
    {
      // Все ошибки приводим к типу IResult для унификации обработки и реагирования
      const result: IResult | undefined = instanceOfResult(error.response.data as object);
      if (result)
      {
        console.log(error.response.data);
        return Promise.reject(result);
      }
      else
      {
        const resultError: IResult = 
        { 
          succeeded: false, 
          code: Number(error.response.status ?? 500), 
          message: error.message 
        };
        return Promise.reject(resultError);
      }
    }
    else
    {
      // Запрос был сделан, но ответ не получен - `error.request`- это экземпляр XMLHttpRequest в браузере
      if (error.request)
      {
        // Проверка на отдельные коды ошибок
        if (error.code === 'ERR_NETWORK')
        {
          const result: IResult = { succeeded: false, code: 500, message: error.message };
          return Promise.reject(result);;
        }

        console.log(error);
        console.log('Error is not result!!!');
        return Promise.reject(error);
      }
      else
      {
        // Произошло что-то при настройке запроса, вызвавшее ошибку
        console.log(error);
        console.log('Error is not result!!!');
        return Promise.reject(error);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected get<TResponse = any>(path: string, config?: any) 
  {
    return this.api.get<TResponse>(path, config);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any  
  protected post<TResponse = any, TRequest = any>(path: string, payload: TRequest)
  {
    return this.api.post<TResponse>(path, payload);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any  
  protected put<TResponse = any, TRequest = any>(path: string, payload: TRequest) 
  {
    return this.api.put<TResponse>(path, payload);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any  
  protected delete<TResponse = any>(path: string, config?: any) 
  {
    return this.api.delete<TResponse>(path, config);
  }

  protected getConfigAcceptJson()
  {
    const config: AxiosRequestConfig = {
      headers:
      {
        'Accept': 'application/json'
      }
    }

    return config;
  }
}