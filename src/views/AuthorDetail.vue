<template>
  <div>

    <Head></Head>
    <el-container>
      <el-main id="bgImg">
        <el-container style="background-color:#ffffff50;height:100%">
          <el-header style="background-color:#ffffff50">
            <el-page-header
              @back="goBack"
              content="详情页面"
              style="margin-top:20px"
            >
            </el-page-header>
          </el-header>
          <div class="user-album">
            <div class="album-slide">
              <div class="user-img">
                <img :src="attachImageUrl(user.userImage)" />
              </div>
              <ul class="info">
                <li v-if="user.userSex == 0 || user.userSex == 1">
                  性别：{{ changeSex(user.userSex) }}
                </li>
                <li>生日：{{ attachDate(user.userBirthday) }}</li>
                <li>地区：{{ user.userAddress }}</li>
              </ul>
            </div>
            <div class="album-content">
              <div class="intro">
                <h2>昵称：{{ user.userName }}</h2>
                <span>个性签名：{{ user.userSign }}</span>
                <div
                  style="float:right"
                  v-show="this.id != this.user.id"
                >
                  <el-button
                    round
                    style="background-color:#fad0d0;color:#ffffff"
                    @click="handleSend(user.id)"
                  >私信</el-button>
                  <el-button
                    round
                    style="background-color:#f7a7a7;color:#ffffff"
                    :style="{
                      backgroundColor: bg_color,
                      color: ft_color
                    }"
                    @click="changeGZ()"
                  >
                    {{ gz }}</el-button>
                </div>
              </div>
              <el-dialog
                title="发送消息"
                :visible.sync="sendVisible"
                width="500px"
                center
              >
                <div align="center">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea"
                  >
                  </el-input>
                </div>
                <span slot="footer">
                  <el-button
                    size="mini"
                    @click="sendVisible = false"
                  >取消</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="sendMessage()"
                  >发送</el-button>
                </span>
              </el-dialog>
              <div class="content">
                <el-tabs
                  type="border-card"
                  v-model="activeName"
                >
                  <el-tab-pane
                    class="Arti"
                    label="专栏"
                    name="article"
                  >
                    <h1 class="title">
                      <slot name="title"></slot>
                      <hr />
                    </h1>
                    <ul>
                      <li>
                        <div class="article-item">
                          <span class="item-index"></span>
                          <span class="item-title">标题</span>
                          <span class="item-name">分类</span>
                          <span class="item-intro">描述</span>
                        </div>
                      </li>
                      <li
                        v-for="(item, index) in articlelist"
                        :key="index"
                      >
                        <div
                          class="article-item"
                          @click="goAlbum(item)"
                        >
                          <span class="item-index">
                            {{ index + 1 }}
                          </span>
                          <span class="item-title">{{ item.bioati }}</span>
                          <span class="item-name">{{ item.atcType }}</span>
                          <span class="item-intro">{{ item.atcDescribe }}</span>
                        </div>
                      </li>
                    </ul>
                  </el-tab-pane>
                  <el-tab-pane
                    class="Vide"
                    label="视频"
                    name="video"
                  >
                    <h1 class="title">
                      <slot name="title"></slot>
                      <hr />
                    </h1>
                    <ul>
                      <li>
                        <div class="video-item">
                          <span class="item-index"></span>
                          <span class="item-title">标题</span>
                          <span class="item-name">分类</span>
                          <span class="item-intro">描述</span>
                        </div>
                      </li>
                      <li
                        v-for="(item, index) in videolist"
                        :key="index"
                      >
                        <div
                          class="video-item"
                          @click="goAlbum1(item)"
                        >
                          <span class="item-index">
                            {{ index + 1 }}
                          </span>
                          <span class="item-title">{{ item.videoTitle }}</span>
                          <span class="item-name">{{ item.videoType }}</span>
                          <span class="item-intro">{{ item.videoDes }}</span>
                        </div>
                      </li>
                    </ul>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </div>
        </el-container>
      </el-main>
    </el-container>
    <scroll-top />
    <Footer />
  </div>
