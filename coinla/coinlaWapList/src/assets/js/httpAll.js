import axios from 'axios'

// 对aixos进行基础设置
// axios.defaults.baseURL = 'https://api.coinla.com'
 axios.defaults.baseURL = 'http://47.96.93.94:7080'
export const Axios = axios
//所有请求

export const getCoinlaSingle = function (url, params, token) {
  return axios({
    method: 'post',
    url: url,
    headers: {token: token || '', loginType: 'web', apiVersion: '1.6.0'},
    params: params
  })
}

export const getCoinla = function (url, params, token) {
  return axios({
    method: 'get',
    url: url,
    headers: {token: token || '', loginType: 'web', apiVersion: '1.6.0'},
    params: params
  })
}

export const getContentType = function (url, params, config) {
  return axios.post(url, params, config)
}

export const getCoinlaToken = function (url, params, headData) {
  return axios({
    method: 'post',
    url: url,
    headers: {token: headData.token || '',
      loginType: headData.loginType || 'all',
      apiVersion:headData.apiVersion,
      deviceID:headData.deviceID || '',
      deviceType:headData.deviceType,
      idfa:headData.idfa || ''},
    params: params||{}
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
