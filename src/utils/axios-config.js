import axios from 'axios'
import vue from 'vue'
import router from '../permission' // 引入router，所以下边可以直接使用router
import { Message } from 'element-ui'
// 给地址设置常态值
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截
// 请求拦截就是在发请求之前，给请求参数加上token
axios.interceptors.request.use(function (config) {
  // config是要发送请求配置的信息
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  // 然后将config返回出去
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})
// 响应拦截
// 这个response就是组件里的result，所以在这里拦截返回的是response.data
// 后边只写一个result.data就可以了
axios.interceptors.response.use(function (response) {
  // 这里请求不到返回一个空对象，{}.name返回的是undefinded
  return response.data ? response.data : {}
}, function (error) {
  // console.log(error)
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      // 将token清除
      window.localStorage.clear()
      // 这里不能使用this.$router.push   因为这里的this不指向vue实例
      // 所以要先引入router
      // 然后跳转到登陆页面
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  // 未知错误
  Message({ message })// 将:message省略了
  // 在这里将错误都判断了，返回一个promise对象，后边的catch就不用写了
  // 因为返回的这个对象没有reject是一个空，所以后边的catch不执行
  return new Promise(function () {})
})
// export default axios
export default {
  install () {
    // axios上的东西，包括请求拦截和响应拦截都挂到了vue的原型对象上
    // 所以在main.js中 vue.use(axios) 调用这个install方法，在组件中直接使用this.$axios就可以
    vue.prototype.$axios = axios
  }
}
