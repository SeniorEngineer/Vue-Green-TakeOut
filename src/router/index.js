import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/deploy',
    name: 'deploy',
    component: () => import('../pages/deploy/deploy.vue').then(m => m.default), // 路由懒加载
    children: [{
      path: 'msite',
      name: 'msite',
      component: () => import('../pages/deploy/Msite/Msite.vue').then(m => m.default)
    }, {
      path: 'order',
      name: 'order',
      component: () => import('../pages/deploy/Order/Order.vue').then(m => m.default)
    }, {
      path: 'profile',
      name: 'profile',
      component: () => import('../pages/deploy/Profile/Profile.vue').then(m => m.default)
    }, {
      path: 'search',
      name: 'search',
      component: () => import('../pages/deploy/Search/Search.vue').then(m => m.default)
    }]
  }, {
    path: '/',
    redirect: '/deploy/msite'
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../pages/Login/Login.vue').then(m => m.default)
  }, {
    path: '/shop',
    name: 'shop',
    component: () => import('../pages/shop/shop.vue').then(m => m.default),
    children: [{
      path: 'info',
      name: 'info',
      component: () => import('../pages/shop/shopInfo/shopInfo.vue').then(m => m.default)
    }, {
      path: 'evaluate',
      name: 'evaluate',
      component: () => import('../pages/shop/shopEvaluate/shopEvaluate.vue').then(m => m.default)
    }, {
      path: 'ordering',
      name: 'ordering',
      component: () => import('../pages/shop/shopOrdering/shopOrdering.vue').then(m => m.default)
    }, {
      path: '/shop',
      redirect: '/shop/info'
    }]
  }]
})
