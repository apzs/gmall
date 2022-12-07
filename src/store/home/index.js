//home模块的仓库
import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api"

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
    },
    async getBannerList({commit}){
        let res = await reqGetBannerList()
        if(res.code == 200){
            commit("GETBANNERLIST",res.data)
        }
    },
    async getFloorList({commit}){
        let res = await reqFloorList()
        if(res.code == 200){
            commit("GETFLOORLIST",res.data)
        }
    },
}
//mutation:修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
//state:仓库存储数据的地方
const state = {
    // 菜单的三级分类数据
    categoryList : [],
    // 轮播图的数据
    bannerList: [],
    // floor组件数组
    floorList: [],
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