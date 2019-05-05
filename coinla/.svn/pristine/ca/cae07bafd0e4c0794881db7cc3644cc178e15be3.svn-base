import axios from '~/plugins/axios'
// import LRU from 'lru-cache';
//
// const cache = LRU({
//   max: 1000,
//   maxAge: 1000 * 10,
// });
//首页请求所有交易所
// , loginType: 'web'
export const Axios = axios
export const getIndex = function (token, params) {
  return axios({
    method: 'post',
    url: '/index/findList',
    headers: {token: token || '', loginType: 'web'},
    params: params
  })
}

//------------------------------交易所请求---------------------------------
//交易所的请求
export const getBourse = function (token, params) {
  return axios({
    method: 'post',
    url: '/exchange/findExchangeList',
    headers: {token: token || '', loginType: 'web'},
    params: params
  })
}
//交易所详情介绍请求
export const getB_Details = function (token, params) {
  return axios({
    method: 'post',
    url: '/exchange/findExchangeInfo',
    headers: {token: token || '', loginType: 'web'},
    params: params
  })
}

//交易所详情行情请求
export const getB_market = function (token, params) {
  return axios({
    method: 'post',
    url: '/exchange/findExchangeInfoList',
    headers: {token: token || '', loginType: 'web'},
    params: params
  })
}

//--------------------------------------排行榜请求------------------------------

//涨跌幅榜请求
export const get_Rise_Fall = function (url, token, params) {
  return axios({
    method: 'post',
    url: url,
    headers: {token: token || '', loginType: 'web'},
    params: params
  })
}

//币种成交榜请求
export const getCurrencyDeal = function (token, params) {
  return axios({
    method: 'post',
    url: '/rank/findCurrencyDealPage',
    headers: {token: token || '', loginType: 'web'},
    params: params
  })
}
//所有请求

export const getCoinlaSingle = function (url, params, token) {
  return axios({
    method: 'post',
    url: url,
    headers: {token: token || '', loginType: 'web'},
    params: params
  })
}

export const getCoinlaMulti = function (url, url1, params, params1, token) {
  return axios.all([
    axios({
      method: 'post',
      url: url,
      headers: {token: token || '', loginType: 'web'},
      params: params
    }),
    axios({
      method: 'post',
      url: url1,
      params: params1
    })
  ])
}
