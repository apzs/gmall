// 引入路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
// 默认暴露
export default [
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
    {
        name: 'detail',
        path: "/detail/:skuId?",
        component: Detail,
        meta: {show:true}
    },
    // 重定向
    {
        path: '*',
        redirect: "/home"
    }
]