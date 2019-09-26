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
        path: '/home/fans'
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
