const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 请求链接中带有/ajax的，全部重定向到...
    // https://m.maoyan.com/ajax/movieOnInfoList
    proxy: {
      '/ajax': {
        target: 'https://i.maoyan.com',
        // ws:true,
        changeOrgin: true
      },
      '/maizuo': {
        target: 'https://m.maizuo.com/',
        // ws:true,
        changeOrgin: true
      }
    }
  }
})
