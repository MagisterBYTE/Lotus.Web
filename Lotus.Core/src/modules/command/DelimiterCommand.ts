import { IRoute } from 'types/Route';
import { ICommand } from './Command';
import { CommandService } from './CommandService';

/**
 * Фейковая команда предназначенная для визуального разделения команд в списках
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DelimiterCommand<TCommandParameter = any> implements ICommand<TCommandParameter>
{
  //
  // ОСНОВНЫЕ ДАННЫЕ
  //
  /**
   * Имя команды
   */
  name: string;

  /**
   * Параметр команды
   */
  parameter?: TCommandParameter;

  //
  // ПАРАМЕТРЫ МАРШРУТИЗАЦИИ
  //
  /**
   * Маршрут команды 
   */
  route?: IRoute;

  //
  // СВЯЗЬ С ВИЗУАЛЬНОЙ ЧАСТЬЮ
  //
  /**
   * Надпись
   */
  label: string;

  /**
   * Иконка
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;

  /**
   * Порядок при сортировке команд
   */
  order?: number;

  /**
   * Группа к которой относиться команда
   */
  group?: string;

  constructor(name: string) 
  {
    this.name = name;
    this.label = '';
    CommandService.addCommands([this]);
  }

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public execute(): void
  {
    // TODO document why this method 'execute' is empty
  }

  /**
   * Метод определяющий возможность выполнения команды
   */
  public canExecute(): boolean
  {
    return true;
  }

  /**
   * Статус выбора
   */
  public isSelected(): boolean
  {
    return false;
  }
}

/**
 * Глобальный доступ к команде разделения по умолчанию
 */
export const DelimiterCommandDefault = new DelimiterCommand('delimiter');