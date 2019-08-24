var path = require('path')
var BrotliGzipPlugin = require('brotli-gzip-webpack-plugin')
var PrerenderSPAPlugin = require('prerender-spa-plugin')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
    outputDir: 'dist',
    assetsDir: 'static',
    publicPath: IS_PRODUCTION
      ? 'https://thessa-dev.azurewebsites.net'
      : '/',
    // For Production, replace set baseUrl to CDN
    // And set the CDN origin to `yourdomain.com/static`
    // Whitenoise will serve once to CDN which will then cache
    // and distribute
    // configureWebpack: {
    //   plugins: [
    //     new BrotliGzipPlugin({
    //       asset: '[path].br[query]',
    //       algorithm: 'brotli',
    //       test: /\.(js|css|html|svg)$/,
    //       threshold: 10240,
    //       minRatio: 0.8,
    //       quality: 11
    //     }),
    //     new BrotliGzipPlugin({
    //       asset: '[path].gz[query]',
    //       algorithm: 'gzip',
    //       test: /\.(js|css|html|svg)$/,
    //       threshold: 10240,
    //       minRatio: 0.8
    //     }),
    //     new PrerenderSPAPlugin({
    //       staticDir: path.join(__dirname, 'dist'),
    //       routes: [ '/', '/login' ],
    //     })
    //   ],
    // },
    devServer: {
      proxy: {
        '/api*': {
          // Forward frontend dev server request for /api to django dev server
          target: 'http://localhost:8000/',
        }
      },
      watchOptions: {
        ignored: [
          path.resolve(__dirname, 'public/uploads/skripsi')
        ]
      }
    }
  }
