import Vue from 'vue';
import VueRouter from 'vue-router';
// 配置使用路由插件
Vue.use(VueRouter);

import routes from './routes';

import store from '@/store'

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // 不能直接使用originPush()，如果直接使用originPush()，会导致上下文变为window
        // call与apply区别：相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，需要传递数组
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        // call与apply区别：相同点：都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，需要传递数组
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
};

// 配置路由
let router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {

        if (from.fullPath.includes("/search") && to.fullPath.includes("/detail")) {
            return { y: 0 };
        }
        return {}
        //返回的这个y=0，代表的滚动条在最上方
    }
})

router.beforeEach(async (to, from, next) => {
    // 用户登陆了才有token
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    // 用户已登录
    if (token) {
        // 用户如果登陆后再次访问login或register，就跳转到首页
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {
            if (name) {
                next()
            } else {
                // 如果登陆了但是没有用户信息
                try {
                    // 获取用户信息
                    await store.dispatch("getUserInfo")
                    next()
                } catch (error) {
                    console.log(error);
                    // 获取用户信息失败(token失效)，重新跳转到登陆页
                    await store.dispatch('userLogout')
                    next('/login')
                }

            }
        }
    } else {
        // 用户未登录
        let toPath = to.path;
        // 未登录不能去 /trade 、/pay 、/paysuccess 页面
        if(toPath.includes('/trade') || toPath.includes('/pay')){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})

export default router