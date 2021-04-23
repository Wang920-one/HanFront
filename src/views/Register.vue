<template>
  <div
    id="bgImg"
    style="position:absolute;width:99%;min-height:100%;height:auto"
  >
    <el-container>
      <el-header>
        <img class="logologin" src="@/assets/images/logo.png" />
        <router-link to="/index">
          <el-button
            type="primary"
            icon="el-icon-house"
            class="shouye"
            style="background-color:#ffffff10;border: lightpink;float: right;margin-top: 20px;"
          ></el-button>
        </router-link>
      </el-header>

      <div class="signUp" style="text-align:center">
        <el-form
          :model="registerForm"
          ref="registerForm"
          label-width="100px"
          style="text-align:center;width:35%;margin-top:2%"
          class="demo-ruleForm"
          :rules="rules"
        >
          <div
            style="padding-top:20px;font-family:'楷体';font-size:25px;color:#fff"
          >
            <span>用户注册</span>
          </div>
          <el-form-item prop="userName" label="用户名">
            <el-input
              v-model="registerForm.userName"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userAccount" label="账号">
            <el-input
              v-model="registerForm.userAccount"
              placeholder="账号"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userPassword">
            <el-input
              type="password"
              placeholder="密码"
              v-model="registerForm.userPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              placeholder="确认密码"
              v-model="registerForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userSex" label="性别">
            <el-radio-group v-model="registerForm.userSex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="userBirthday" label="生日">
            <el-date-picker
              v-model="registerForm.userBirthday"
              placeholder="选择日期"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item prop="userSign" label="签名">
            <el-input
              v-model="registerForm.userSign"
              placeholder="签名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userPhone" label="手机">
            <el-input
              v-model="registerForm.userPhone"
              placeholder="手机"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userEmail" label="邮箱">
            <el-input
              v-model="registerForm.userEmail"
              placeholder="邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item prop="userQQ" label="QQ">
            <el-input v-model="registerForm.userQQ" placeholder="QQ"></el-input>
          </el-form-item>

          <el-form-item prop="userAddress" label="地区">
            <v-distpicker
              @selected="selected"
              province="湖北省"
              city="武汉市"
              area="江夏区"
            ></v-distpicker>
          </el-form-item>
          <div class="login-btn">
            <el-button @click="goback(-1)">取消</el-button>
            <el-button type="primary" @click="SignUp">确定</el-button>
          </div>
        </el-form>
      </div>
    </el-container>
  </div>
</template>
<script>
// import meadiaurl from "../../api/mediaurl";
import "../assets/style/global.css";
import VDistpicker from "v-distpicker";
import { mixin } from "../mixins";
import { SignUp } from "../api/index";
export default {
  name: "Login",
  name: "bgImg",
  mixins: [mixin],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        userAccount: "", //账号
        userName: "", //用户名
        userPassword: "", //密码
        checkPass: "", //确认密码
        userSex: "", //性别
        userPhone: "", //手机
        userEmail: "", //邮箱
        userQQ: "", //qq
        userBirthday: "", //生日
        userSign: "", //签名
        userAddress: "" //地区
      },
      rules: {
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        userSex: [{ required: true, trigger: "blur" }],
        userPhone: [],
        userEmail: [],
        useQQ: [],
        userBirthday: [],
        userSign: [],
        userAddress: [
          { type: "array", message: "请选择所在地区", trigger: "blur" }
        ]
      }
    };
  },

  components: {
    components: { VDistpicker }
  },

  methods: {
    //地区选择器
    selected(data) {
      this.registerForm.userAddress =
        data.province.value + "-" + data.city.value + "-" + data.area.value;
    },
    //注册
    SignUp() {
      let _this = this;
      let d = this.registerForm.userBirthday;
      let nowDate = new Date();
      let datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      let datetime1 =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate();
      let params = new URLSearchParams();
      params.append("userAccount", this.registerForm.userAccount);
      params.append("userName", this.registerForm.userName);
      params.append("userPassword", this.registerForm.userPassword);
      params.append("userSex", this.registerForm.userSex);
      params.append("userPhone", this.registerForm.userPhone);
      params.append("userQQ", this.registerForm.userQQ);
      params.append("userBirthday", datetime);
      params.append("userSign", this.registerForm.userSign);
      params.append("userEmail", this.registerForm.userEmail);
      params.append("userAddress", this.registerForm.userAddress);
      params.append("userImage", "/img/defualt/user.png");
      params.append("userBackImg", "/img/defualt/user.png");
      params.append("createTime", datetime1);
      params.append("updateTime", datetime1);
      SignUp(params)
        .then(res => {
          if (res.code == 1) {
            _this.$message({
              showClose: true,
              message: "注册成功",
              type: "success"
            });
            setTimeout(function() {
              _this.$router.push({ path: "/login" });
            }, 2000);
          } else {
            _this.$message({
              showClose: true,
              message: "该账号已存在！",
              type: "error"
            });
          }
        })
        .catch(res => {
          _this.$message({
            showClose: true,
            message: "注册失败",
            type: "error"
          });
        });
    },

    goback(index) {
      this.$router.go(index);
    }
  }
};
</script>

<style scoped>
.el-header {
  /* background-color: #b3c0d1;
  color: #333; */
  /* text-align: center; */
  line-height: 60px;
}

#bgImg {
  background-image: url("../assets/images/bg2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
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
  line-height: 160px;
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

.demo-ruleForm {
  /* background-image: url("../assets/logo.png"); */
  background-color: #ffffff41;
  max-width: 900px;
  margin: 0 auto;
  height: 870px;
  margin-top: 300px;
  margin-bottom: 200px;
  border: lightpink;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-form-item {
  margin-bottom: 15px;
}

/deep/ .el-form-item__label {
  /* 输入框字体颜色 */
  color: rgb(255, 255, 255);
  font-family: "楷体";
  margin-top: 10px;
}

/deep/.el-input__inner {
  /* 输入框椭圆 */
  border-radius: 30px;
  height: 25px;
  width: 100%;
  font-weight: initial;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
/deep/.distpicker-address-wrapper select {
  /* padding: .5rem .75rem; */
  height: 35px;
  font-size: 15px;
  font-family: "楷体";
  line-height: 1.25;
  /* color: #464a4c; */
  background-color: #fff;
  background-image: none;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  /* border: 1px solid rgba(0,0,0,0.15); */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
}
</style>

