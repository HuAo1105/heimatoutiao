import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'

Vue.use(Router)

export default new Router({
  routes: [
    // 登陆以后，重定向到主页面
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
      children: [{
        path: '',
        component: Main
      }, {
        path: '/home/publish'
      }, {
        path: '/home/articles'
      }, {
        path: '/home/comment'
      }, {
        path: '/home/meterial'
      }, {
        path: '/home/fans'
      }, {
        path: '/home/account'
      }]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue') //单页面按需加载
    // }
  ]
})
