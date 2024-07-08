import { IRoute } from 'types/Route';
import { BaseCommand } from './Command';

/**
 * Класс команды для простой навигации
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class NavigationCommand<TCommandParameter = any> extends BaseCommand<TCommandParameter>
{ 
  constructor(name: string, route: IRoute) 
  {
    super(name);
    this.route = route;
  }

  /**
   * Основной метод команды отвечающий за ее выполнение
   */
  public override execute():void
  {
  }

  /**
   * Метод определяющий возможность выполнения команды
   */
  public override canExecute(): boolean
  {
    return true;
  }
  
  /**
   * Статус выбора
   */
  public override isSelected():boolean
  {
    if(window.location.pathname === this.route?.path)
    {
      return true;
    }

    return false;
  }    
}