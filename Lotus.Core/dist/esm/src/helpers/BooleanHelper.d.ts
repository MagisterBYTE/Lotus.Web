export declare class BooleanHelper {
    /**
     * Текстовые значение логического типа которые означает истинное значение
     */
    static readonly TrueValues: string[];
    static Parse(text: string): boolean;
    static getBooleanValue(value: boolean, yes?: string, no?: string): string;
}
