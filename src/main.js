import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/pages/Home/TypeNav'

// 注册全局组件
//第一个参数：全局组件名字，第二个参数：全局组件
Vue.component(TypeNav.name,TypeNav)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 注册路由信息，注册后不管是路由组件还是非路由组件，身上都有$route和$router属性
  // $route一般用于获取路径、params query参数；
  // $router一般用于跳转路径，push replace等
  router: router
}).$mount('#app')
