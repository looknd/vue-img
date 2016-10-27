module.exports = config => {
  config.set({
    basePath: '../',
    browsers: ['Chrome'],
    files: [
      'http://github.elemecdn.com/vuejs/vue/v2.0.2/dist/vue.js',
      'vue-img.js',
      'build/test.js'
    ],
    frameworks: ['mocha', 'chai'],
    reporters: ['mocha'],
    singleRun: true
  })
}
