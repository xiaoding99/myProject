<template>
    <div class="menu">
        <el-aside width="200px">
            <!--router: 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
            <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff"
                active-text-color="#ffd04b" router>
                <template v-for="(item, index) in menus">
                    <el-submenu :index="index + ''" :key="index" v-if="!item.hidden">
                        <template slot="title">
                            <i :class="item.iconClass"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item-group v-for="(child, index) in item.children" :key="index">
                            <el-menu-item :index="child.path">
                                <i :class="child.iconClass"></i>
                                {{ child.name }}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </template>

                <!-- <el-submenu index="11">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :route="{ path: '/users/eduardo' }">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu> -->
            </el-menu>
        </el-aside>
    </div>
</template>


<script>
export default {
    name: 'Menu',
    data() {
        return {
            menus: []
        }
    },
    created() {
        this.menus = [...this.$router.options.routes];
    }
}

</script>


<style lang="scss" scoped>
.menu {
    .el-aside {
        height: 100%;

        .el-menu {
            height: 100%;

            .fa {
                margin-right: 10px;
            }
        }

        .el-submenu .el-menu-item {
            min-width: 0;
        }
    }
}
</style>