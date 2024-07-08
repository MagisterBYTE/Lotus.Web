
export class PathHelper
{
  /**
   * 
   * @param fileName 
   * @returns 
   */
  public static splitNameAndExtension(fileName: string): [string, string] 
  {
    const index = fileName.lastIndexOf('.');
    if (index !== -1) 
    {
      return [fileName.substring(0, index), fileName.substring(index)];
    }

    return [fileName, ''];
  };
}