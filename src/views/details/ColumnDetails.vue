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
          <el-container>
            <el-main>
              <div>
                <div>
                  <!-- 专栏标题 -->
                  <div
                    class="tiltle"
                    style="margin-bottom:1%;text-align:center"
                  >
                    <span>{{ tempList.bioati }}</span>
                    <br />
                    <span>发布时间：{{ attachDate(tempList.atcTime) }}</span>
                    <hr />
                  </div>

                  <div style="width:80%;float:right;margin-right:10%;background-color:#ffffff50">
                    <!-- 专栏展示 -->
                    <div
                      class="player-container"
                      style="height:100%;width:68%;float:left;margin-left:1%"
                    >
                      <p v-html="tempList.actText">{{ tempList.actText }}</p>
                    </div>

                    <!-- 专栏作者 -->

                    <div style="width:25%;margin-right:5%;float:right">
                      <el-card style="background-color:#ffffff00;border-color:#ffffff00;box-shadow:none">
                        <!-- 关注作者 -->
                        <div style="margin-top:5%;padding-bottom:5%">
                          <div
                            style="width:20%;float:left;cursor: pointer;"
                            @click="goDetail(user)"
                          >
                            <img
                              style="width: 100%;border-radius: 50%;"
                              :src="attachImageUrl(user.userImage)"
                            />
                          </div>
                          <div style="width:50%;float:left;margin-top:2.5%">
                            <span>{{ user.userName }}</span>
                          </div>
                          <div
                            style="width:30%;float:right;"
                            v-show="this.id != this.user.id"
                          >
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
                        <!-- 分割线 -->
                        <br /><br />
                        <hr />
                        <!-- 专栏推荐 -->
                        <span>其他专栏</span>
                        <hr />
                        <div
                          v-for="(item, index) in userarticleList"
                          :key="index"
                        >
                          <el-card style="height:90px;width:100%;background-color:#ffffff00;cursor: pointer;">
                            <img
                              style="width:20%;float:left;"
                              :src="attachImageUrl(item.pic)"
                              @click="goAlbum(item)"
                            />
                            <div style="
                              float:left;margin-left:10%">
                              <span style="font-size:15px">标题：{{ item.bioati }}</span>
                              <br />
                              <span style="font-size:15px">发布时间：{{ attachDate(item.atcTime) }}</span>
                              <!-- <span style="font-size:8px;height:10px">{{
                                item.atcDescribe
                              }}</span> -->
                            </div>
                          </el-card>
                          <hr />
                        </div>
                      </el-card>
                    </div>
                  </div>
                  <br />

                  <!-- 专栏详情界面 -->
                  <div style="margin-left:10%;margin-right:10%;height:20%;margin-top:30%;">
                    <hr />
                    <div>
                      <div
                        class="dianzan_switch"
                        style="float:left"
                      >
                        <el-button
                          icon="iconfont icon-dianzan"
                          :style="{
                            backgroundColor: bg_color1,
                            color: ft_color1
                          }"
                          circle
                          @click="changeDZ()"
                        >{{ tempList.atcThumes }} {{ dz }}</el-button>
                      </div>
                      <div style="margin-left:2%;float:left">
                        <el-button
                          :style="{
                            backgroundColor: bg_color2,
                            color: ft_color2
                          }"
                          icon="iconfont icon-shoucang"
                          circle
                          @click="changeSC()"
                        >{{ tempList.atcSc }} {{ sc }}</el-button>
                      </div>
                      <div style="margin-left:2%;float:left">
                        <el-button
                          style="background-color:#f7a7a7;color:#ffffff"
                          icon="iconfont icon-shouye1"
                          circle
                          @click="ShareLink()"
                        >点击分享</el-button>
                      </div>
                      <div style="margin-left:2%;float:left">
                        <el-button
                          style="background-color:#f7a7a7;color:#ffffff"
                          icon="iconfont icon-yanjing"
                          circle
                        >{{ tempList.atcBrowse }} 浏览</el-button>
                      </div>
                    </div>
                    <br />
                    <br />
                    <hr />
                    <div>
                      <h3>{{ tempList.bioati }}</h3>
                      <span>{{ user.userName }}
                        {{ attachDate(tempList.atcTime) }}</span><br />
                      <span>{{ tempList.atcDescribe }}</span>
                    </div>
                    <hr />
                  </div>

                  <!-- 评论 -->
                  <comment
                    :playId="articleid"
                    :type="1"
                  ></comment>
                  <!-- 复制链接 -->
                  <el-dialog
                    title="复制链接"
                    :visible.sync="linkVisible"
                    width="300px"
                    center
                  >
                    <div>
                      <a :href="config.value">{{config.value}}</a>
                    </div>
                    <span slot="footer">
                      <el-button
                        size="mini"
                        @click="linkVisible = false"
                      >取消</el-button>
                      <el-button
                        size="mini"
                        class="tag-copy"
                        :data-clipboard-text="config.value"
                        @click="copyShareLink"
                      >复制链接</el-button>
                    </span>
                  </el-dialog>
                </div>
              </div>
            </el-main>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
    <scroll-top />
    <Footer />
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import Head from "@/components/Head.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import Comment from "@/components/Comment.vue";
import Footer from "@/components/Footer.vue";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import { mixin } from "../../mixins";
import { mapGetters } from "vuex";
import Clipboard from "clipboard"; //复制
import {
  getUserOfId,
  getVideoOfId,
  getArticleOfUseId,
  setCollect,
  getCollectOfUseId,
  updateShouC1,
  delShouc,
  setThumb,
  getThumbOfUseId,
  updateLike1,
  delThumb,
  setSubscribe,
  getListOfSubscribe,
  delSubscribe,
  updateBrowse1,
} from "../../api/index";
export default {
  name: "columnDetails",
  mixins: [mixin],
  data() {
    return {
      config: {
        //二维码参数
        value: "", //显示的值、跳转的地址
      },
      linkVisible: false, //复制链接弹窗
      articleLists: [], //当前页面需要展示的专栏
      articleid: "", //前面传来的专栏id
      user: {}, //存储查询到的稿件作者信息
      userarticleList: [], //当前作者的稿件列表
      shoucId: "", //已收藏的收藏id
      dianzId: "", //已点赞的点赞id
      guanzId: "", //已关注的关注id
      gz: "+关注",
      dz: "点赞",
      sc: "收藏",
      bg_color: "#f7a7a7",
      ft_color: "#ffffff",
      bg_color1: "#f7a7a7",
      ft_color1: "#ffffff",
      bg_color2: "#f7a7a7",
      ft_color2: "#ffffff",
      textarea: "",
    };
  },
  computed: {
    ...mapGetters([
      "tempList", //当前稿件信息
      "loginIn", //用户是否登录
      "id", //当前登录用户id
      "isCollect", //当前稿件是否已收藏
      "isThumse", //当前稿件是否已点赞
      "isGuanzhu", //当前作者是否已关注
    ]),
  },
  created() {
    // if (!this.loginIn) {
    //   this.$router.push({ path: `/login` });
    // }
    this.articleid = this.$route.params.id;
    this.getUsers();
    this.getAllarticle();
  },
  mounted() {
    this.isCollecetFun(this.articleid); //判断当前用户是否已经收藏当前稿件
    this.isThumbsFun(this.articleid); //判断当前用户是否已经点赞当前稿件
    this.isSubscribeFun(this.user.id); //判断当前用户是否已经关注当前稿件作者
    this.updateBrowses(); //增加浏览量
    this.config.value = "http://localhost:8080/columnDetails/" + this.articleid;
  },
  components: {
    Head,
    Footer,
    ScrollTop,
    Comment,
    // ShareFacebook
  },
  methods: {
    //弹出复制链接
    ShareLink() {
      this.linkVisible = true;
    },
    // 复制链接
    async copyShareLink() {
      let clipboard = new Clipboard(".tag-copy");
      await clipboard.on("success", (e) => {
        this.$message({
          showClose: true,
          message: "链接复制成功!",
          type: "success",
        });
        this.linkVisible = false;
        clipboard.destroy(); // 释放内存
      });
      clipboard.on("error", (e) => {
        this.$message({
          showClose: true,
          message: "该浏览器不支持自动复制！",
          type: "error",
        });

        clipboard.destroy(); // 释放内存
      });
    },
    //获取图片地址
    attachImageUrl(srcurl) {
      return srcurl
        ? this.$store.state.HOST + srcurl
        : this.$store.state.HOST + "/img/defualt/user.png";
    },
    //获取当前稿件作者的所有专栏
    getAllarticle() {
      getArticleOfUseId(this.tempList.useId)
        .then((res) => {
          this.userarticleList = res.slice(0, 3);
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "作者稿件加载失败",
            type: "error",
          });
        });
    },
    //获取用户的头像和昵称
    getUsers() {
      getUserOfId(this.tempList.useId)
        .then((res) => {
          this.user = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "作者信息加载失败",
            type: "error",
          });
        });
    },

    goBack() {
      this.$router.back();
    },
    goDetail(user) {
      this.$store.commit("setTempList", user);
      this.$router.replace({ path: `/author-detail/${user.id}` });
    },
    goAlbum(item) {
      this.$store.commit("setTempList", item);
      this.$router.replace({ path: `/columnDetails/${item.id}` });
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
    //判断是否已经点赞
    isThumbsFun(articleid) {
      this.$store.commit("setIsThumse", false);
      this.dz = "点赞";
      this.bg_color1 = "#f7a7a7";
      this.ft_color1 = "#ffffff";
      if (this.loginIn) {
        getThumbOfUseId(this.id).then((res) => {
          for (let item of res) {
            if (item.atcId == articleid) {
              this.$store.commit("setIsThumse", true);
              this.dz = "已点赞";
              this.bg_color1 = "#f56c6c";
              this.ft_color1 = "#fef0f0";
              this.dianzId = item.id;
              break;
            }
          }
        });
      }
    },
    //点赞
    changeDZ() {
      if (this.loginIn) {
        var params = new URLSearchParams();
        params.append("useId", this.id);
        params.append("type", 1);
        params.append("atcId", this.articleid);

        //点赞量加1
        var params1 = new URLSearchParams();
        params1.append("id", this.articleid);

        setThumb(params).then((res) => {
          if (res.code == 1) {
            this.$store.commit("setIsThumse", true);
            params1.append("atcThumes", this.tempList.atcThumes + 1);
            this.dz = "已点赞";
            this.bg_color1 = "#f56c6c";
            this.ft_color1 = "#fef0f0";
            this.tempList.atcThumes++;
            updateLike1(params1).then((res) => {
              this.$message({
                showClose: true,
                message: "点赞成功",
                type: "success",
              });
            });
          } else if (res.code == 2) {
            if (this.tempList.atcThumes > 0) {
              params1.append("atcThumes", this.tempList.atcThumes - 1);
            } else {
              params1.append("atcThumes", 0);
            }
            this.tempList.atcThumes--; //解决页面没刷新，数字值没有实时更新的问题
            this.$store.commit("setIsThumse", false);
            this.dz = "点赞";
            this.bg_color1 = "#f7a7a7";
            this.ft_color1 = "#ffffff";
            updateLike1(params1).then((res) => {});
            delThumb(this.dianzId).then((res) => {
              this.$message({
                showClose: true,
                message: "取消点赞成功",
                type: "success",
              });
            });
          } else {
            this.$message({
              showClose: true,
              message: "点赞失败",
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

    //判断是否已经收藏
    isCollecetFun(articleid) {
      this.$store.commit("setIsCollect", false);
      this.sc = "收藏";
      this.bg_color2 = "#f7a7a7";
      this.ft_color2 = "#ffffff";
      if (this.loginIn) {
        getCollectOfUseId(this.id).then((res) => {
          for (let item of res) {
            if (item.atcId == articleid) {
              this.$store.commit("setIsCollect", true);
              this.sc = "已收藏";
              this.bg_color2 = "#f56c6c";
              this.ft_color2 = "#fef0f0";
              this.shoucId = item.id;
              break;
            }
          }
        });
      }
    },
    //收藏
    changeSC() {
      if (this.loginIn) {
        var params = new URLSearchParams();
        params.append("useId", this.id);
        params.append("type", 1);
        params.append("atcId", this.articleid);

        //收藏量加1
        var params1 = new URLSearchParams();
        params1.append("id", this.articleid);

        setCollect(params).then((res) => {
          if (res.code == 1) {
            this.$store.commit("setIsCollect", true);
            params1.append("atcSc", this.tempList.atcSc + 1);
            this.sc = "已收藏";
            this.bg_color2 = "#f56c6c";
            this.ft_color2 = "#fef0f0";
            this.tempList.atcSc++;
            updateShouC1(params1).then((res) => {
              this.$message({
                showClose: true,
                message: "收藏成功",
                type: "success",
              });
            });
          } else if (res.code == 2) {
            if (this.tempList.atcSc > 0) {
              params1.append("atcSc", this.tempList.atcSc - 1);
            } else {
              params1.append("atcSc", 0);
            }
            this.$store.commit("setIsCollect", false);
            this.tempList.atcSc--;
            this.sc = "收藏";
            this.bg_color2 = "#f7a7a7";
            this.ft_color2 = "#ffffff";
            updateShouC1(params1).then((res) => {});
            //这里应该更新一下，但是更新页面参数就丢失了
            delShouc(this.shoucId).then((res) => {
              this.$message({
                showClose: true,
                message: "取消收藏成功",
                type: "success",
              });
            });
          } else {
            this.$message({
              showClose: true,
              message: "收藏失败",
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
    //点进来就新增浏览量
    updateBrowses() {
      var params = new URLSearchParams();
      params.append("id", this.articleid);
      params.append("atcBrowse", this.tempList.atcBrowse + 1);
      updateBrowse1(params).then((res) => {});
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
/deep/.el-card__body {
  padding: 10px;
}
</style>