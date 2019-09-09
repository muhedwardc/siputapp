var path = require('path')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: IS_PRODUCTION ? 'https://thessa-dev.southeastasia.cloudapp.azure.com' : '/',
  devServer: {
    proxy: {
      '/api*': {
        target: 'https://thessa-dev.southeastasia.cloudapp.azure.com/',
      }
    },
    watchOptions: {
      ignored: [
        path.resolve(__dirname, 'public/uploads/skripsi')
      ]
    }
  }
}
