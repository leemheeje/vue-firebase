import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)
const isAuth = (to, from, next) => {
  if (!localStorage.getItem('access-token')) {
    alert('로그인이 필요합니다.')
    next({
      name: 'login'
    })
    return
  }
  next();
}
const unAuth = (to, from, next) => {
  if (localStorage.getItem('access-token')) {
    alert('이미 로그인 되어있습니다.')
    next({
      name: 'main'
    })
    return
  }
  next();
}
const routes = [{
    path: '*',
    name: 'error',
    component: () => import('@/views/error/error404')
  }, {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main'),
  },
  {
    path: '',
    name: 'members',
    component: () => import('@/views/members/Members'),
    children: [{
      path: '/login',
      name: 'login',
      component: () => import('@/views/members/Login'),
      beforeEnter: unAuth
    }, {
      path: '/register',
      name: 'register',
      component: () => import('@/views/members/Register'),
      beforeEnter: unAuth
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router