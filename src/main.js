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
// 分页器
import Pagination from "@/components/Pagination"

import { Button, MessageBox } from 'element-ui'

// 注册全局组件
//第一个参数：全局组件名字，第二个参数：全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
// 注册全局组件
Vue.component(Button.name, Button)
// 使用element-ui弹窗
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false

import '@/mock/mockServe'

import "swiper/css/swiper.css";

// 统一接口api文件夹里的全部请求函数
import * as API from '@/api'

new Vue({
  render: h => h(App),

  beforeMount() {
    // 配置$bus全局事件总线
    Vue.prototype.$bus = this;
    // 添加所有api请求
    Vue.prototype.$API = API;
  },
  // 注册路由信息，注册后不管是路由组件还是非路由组件，身上都有$route和$router属性
  // $route一般用于获取路径、params query参数；
  // $router一般用于跳转路径，push replace等
  router,
  //注册仓库：组件实例的身上会多一个$store属性
  store
}).$mount('#app')
