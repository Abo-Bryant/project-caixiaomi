import Vue from 'vue'
import App from './App'
import store from './store'

import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

App.mpType = 'app'

// uview-ui 引入了这个ui库以后，全局就自动有了uni.$u.http 这个变量，然后我们就可以配置
// 全局，和一些请求 响应的拦截器
uni.$u.http.setConfig((config) => {
  config.baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1';
  return config
})
// 设置请求拦截器
uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  uni.showLoading();
  // 获取token
  const token = store.state.user.token;
  // 设置请求头token
  if (token && config.url.startsWith('/my/')) {
    config.header.Authorization = token
  }
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

// 设置响应拦截器
uni.$u.http.interceptors.response.use((response) => {
  uni.hideLoading();
  return response
}, (response) => {
  return Promise.reject(response)
});

const app = new Vue({
  store,
  ...App
})
app.$mount()
