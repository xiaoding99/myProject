<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>通用后台管理系统</span>
            </div>
            <el-form label-width="80px" :model="form" ref="form">
                <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->
                <el-form-item label="用户名" prop="username" :rules="[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, max: 10, message: '长度在4-10字符之间', trigger: 'blur' }
                ]">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :rules="[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在6-12字符', trigger: 'blur' }
                ]">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login('form')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {

                    this.axios.post('http://1.116.64.64:5004/api2/login', this.form)
                        .then(res => {
                            console.log(res)
                            if (res.data.status === 200) {
                                localStorage.setItem('username', res.data.username)
                                // 消息提示
                                this.$message({ message: res.data.message, type: 'success' })
                                this.$router.push('/home')
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });

                } else {
                    console.error(this.form);
                    return false;
                }
            });
        }
    }
}
</script>


<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgb(72, 72, 241);

    .box-card {
        width: 450px;
        margin: 200px auto;

        .el-card__header {
            font-size: 34px;
            text-align: center;
        }

        .el-button {
            width: 100%;
        }
    }
}
</style>