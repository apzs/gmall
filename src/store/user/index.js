// 登录与注册的模块
import { reqGetCode,reqUserRegister } from "@/api"

const actions = {
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if(result.code == 200){
            commit("GETCODE",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("fail"))
        }
    },
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok'
        }else {
            return Promise.reject(new Error("fail"))
        }
    }
}

const mutations = {
    GETCODE(state,code){
        state.code = code
    }
}

const getters = {

}

const state = {
    code: undefined
}

export default {
    actions,
    mutations,
    getters,
    state
}