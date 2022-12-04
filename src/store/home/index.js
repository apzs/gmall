//home模块的仓库
import { reqCategoryList } from "@/api"

//actions:可以书写自己的业务逻辑，也可以处理异步
const actions = {
    // categoryList(){
    //    reqCategoryList().then((res)=>{console.log(res)});
    // }

    async categoryList({commit}) {
        let res = await reqCategoryList();
        if(res.code == 200){
            commit("CATEGORYLIST",res.data)
        }
    }
}
//mutation:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    }
}
//state:仓库存储数据的地方
const state = {
    categoryList : []
}
//getters:可以理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}

//对外暴露Store类的一个实例
export default {
    actions,
    mutations,
    state,
    getters
}