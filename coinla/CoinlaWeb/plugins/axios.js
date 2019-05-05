import axios from 'axios'
// import {state} from '~/store/index'

let dev = true
//设置请求默认url地址
axios.defaults.baseURL = 'https://coinla.com'

export default axios
