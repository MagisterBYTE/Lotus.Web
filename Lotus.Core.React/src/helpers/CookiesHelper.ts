
export class CookiesHelper
{
  /**
   * Возвращает куки с указанным name или undefined, если ничего не найдено
   * @param name Имя куки
   * @returns куки с указанным name или undefined, если ничего не найдено
   */
  public static get(name: string): string | undefined 
  {
    const matches = document.cookie.match(new RegExp(
      // eslint-disable-next-line no-useless-escape
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]!) : undefined;
  }

  /**
   * Установка куки
   * @param name Имя
   * @param value Значение
   * @param encodeValue Нужно ли стандартное преобразование 
   * @param options Дополнительные опции
   */
  public static set(name: string, value: string, encodeValue: boolean = true, options = {}) 
  {
    const currentOptions = {
      path: '/',
      // при необходимости добавьте другие значения по умолчанию
      ...options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;

    if (currentOptions['expires'] instanceof Date) 
    {
      currentOptions['expires'] = currentOptions['expires'].toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + (encodeValue ? encodeURIComponent(value) : value);

    for (const optionKey in currentOptions) 
    {
      updatedCookie += '; ' + optionKey;
      const optionValue = currentOptions[optionKey];
      if (optionValue !== true) 
      {
        updatedCookie += '=' + optionValue;
      }
    }

    document.cookie = updatedCookie;
  }

  /**
   * Удаление куки
   * @param name Имя
   * @param encodeValue Нужно ли стандартное преобразование
   * @param options Дополнительные опции
   */
  public static delete(name: string, encodeValue: boolean = true, options = {}) 
  {
    CookiesHelper.set(name, '', encodeValue, {
      'max-age': -1,
      ...options
    })
  }

  /**
   * Удаление всех кук
   */
  public static deleteAll() 
  {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) 
    {
      const cookie = cookies[i]!;
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }
}