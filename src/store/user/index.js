// 登录与注册的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api"
import { setToken, getToken,removeToken } from "@/utils/token";

const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("fail"))
        }
    },
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            // 提交用户信息
            commit("GETUSERINFO", result.data)
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogout({commit}) {
        let result = await reqLogout()
        if (result.code == 200) {
            // 清除token
            commit("CLEAR")
            return 'ok'
        }else {
            return Promise.reject(new Error('fail'))
        }
    }
}

const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}

const getters = {

}

const state = {
    code: undefined,
    token: getToken(),
    userInfo: {},
}

export default {
    actions,
    mutations,
    getters,
    state
}