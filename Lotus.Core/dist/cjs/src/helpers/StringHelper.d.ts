export declare class StringHelper {
    /**
     * see for details: https://stackoverflow.com/a/2140644
     * (warning: function may not work with Unicode special characters)
     */
    static EqualIgnoreCase(first: string, second: string): boolean;
    /**
     *
     * @param value
     * @returns
     */
    static isNullOrEmpty(value: string): boolean;
    /**
     *
     * @param value
     * @returns
     */
    static capitalizeFirstLetter(value: string): string;
    /**
     *
     * @param value
     * @returns
     */
    static toUpperCaseAllFirstLetters(value: string): string;
}
