import { reqCartList } from "@/api"
const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        console.log(result);
    }
}

const mutations = {

}

const state = {

}

const getters = {

}

export default {
    actions,
    mutations,
    state,
    getters
}