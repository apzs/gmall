import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
//三级联动组件+全局组件
import TypeNav from '@/components/TypeNav'
// 引入仓库
import store from "@/store"
// 轮播图
import Carousel from "@/components/Carousel"

// 注册全局组件
//第一个参数：全局组件名字，第二个参数：全局组件
Vue.component(TypeNav.name,TypeNav)

Vue.component(Carousel.name,Carousel)

Vue.config.productionTip = false

import '@/mock/mockServe'

import "swiper/css/swiper.css";

new Vue({
  render: h => h(App),
  // 注册路由信息，注册后不管是路由组件还是非路由组件，身上都有$route和$router属性
  // $route一般用于获取路径、params query参数；
  // $router一般用于跳转路径，push replace等
  router,
  //注册仓库：组件实例的身上会多一个$store属性
  store
}).$mount('#app')
