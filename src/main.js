import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import './plugins/element.js'

//从sessionStorage中获取登陆后的信息 用来验证用户是否登陆了
axios.interceptors.request.use(config=>{
  config.headers.token=window.sessionStorage.getItem('token');
  return config;
})

//配置请求接口的公共IP和端口号
axios.defaults.baseURL='http://49.233.93.180:7001/'
// axios.defaults.baseURL='http://127.0.0.1:7001/'
//配置http请求的axios
Vue.prototype.$http=axios
Vue.config.productionTip = false


//启动
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
