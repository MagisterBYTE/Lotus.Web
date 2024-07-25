import typescript from '@rollup/plugin-typescript'
import postcss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup'
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { copy } from '@web/rollup-plugin-copy';

export default
  {
    input: './index.ts',
    output: [
      {
        file: 'dist/lib/index.js',
        format: 'cjs'
      },
      {
        file: 'dist/es/index.js',
        format: 'esm'
      }
    ],

    external: [
      'react',
      '@reduxjs',
      '@reduxjs/toolkit',
      'react/jsx-runtime',
      'react-redux',
      'react-toastify',
      'react-icons',
      'axios',
      'numeral',
      'classnames'],
        
    plugins: [
      nodeResolve(),
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