
export class EnumHelper
{
  /**
   * 
   * @param $enum 
   * @returns 
   */
  public static getValues<TEnum>($enum: Record<string, TEnum>): TEnum[]
  {
    return Object.keys($enum).map((key) => $enum[key]!);
  }

  public static getNames<TEnum>($enum: Record<string, TEnum>): string[]
  {
    return Object.keys($enum).map((key) => key);
  }
}
