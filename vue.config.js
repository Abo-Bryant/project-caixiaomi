module.exports = {
  transpileDependencies: ['uview-ui'],
  devServer: {
    before: require('./mock/index.js')
  }
}