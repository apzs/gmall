//当前这个模块：API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax'
 
//三级联动接口  
//暴露这个函数，外面拿到这个函数，直接调用，就能发送请求获取数据了
export const reqCategoryList = ()=>{
    //返回的结果是promise对象 当前函数执行需要把服务器返回结果进行返回
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

export const reqGetBannerList = ()=>{
    //返回的结果是promise对象 当前函数执行需要把服务器返回结果进行返回
    return mockRequests({
        url:'/banner',
        method:'get'
    })
}

export const reqFloorList = ()=> mockRequests.get("/floor");