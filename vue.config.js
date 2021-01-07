module.exports = {
  publicPath: "./",
  outputDir: "dist",
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    host: "localhost",
    port: "8087",
    open: true,
    disableHostCheck: true,
    https: false,
    hotOnly: false,
    //代理
    proxy: {
      "/api": {
        target: "https://zs.cntracechain.com",
        changeOrigin: true,
        ws: true,
        //重写路径  需要设置重写的话，要在后面的调用接口前加上/api 来代替target
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};
