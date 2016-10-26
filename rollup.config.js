import eslint from 'rollup-plugin-eslint'
import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  dest: 'vue-img.js',

  format: 'umd',
  moduleName: 'VueImg',

  plugins: [
    eslint({ throwError: true }),
    buble()
  ]
}
