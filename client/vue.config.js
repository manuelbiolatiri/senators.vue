module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:1234',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
}
