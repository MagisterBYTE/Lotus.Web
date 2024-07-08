import numeral from 'numeral';

export class HumanizerNumber
{
  public static readonly DEFAULT_FORMAT = '0,0[.][00]' as const;
  public static readonly CURRENCY_FORMAT = '0,0[.]00' as const;
  public static readonly PERCENTAGE_FORMAT = '0,0[.]00%' as const;

  public static formatNumber(number: number) 
  {
    return numeral(number).format(HumanizerNumber.DEFAULT_FORMAT);
  }
  
  public static formatCurrency(amount: number)
  {
    return numeral(amount).format(HumanizerNumber.CURRENCY_FORMAT);
  }
  
  public static formatPercentage(amount: number) 
  {
    return numeral(amount).format(HumanizerNumber.PERCENTAGE_FORMAT);
  }
}