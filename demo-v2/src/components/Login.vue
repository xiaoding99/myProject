<template>
    <div class="login">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>通用后台管理系统</span>
            </div>
            <el-form label-width="80px" :model="form" ref="form" :rules="rules">
                <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可 -->
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
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
import { nameRule, passRule } from '@/utils/validate.js'
import { setToken } from '@/utils/setToken.js'
import { login } from '@/api/api.js'
export default {
    name: 'Login',
    data() {

        // const validateName = (rule, value, callback) => {
        //     let reg = /^[a-zA-Z0-9]{4,10}$/
        //     if (value === '') {
        //         callback(new Error('请输入用户名'));
        //     } else if (!reg.test(value)) {
        //         callback(new Error('请输入4-10位用户名'));
        //     } else {
        //         callback();
        //     }
        // };

        // const validatePass = (rule, value, callback) => {
        //     let pass = /^\S*(?=\S{6,12})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
        //     if (value === '') {
        //         callback(new Error('请输入密码'));
        //     } else if (!pass.test(value)) {
        //         callback(new Error('6-12位密码需要包含大小写字母和数字及特殊符号'));
        //     } else {
        //         callback();
        //     }
        // };

        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    // { validator: validateName, trigger: 'blur' }
                    { validator: nameRule, trigger: 'blur' }
                ],
                password: [
                    // { validator: validatePass, trigger: 'blur' }
                    { validator: passRule, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        login(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // 把登录方法封装成api进行调用
                    // this.service.post('/login', this.form)
                    //     .then((res) => {
                    //         if (res.data.status === 200) {
                    //             setToken("username", res.data.username)
                    //             setToken("token", res.data.token)
                    //             // 消息提示
                    //             this.$message({ message: res.data.message, type: 'success' })
                    //             this.$router.push('/home')
                    //         }
                    //     })
                    //     .catch(function (error) {
                    //         console.log(error);
                    //     });

                    login(this.form).then((res) => {
                        if (res.data.status === 200) {
                            setToken("username", res.data.username)
                            setToken("token", res.data.token)
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