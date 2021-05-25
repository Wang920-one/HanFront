<template>
  <div>
    <el-container>
      <el-header>
        <router-link to="/index">
          <el-tooltip
            content="返回首页"
            placement="bottom"
            effect="light"
          >
            <img
              class="logologin"
              src="@/assets/images/logo.png"
            />
          </el-tooltip>
        </router-link>
        <div v-show="!loginIn">
          <router-link to="/login">
            <el-tooltip
              content="去登陆注册"
              placement="bottom"
              effect="light"
            >
              <el-button
                type="primary"
                icon="el-icon-user-solid"
                class="shouye"
                style="background-color:#ffffff10;border: lightpink;float: right;margin-top: 10px;"
              ></el-button>
            </el-tooltip>
          </router-link>
        </div>

        <div v-show="loginIn">
          <el-dropdown
            class="manage-name"
            @command="hadleCommand"
          >
            <span class="el-dropdown-link">
              {{ userName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="personal"
                icon="el-icon-user"
              >
                个人中心</el-dropdown-item>
              <el-dropdown-item
                command="myMessage"
                icon="el-icon-message"
              >
                我的消息</el-dropdown-item>
              <el-dropdown-item
                command="logout"
                icon="el-icon-warning-outline"
              >
                退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <img
            class="userAvator"
            :src="attachImageUrl(userImage)"
          />
          <router-link to="/publishvideo">
            <el-tooltip
              content="发布视频"
              placement="bottom"
              effect="light"
            >
              <el-button
                type="primary"
                icon="el-icon-camera"
                class="shouye"
                style="background-color:#ffffff10;border: lightpink;float: right;margin-top: 10px;margin-right: 20px;"
              ></el-button>
            </el-tooltip>
          </router-link>
          <router-link to="/publish">
            <el-tooltip
              content="发布专栏"
              placement="bottom"
              effect="light"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                class="shouye"
                style="background-color:#ffffff10;border: lightpink;float: right;margin-top: 10px;margin-right: 20px;"
              ></el-button>
            </el-tooltip>
          </router-link>
        </div>
        <!-- 搜索框 -->
        <div style="background-color: #f7a7a7;margin-top: 10px;">
          <span style="color:#fff;font-family:'楷体';font-size:18px;float:left;margin-left:15px;margin-top:15px">华夏衣裳汉服交流网</span>
          <div
            class="header-search"
            style="margin-left:28%;float:left;width:30%"
          >
            <input
              type="text"
              placeholder="搜索"
              @keyup.enter="goSearch()"
              v-model="keywords"
            />
            <button
              class="search-btn"
              @click="goSearch()"
            >
              <i class="el-icon-search"></i>
            </button>
          </div>
        </div>
      </el-header>
      <el-main
        id="bgImg"
        style="min-height:900px"
      >
        <el-header style="background-color:#ffffff50">
          <el-page-header
            @back="goBack"
            content="我的消息"
            style="padding-top:20px"
          >
          </el-page-header>
        </el-header>
        <!-- <JwChat-index
          :taleList="list"
          @enter="bindEnter"
          v-model="inputMsg"
          :toolConfig="tool"
        /> -->
        <div id="chat">
          <div class="cebian">
            <card></card>
            <list></list>
          </div>
          <div class="chatbor">
            <message></message>
            <buttons></buttons>
            <usertext></usertext>
          </div>
        </div>
      </el-main>
    </el-container>
    <scroll-top />
    <Footer />
  </div>
</template>
<script>
import card from "@/components/chat/card.vue";
import buttons from "@/components/chat/buttons.vue";
import list from "@/components/chat/list.vue";
import message from "@/components/chat/message.vue";
import usertext from "@/components/chat/usertext.vue";
import Footer from "@/components/Footer.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";
import {
  getUserOfId,
  getListOfSubscribe,
  getListOfBeSubscribe,
} from "../../api/index";

export default {
  name: "friendchat",
  mixins: [mixin],
  data() {
    return {
      keywords: "",
      restaurants: [],
      state: "",
      userDate: {}, //用户信息
      fansDate: [], //粉丝列表
      guanzDate: [], //关注列表
      // // 现在只配置了 ["file", "video", "img", "hongbao", "more", "history"]
      // show: ["file", "history", "img", ["文件1", "", "美图"]], // 二级数组中放自定义名称
      // showEmoji: true, // 是否显示表情图标
      // /**
      //  * @description: 点击按钮的回调函数
      //  * @param {*} type 当前点击的按钮
      //  * @param {*} plyload 附加文件或者需要处理的数据
      //  * @return {*}
      //  */
    };
  },
  created() {
    this.userOfId();
    this.getFansList();
    this.getGuanzList();
  },
  components: {
    Footer,
    ScrollTop,
    card,
    list,
    buttons,
    message,
    usertext,
  },
  computed: {
    ...mapGetters(["id", "loginIn", "userImage", "userName"]),
  },
  // mounted: function () {
  //   this.$store.dispatch("initData");
  // },
  methods: {
    //查询粉丝列表
    getFansList() {
      getListOfBeSubscribe(this.id)
        .then((res) => {
          this.fansDate = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "粉丝列表加载失败",
            type: "error",
          });
        });
    },
    //查询关注列表
    getGuanzList() {
      getListOfSubscribe(this.id)
        .then((res) => {
          this.guanzDate = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "关注列表加载失败",
            type: "error",
          });
        });
    },
    //查询用户信息
    userOfId() {
      this.userDate = {};
      getUserOfId(this.id).then((res) => {
        this.userDate = res;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    goSearch() {
      this.$router.push({
        path: "/search",
        query: { keywords: this.keywords },
      });
      this.$router.go(0); //刷新当前页面
    },
    //获取图片地址
    attachImageUrl(srcurl) {
      return srcurl
        ? this.$store.state.HOST + srcurl
        : this.$store.state.HOST + "../../assets/images/defualt/user.png";
    },
    hadleCommand(command) {
      if (command == "logout") {
        localStorage.removeItem("userName");
        this.$store.commit("setloginIn", false);
        // this.$router.go(0);     //刷新当前页面
        this.$router.replace({ path: `/index` });
      }
      if (command == "personal") {
        this.$router.push({ path: `/personal/${this.id}` });
      }
      if (command == "myMessage") {
        this.$router.push({ path: `/friendchat` });
      }
    },
  },
};
</script>
<style scoped>
/* #bgImg {
  background-image: url("../../assets/images/bg2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
} */
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px;
}
.el-header {
  height: 150px;
  background-color: #f7a7a7;
  color: #f7a7a7;
  /* margin-top: 20px; */
}

