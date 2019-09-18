import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
// 引入axios
import axios from 'axios'
// 给地址设置常态值
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 给vue的原型对象加一个属性，使得在全局都可以使用，所有的组件可以直接使用
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
