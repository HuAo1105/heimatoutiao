import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
// 引入axios
import axios from './utils/axios-config'
// 引入全局注册的普通路由组件
import Component from './components'

// 给vue的原型对象加一个属性，使得在全局都可以使用，所有的组件可以直接使用
// Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(ElementUI) // 在全局注册了elementui
Vue.use(Component) // 在全局注册了普通组件，就不用在路由级组件中引入了
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
