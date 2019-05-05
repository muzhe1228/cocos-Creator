import {Cook, restAxios} from '~/assets/js/case'
import {getRate} from '~/assets/js/httpAll'
import axios from '~/plugins/axios'
import Cookies from 'js-cookie'

export const state = () => ({
  Token: '',
  userMsg: {},
  Login: false,//登录页面
  Register: false,//注册页面
  forgetPwd: false,//忘记密码
  OneBook: false,//记一笔
  searchMode: false,
  isLine: false,
  mcId: 0,//模板页面模块名称ID
  panel: false,//上传头像显示隐藏
  updateBook: true,//是否更新账本
  hid: 0,//隐藏金额
  linkList: [],//友情链接
})

export const mutations = {
  setToken(state, token) {
    state.Token = token || ''
  },
  setUserMsg(state, Obj) {
    state.userMsg = Obj || {}
  },
  setLogin(state, blo) {
    state.Login = blo
  },
  setRegister(state, blo) {
    state.Register = blo
  },
  setForgetPwd(state, blo) {
    state.forgetPwd = blo
  },
  setOneBook(state, blo) {
    state.OneBook = blo
  },
  setSearchMode(state, blo) {
    state.searchMode = blo
  },
  setLine(state, blo) {
    state.isLine = blo
  },
  setMcId(state, mcId) {
    state.mcId = mcId
  },
  setPanel(state, bol) {
    state.panel = bol
  },
  setUpdateBook(state, bol) {
    state.updateBook = bol
  },
  setHid(state, num) {
    state.hid = num
  },
  setLinkList(state, arr) {
    state.linkList = arr
  }
}


export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit({commit}, {req}) {
    let heders = req.headers
    if (heders.cookie) {
      commit('setLine', true)
      commit('setToken', Cook('token', heders.cookie))
      commit('setUserMsg', Cook('userMsg', heders.cookie))
    }
    axios({
      method: 'post',
      url: '/findLinksList'
    })
      .then((res) => {
        commit('setLinkList', res.data.data)
      }).catch((err) => {
      this.$message(err.message)
    })
  },
  SET_userMsg({commit}, {token}) {
    axios({
      method: 'post',
      url: '/user/mine/my',
      headers: {token, loginType: 'web'}
    }).then((res) => {
      if (res.data.code === 0) {
        commit('setUserMsg', res.data.data)
        Cookies.set("userMsg", res.data.data, {expires: 7})
      }
    }).catch((err) => {
      Cookies.remove('userMsg')
      Cookies.remove('token')
    })
  },
  signOut({commit}, {token}) {
    // console.log(token)
    axios({
      method: 'post',
      url: '/user/logout',
      headers: {token}
    }).then((res) => {
      commit('setToken')
      commit('setUserMsg')
      commit('setLine', false)
      Cookies.remove('userMsg')
      Cookies.remove('token')
    })
  }
}

