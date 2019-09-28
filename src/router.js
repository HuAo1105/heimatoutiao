import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  routes: [
    // 登陆以后，重定向到主页面
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*', // 匹配所有的组件，但是如果添加了路由的话，优先匹配添加了路由的
      component: () => import('./views/404')
    },
    {
      path: '/home',
      component: Home,
      children: [{
        path: '',
        component: Main
      }, {
        // 发布文章
        path: 'publish/:target',
        component: () => import('./views/publish')
      },
      {
        path: 'publish',
        component: () => import('./views/publish')
      },
      {
        // 内容列表
        path: 'articles',
        component: () => import('./views/article')
      },
      {
        // 评论列表
        path: 'comment', //  两种写法都可以
        component: () => import('./views/comment')
      }, {
        // 素材列表
        path: 'material',
        component: () => import('./views/material')
      }, {
        // 图文数据
        path: 'gradata',
        component: () => import('./views/fans')
      }, {
        // 账户信息
        path: 'account',
        component: () => import('./views/account')
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
