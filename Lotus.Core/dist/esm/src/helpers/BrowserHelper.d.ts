export declare class BrowserHelper {
    /**
     * return true if url is in absolute form
     * see for details: https://stackoverflow.com/a/19709846
     * @param url url
     */
    static isAbsoluteUrl(url: string): boolean;
    static open(url: string, openInNewTab?: boolean): void;
    /**
     *
     * @param file
     * @param fileName
     */
    static downloadBlobFile(file: Blob, fileName: string): void;
}
