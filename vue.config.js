module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  devServer: {
    proxy: {
      '/api*': {
        target: process.env.VUE_APP_API_PROXY
      }
    }
  }
}