</template>
<script>
import Head from "@/components/Head.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import Footer from "@/components/Footer.vue";
import { mixin } from "../mixins";
import { mapGetters } from "vuex";
import {
  getUserOfId,
  getArticleOfUseId,
  getVideoOfUseId,
  getListOfSubscribe,
  setSubscribe,
  delSubscribe,
  setMessage
} from "../api/index";
export default {
  name: "author-detail",
  mixins: [mixin],
  data() {
    return {
      activeName: "article",
      bg_color: "#f7a7a7",
      ft_color: "#ffffff",
      sendVisible: false, //发送信息窗口
      textarea: "", //发送的信息内容
      idx: -1,
      gz: "+关注",
      articlelist: [],
      videolist: [],
      guanzId: "", //已关注的关注id
      userId: "", //前面传过来的用户id
      user: {}, //用户信息
    };
  },
  components: {
    Head,
    Footer,
    ScrollTop,
  },
  computed: {
    ...mapGetters([
      "loginIn", //是否登录
      "id", //当前登录用户userId
      "listOfArticle",
    ]),
  },
  created() {
    this.userId = this.$route.params.id;
    this.getUsers();
    this.getAllArticle();
    this.getAllVideo();
  },
  mounted() {
    this.isSubscribeFun(this.userId); //判断当前用户是否已经关注当前稿件作者
  },
  methods: {
    //弹出发送消息窗口
    handleSend(id) {
      if (this.loginIn) {
        this.sendVisible = true;
        this.idx = id;
      } else {
        this.$message({
          showClose: true,
          message: "请先登录",
          type: "error",
        });
      }
    },
    //打招呼，发送信息
    sendMessage() {
      let params = new URLSearchParams();
      params.append("userId", this.id);
      params.append("friendId", this.idx);
      params.append("senderId", this.id);
      params.append("receiverId", this.idx);
      params.append("content", this.textarea);
      setMessage(params).then((res) => {
        if (res.code == 1) {
          this.$message({
            showClose: true,
            message: "信息发送成功",
            type: "success",
          });
        } else {
          this.$message({
            showClose: true,
            message: "信息发送失败",
            type: "error",
          });
        }
      });
      this.textarea = "";
      this.sendVisible = false;
    },
    //判断是否已经关注
    isSubscribeFun(id) {
      this.$store.commit("setIsGuanzhu", false);
      this.gz = "+关注";
      this.bg_color = "#f7a7a7";
      this.ft_color = "#ffffff";
      if (this.loginIn) {
        getListOfSubscribe(this.id).then((res) => {
          for (let item of res) {
            if (item.beSubscribe == this.user.id) {
              this.$store.commit("setIsGuanzhu", true);
              this.gz = "已关注";
              this.bg_color = "#f56c6c";
              this.ft_color = "#fef0f0";
              this.guanzId = item.id;
              break;
            }
          }
        });
      }
    },
    //关注
    changeGZ() {
      if (this.loginIn) {
        var params = new URLSearchParams();
        params.append("subscribe", this.id);
        params.append("beSubscribe", this.user.id);
        setSubscribe(params).then((res) => {
          if (res.code == 1) {
            this.$store.commit("setIsGuanzhu", true);
            this.gz = "已关注";
            this.bg_color = "#f56c6c";
            this.ft_color = "#fef0f0";
            this.$message({
              showClose: true,
              message: "关注成功",
              type: "success",
            });
          } else if (res.code == 2) {
            this.$store.commit("setIsGuanzhu", false);
            this.gz = "+关注";
            this.bg_color = "#f7a7a7";
            this.ft_color = "#ffffff";
            delSubscribe(this.guanzId).then((res) => {
              this.$message({
                showClose: true,
                message: "取消关注成功",
                type: "success",
              });
            });
          } else {
            this.$message({
              showClose: true,
              message: "关注失败",
              type: "error",
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "请先登录",
          type: "error",
        });
      }
    },
    //获取图片地址
    attachImageUrl(srcurl) {
      return srcurl
        ? this.$store.state.HOST + srcurl
        : this.$store.state.HOST + "/img/defualt/user.png";
    },
    // 根据用户id查询用户信息
    getUsers() {
      getUserOfId(this.userId)
        .then((res) => {
          this.user = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "用户信息获取失败",
            type: "error",
          });
        });
    },
    // 根据用户id查询稿件信息
    getAllArticle() {
      getArticleOfUseId(this.userId)
        .then((res) => {
          this.articlelist = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "专栏信息获取失败",
            type: "error",
          });
        });
    },
    // 根据用户id查询视频信息
    getAllVideo() {
      getVideoOfUseId(this.userId)
        .then((res) => {
          this.videolist = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "视频信息获取失败",
            type: "error",
          });
        });
    },
    goAlbum(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `/columnDetails/${item.id}` });
    },
    goAlbum1(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `/DynamicDetails/${item.id}` });
    },
    goBack() {
      this.$router.back();
    },
    //根据用户id查询专栏和视频
  },
};
</script>
<style scoped>
#bgImg {
  background-image: url("../assets/images/bg2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
  /* min-height: 800px; */
}
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px;
}
.el-tabs--border-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #dcdfe675;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 6px 0 rgb(0 0 0 / 4%);
}
/deep/.el-tabs--border-card > .el-tabs__header {
  background-color: #f5f7fa67;
  border-bottom: 1px solid #e4e7ed9c;
  margin: 0;
}
/deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #409eff;
  background-color: rgba(255, 255, 255, 0.5);
  border-right-color: #dcdfe6;
  border-left-color: #dcdfe6;
}
.user-album {
  margin-top: 35px;
  padding-top: 150px;
  /* background-color: $theme-background-color; */
}
.user-album::before {
  /*背景*/
  content: "";
  /* background-color: $theme-color; */
  position: absolute;
  top: 0;
  width: 100%;
  height: 35px + 150px;
}
.album-slide {
  float: left;
  width: 400px;
}
.user-img {
  position: relative;
  display: inline-block;
  height: 300px;
  width: 300px;
  top: -100px;
  left: 50px;
  border-radius: 10%;
  overflow: hidden;
  border: 5px solid #fff;
  background-color: #fff;
}
.user-img img {
  width: 100%;
}
.info {
  /* color: $color-black; */
  font-size: 20px;
  font-weight: 500;
  margin-top: -80px;
  list-style-type: none;
  padding: 30px 40px 30px 60px;
}
.info li {
  width: 100%;
  height: 40px;
}
.album-content {
  margin-left: 300px;
  padding: 30px 100px;
}
.intro {
  font-size: 20px;
}
.intro span {
  color: rgba(0, 0, 0, 0.5);
}
.content {
  margin-top: 50px;
  padding: 0%;
  padding-bottom: 20%;
}

.Arti ul,
.Vide ul {
  padding-bottom: 50px;
}
.Arti ul li,
.Vide ul li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: block;
  height: 50px;
  line-height: 50px;
  text-indent: 20px;
  cursor: pointer;
}
.article-item,
.video-item {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-index {
  width: 5%;
}
.item-title {
  width: 30%;
}
.item-name {
  width: 25%;
}
.item-intro {
  width: 40%;
}
</style>