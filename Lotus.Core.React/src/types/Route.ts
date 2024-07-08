/**
 * Интерфейс для определения маршрута в приложении
 */
export interface IRoute
{
  /**
   * Маршрут 
   */
  path: string;

  /**
   * Должен ли он быть пользователь авторизован для перехода по данному маршруту
   */
  isShouldBeAuthorized?: boolean;

  /**
   * Набор разрешений для перехода по данному маршруту
   */
  permissions?: string[];  
}

/**
 * Класс для определения маршрута в приложении
 */
export class Route implements IRoute
{
  /**
   * Маршрут
   */
  path: string;

  /**
   * Должен ли он быть пользователь авторизован для перехода по данному маршруту
   */
  isShouldBeAuthorized?: boolean;

  /**
   * Набор разрешений для перехода по данному маршруту
   */
  permissions?: string[];

  constructor(path: string, isShouldBeAuthorized?: boolean, permissions?: string[])
  {
    this.path = path;
    this.isShouldBeAuthorized = isShouldBeAuthorized;
    this.permissions = permissions;
  }
}