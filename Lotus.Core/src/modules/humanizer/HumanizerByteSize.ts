import { HumanizerNumber } from './HumanizerNumber';

export class HumanizerByteSize
{
  /**
   * 
   * @param sizeInBytes 
   * @returns 
   */
  public static ByteSize(sizeInBytes: number): string
  {
    let size = sizeInBytes / 1024;
    if (size < 1000) 
    {
      return `${HumanizerNumber.formatNumber(size)} КБ`;
    }

    size = size / 1024;
    if (size < 1000) 
    {
      return `${HumanizerNumber.formatNumber(size)} МБ`;
    }

    size = size / 1024;
    return `${HumanizerNumber.formatNumber(size)} ГБ`;
  };
}