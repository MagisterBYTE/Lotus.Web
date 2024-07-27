import typescript from '@rollup/plugin-typescript'
import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

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

    plugins: [
      peerDepsExternal(),
      typescript(
        {
          tsconfig: './tsconfig.json',
        }),
      url(),
      json(),
    ],
  }