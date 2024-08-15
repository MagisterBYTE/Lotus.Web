import { IRoute } from 'types/Route';
import { ICommand } from './Command';
/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
export declare class DelimiterCommand<TCommandParameter = any> implements ICommand<TCommandParameter> {
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
/**
 * Глобальный доступ к команде разделения по умолчанию
 */
export declare const DelimiterCommandDefault: DelimiterCommand<any>;
