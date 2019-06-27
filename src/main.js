// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/assets/css/reset.css'
import store from './store'
import { Button } from 'mint-ui'
import 'mint-ui/lib/style.css'
import './mock/mockServer' // 加载mock数据
import VueLazyload from 'vue-lazyload'// 图片懒加载
import loading from '../src/assets/loading.gif'
import HeaderTop from './components/HeaderTop/HeaderTop.vue' // 引用头部公共组件
import './filters' // 饮用自定义过滤器方法
Vue.use(VueLazyload, {
  loading
})
Vue.use(HeaderTop) // 使用组件
Vue.component('headertop', HeaderTop) // 初始化组件，定义组件名称
Vue.component(Button.name, Button)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
