<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          round
          @click="delAllUser"
        >
          批量删除
        </el-button>
        <el-input
          v-model="select_word"
          size="mini"
          placeholder="请输入用户名称"
          class="handle-input"
          ><i
            class="el-icon-search el-input__icon"
            slot="suffix"
            style="color: #f7a7a7"
          >
          </i
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          style="float:right"
          round
          @click="centerDialogVisible = true"
        >
          添加用户
        </el-button>
      </div>
    </div>

    <!-- 显示数据 -->
    <el-table
      size="mini"
      ref="multipleTable"
      border
      style="width:100%"
      height="680px"
      :data="data"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column
        prop="userName"
        label="用户昵称"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userAccount"
        label="用户账号"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column label="用户头像" width="110" align="center">
        <template slot-scope="scope">
          <div class="user-img">
            <img :src="getUrl(scope.row.userImage)" style="width:100%" />
          </div>
          <el-upload
            :action="uploadUrl(scope.row.id)"
            :before-upload="beforeImgUpload"
            :on-success="handleImgSuccess"
          >
            <el-button size="mini" round>更新图片</el-button>
          </el-upload>
        </template>
      </el-table-column>
      <el-table-column label="用户性别" width="100" align="center">
        <template slot-scope="scope">
          {{ changeSex(scope.row.userSex) }}
        </template>
      </el-table-column>
      <el-table-column label="用户生日" width="120" align="center">
        <template slot-scope="scope">{{
          attachDate(scope.row.userBirthday)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="userEmail"
        label="用户邮箱"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="userQQ"
        label="用户QQ"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="userPhone"
        label="用户电话"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="userAddress"
        label="用户地址"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column label="用户创建时间" width="120" align="center">
        <template slot-scope="scope">{{
          attachDate(scope.row.createTime)
        }}</template>
      </el-table-column>
      <el-table-column label="用户更新时间" width="120" align="center">
        <template slot-scope="scope">{{
          attachDate(scope.row.updateTime)
        }}</template>
      </el-table-column>
      <el-table-column prop="userSign" label="用户个性签名" align="center">
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加分页组件 -->
    <div class="pagination">
      <el-pagination
        background
        layout="total,prev,pager,next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="tableData.length"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="centerDialogVisible"
      width="400px"
      center
    >
      <el-form
        :model="registerForm"
        ref="registerForm"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item prop="userAccount" label="账号" size="mini">
          <el-input
            v-model="registerForm.userAccount"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="昵称" size="mini">
          <el-input
            v-model="registerForm.userName"
            placeholder="昵称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPassword" label="密码" size="mini">
          <el-input
            type="password"
            v-model="registerForm.userPassword"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <input
            type="radio"
            name="userSex"
            value="0"
            v-model="registerForm.userSex"
          />&nbsp;女&nbsp;&nbsp;
          <input
            type="radio"
            name="userSex"
            value="1"
            v-model="registerForm.userSex"
          />&nbsp;男
        </el-form-item>
        <el-form-item prop="userBirthday" label="生日" size="mini">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="registerForm.userBirthday"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="userEmail" label="邮箱" size="mini">
          <el-input
            v-model="registerForm.userEmail"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPhone" label="电话" size="mini">
          <el-input
            v-model="registerForm.userPhone"
            placeholder="电话"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userQQ" label="QQ" size="mini">
          <el-input v-model="registerForm.userQQ" placeholder="QQ"></el-input>
        </el-form-item>
        <el-form-item prop="userAddress" label="地址" size="mini">
          <el-input
            v-model="registerForm.userAddress"
            placeholder="地址"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userSign" label="个性签名" size="mini">
          <el-input
            v-model="registerForm.userSign"
            placeholder="个性签名"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="centerDialogVisible = false"
          >取消</el-button
        >
        <el-button size="mini" @click="addUser">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editVisible"
      width="400px"
      center
    >
      <el-form :model="form" ref="form" label-width="80px" :rules="rules">
        <el-form-item prop="userAccount" label="账号" size="mini">
          <el-input v-model="form.userAccount" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="昵称" size="mini">
          <el-input v-model="form.userName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item prop="userPassword" label="密码" size="mini">
          <el-input
            type="password"
            v-model="form.userPassword"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" size="mini">
          <input
            type="radio"
            name="userSex"
            value="0"
            v-model="form.userSex"
          />&nbsp;女&nbsp;&nbsp;
          <input
            type="radio"
            name="userSex"
            value="1"
            v-model="form.userSex"
          />&nbsp;男
        </el-form-item>
        <el-form-item label="生日" size="mini">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.userBirthday"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="userEmail" label="邮箱" size="mini">
          <el-input v-model="form.userEmail" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="userQQ" label="QQ" size="mini">
          <el-input v-model="form.userQQ" placeholder="QQ"></el-input>
        </el-form-item>
        <el-form-item prop="userPhone" label="电话" size="mini">
          <el-input v-model="form.userPhone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="userAddress" label="地址" size="mini">
          <el-input v-model="form.userAddress" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item prop="userSign" label="个性签名" size="mini">
          <el-input
            v-model="form.userSign"
            placeholder="个性签名"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="editVisible = false">取消</el-button>
        <el-button size="mini" @click="editUser">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除用户 -->
    <el-dialog title="删除用户" :visible.sync="delVisible" width="300px" center>
      <div align="center">删除后恢复不了了，是否确定删除</div>
      <span slot="footer">
        <el-button size="mini" @click="delVisible = false">取消</el-button>
        <el-button size="mini" @click="deleteRow">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUser, SignUp, updateUser, delUser } from "../../api/index";
import { mixin } from "../../mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false, //添加弹窗是否显示
      editVisible: false, //编辑弹窗是否显示
      delVisible: false, //删除弹窗是否显示
      registerForm: {
        //添加框
        userAccount: "",
        userName: "",
        userPassword: "",
        userSex: "1",
        userBirthday: "",
        userEmail: "",
        userAddress: "",
        createTime: "",
        updateTime: "",
        userSign: "",
        userPhone: "",
        userQQ: ""
      },
      form: {
        //编辑框
        id: "",
        userAccount: "",
        userName: "",
        userPassword: "",
        userSex: "1",
        userBirthday: "",
        userEmail: "",
        userAddress: "",
        createTime: "",
        updateTime: "",
        userSign: "",
        userPhone: "",
        userQQ: ""
      },
      tableData: [],
      tempData: [],
      select_word: "",
      pageSize: 5, //分页的每页大小
      currentPage: 1, //当前页
      idx: -1, //当前选择项
      multipleSelection: [], //多选项
      rules: {
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
        // email: [
        //   { required: true, message: "请输入电子邮箱", trigger: "blur" },
        //   {
        //     type: "email",
        //     message: "请输入正确的电子邮箱地址",
        //     trigger: ["blur", "change"]
        //   }
        // ]
      }
    };
  },
  computed: {
    //计算当前搜索结果表里的数据
    data() {
      //根据分页计算
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  watch: {
    //搜索框里面的内容发生变化的时候，搜索结果table列表的内容跟着它的内容发生变化
    select_word: function() {
      if (this.select_word == "") {
        this.tableData = this.tempData;
      } else {
        this.tableData = [];
        for (let item of this.tempData) {
          if (item.userName.includes(this.select_word)) {
            this.tableData.push(item);
          }
        }
      }
    }
  },
  created() {
    this.getDate();
  },

  methods: {
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //查询所有用户
    getDate() {
      this.tempData = [];
      this.tableData = [];
      getAllUser().then(res => {
        this.tempData = res;
        this.tableData = res;
        this.currentPage = 1;
      });
    },

    //添加用户
    addUser() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          let d = this.registerForm.userBirthday;
          let datetime =
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
          let params = new URLSearchParams();
          params.append("userAccount", this.registerForm.userAccount);
          params.append("userName", this.registerForm.userName);
          params.append("userImage", "/img/defualt/user.png");
          params.append("userBirthday", datetime);
          params.append("userPassword", this.registerForm.userPassword);
          params.append("userSex", this.registerForm.userSex);
          params.append("userEmail", this.registerForm.userEmail);
          params.append("userPhone", this.registerForm.userPhone);
          params.append("userQQ", this.registerForm.userQQ);
          params.append("userAddress", this.registerForm.userAddress);
          params.append("userSign", this.registerForm.userSign);
          params.append("createTime", datetime);
          params.append("updateTime", datetime);

          //获取当前时间

          SignUp(params)
            .then(res => {
              if (res.code == 1) {
                this.getDate();
                this.$message({
                  showClose: true,
                  message: "添加成功",
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "添加失败",
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.centerDialogVisible = false;
          //   location.reload(); //刷新当前页面，解决添加表单不清空数据的问题
        }
      });
    },

    //弹出编辑页面
    handleEdit(row) {
      (this.editVisible = true),
        (this.form = {
          id: row.id,
          userAccount: row.userAccount,
          userName: row.userName,
          userPassword: row.userPassword,
          userSex: row.userSex,
          userBirthday: row.userBirthday,
          userEmail: row.userEmail,
          userAddress: row.userAddress,
          userQQ: row.userQQ,
          userPhone: row.userPhone,
          userSign: row.userSign
        });
    },

    //保存编辑页面的数据
    editUser() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let d = new Date(this.form.userYear);
          let datetime =
            d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
          let params = new URLSearchParams();
          params.append("id", this.form.id);
          params.append("userAccount", this.form.userAccount);
          params.append("userName", this.form.userName);
          params.append("userBirthday", datetime);
          params.append("userPassword", this.form.userPassword);
          params.append("userSex", this.form.userSex);
          params.append("userEmail", this.form.userEmail);
          params.append("userAddress", this.form.userAddress);
          params.append("userSign", this.form.userSign);
          params.append("userPhone", this.form.userPhone);
          params.append("userQQ", this.form.userQQ);
          params.append("createTime", datetime);
          params.append("updateTime", datetime);

          updateUser(params)
            .then(res => {
              if (res.code == 1) {
                this.getDate();
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success"
                });
              } else {
                this.$message({
                  showClose: true,
                  message: "修改失败",
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
          this.editVisible = false;
        }
      });
    },
    //更新图片
    uploadUrl(id) {
      return `${this.$store.state.HOST}/user/updateUserImg?id=${id}`;
    },
    //单项删除
    deleteRow() {
      delUser(this.idx)
        .then(res => {
          if (res) {
            this.getDate();
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.delVisible = false;
    }
  }
};
</script>
<style scoped>
.handle-box {
  margin-bottom: 7px;
}
.user-img {
  width: 100%;
  height: 70px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}
.user-bimg {
  width: 100%;
  height: 70px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}
.handle-input {
  width: 250px;
  border-radius: 30px;
  margin-left: 40%;
  display: inline-block;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>