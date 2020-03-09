import Env from './env';
import axios from 'axios';
import Vue from 'vue'
axios.defaults.withCredentials = true
axios.defaults.headers = {'Content-Type':"application/json; charset=UTF-8"}// 配置请求头
axios.defaults.timeout = 300000;
// http请求拦截器
axios.interceptors.request.use(config => {
  Vue.$vux.loading.show({
    text: '请稍后...'
  })
  config.headers.typeid = '2'
  return config
}, error => {
  setTimeout(() => {
     Vue.$vux.loading.hide();
     Vue.$vux.toast.text('加载超时', 'middle')
  },3000)
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
  Vue.$vux.loading.hide()
  return data
}, error => {
  setTimeout(() => {
    Vue.$vux.loading.hide()
    Vue.$vux.toast.text('请求失败', 'middle')
  },1000)
  return Promise.reject(error)
})

// 请求地址
let base = Env.baseURL

// 通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data);
};

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data);
};

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data);
};

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data);
};
