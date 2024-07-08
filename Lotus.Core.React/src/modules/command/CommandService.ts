import { ICommand } from './Command';

/**
 * Интерфейс сервиса для работы с командами
 */
export interface ICommandService
{
  /**
   * Добавить список команд
   * @param commands Команды 
   */
  addCommands(commands:ICommand[]):void;

  /**
   * Получить список команд
   */
  getCommands():ICommand[];

  /**
   * Получить список команд определенной группы
   * @param group Имя группы
   */
  getCommandsByGroup(group:string):ICommand[];  

  /**
   * Получить список команд по имени
   * @param names Список имен команд
   */
  getCommandsByName(names?:string[]):ICommand[];    
}

/**
 * Сервис для работы с командами
 * @description Все команды которые есть в приложении должны быть добавлены в данный сервис
 */
export class CommandServiceClass implements ICommandService
{
  private static _CommandService: CommandServiceClass;

  public static get Instance(): CommandServiceClass 
  {
    return (this._CommandService || (this._CommandService = new this()));
  }   

  public commands: ICommand[];

  constructor() 
  {
    this.commands = [];

    this.getCommands = this.getCommands.bind(this);
    this.getCommandsByGroup = this.getCommandsByGroup.bind(this);
    this.getCommandsByGroupAsName = this.getCommandsByGroupAsName.bind(this);
    this.getCommandsByName = this.getCommandsByName.bind(this);   
  }

  public addCommands(commands:ICommand[])
  {
    commands.forEach(element => 
    {
      this.commands.push(element)
    });
  }

  public getCommands():ICommand[]
  {
    return this.commands;
  }

  public getCommandsByGroup(group:string):ICommand[]
  {
    return this.commands.filter((x) => x.group === group);
  }

  public getCommandsByGroupAsName(group:string):string[]
  {
    return this.commands.filter((x) => x.group === group).map(x => x.name);
  }  
  
  public getCommandsByName(names?:string[]):ICommand[]
  {
    const result:ICommand[] = [];

    if(names)
    {
      names.forEach((x) =>
      {
        const command = this.commands.find(c => c.name === x);
        if(command)
        {
          result.push(command)
        }
      })
    }

    return result;
  } 
}

/**
 * Глобальный доступ к сервису для работы с командами
 */
export const CommandService = CommandServiceClass.Instance;