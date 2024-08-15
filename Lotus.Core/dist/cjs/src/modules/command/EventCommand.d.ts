import { BaseCommand } from './Command';
/**
 * Класс команды для генерирования пользовательских событий
 */
export declare class EventCommand<TCommandParameter = any> extends BaseCommand<TCommandParameter> {
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
