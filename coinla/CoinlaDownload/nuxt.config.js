module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '考拉行情--聚合全球行情，挖掘数据价值-CoinLa',
    meta: [
      {charset: 'utf-8'},
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
      { hid: 'Keywords', name: 'keyword', content: '数字货币行情app 虚拟币行情APP' },
      {
        hid: 'description',
        name: 'description',
        content: '考拉行情（CoinLa）致力创建并维护成一个集数字资产行情工具+智能内容社区推送以及社区讨论+只能理财与一体的全球区块链投融资数据综合生态平台。'
      },
      // QQ 移动浏览器 保持竖屏
      { hid: 'x5-orientation', name: 'x5-orientation', content: 'portrait' },
      // QQ 移动浏览器 全屏显示此页面
      { hid: 'x5-fullscreen', name: 'x5-orientation', content: 'true' },
      // QQ 移动浏览器 页面将以“应用模式”显示（全屏等）
      { hid: 'x5-page-mode', name: 'x5-orientation', content: 'app' }
    ],
    link: [
      {rel: 'assets', href: 'http://www.coinla.com'}
    ]
  },
  css: ['~assets/stylus/index.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  /*
  ** Build configuration
  */
  build: {
    loader: [
      {
        test: /\.(png|jge?g|gif|svg)$/,
        loader: "url-loader",
        query: {
          limit: 10000,
          name: 'img/[name].[hash].[ext]'
        }
      }
    ],

    /*
    ** Run ESLint on save
    */
    extend(config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
