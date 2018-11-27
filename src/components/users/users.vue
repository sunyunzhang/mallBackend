<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2.搜索框 -->
    <el-row class="inputRow">
      <el-col>
        <el-input
          placeholder="请输入内容"
          v-model="query"
          clearable
          @clear="getusersList()"
          class="inputSearch"
        >

          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchuser()"
          ></el-button>
        </el-input>
        <el-button
          @click="adduserShow()"
          type="success"
        >
          添加用户
        </el-button>
      </el-col>
      <el-col></el-col>
    </el-row>
    <!-- 3.表格 -->

    <template>
      <el-table
        :data="userslist"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          prop=""
          label="#"
          width="80"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="姓名"
          width="100"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="邮箱"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
        >
        </el-table-column>

        <!-- fmtdate -->
        <el-table-column
          prop="create_time"
          label="创建日期"
        >
          <!-- 非字符数据需放入template中显示 -->
          <!-- 传值到template中使用插槽slot -->
          <template slot-scope="userslist">
            {{userslist.row.create_time | fmdate}}
          </template>
        </el-table-column>

        <el-table-column
          prop="mg_state"
          label="用户状态"
        >
          <!-- 非字符数据需放入template中显示 -->
          <template slot-scope="userslist">
            <el-switch
              v-model="userslist.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="edituserShow(scope)"
            ></el-button>
            <el-button
              size="mini"
              type="success"
              icon="el-icon-check"
              circle
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteuser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 4.分页 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 5.用于显示添加的对话框模板 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      >
      <el-form :model="form">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <el-form :model="form">
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <el-form :model="form">
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <el-form :model="form">
        <el-form-item
          label="电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="adduser()"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 6.用于编辑的对话框 -->
   <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisibleEdit"
      >
      <el-form :model="form">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="form">
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <el-form :model="form">
        <el-form-item
          label="电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button
          type="primary"
          @click="edituser()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
     
      userslist: [
        {
          create_time: "",
          email: "",
          id: "",
          mg_state: "",
          mobile: "",
          role_name: "",
          username: ""
        }
      ],
      // 获取用户数据的请求参数
      pagenum: 1,
      pagesize: 2,
      total: -1,
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      formLabelWidth: "100px",
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    };
  },
  created() {
    this.getusersList();
  },
  methods: {


    // 点击确定按钮发送编辑请求,并关闭对话框
    async edituser(){
      // 1.发送请求
      const res = await this.$http.put(`users/${this.form.id}`,`${this.form.email}`,`${this.form.mobile}`)
      console.log(res)
      console.log(this.form.email)
      const {meta:{msg,status},data} = res.data
      if(status === 200){
        // 2.关闭对话框
        this.dialogFormVisibleEdit = false;
        //3.提示消息
        this.$message.success(msg)
        //4.更新视图
        this.getusersList()
      }else{
        this.$message.warning(msg)        
      }
    },
    //点击按钮弹出编辑用户对话框
    edituserShow(scope){
      this.form = scope.row
      console.log(this.form)
      this.dialogFormVisibleEdit = true;
    },


    // 点击按钮删除用户
    deleteuser(userID){
        
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async ()=>{
          //1.发送请求
          const res = await this.$http.delete(`users/${userID}`)
          console.log(res)
          console.log(userID)
          const {meta:{msg,status},data} = res.data
          // 2.消息提示
          if(status === 200){

            this.$message({
              type: 'success',
              message: '删除成功!'
            })

          }else{
            this.$message({
              type: 'warning',
              message: msg
            })
          }
          // 3.更新视图
          this.getusersList()
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },

    //点击确定按钮发送请求,并关闭对话框
    async adduser() {
      //1.发送请求
      const res = await this.$http.post("users", this.form);
      console.log(res);
      console.log(this.form);
      const {
        meta: { msg, status },
        data
      } = res.data;
      if (status === 201) {
        // 2.关闭对话框
        this.dialogFormVisible = false;
        //3.提示消息
        this.$message.success(msg);
        //4.提示视图
        this.getusersList();
        // 5.清空form
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },
    // 点击添加用户打开对话框
    adduserShow() {
      // 打开添加用户对话框
      this.dialogFormVisible = true;
    },
    // 查询用户
    searchuser() {
      this.pagenum = 1;
      this.getusersList();
    },

    // 分页
    // 每页显示数据条数改变触发
    handleSizeChange(val) {
      //给发送到后端的参数pagesize重新赋值
      this.pagesize = val;
      this.getusersList();
    },
    // 改变当前页时触发
    handleCurrentChange(val) {
      // 当页码改变时重新渲染数据
      // 改变发送到后端的参数pagenum
      this.pagenum = val;
      this.getusersList();
    },

    // 获用户数据
    async getusersList() {
      // 发送请求
      const res = await this.$http.get(
        `/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      const {
        meta: { msg, status },
        data: { total, users }
      } = res.data;
      if (status === 200) {
        this.total = total;
        this.userslist = users;
        this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    }
  }
};
</script>

<style >
.box-card {
  height: 100%;
  /* background-color: red; */
}
.inputRow {
  margin-top: 20px;
  height: 100%;
}
.inputSearch {
  width: 400px;
}
</style>
