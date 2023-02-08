<template>
    <div class="InfoMent">
        <el-form :inline="true" class="demo-form-inline" size="small">
            <el-form-item>
                <el-button type="primary" @click="addStudent">新增</el-button>
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="姓名" align="center">
            </el-table-column>
            <el-table-column prop="age" label="年龄" align="center">
            </el-table-column>
            <el-table-column prop="sex" label="性别" align="center">
            </el-table-column>
            <el-table-column prop="father" label="父亲姓名" align="center">
            </el-table-column>
            <el-table-column prop="mather" label="母亲姓名" align="center">
            </el-table-column>
            <el-table-column prop="time" label="入校时间" align="center">
            </el-table-column>
            <el-table-column prop="address" label="家庭住址" align="center">
            </el-table-column>
            <el-table-column prop="phone" label="联系方式" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹框 -->
        <el-dialog :title="state ? '添加学生信息' : '修改学生信息'" :visible.sync="dialogFormVisible" width="500px">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
                    <el-radio v-model="form.sex" label="1">男</el-radio>
                    <el-radio v-model="form.sex" label="2">女</el-radio>
                </el-form-item>
                <el-form-item label="父亲姓名" :label-width="formLabelWidth" prop="father">
                    <el-input v-model="form.father" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="母亲姓名" :label-width="formLabelWidth" prop="mather">
                    <el-input v-model="form.mather" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="address">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="入校时间" :label-width="formLabelWidth" prop="time">
                    <!-- format指定输入框的格式；value-format指定绑定值的格式 -->
                    <el-date-picker v-model="form.time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="联系方式" :label-width="formLabelWidth" prop="phone">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeInfo('form')">取 消</el-button>
                <el-button type="primary" @click="sure('form')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// 优化封装API
// import { info, getInfo, InfoDel } from '@/api/api.js'
import { getData, changeInfo, delData } from '@/utils/table.js'
export default {
    name: 'InfoLists',
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            formLabelWidth: '80px',
            form: {
                name: '',
                age: '',
                sex: '1',
                father: '',
                mather: '',
                time: '',
                address: '',
                phone: '',
            },
            rules: {
                name: [{ required: true, message: '请输入姓名' }],
                age: [{ required: true, message: '请输入年龄' }],
                sex: [{ required: true }],
                time: [{ required: true, message: '请输入入学时间' }],
                address: [{ required: true, message: '请输入地址' }],
                phone: [{ required: true, message: '请输入联系方式' }],
            },
            state: true,
            total: 0,
        }
    },
    created() {
        getData(this, '/info')
    },
    methods: {
        edit(row) {
            //重点：不要修改原数据
            this.form = { ...row }
            this.state = false;
            this.dialogFormVisible = true
        },
        del(row) {
            delData(this, 'info', row.id, getData)
        },
        addStudent() {
            //【没有保存id值】
            this.form = { name: '', age: '', sex: '1', father: '', mather: '', time: '', address: '', phone: '' }
            this.state = true
            this.dialogFormVisible = true
        },
        sure(form) {
            // 任一表单项被校验后触发
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // if (this.state) {
                    //     changeInfo(this, 'post', '/info', this.form, getData)

                    // } else {
                    //     changeInfo(this, 'put', '/info', this.form, getData)
                    // }

                    let method = '';
                    this.state ? method = 'post' : method = 'put'
                    changeInfo(this, method, '/info', this.form, getData)
                }
            });
        },
        closeInfo(form) {
            //对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
            this.$refs[form].resetFields()
            this.dialogFormVisible = false
        }
    }
}
</script>

<style lang="scss">
.InfoMent {

    .demo-form-inline,
    .el-form-item {
        text-align: left;
    }
}
</style>