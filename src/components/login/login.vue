<template>
  <div class="form-login">

    <el-form
      label-position="top"
      label-width="80px"
      :model="formdata"
      class="form-login-contents"
    >
      <h3>用户登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        class="form-login-btn"
        @click.prevent="submitData()"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitData () {
      this.$httpL
        .post('login', this.formdata)
        .then(res => {
          const {
            meta: { msg, status },
            data
          } = res.data
          if (status === 200) {
            // 弹窗提示
            this.$message({
              message: msg,
              type: 'success'
            })
            // 添加localStorage
            localStorage.setItem('token', data.token)
            // 跳转页面
            this.$router.push({ name: 'home' })
          } else {
            this.$message({
              message: msg,
              type: 'warning'
            })
          }
        })
    }
  }
}
</script>

<style>
.form-login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-login-contents {
  width: 400px;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
}
.form-login-btn {
  width: 100%;
}
</style>
