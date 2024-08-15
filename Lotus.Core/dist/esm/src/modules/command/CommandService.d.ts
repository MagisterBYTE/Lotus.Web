import { ICommand } from './Command';
/**
 * Интерфейс сервиса для работы с командами
 */
export interface ICommandService {
    /**
     * Добавить список команд
     * @param commands Команды
     */
    addCommands(commands: ICommand[]): void;
    /**
     * Получить список команд
     */
    getCommands(): ICommand[];
    /**
     * Получить список команд определенной группы
     * @param group Имя группы
     */
    getCommandsByGroup(group: string): ICommand[];
    /**
     * Получить список команд по имени
     * @param names Список имен команд
     */
    getCommandsByName(names?: string[]): ICommand[];
}
/**
 * Сервис для работы с командами
 * @description Все команды которые есть в приложении должны быть добавлены в данный сервис
 */
export declare class CommandServiceClass implements ICommandService {
    private static _CommandService;
    static get Instance(): CommandServiceClass;
    commands: ICommand[];
    constructor();
    addCommands(commands: ICommand[]): void;
    getCommands(): ICommand[];
    getCommandsByGroup(group: string): ICommand[];
    getCommandsByGroupAsName(group: string): string[];
    getCommandsByName(names?: string[]): ICommand[];
}
/**
 * Глобальный доступ к сервису для работы с командами
 */
export declare const CommandService: CommandServiceClass;
