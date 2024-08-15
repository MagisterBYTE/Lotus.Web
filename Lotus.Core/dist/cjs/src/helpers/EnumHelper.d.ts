export declare class EnumHelper {
    /**
     *
     * @param $enum
     * @returns
     */
    static getValues<TEnum>($enum: Record<string, TEnum>): TEnum[];
    static getNames<TEnum>($enum: Record<string, TEnum>): string[];
}
