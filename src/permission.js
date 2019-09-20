import router from './router'
// 这个router是一个实例
// 然后在导出后在mian.js中引用
router.beforeEach((to, from, next) => {
  // 判断拦截的范围
  // 如果是以/home开头的，就拦截
  if (to.path.startsWith('/home')) {
  // 看看是否登陆了，如果登陆了，就放行
  // 如果没登陆，就返回登陆界面
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
  // 否则的话，就是登陆页面，就放行
    next()
  }
})
export default router
