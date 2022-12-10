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

// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
// }
  
export const getSearchInfo = (data)=>requests({
    url: '/list',
    method: 'post',
    data: data
})