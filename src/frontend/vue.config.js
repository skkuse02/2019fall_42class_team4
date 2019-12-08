module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api', // dev mode
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
