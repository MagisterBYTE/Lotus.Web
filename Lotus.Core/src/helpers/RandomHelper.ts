export class RandomHelper
{
  public static getMinMax = (min: number, max: number): number =>
  {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public static getMax = (max: number): number =>
  {
    return Math.floor(Math.random() * max);
  }
}
