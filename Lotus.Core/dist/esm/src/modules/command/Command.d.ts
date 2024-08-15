import { IRoute } from 'types/Route';
/**
 * Интерфейс команды
 * @description Команда предоставляет собой концепцию (паттерн) для связывания логики выполнения действия и визуального элемента.
 * Как паттерн, команда позволяет инкапсулировать запрос на выполнение определенного действия в виде отдельного объекта
 */
export interface ICommand<TCommandParameter = any> {
    /**
     * Имя команды
     */
    name: string;
    /**
     * Параметр команды
     */
    parameter?: TCommandParameter;
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute(): void;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute(): boolean;
    /**
     * Статус выбора
     */
    isSelected(): boolean;
    /**
     * Маршрут команды
     */
    route?: IRoute;
    /**
     * Надпись
     */
    label: string;
    /**
    * Иконка
    */
    icon?: any;
    /**
     * Порядок при сортировке команд
     */
    order?: number;
    /**
     * Группа к которой относиться команда
     */
    group?: string;
}
/**
 * Базовый класс команды
 */
export declare class BaseCommand<TCommandParameter = any> implements ICommand<TCommandParameter> {
    /**
     * Имя команды
     */
    name: string;
    /**
     * Параметр команды
     */
    parameter?: TCommandParameter;
    /**
     * Маршрут команды
     */
    route?: IRoute;
    /**
     * Надпись
     */
    label: string;
    /**
     * Иконка
     */
    icon?: any;
    /**
     * Порядок при сортировке команд
     */
    order?: number;
    /**
     * Группа к которой относиться команда
     */
    group?: string;
    constructor(name: string);
    /**
     * Основной метод команды отвечающий за ее выполнение
     */
    execute(): void;
    /**
     * Метод определяющий возможность выполнения команды
     */
    canExecute(): boolean;
    /**
     * Статус выбора
     */
    isSelected(): boolean;
}
