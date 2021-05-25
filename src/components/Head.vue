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
                icon="el-icon-user"
                class="shouye"
                style=" margin-right: 0;"
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
              <el-badge
                :hidden="this.allunread.length==0"
                is-dot
                class="item"
              >{{userName}}
              </el-badge>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="personal"
                icon="el-icon-user"
              > 个人中心</el-dropdown-item>
              <el-dropdown-item
                command="myMessage"
                icon="el-icon-message"
              >
                我的消息
                <el-badge
                  :hidden="this.allunread.length==0"
                  class="mark"
                  :value="this.allunread.length"
                />
              </el-dropdown-item>
              <el-dropdown-item
                command="logout"
                icon="el-icon-warning-outline"
              > 退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <img
            class="userAvator"
            :src='attachImageUrl(userImage)'
          >
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
              ></el-button>
            </el-tooltip>
          </router-link>
        </div>
        <!-- 搜索框 -->
        <div style="background-color: #f7a7a7;margin-top: 10px;">
          <span style="color:#fff;font-family:'楷体';font-size:18px;float:left;margin-left:15px;margin-top:15px">华夏衣裳汉服交流网</span>
          <div
            class="header-search"
            style="margin-left:25%;float:left;width:25%"
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
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAllUnRead } from "../api/index";
export default {
  name: "Head",
  data() {
    return {
      keywords: "",
      allunread: [],
      state: "",
    };
  },
  created() {
    if (this.loginIn) {
      this.getUnReadList(this.id,this.id);
    }
  },
  computed: {
    ...mapGetters([
      "loginIn", //用户是否登录
      "currentSessionId", //当前对话框的好友id
      "sessions", //聊天记录
      "id", //当前登录用户id
      "loginIn",
      "userImage",
      "userName",
    ]),
  },
  methods: {
    //获取所有未读信息的数量
    getUnReadList(userId,receiverId) {
      getAllUnRead(userId,receiverId)
        .then((res) => {
          this.allunread = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "未读信息数量获取失败",
            type: "error",
          });
        });
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
        : this.$store.state.HOST + "../assets/images/defualt/user.png";
    },
    hadleCommand(command) {
      if (command == "logout") {
        this.$store.commit("setloginIn", false);
        var storage = window.localStorage;
        storage.clear();
        this.$router.replace({ path: `/index` });
        this.$router.go(0); //刷新当前页面
      }
      if (command == "personal") {
        this.$router.push({ path: `/personal/${this.id}` });
      }
      if (command == "myMessage") {
        this.$router.push({ path: `/friendchat` });
      }
    },
  },
  mounted() {},
};
</script>
<style scoped>
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
  width: 250px;
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
  background-color:#ffffff10;
  border: lightpink;
  float: right;
  margin-top: 10px;
  margin-right: 20px;
}

/deep/.shouye:hover{
  background-color: #f38787c9;
}

/deep/.el-form-item__content {
  margin-right: 50px;
}
/deep/.el-form-item__content {
  margin-top: 10px;
}
</style>