.header-search {
  display: flex;
  border-radius: 5px;
  overflow: hidden;
}
.header-search input {
  height: 35px;
  width: 270px;
  font-size: 14px;
  border: 0;
  text-indent: 10px;
  background-color: #ffffff;
}
.header-search input:focus {
  outline: none;
}
.search-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcdcdc;
  width: 60px;
  height: 36.99px;
  cursor: pointer;
  /* border-radius: 5px; */
  border-color: #ffffff00;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
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

.userAvator {
  margin-top: 10px;
  float: right;
  width: 40px;
  height: 40px;
  /* display: block; */
  border-radius: 50%;
}

.manage-name {
  margin-top: 20px;
  float: right;
}

.logologin {
  height: 80%;
  margin-top: 10px;
  float: left;
}

/deep/.el-button {
  font-family: "楷体";
  border-radius: 30px;
  /* width: 20%; */
}

/deep/.shouye {
  margin-top: 10px;
  margin-left: 300p;
}

/deep/.el-form-item__content {
  margin-right: 50px;
}
/deep/.el-form-item__content {
  margin-top: 10px;
}
</style>

<style lang="scss">
#chat {
  //   margin: 20px auto;
  width: 100%;
  height: 830px;
  //   padding-top: 20px;
  overflow: hidden;
  border-radius: 10px;
  .cebian,
  .chatbor {
    height: 100%;
  }
  .cebian {
    float: left;
    color: #f4f4f4;
    background-color: #ebb4b4;
    width: 210px;
  }
  .chatbor {
    position: relative;
    overflow: hidden;
    background-color: rgba(238, 238, 238, 0.596);
  }
  .buttons {
    bottom: 0;
    right: 0;
    height: 10%;
    position: absolute;
    width: 100%;
  }
}
</style>
