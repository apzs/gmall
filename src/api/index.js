//当前这个模块：API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax'

//三级联动接口  
//暴露这个函数，外面拿到这个函数，直接调用，就能发送请求获取数据了
export const reqCategoryList = () => {
    //返回的结果是promise对象 当前函数执行需要把服务器返回结果进行返回
    return requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })
}

export const reqGetBannerList = () => {
    //返回的结果是promise对象 当前函数执行需要把服务器返回结果进行返回
    return mockRequests({
        url: '/banner',
        method: 'get'
    })
}

export const reqFloorList = () => mockRequests.get("/floor");

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

export const getSearchInfo = (data) => requests({
    url: '/list',
    method: 'post',
    data: data
})

export const reqGoodsInfo = (skuId) => requests.get(`/item/${skuId}`)

// 将产品添加到购物车中，或修改某个产品的数量
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post"
})

//获取购物车列表数据
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车产品
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})

// 修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})

// 获取验证码
export const reqGetCode = (phone) => requests({ 
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})

// 注册
export const reqUserRegister = (data) => requests({
    url: '/user/passport/register',
    method: 'post',
    data
})