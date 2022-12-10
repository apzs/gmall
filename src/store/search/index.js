//search模块的仓库
import { getSearchInfo } from "@/api";


const actions = {
    async getSearchList({commit},params={}){
      let res = await getSearchInfo(params);
      if(res.code==200){
        commit("GETSEARCHLIST",res.data);
      }
    }
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
};
const state = {
    searchList: {}
};
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}