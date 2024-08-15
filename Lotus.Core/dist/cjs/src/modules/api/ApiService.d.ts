import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
/**
 * Базовый класс для сервисов Api
 */
export declare abstract class ApiService {
    protected api: AxiosInstance;
    constructor();
    protected handleRequest(config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>;
    protected handleRequestError(error: AxiosError): Promise<AxiosError>;
    protected handleResponse(response: AxiosResponse): AxiosResponse<any, any>;
    protected handleResponseError(error: AxiosError): Promise<never>;
    protected get<TResponse = any>(path: string, config?: any): Promise<AxiosResponse<TResponse, any>>;
    protected post<TResponse = any, TRequest = any>(path: string, payload: TRequest): Promise<AxiosResponse<TResponse, any>>;
    protected put<TResponse = any, TRequest = any>(path: string, payload: TRequest): Promise<AxiosResponse<TResponse, any>>;
    protected delete<TResponse = any>(path: string, config?: any): Promise<AxiosResponse<TResponse, any>>;
    protected getConfigAcceptJson(): AxiosRequestConfig<any>;
}
