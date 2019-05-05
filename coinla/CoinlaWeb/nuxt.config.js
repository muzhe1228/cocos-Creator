module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'zh-Hans' // https://www.zhihu.com/question/20797118
    },
    title: '考拉行情--聚合全球行情,挖掘数据价值-CoinLa',
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'x-ua-compatible', content: 'ie=edge'},
      {name: 'viewport', content: 'width=device-width,initial-scale=1.0'},
      {hid: 'keywords', name: 'keywords', content: '数字货币行情, 虚拟币行情, 数字货币数据分析, 数字货币行业大数据, 虚拟币数据分析,区块链'},
      {
        hid: 'description',
        name: 'description',
        content: '考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一,专注于为数字货币用户提供数据分析,数据挖掘服务。我们拥有全球1000多个数字货币,150多家交易平台,5千多个交易对的数据资源,提供最专业的数字货币趋势分析,行情分析等多维度,全方位的分析服务,数字货币账本服务'
      },
      // QQ 移动浏览器 保持竖屏
      {hid: 'x5-orientation', name: 'x5-orientation', content: 'portrait'},
      // QQ 移动浏览器 全屏显示此页面
      {hid: 'x5-fullscreen', name: 'x5-orientation', content: 'true'},
      // QQ 移动浏览器 页面将以“应用模式”显示（全屏等）
      {hid: 'x5-page-mode', name: 'x5-orientation', content: 'app'}
    ],
    link: [
      {rel: 'assets', href: 'http://www.coinla.com'},
      // {rel: 'stylesheet', href: './rest-et/index.css'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {color: '#3B8070'},
  css: [
    '~assets/rest-et/index.css',
    '~assets/stylus/index.styl',
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['element-ui', 'axios', 'vue-lazyload'],
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
  },
  plugins: [
    {src: '~plugins/ElementUI'},
    {src: '~plugins/axios'},
    {src: '~plugins/sessionStorage', ssr: false},
    {src: '~plugins/vue-lazyload', ssr: false},
    '~/plugins/filters',
    '~/plugins/vue-filters',
    '~/plugins/isLogin'
  ]
}
