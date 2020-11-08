/* global __dirname, process */

import path from 'path';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import inlineSvg from 'rollup-plugin-inline-svg';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

const production = !process.env.ROLLUP_WATCH;

const uglifyPrepared = () =>
  uglify({
    output: {
      comments: /@preserve|@license|@cc_on|License|Copyright/,
    },
  });

const projectRootDir = path.resolve(__dirname);

export default [
  {
    input: 'src/kata3/index.js',
    output: {
      file: './output.js',
      name: 'output',
      format: 'es',
    },
    plugins: [
      alias({
        entries: [
          {
            find: 'src',
            replacement: path.resolve(projectRootDir, 'src'),
          },
        ],
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      json({
        exclude: 'node_modules/**',
      }),
      inlineSvg({
        removeSVGTagAttrs: false,
      }),
      nodeResolve({
        browser: true,
        preferBuiltins: true,
      }),
      commonjs({
        include: /node_modules/,
      }),
    ],
  },
];
