<template>
  <div
    id="bgImg"
    style="position:absolute;width:99%;min-height:100%;height:auto"
  >
    <el-container>
      <el-header>
        <img
          class="logologin"
          src="@/assets/images/logo.png"
        />

        <router-link to="/index">
          <el-tooltip
            content="回到首页"
            placement="bottom"
            effect="light"
          >
            <el-button
              type="primary"
              icon="el-icon-house"
              class="shouye"
              style="background-color:#ffffff10;border: lightpink;float: right;margin-top: 20px;"
            ></el-button>
          </el-tooltip>
        </router-link>

      </el-header>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
        style="margin-top:15%;text-align:center"
      >
        <div style="padding-top:20px;font-family:'楷体';font-size:20px;color:#fff">
          <span>用户登录</span>
        </div>
        <el-form-item
          label="账号"
          prop="userAccount"
        >
          <el-input
            v-model="loginForm.userAccount"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="userPassword"
        >
          <el-input
            type="password"
            v-model="loginForm.userPassword"
            placeholder="密码"
          ></el-input>
        </el-form-item>

        <el-form-item>

          <el-button
            class="buttona"
            type="primary"
            style="margin-left:-15px;float:left"
            @click="handleLogin()"
          >登录</el-button>
          <el-button
            class="buttona"
            @click="toRegister"
          >注册</el-button>

        </el-form-item>
        <div>
          <el-tooltip
            content="管理员登录"
            placement="bottom"
            effect="light"
          >
            <el-button
              type="text"
              style="padding-top:0"
              @click="toManage"
            >管理员
            </el-button>
          </el-tooltip>
        </div>
      </el-form>
    </el-container>
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import { mixin } from "../mixins";
import { LoginIn } from "../api/index";
export default {
  name: "login",
  name: "bgImg",
  mixins: [mixin],
  data() {
    return {
      loginForm: {
        userAccount: "",
        userPassword: "",
      },
      rules: {
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
    };
  },
  components: { Footer },
  methods: {
    handleLogin() {
      let _this = this;
      let params = new URLSearchParams();
      params.append("userAccount", this.loginForm.userAccount);
      params.append("userPassword", this.loginForm.userPassword);
      LoginIn(params)
        .then((res) => {
          if (res.code == 1) {
            _this.$message({
              showClose: true,
              message: "登录成功",
              type: "success",
            });
            _this.$store.commit("setloginIn", true);
            _this.$store.commit("setId", res.userMsg.id);
            _this.$store.commit("setUserName", res.userMsg.userName);
            _this.$store.commit("setuserAccount", res.userMsg.userAccount);
            _this.$store.commit("setUserImage", res.userMsg.userImage);
            setTimeout(function () {
              _this.$router.push({ path: "/" });
            }, 2000);
          } else {
            _this.$message({
              showClose: true,
              message: "账号或者密码错误",
              type: "error",
            });
          }
        })
        .catch((res) => {
          _this.$message({
            showClose: true,
            message: "注册失败",
            type: "error",
          });
        });
    },
    toRegister() {
      this.$router.push("/register");
    },
    toManage() {
      this.$router.push("/managelogin");
    },
  },
};
</script>

<style scoped>
.el-header {
  /* background-color: #b3c0d1;
  color: #333; */
  /* text-align: center; */
  line-height: 60px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  text-align: center;
  line-height: 100px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.logologin {
  height: 90%;
  margin-top: 20px;
  float: left;
}

.demo-loginForm {
  /* background-image: url("../assets/logo.png"); */
  background-color: #ffffff41;
  max-width: 900px;
  margin: 0 auto;
  height: 290px;
  margin-top: 20%;
  margin-bottom: 25%;
  border: lightpink;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

#bgImg {
  background-image: url("../assets/images/bg2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
}

/deep/.shouye {
  margin-top: 10px;
  margin-left: 300px;
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
  height: 25px;
  font-weight: initial;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/deep/.buttona {
  font-family: "楷体";
  border-radius: 30px;
  width: 40%;
}
/deep/.el-button {
  font-family: "楷体";
  border-radius: 30px;
  /* width: 20%; */
}
/deep/.el-form-item__content {
  margin-right: 50px;
}
/deep/.el-form-item__content {
  margin-top: 10px;
}
</style>

