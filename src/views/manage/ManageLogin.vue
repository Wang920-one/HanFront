<template>
  <div id="bgImg">
    <el-container>
      <el-header>
        <router-link to="/index">
          <el-tooltip
            content="回到首页"
            placement="bottom"
            effect="light"
          >
            <img
              class="logologin"
              src="@/assets/images/logo.png"
            />
          </el-tooltip>
        </router-link>
      </el-header>
      <span class="words">欢迎来到华夏衣裳汉服后台管理！</span>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <div style="padding-top:20px;font-family:'楷体';font-size:20px;color:#fff">
          <el-tooltip
            content="回到首页"
            placement="bottom"
            effect="light"
          >
            <el-button
              type="primary"
              @click="toIndex"
              class="goback"
              icon="el-icon-back"
            ></el-button>
          </el-tooltip>
          <span>管理员登录</span>
        </div>
        <el-form-item
          label="管理员"
          prop="manageName"
        >
          <el-input
            v-model="loginForm.manageName"
            placeholder="管理员"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="managePassword"
        >
          <el-input
            type="password"
            v-model="loginForm.managePassword"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            class="buttona"
            type="primary"
            @click="submitForm('loginForm')"
          >登录</el-button>
          <el-button
            class="buttona"
             type="primary"
            @click="toUser"
          >用户</el-button>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import { getLoginStatus } from "../../api/index";
import { mixin } from "../../mixins/index";
export default {
  name: "ManageLogin",
  name: "bgImg",
  mixins: [mixin],
  data() {
    return {
      loginForm: {
        manageName: "",
        managePassword: "",
      },
      rules: {
        manageName: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        managePassword: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      let params = new URLSearchParams();
      params.append("manageName", this.loginForm.manageName);
      params.append("managePassword", this.loginForm.managePassword);
      // console.log(this.loginForm.managePassword);
      getLoginStatus(params).then((res) => {
        if (res.code == 1) {
          localStorage.setItem("manageName", this.loginForm.manageName);
          this.$router.push("/MInfo");
          this.$message({
            showClose: true,
            message: "登录成功",
            type: "success",
          });
        } else {
          this.$message.error({
            showClose: true,
            message: "账号或者密码错误",
            type: "error",
          });
        }
      });
    },
    toUser() {
      this.$router.push("/login");
    },
    toIndex() {
      this.$router.push("/index");
    },
  },
};
</script>

<style scoped>
#bgImg {
  background-image: url("../../assets/images/background/登录.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
}
.el-header {
  height: 200px;
  position: fixed;
  top: 0px;
  left: 10px;
}
.goback {
  color: #f7a7a7;
  font-size: 20px;
  padding-top: 0px;
  background-color: #ffffff00;
  border-color: #ffffff00;
}
.goback:hover {
  background-color: #ffffff00;
  border-color: #ffffff00;
}
.words {
  color: #f7a7a7;
  font-family: "楷体";
  font-size: 50px;
  margin-left: 25%;
  margin-top: 10%;
}
.logologin {
  height: 80%;
  margin-top: 10px;
  float: left;
}
.demo-loginForm {
  /* background-image: url("../assets/logo.png"); */
  background-color: #f7a7a750;
  text-align: center;
  max-width: 900px;
  margin-left: 30%;
  margin-right: 35%;
  height: 300px;
  margin-top: 5%;
  margin-bottom: 25%;
  border: lightpink;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-button {
  font-family: "楷体";
  width: 10%;
}
/deep/.shouye {
  margin-top: 10px;
  background-color: #ffffff10;
  border: lightpink;
  float: right;
}
/deep/.shouye:hover {
  /* 鼠标放上去变色 */
  background-color: #f38787c9;
}

/deep/ .el-form-item__label {
  /* 输入框字体颜色 */
  color: rgb(255, 255, 255);
  font-family: "楷体";
  font-size: large;
  margin-top: 10px;
}

/deep/.el-input__inner {
  /* 输入框椭圆 */
  border-radius: 30px;
  height: 40px;
  font-weight: initial;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/deep/.buttona {
  font-family: "楷体";
  border-radius: 30px;
  color: #fff;
  margin-right: 20%;
  background-color: #f7a7a7;
  border-color: lightpink;
  width: 20%;
}
/deep/.buttona:hover {
  /* 鼠标放上去变色 */
  border-color: rgb(255, 255, 255);
  background-color: #f38787e5;
}
/deep/.el-form-item__content {
  margin-right: 50px;
}
/deep/.el-form-item__content {
  margin-top: 10px;
}
</style>

