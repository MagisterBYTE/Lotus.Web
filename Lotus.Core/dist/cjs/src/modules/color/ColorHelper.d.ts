import { IColorModelHSL } from './ColorModel';
export declare class ColorHelper {
    static isColorValue(value: number): boolean;
    static isAlphaValue(value: number): boolean;
    static isRGBArray(rgba: number[]): boolean;
    static isRGBAArray(rgba: number[]): boolean;
    static isHex3(colorString: string): boolean;
    static isHex6(colorString: string): boolean;
    static parseColorString(colorString: string): number[] | undefined;
    static getColorName(colorString: string): number[] | undefined;
    static isHSL(hsla: any): boolean;
    static rgb2hex(c: number[]): string;
    private static int2hex;
    private static hslval;
    static hsl2rgb(hsl: any): number[];
    static rgb2hsl(rgb: number[]): IColorModelHSL;
    static combine(s: number[], t: number[], amount: number): number[];
    static invert(c: number[]): number[];
    static tint(sourceHue: number, targetHue: number, amount: number): number;
}
