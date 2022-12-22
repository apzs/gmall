const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
  // 有了map 就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
  // 所以该文件如果项目不需要是可以去除掉，可以通过 productionSourceMap: false, 去除
  productionSourceMap: false,
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
  // 该配置可以在浏览器中看到源码，并能进行调试
  // configureWebpack: {
  //   devtool: 'source-map'
  // }
})
