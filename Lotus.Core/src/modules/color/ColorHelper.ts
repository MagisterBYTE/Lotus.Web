import { IColorModelHSL } from './ColorModel';
import { ColorNames } from './ColorNames';

export class ColorHelper
{
  public static isColorValue(value: number): boolean
  {
    return value >= 0 && value <= 255;
  }

  public static isAlphaValue(value: number): boolean
  {
    return value >= 0 && value <= 1;
  }

  public static isRGBArray(rgba: number[]): boolean
  {
    if (rgba.length === 3)
    {
      for (let i = 0; i < 3; i++)
      {
        if (!ColorHelper.isColorValue(rgba[i]))
        {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  public static isRGBAArray(rgba: number[]): boolean
  {
    if (rgba.length === 4)
    {
      for (let i = 0; i < 3; i++)
      {
        if (!ColorHelper.isColorValue(rgba[i]))
        {
          return false;
        }
      }
      return ColorHelper.isAlphaValue(rgba[3]);
    }
    return false;
  }

  public static isHex3(colorString: string): boolean
  {
    return /^#[0-9a-fA-F]{3}/.test(colorString);
  }

  public static isHex6(colorString: string): boolean
  {
    return /^#[0-9a-fA-F]{6}/.test(colorString);
  }

  // eslint-disable-next-line consistent-return
  public static parseColorString(colorString: string): number[]|undefined
  {
    const c = colorString;

    if (ColorHelper.isHex6(c))
    {
      return [parseInt(c.substring(1, 3), 16), parseInt(c.substring(3, 5), 16), parseInt(c.substring(5, 7), 16)];
    }

    if (ColorHelper.isHex3(c))
    {
      return [parseInt(c[1] + c[1], 16), parseInt(c[2] + c[2], 16), parseInt(c[3] + c[3], 16)];
    }

    let m;
    // eslint-disable-next-line no-cond-assign
    if (m = c.match(/rgb\( ?(\d+), ?(\d+), ?(\d+) ?\)/))
    {
      const r = parseInt(m[1], 10);
      const g = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      if (ColorHelper.isColorValue(r) && ColorHelper.isColorValue(g) && ColorHelper.isColorValue(b))
      {
        return [r, g, b];
      }
    }

    // eslint-disable-next-line no-cond-assign
    if (m = c.match(/rgba\( ?(\d+), ?(\d+), ?(\d+), ?(\d+.?\d*) ?\)/))
    {
      const r = parseInt(m[1], 10);
      const g = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      const a = parseFloat(m[4]);
      if (ColorHelper.isColorValue(r) && ColorHelper.isColorValue(g) && ColorHelper.isColorValue(b) && ColorHelper.isAlphaValue(a))
      {
        return [r, g, b, a];
      }
    }

    const name = ColorHelper.getColorName(c);
    if (name)
    {
      return name;
    }
  }

  // eslint-disable-next-line consistent-return
  public static getColorName(colorString: string): number[]|undefined
  {
    const colStr = colorString.toLowerCase();
    if (colStr in ColorNames)
    {
      return ColorNames[colStr];
    }
    if (/ 1$/.test(colStr))
    {
      // some color names had a 1 (eg. "blue 1') but none without the 1
      // the 1's were removed from colorNames, and this code was added to support either case
      const noOne = colStr.replace(/ 1$/, '');
      if (noOne in ColorNames)
      {
        return ColorNames[noOne];
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static isHSL(hsla: any): boolean
  {
    return (typeof hsla === 'object' &&
      'h' in hsla && ColorHelper.isAlphaValue(hsla.h) &&
      's' in hsla && ColorHelper.isAlphaValue(hsla.s) &&
      'l' in hsla && ColorHelper.isAlphaValue(hsla.l) &&
      !('a' in hsla)
    );
  }

  public static rgb2hex(c: number[]): string
  {
    const r = ColorHelper.int2hex(Math.round(c[0]));
    const g = ColorHelper.int2hex(Math.round(c[1]));
    const b = ColorHelper.int2hex(Math.round(c[2]));
    if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1]) return ('#' + r[0] + g[0] + b[0]); // .toLowerCase();
    return ('#' + r + g + b); // .toLowerCase();
  }

  private static int2hex(i: number): string
  {
    const v = i.toString(16);
    return v.length === 1 ? '0' + v : v;
  }

  private static hslval(x: number, y: number, r: number): number
  {
    if (r < 0) r += 1;
    if (r > 1) r -= 1;
    let c;
    if (6 * r < 1) c = x + (y - x) * 6 * r;
    else if (2 * r < 1) c = y;
    else if (3 * r < 2) c = x + (y - x) * ((2 / 3) - r) * 6;
    else c = x;
    return c * 255;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static hsl2rgb(hsl: any): number[] 
  {
    const h = hsl.h, s = hsl.s, l = hsl.l;
    let r, g, b;
    if (s === 0)
    {
      r = g = b = l * 255;
    }
    else
    {
      let y;
      if (l < 0.5) y = l * (1 + s);
      else y = l + s - l * s;
      const x = 2 * l - y;
      r = ColorHelper.hslval(x, y, h + 1 / 3);
      g = ColorHelper.hslval(x, y, h);
      b = ColorHelper.hslval(x, y, h - 1 / 3);
    }
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    return [r, g, b];
  }

  public static rgb2hsl(rgb: number[]): IColorModelHSL 
  {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const x = Math.max(r, g, b);
    const n = Math.min(r, g, b);
    const l = (x + n) / 2;
    let s = 0, h = 0;
    if (x === n)
    {
      s = 0;
      h = 0;
    }
    else
    {
      const d = x - n;
      if (l > 0.5) s = d / (2 - x - n);
      else s = d / (x + n);
      if (x === r) h = (g - b) / d + (g < b ? 6 : 0);
      if (x === g) h = 2 + (b - r) / d;
      if (x === b) h = 4 + (r - g) / d;
      h /= 6;
      if (h < 0) h += 1;
    }
    return {
      h,
      s,
      l
    };
  }

  public static combine(s: number[], t: number[], amount: number) 
  {
    amount = typeof amount === 'number' ? amount : 0.5;
    const r = Math.round((t[0] - s[0]) * amount);
    const g = Math.round((t[1] - s[1]) * amount);
    const b = Math.round((t[2] - s[2]) * amount);
    const rgb = [s[0] + r, s[1] + g, s[2] + b];
    if (s.length === 4) rgb[3] = s[3];
    return rgb;
  }

  public static invert(c: number[]): number[] 
  {
    const rgba = c.slice();
    for (let i = 0; i < 3; i++)
    {
      rgba[i] = 255 - rgba[i];
    }
    return rgba;
  }

  public static tint(sourceHue: number, targetHue: number, amount: number): number 
  {
    const sH = sourceHue;
    const tH = targetHue;
    const diff = tH - sH;
    const dH = diff * amount;
    let newh = sH + dH;
    if (newh < 0) newh += 1;
    if (newh > 1) newh -= 1;
    return newh;
  }
}