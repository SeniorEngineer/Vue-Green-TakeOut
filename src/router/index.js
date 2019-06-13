import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/deploy',
    name: 'deploy',
    component: () => import('../pages/deploy/deploy.vue').then(m => m.default),
    children: [{
      path: 'msite',
      name: 'msite',
      component: () => import('../pages/Msite/Msite.vue').then(m => m.default)
    }, {
      path: 'order',
      name: 'order',
      component: () => import('../pages/Order/Order.vue').then(m => m.default)
    }, {
      path: 'profile',
      name: 'profile',
      component: () => import('../pages/Profile/Profile.vue').then(m => m.default)
    }, {
      path: 'search',
      name: 'search',
      component: () => import('../pages/Search/Search.vue').then(m => m.default)
    }]
  }, {
    path: '/',
    redirect: '/deploy/msite'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login/Login.vue').then(m => m.default)
  }]
})
