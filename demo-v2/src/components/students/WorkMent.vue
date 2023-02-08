<template>
    <div class="WorkMent">
        <!-- 表格 -->
        <!--  v-loading:loading加载 -->
        <el-table :data="tableData" border style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="用户ID" align="center">
            </el-table-column>
            <el-table-column prop="userId" label="所属班级" align="center">
            </el-table-column>
            <el-table-column prop="title" label="作业名称" align="center">
            </el-table-column>
            <el-table-column prop="completed_text" label="完成情况" align="center">
            </el-table-column>
        </el-table>
        <Page :total=total :url=url></Page>
    </div>
</template>
<script>
// 封装分页
import Page from '../common/Page.vue'
export default {
    name: 'WorkMent',
    data() {
        return {
            tableData: [],
            loading: true,
            total: 0,
            url:'/works'
        }
    },
    components: {
        Page
    }
}
</script>

<style lang="scss">
.WorkMent {
    .el-pagination {
        text-align: left;
        margin-top: 20px;
    }
}
</style>