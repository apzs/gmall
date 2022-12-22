// 引入路由组件
// import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
// import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'
// 默认暴露
export default [
    {
        name: "home",
        path: "/home",
        component: () => import('@/pages/Home'),
        // 路由元信息（添加一些额外的信息）
        meta: { show: true }
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: { show: false }
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: { show: false }
    },
    {
        name: "search",
        // 加个 ? 表示params可传递或不传递
        path: "/search/:keyword?",
        component: () => import('@/pages/Search'),
        meta: { show: true },
        // 第一种：布尔值写法 - 只能传params参数,不能传query参数
        // props: true,

        // 第二种：对象写法,额外给路由组件传递一些props
        // props: {a:1,b:2},

        // 第三种：函数写法 （最常见） params参数、query参数，通过props传递给路由组件
        // props:($route)=>{
        //     return {keyword:$route.params.keyword,k:$route.query.k};
        // },
        // 简写形式
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })
    },
    {
        name: 'detail',
        path: "/detail/:skuId?",
        component: Detail,
        meta: { show: true }
    },
    {
        name: 'addCartSuccess',
        path: '/addCartSuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        name: "trade",
        path: "/trade",
        component: Trade,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // 只允许从购物车页面跳转到结算页
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
                alert("只允许从购物车页面跳转到结算页")
            }
        },
    },
    {
        name: "pay",
        path: "/pay",
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            // 只允许从结算页跳转到支付页
            if (from.path == '/pay') {
                next()
            } else {
                next(false)
                alert("只允许从结算页跳转到支付页")
            }
        },
    },
    {
        name: "paysuccess",
        path: "/paysuccess",
        component: PaySuccess,
        meta: { show: true }
    },
    {
        name: "center",
        path: "/center",
        component: Center,
        meta: { show: true },
        children: [
            {
                name: "myorder",
                path: "myorder",
                component: MyOrder
            },
            {
                name: "groupOrder",
                path: "groupOrder",
                component: GroupOrder
            },
            // 访问 /center 自动跳转到 /center/myorder （注意：要写在子组件里）
            {
                path: "/center",
                redirect: '/center/myorder'
            }
        ]
    },
    // 重定向
    {
        path: '*',
        redirect: "/home"
    }
]