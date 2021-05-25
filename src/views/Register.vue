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
      <span class="words">欢迎加入华夏衣裳汉服交流网！</span>
        <el-form
          :model="registerForm"
          ref="registerForm"
          label-width="100px"
          class="demo-registerForm"
          :rules="rules"
        >
          <div style="padding-top:20px;font-family:'楷体';font-size:25px;color:#fff">
            <span>用户注册</span>
          </div>
          <el-form-item
            prop="userName"
            label="用户名"
          >
            <el-input
              v-model="registerForm.userName"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="userAccount"
            label="账号"
          >
            <el-input
              v-model="registerForm.userAccount"
              placeholder="账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="userPassword"
          >
            <el-input
              type="password"
              placeholder="密码"
              v-model="registerForm.userPassword"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPass"
          >
            <el-input
              type="password"
              placeholder="确认密码"
              v-model="registerForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="userEmail"
            label="邮箱"
          >
            <el-input
              v-model="registerForm.userEmail"
              placeholder="邮箱"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="userSex"
            label="性别"
          >
            <el-radio-group v-model="registerForm.userSex">
              <el-radio :label="0">女</el-radio>
              <el-radio :label="1">男</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item
            prop="userAddress"
            label="地区"
          >
            <v-distpicker
              @selected="selected"
              province="湖北省"
              city="武汉市"
              area="江夏区"
            ></v-distpicker>
          </el-form-item> -->
          <div>
            <el-button
              class="buttona"
              type="primary"
              @click="goback(-1)"
            >取消</el-button>
            <el-button
              class="buttona"
              type="primary"
              @click="SignUp"
            >确定</el-button>
          </div>
        </el-form>
    </el-container>
  </div>
</template>
<script>
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
        // userPhone: "", //手机
        // userEmail: "", //邮箱
        // userQQ: "", //qq
        // userBirthday: "", //生日
        // userSign: "", //签名
        // userAddress: "", //地区
      },
      rules: {
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        userPassword: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        userSex: [{ }],
        userEmail: [],
        // useQQ: [],
        // userBirthday: [],
        // userSign: [],
        // userAddress: [
        //   { type: "array", message: "请选择所在地区", trigger: "blur" },
        // ],
      },
    };
  },

  components: {
    components: { VDistpicker },
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
      let nowDate = new Date();
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
      params.append("userPhone", " ");
      params.append("userQQ", " ");
      params.append("userBirthday", datetime1);
      params.append("userSign", " ");
      params.append("userEmail", this.registerForm.userEmail);
      params.append("userAddress", "湖北省-武汉市-江夏区");
      params.append("userImage", "/img/defualt/user.png");
      params.append("userBackImg", "/img/defualt/user.png");
      params.append("createTime", datetime1);
      params.append("updateTime", datetime1);
      SignUp(params)
        .then((res) => {
          if (res.code == 1) {
            _this.$message({
              showClose: true,
              message: "注册成功",
              type: "success",
            });
            setTimeout(function () {
              _this.$router.push({ path: "/login" });
            }, 2000);
          } else {
            _this.$message({
              showClose: true,
              message: "该账号已存在！",
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

    goback(index) {
      this.$router.go(index);
    },
  },
};
</script>

<style scoped>
#bgImg {
  background-image: url("../assets/images/background/登录.jpg");
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
.logologin {
  height: 80%;
  margin-top: 10px;
  float: left;
}
.words {
  color: #f7a7a7;
  font-family: "楷体";
  font-size: 50px;
  margin-left: 25%;
  margin-top: 5%;
}
.demo-registerForm {
  /* background-image: url("../assets/logo.png"); */
  background-color: #f7a7a750;
  text-align: center;
  max-width: 900px;
  margin-left: 30%;
  margin-right: 35%;
  height: 550px;
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
  height: 35px;
  font-weight: initial;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/deep/.buttona {
  font-family: "楷体";
  border-radius: 30px;
  color: #fff;
  margin-right: 10%;
  background-color: #f7a7a7;
  border-color: lightpink;
  width: 15%;
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

