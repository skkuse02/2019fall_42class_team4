module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://34.239.13.251:3000/api', // release server location test
        // target: 'http://localhost:3000/api', // dev mode
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
