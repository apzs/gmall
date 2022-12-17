<template>
    <div>
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Like />
        <Floor v-for="(floor, index) in floorList" :key="floor.id" :list='floor' />
        <Brand />
        <!-- <button @click="add">点击我加上1</button>
        <span>仓库的数量{{count}}</span>
        <button>点击我减去1</button> -->
    </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend"
import Rank from "@/pages/Home/Rank"
import Like from "@/pages/Home/Like"
import Floor from "@/pages/Home/Floor"
import Brand from "@/pages/Home/Brand"

import { mapState } from 'vuex';

export default {
    name: 'Home',
    return: {

    },
    mounted() {
        // 获取floor组件数据
        this.$store.dispatch("getFloorList")
    },
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    },
    // methods: {
    //     add(){
    //         //this.$store.dispatch("add"); // 调用action里的add()
    //         this.$store.commit("ADD") // 调用mutations里的 ADD(state, count)
    //     }
    // }
}
</script>
<style scoped>

</style>