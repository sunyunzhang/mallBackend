<template>

  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img
              src=""
              alt=""
            >
          </div>
        </el-col>
        <el-col
          :span="18"
          class="middle"
        >
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理系统</h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple tc">
            <a
              href="#"
              @click="esc()"
            >退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside
        width="200px"
        class="aside"
      >
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :router="true"
          :unique-opened="true"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">用户列表</el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">角色列表</el-menu-item>
            <el-menu-item index="1-1">权限列表</el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">商品列表</el-menu-item>
            <el-menu-item index="1-1">分类参数</el-menu-item>
            <el-menu-item index="1-1">商品分类</el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">订单列表</el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">数据列表</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  beforeCreate () {
    // 需求:用户输入主页网址,需进行验证,如果没有localStorage,则返回登录页
    // 获取localStorage
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    // 退出功能
    // 点击按钮退出
    esc () {
      // 清除localStorage并跳转到登录页
      localStorage.clear()
      this.$router.push({name: 'login'})
      // 弹窗提示退出成功
      this.$message({
        message: '退出成功',
        type: 'success'
      })
    }
  }
}
</script>

<style >
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}

/* 头部样式调整 */
.middle {
  text-align: center;
}
.tc {
  line-height: 60px;
  text-decoration: none;
}
</style>
