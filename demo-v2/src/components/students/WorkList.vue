<template>
    <div class="workList">
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[5, 10, 20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>
<script>
import { getTableData } from '@/utils/table.js'
export default {
    name: 'WorkList',
    data() {
        return {
            tableData: [],
            total: 0,
            page: 1,
            size: 10,
            loading: true
        }
    },
    created() {
        // 后端分页
        getTableData(this, '/works', { page: this.page, size: this.size }, ['completed'])
    },
    methods: {
        handleSizeChange(val) {
            this.size = val;
            this.page = 1;
            getTableData(this, '/works', { page: this.page, size: this.size }, ['completed'])
        },
        handleCurrentChange(val) {
            this.page = val;
            getTableData(this, '/works', { page: this.page, size: this.size }, ['completed'])
        },
    }
}
</script>

<style lang="scss">
.workList {
    .el-pagination {
        text-align: left;
        margin-top: 20px;
    }
}
</style>