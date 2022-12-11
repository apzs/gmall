<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="getPageNo(pageNo - 1)">上一页</button>
        <!-- 忽略:key有可能有两个... -->
        <button v-for="page in pagination" :key="page" @click="getPageNo(page)" :class="{active:pageNo==page}">{{ page }}</button>
        <button :disabled="pageNo == totalPage" @click="getPageNo(pageNo + 1)">下一页</button>
        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
  
<script>
export default {
    name: "Pagination",
    data() {
        return {
            pagination: []
        }
    },
    methods: {
        culPagination() {
            let { totalPage, pageNo, continues } = this
            // 父组件第一次传过来total时，有可能发的请求还没有响应，此时total还没有数据
            if(isNaN(totalPage) || totalPage<=0){
                return;
            }
            // 总页数小于等于需要的页数，则不显示...  直接显示页数
            if (totalPage <= continues) {
                for (let i = 0; i < totalPage; i++) {
                    this.pagination[i] = i + 1
                }
                // 总页数比需要的页数多一，则靠右时只左边显示... 靠左时只右边显示...
                // 总页数比需要的页数多2，则靠右时只左边显示... 靠左时只右边显示... 位于中间则两边都显示
                // 总页数比需要的页数数量>=2,如果pageNo=2则只左边显示... 如果pageNo=totalPage-1则只右边显示... 否则左右两边都显示
                // (1)假设 totalPage=6， continues=5
                // (2)假设 totalPage=7， continues=5
                // (2)假设 totalPage=11， continues=7
            } else {
                // 如果总页数比需要的页数数量<=2且当前页靠左，则右边显示...
                // 如果总页数比需要的页数数量>=2 且当前页向左延申后小于3，则右边显示...(即两个...中间的最左边数字不能小于3 =>最低要求为 1 ... 3 4 5 ... 11)
                // Math.floor((totalPage-4)/2) 中 totalPage-4 为总页数减去1、最大值和两个...(即中间的个数) 然后除以2向下取整即为向左或向右延申的个数 \
                // (例如：1 ... 3  4 5 ... 7，向左或向右延申的个数为中间的个数(3 4 5 即3个数)然后除以2向下取整即1，也就是4向左向右都延申1位)
                // (1.1) 1  2  3  ...  6
                // (2.1) 1  2  3  ...  7 
                // (3.1) 1  2  3   4   5  ...  11
                if (pageNo - Math.floor((totalPage - 4) / 2) < 3 || (totalPage - continues <= 2 && pageNo <= totalPage / 2)) {
                    for (let i = 0; i < totalPage / 2; i++) {
                        this.pagination[i] = i + 1
                    }
                    this.pagination[continues - 2] = '...'
                    this.pagination[continues - 1] = totalPage
                } else if (pageNo - Math.floor((totalPage - 4) / 2) > totalPage - 3 || (totalPage - continues <= 2 && pageNo > Math.ceil(totalPag / 2))) {
                    // 如果当前页靠右，则左边显示...
                    // 如果总页数比需要的页数数量>=2  且当前页向右延申后大于totalPage-3，则左边显示...(即两个...中间的最右边数字不能大于totalPage-3 =>最低要求为 1 ... 7 8 9 ... 11)
                    // (1.2) 1 ...  4  5  6
                    // (2.2) 1 ...  5  6  7
                    // (3.2) 1 ...  7  8  9  10  11
                    this.pagination[0] = 1
                    this.pagination[1] = '...'
                    for (let i = 2; i < continues; i++) {
                        // 比如(1.2)的4为totalPage(6)向左移两位，而又加了个i，又多了2，所以再向左移两位
                        this.pagination[i] = totalPage + i - 4
                    }
                } else {
                    // 当前页在中间  
                    this.pagination[0] = 1
                    this.pagination[1] = '...'

                    // 中间的数值
                    let middle = Math.ceil(total / 2);
                    // 中间的索引(索引需要减一，所以可以使用 Math.floor来减一)
                    let midIndex = Math.floor(totalPage / 2)
                    // (2.3) 1 ... 4 ... 7
                    // (3.3) 1 ... 5  6  7 ... 11
                    for (let i = 0; midIndex - i > 1; i--) {
                        // 中间向两边扩展(当是中间时,与中间的偏差i=0)
                        this.pagination[midIndex - i] = middle - i
                        this.pagination[midIndex + i] = middle + i
                    }
                    this.pagination[continues - 2] = '...'
                    this.pagination[continues - 1] = totalPage
                }
            }
        },
        getPageNo(newPageNo) {
            if (newPageNo != '...') {
                this.$emit('getPageNo', newPageNo)
            }
        },
    },
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        // 总页数向上取整
        totalPage() {
            // console.log(this.total,this.pageSize);
            return Math.ceil(this.total / this.pageSize)
        }
    },
    watch:{
        total(newValue,oldValue){
            // 当总数获取到后再计算分页数据（网络有延迟，第一次传过来的total为NAN ）
            this.culPagination()
        }
    }
}
</script>
  
<style lang="less" scoped>
.pagination {
    text-align: center;

    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: #409eff;
            color: #fff;
        }
    }
}
</style>
  