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
                  <!-- 视频标题 -->
                  <div
                    class="tiltle"
                    style="margin-bottom:1%;text-align:center"
                  >
                    <span>{{ tempList.videoTitle }}</span>
                    <br />
                    <span>发布时间：{{ attachDate(tempList.videoTime) }}</span>
                    <hr />
                  </div>

                  <div style="width:80%;float:right;margin-right:10%;background-color:#ffffff50">
                    <!-- 视频播放 -->
                    <div
                      class="player-container"
                      style="height:100%;width:68%;float:left;"
                    >
                      <video-player
                        class="vjs-custom-skin"
                        :options="playerOptions"
                      ></video-player>
                    </div>

                    <!-- 视频作者 -->

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
                        <!-- 视频推荐 -->
                        <span>其他视频</span>
                        <hr />
                        <div
                          v-for="(item, index) in uservideoList"
                          :key="index"
                        >
                          <el-card style="height:90px;width:100%;background-color:#ffffff00;cursor: pointer;">
                            <img
                              style="width:35%;float:left"
                              class="image"
                              :src="attachImageUrl(item.pic)"
                              @click="goAlbum(item)"
                            />
                            <div style="
                              float:left;margin-left:10%">
                              <span style="font-size:18px">标题：{{ item.videoTitle }}</span>
                              <div class="bottom clearfix">
                                <span style="font-size:8px">发布时间：{{
                                    attachDate(item.videoTime)
                                  }}</span>
                              </div>
                            </div>
                          </el-card>
                          <hr />
                        </div>
                      </el-card>
                    </div>
                  </div>
                  <br />

                  <!-- 视频详情界面 -->
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
                        >{{ tempList.videoThumes }} {{ dz }}</el-button>
                      </div>
                      <div style="margin-left:2%;float:left">
                        <el-button
                          :style="{
                            backgroundColor: bg_color2,
                            color: ft_color2
                          }"
                          :class="{ active: isCollect }"
                          icon="iconfont icon-shoucang"
                          circle
                          @click="changeSC"
                        >{{ tempList.videoSc }} {{ sc }}</el-button>
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
                        >{{ tempList.videoBrowse }} 浏览</el-button>
                      </div>
                    </div>
                    <br />
                    <br />
                    <hr />
                    <div>
                      <h3>{{ tempList.videoTitle }}</h3>
                      <span>{{ user.userName }}
                        {{ attachDate(tempList.videoTime) }}</span><br />
                      <span>{{ tempList.videoDes }}</span>
                    </div>
                    <hr />
                  </div>

                  <!-- 评论 -->
                  <comment
                    :playId="videoid"
                    :type="0"
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
  getVideoOfUseId,
  setCollect,
  getCollectOfUseId,
  updateShouC,
  delShouc,
  setThumb,
  getThumbOfUseId,
  updateLike,
  delThumb,
  setSubscribe,
  getListOfSubscribe,
  delSubscribe,
  updateBrowse,
} from "../../api/index";
export default {
  name: "DynamicDetails",
  mixins: [mixin],
  data() {
    return {
      config: {
        //二维码参数
        value: "", //显示的值、跳转的地址
      },
      linkVisible: false, //复制链接弹窗
      videoLists: [], //当前页面需要展示的视频
      videoid: "", //前面传来的视频id
      user: {}, //存储查询到的稿件作者信息
      uservideoList: [], //当前作者的稿件列表
      url: "",
      shoucId: "", //已收藏的收藏id
      dianzId: "", //已点赞的点赞id
      guanzId: "", //已关注的关注id
      //   url: "http://127.0.0.1:8888",
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
      //视频
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        controls: true, //控制条
        preload: "auto", //视频预加载
        muted: false, //默认情况下将会消除任何音频。
        loop: false, //导致视频一结束就重新开始。
        language: "zh-CN",

        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "",
            // src: require(this.$store.state.configure.HOST + this.url)
            //src: 'src/views/sjsc/sjsc01_carInfoManage/2.mp4'
            //你所放置的视频的地址，最好是放在服务器上
          },
        ],
        // poster: "../assets/1.jpg", //你的封面地址（覆盖在视频上面的图片）

        // width: document.documentElement.clientWidth,

        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
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
    this.videoid = this.$route.params.id;
    // console.log(this.videoid);
    this.getUsers();
    this.getAllvideo();
    this.url = this.tempList.videoFile;
    // this.videoSrc = this.$store.state.configure.HOST + this.url;
    this.playerOptions.sources[0].src =
      this.$store.state.configure.HOST + this.url;
  },
  mounted() {
    this.isCollecetFun(this.videoid); //判断当前用户是否已经收藏当前稿件
    this.isThumbsFun(this.videoid); //判断当前用户是否已经点赞当前稿件
    this.isSubscribeFun(this.user.id); //判断当前用户是否已经关注当前稿件作者
    this.updateBrowses(); //增加浏览量
    this.config.value = "http://localhost:8080/DynamicDetails/" + this.videoid;
  },
  components: {
    Head,
    Footer,
    ScrollTop,
    Comment,
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
    //获取当前稿件作者的所有视频
    getAllvideo() {
      getVideoOfUseId(this.tempList.useId)
        .then((res) => {
          this.uservideoList = res.slice(0, 3);
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
      this.$router.replace({ path: `/DynamicDetails/${item.id}` });
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
    isThumbsFun(videoid) {
      this.$store.commit("setIsThumse", false);
      this.dz = "点赞";
      this.bg_color1 = "#f7a7a7";
      this.ft_color1 = "#ffffff";
      if (this.loginIn) {
        getThumbOfUseId(this.id).then((res) => {
          for (let item of res) {
            if (item.videoId == videoid) {
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
        params.append("type", 0);
        params.append("videoId", this.videoid);

        //点赞量加1
        var params1 = new URLSearchParams();
        params1.append("id", this.videoid);

        setThumb(params).then((res) => {
          if (res.code == 1) {
            this.$store.commit("setIsThumse", true);
            params1.append("videoThumes", this.tempList.videoThumes + 1);
            this.dz = "已点赞";
            this.bg_color1 = "#f56c6c";
            this.ft_color1 = "#fef0f0";
            this.tempList.videoThumes++;
            updateLike(params1).then((res) => {
              this.$message({
                showClose: true,
                message: "点赞成功",
                type: "success",
              });
            });
          } else if (res.code == 2) {
            if (this.tempList.videoThumes > 0) {
              params1.append("videoThumes", this.tempList.videoThumes - 1);
            } else {
              params1.append("videoThumes", 0);
            }
            this.tempList.videoThumes--; //解决页面没刷新，数字值没有实时更新的问题
            this.$store.commit("setIsThumse", false);
            this.dz = "点赞";
            this.bg_color1 = "#f7a7a7";
            this.ft_color1 = "#ffffff";
            updateLike(params1).then((res) => {});
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
    isCollecetFun(videoid) {
      this.$store.commit("setIsCollect", false);
      this.sc = "收藏";
      this.bg_color2 = "#f7a7a7";
      this.ft_color2 = "#ffffff";
      if (this.loginIn) {
        getCollectOfUseId(this.id).then((res) => {
          for (let item of res) {
            if (item.videoId == videoid) {
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
        params.append("type", 0);
        params.append("videoId", this.videoid);

        //收藏量加1
        var params1 = new URLSearchParams();
        params1.append("id", this.videoid);

        setCollect(params).then((res) => {
          if (res.code == 1) {
            this.$store.commit("setIsCollect", true);
            params1.append("videoSc", this.tempList.videoSc + 1);
            this.sc = "已收藏";
            this.bg_color2 = "#f56c6c";
            this.ft_color2 = "#fef0f0";
            this.tempList.videoSc++;
            updateShouC(params1).then((res) => {
              this.$message({
                showClose: true,
                message: "收藏成功",
                type: "success",
              });
            });
          } else if (res.code == 2) {
            if (this.tempList.videoSc > 0) {
              params1.append("videoSc", this.tempList.videoSc - 1);
            } else {
              params1.append("videoSc", 0);
            }
            this.$store.commit("setIsCollect", false);
            this.tempList.videoSc--;
            this.sc = "收藏";
            this.bg_color2 = "#f7a7a7";
            this.ft_color2 = "#ffffff";
            updateShouC(params1).then((res) => {});
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
      params.append("id", this.videoid);
      params.append("videoBrowse", this.tempList.videoBrowse + 1);
      updateBrowse(params).then((res) => {});
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