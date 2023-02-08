<template>
    <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[5, 10, 20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total" :url=url>
            <!-- :url=url(这个貌似没啥用) -->
        </el-pagination>
    </div>
</template>
<script>
import { getTableData } from '@/utils/table.js'
export default {
    name: 'Page',
    data() {
        return {
            page: 1,//当前页数
            size: 10,//每页显示条数
        }
    },
    props: {
        "total": Number,
        "url": String,
    },
    created() {
        console.log(this.url);// '/works'
        // 后端分页
        getTableData(this.$parent, this.url, { page: this.page, size: this.size }, ['completed'])
    },
    methods: {
        handleSizeChange(val) {
            this.size = val;
            this.page = 1;
            getTableData(this.$parent, this.url, { page: this.page, size: this.size }, ['completed'])
        },
        handleCurrentChange(val) {
            this.page = val;
            getTableData(this.$parent, this.url, { page: this.page, size: this.size }, ['completed'])
        },
    },
    mounted() {
        // 开启debug调试
        //package.json文件；找到 eslintConfig 配置参数；在 eslintConfig 下的 rules 添加 "no-debugger": "off"
        // debugger
    }
}
</script>
<style lang="">
    
</style>