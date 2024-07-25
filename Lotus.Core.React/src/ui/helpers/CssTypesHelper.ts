import { NumberHelper } from 'helpers';
import { TCssHeight, TCssWidth } from 'ui/types';

export class CssTypesHelper
{
  public static toPixelWidth(value: TCssWidth): number
  {
    if (typeof value === 'string')
    {
      return NumberHelper.ParseFloat(value) * 16
    }
    if (typeof value === 'number')
    {
      return value
    }

    return 0;
  }

  public static toPixelHeight(value: TCssHeight): number
  {
    if (typeof value === 'string')
    {
      return NumberHelper.ParseFloat(value) * 16
    }
    if (typeof value === 'number')
    {
      return value
    }

    return 0;
  }
}