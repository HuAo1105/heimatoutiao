// 在全局注册的是普通路由组件
import layoutAslider from './home/layout-aslider'
import layoutHeader from './home/layout-header'
import breadCrumb from './bread-crumb/bread-crumb'

export default {
  // 这个install为函数
  install (vue) {
    vue.component('layout-aslider', layoutAslider)
    vue.component('layout-header', layoutHeader)
    vue.component('bread-crumb', breadCrumb)
  }
}
