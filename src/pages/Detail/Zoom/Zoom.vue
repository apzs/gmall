<template>
  <div class="spec-preview">
    <!-- 大图 -->
    <img :src="imgObj.imgUrl" />
    <!-- 鼠标移动事件 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 放大后的大图 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ['skuImageList'],
    data(){
      return {
        currentIndex: 0
      }
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    methods: {
      handler(event){
        let mask = this.$refs.mask
        let big = this.$refs.big
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        // 添加约束范围
        // 限制左边
        if(left <= 0) left = 0
        // 限制右边（这种写法适用于offsetWidth正好是盒子的一半，即超过盒子一半就将left设置为盒子的一半，不具有普适性)
        // 正确写法应该是event.offsetX - mask.offsetWidth/2 > 父盒子宽度
        if(left >= mask.offsetWidth) left = mask.offsetWidth
        if(top<=0) top = 0
        if(top>=mask.offsetHeight) top = mask.offsetHeight
        // 修改元素的left|top属性值
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'
        // 由于时放大了两倍，所以要乘以2；之所以为负，是因为鼠标右移实际上放大的图片是在左移，鼠标下移实际上放大的图片是在上移
        // 不明白的可以把.big里的overflow: hidden;注释掉，或者搜一下精灵图
        big.style.left = -2 * left + 'px'
        big.style.top = -2 * top + 'px'
      }
    },
    mounted(){
      // 全局事件总线，获取兄弟组件传递的数据
      this.$bus.$on('getIndex',(index)=>{
          this.currentIndex = index
      })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>