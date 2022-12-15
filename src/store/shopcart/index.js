import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"
const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data);
        }
    },
    // 删除购物车中的某个商品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = [];
        getters.cartList.cartInfoList
            .forEach(item=>{
               let promise =  item.isChecked == 1 ? dispatch("deleteCartListBySkuId",item.skuId) : ''
               PromiseAll.push(promise)
        })

        return Promise.all(PromiseAll)
    }
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
}

const state = {
    cartList: []
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    actions,
    mutations,
    state,
    getters
}