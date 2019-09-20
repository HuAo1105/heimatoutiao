// 在全局注册的是普通路由组件
import layoutAslider from '../components/home/layout-aslider'
import layoutHeader from '../components/home/layout-header'

export default {
  // 这个install为函数
  install (vue) {
    vue.component('layout-aslider', layoutAslider)
    vue.component('layout-header', layoutHeader)
  }
}
