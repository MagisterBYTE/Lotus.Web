import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup'
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { copy } from '@web/rollup-plugin-copy';

import packageJson from "./package.json" assert { type: 'json' };

export default
  {
    input: './index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
      },
      {
        file: packageJson.module,
        format: 'esm',
      }
    ],

    external: ['classnames'],

    plugins: [
      peerDepsExternal(),
      typescript(
        {
          tsconfig: './tsconfig.json',
          exclude: ['**/*.stories.tsx']
        }),
      postcss(
        {
          extensions: ['.css'],
          modules: false,
          extract: true,
        }),
      url(),
      svgr(
        {
          icon: true
        }),
      json(),
      copy({ patterns: '**/*.{svg,jpg,png,json}' })
    ],
  }