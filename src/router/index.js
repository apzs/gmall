import Vue from 'vue';
import VueRouter from 'vue-router';
// 配置使用路由插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
 
// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        // 不能直接使用originPush()，如果直接使用originPush()，会导致上下文变为window
        // call与apply区别：相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，需要传递数组
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
};
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve && reject){
        // call与apply区别：相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，需要传递数组
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
};

// 配置路由
export default new VueRouter({
    routes: [
        {
            name: "home",
            path: "/home",
            component: Home,
            // 路由元信息（添加一些额外的信息）
            meta: {show: true}
        },
        {
            name: "login",
            path: "/login",
            component: Login,
            meta: {show: false}
        },
        {
            name: "register",
            path: "/register",
            component: Register,
            meta: {show: false}
        },
        {
            name: "search",
            // 加个 ? 表示params可传递或不传递
            path: "/search/:keyword?",
            component: Search,
            meta: {show: true},
            // 第一种：布尔值写法 - 只能传params参数,不能传query参数
            // props: true,

            // 第二种：对象写法,额外给路由组件传递一些props
            // props: {a:1,b:2},

            // 第三种：函数写法 （最常见） params参数、query参数，通过props传递给路由组件
            // props:($route)=>{
            //     return {keyword:$route.params.keyword,k:$route.query.k};
            // },
            // 简写形式
            props:($route)=>({keyword:$route.params.keyword,k:$route.query.k})
        },
        // 重定向
        {
            path: '*',
            redirect: "/home"
        }
    ]
})