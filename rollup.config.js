import nodeResolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import buble from 'rollup-plugin-buble'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const deps = Object.keys(pkg.dependencies)

function config (file, format, opts = {}) {
  const plugins = opts.plugins || []
  const external = opts.external || []
  return {
    input: './src/index.js',
    output: {
      file,
      format,
      name: 'kagekiri'
    },
    plugins: [
      nodeResolve(),
      cjs(),
      builtins(),
      globals(),
      buble({
        transforms: {
          dangerousForOf: true
        }
      }),
      ...plugins
    ],
    external
  }
}

export default [
  config('dist/kagekiri.js', 'umd'),
  config('dist/kagekiri.min.js', 'umd', { plugins: [terser()] }),
  config('dist/kagekiri.cjs.js', 'cjs', { external: deps }),
  config('dist/kagekiri.es.js', 'es', { external: deps })
]
