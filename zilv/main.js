import App from './App'

//引入 vuex
import store from "./store"
Vue.prototype.$store = store
// 阻止显示生产模式的信息
Vue.productionTip = false


// 引入AES加密插件
import AES from '@/js_sdk/ar-aes/ar-aes.js'
Vue.prototype.AES = AES.AES

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  //挂载
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
    store
  }
}
// #endif

// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
uni.$http = $http

// 请求拦截器
$http.beforeRequest = function (options) {

  // 添加个人信息 
  if (options.url.indexOf('/v1/user/Register') !== -1) {
    options.header = {
      'AppAuthorization': store.state.userinfo.AppAuthorization,
    }
  }
  // 注销个人信息 
  if (options.url.indexOf('/v1/user/Cancellation') !== -1) {
    options.header = {
      'AppAuthorization': store.state.userinfo.AppAuthorization,
    }
  }
}
//响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}