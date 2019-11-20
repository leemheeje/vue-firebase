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
const afterEach = ((to, from) => {})
const beforeEach = ((to, from,next) => {
  store.commit('geUserDetailView' , false)
  next()
})
const routes = [{
    path: '*',
    name: 'error',
    component: () => import('@/views/error/error404'),
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
      beforeEnter: unAuth,
    }, {
      path: '/register',
      name: 'register',
      component: () => import('@/views/members/Register'),
      beforeEnter: unAuth,
    }, {
      path: '/mypage/:uid',
      name: 'mypage',
      component: () => import('@/views/members/Mypage'),
      //beforeEnter: isAuth
    },
    {
      path: '/create/:uid',
      name: 'create',
      component: () => import('@/views/members/Create'),
      beforeEnter: isAuth
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes
})
router.afterEach(afterEach)
router.beforeEach(beforeEach)

export default router