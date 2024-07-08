export class BrowserHelper
{
  /**
   * return true if url is in absolute form
   * see for details: https://stackoverflow.com/a/19709846
   * @param url url
   */
  public static isAbsoluteUrl(url: string)
  {
    return new RegExp('^((?:[a-z]+:)?//|mailto:)', 'i').test(url);
  }

  public static open(url: string, openInNewTab = false)
  {
    window.open(url, openInNewTab ? '_blank' : '_self');
  }

  /**
   * 
   * @param file 
   * @param fileName 
   */
  public static downloadBlobFile(file: Blob, fileName: string) 
  {
    const downloadUrl = window.URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
}
