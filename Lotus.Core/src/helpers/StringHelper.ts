export class StringHelper
{
  /**
   * see for details: https://stackoverflow.com/a/2140644
   * (warning: function may not work with Unicode special characters)
   */
  public static EqualIgnoreCase(first: string, second: string): boolean
  {
    return first.toUpperCase() === second.toUpperCase();
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  public static isNullOrEmpty(value: string): boolean
  {
    return value === undefined || value === null || value.trim() === '';
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  public static capitalizeFirstLetter(value: string): string
  {
    return `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;
  }

  /**
   * 
   * @param value 
   * @returns 
   */
  public static toUpperCaseAllFirstLetters(value: string): string
  {
    return value.split(' ').map((word) => word.slice(0, 1).toUpperCase() + word.slice(1)).join(' ');
  }

}
