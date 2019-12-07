module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://34.239.13.251:3000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
