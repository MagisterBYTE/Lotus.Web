export declare class HumanizerNumber {
    static readonly DEFAULT_FORMAT: "0,0[.][00]";
    static readonly CURRENCY_FORMAT: "0,0[.]00";
    static readonly PERCENTAGE_FORMAT: "0,0[.]00%";
    static formatNumber(number: number): string;
    static formatCurrency(amount: number): string;
    static formatPercentage(amount: number): string;
}
