import Vue from 'vue'
import App from './App'
import axios from 'axios'
import utils from 'common/utils'    //获取url参数
import {numRest,urlRest} from 'common/lineReset'    //获取url参数
import 'common/resize'
import 'common/stylus/index.styl'

Vue.prototype.$utils = utils   //注册全局方法
// 对aixos进行基础设置
axios.defaults.baseURL = 'https://api.coinla.com'
Vue.prototype.$http = axios
Vue.filter('numRest', numRest)
Vue.filter('urlRest', urlRest)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
