const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{ //遇到带有api的请求，代理服务器才会将其转发
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite:{'^/api':''},
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
})
