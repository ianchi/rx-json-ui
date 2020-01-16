import * as path from 'path';
import typescript from 'rollup-plugin-typescript2';
import pluginAlias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

const MAIN_FILE = 'src/public-api.ts';
const LIB_FILE = 'src/lib-api.ts';

let external = ['fs', 'path', 'url'];

const alias = pluginAlias({
  entries: { 'rx-json-ui/lvalueRule': '../../dist/rx-json-ui/esm2015/lvalueRule/lvalueRule.js' },
});

if (pkg.peerDependencies) external = external.concat(Object.keys(pkg.peerDependencies));
if (pkg.dependencies) external = external.concat(Object.keys(pkg.dependencies));

export default [
  {
    input: [MAIN_FILE, LIB_FILE],

    external,
    output: [
      {
        dir: './dist',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [typescript(), alias, nodeResolve()],
  },

  {
    input: [MAIN_FILE, LIB_FILE],
    external,
    output: {
      dir: './dist/esm',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfigOverride: {
          compilerOptions: {
            target: 'es2015',
            declaration: true,
            declarationDir: path.dirname(pkg.types),
          },
        },
      }),
      alias,
      nodeResolve(),
    ],
  },
];
