// 在全局注册的是普通路由组件
import layoutAslider from './home/layout-aslider'
import layoutHeader from './home/layout-header'
import breadCrumb from './bread-crumb/bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import coverImage from './publish/cover-image'
import selectImage from './publish/select-image'

export default {
  // 这个install为函数
  install (vue) {
    vue.component('layout-aslider', layoutAslider) // 侧边导航组件
    vue.component('layout-header', layoutHeader) // 头部组件
    vue.component('bread-crumb', breadCrumb) // 面包屑组件
    vue.component('quill-editor', quillEditor) // 富文本编辑器
    vue.component('cover-image', coverImage) // 注册封面组件
    vue.component('select-image', selectImage) // 注册选择图片组件
  }
}
