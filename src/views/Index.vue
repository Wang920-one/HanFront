<template>
  <div>
    <Head></Head>
    <el-container>
      <el-main id="bgImg">
        <!-- style="position:absolute;width:99%;min-height:100%;height:auto"会让Footr显示不了 -->
        <IndexZj></IndexZj>
        <div>
          <swiper />
          <!-- 走马灯 -->
          <!-- 分割线 -->
          <el-divider></el-divider>
          <!-- 热门榜 -->
          <div style="width:100%;">
            <div style="width:10%;float: left;margin-left:10px">
              <el-card
                class="box-card"
                style="width:100%;background-color: #ffffff30;"
              >
                <div slot="header" class="clearfix" style="text-align: center;">
                  <span>热门榜</span>
                </div>
                <div
                  v-for="(item, index) in videoOfThumse"
                  :key="index"
                  class="text"
                  style="text-align: center;"
                >
                  <div class="item" @click="goAlbum(item)">
                    {{ item.videoTitle }}
                  </div>
                </div>
              </el-card>
            </div>
            <!-- 推荐榜 -->
            <div style="width:10%;float: right;margin-right:10px">
              <el-card
                class="box-card"
                style="width:100%;background-color: #ffffff30;"
              >
                <div slot="header" class="clearfix" style="text-align: center;">
                  <span>推荐榜</span>
                </div>
                <div
                  v-for="(item, index) in videoOfBrowse"
                  :key="index"
                  class="text"
                  style="text-align: center;"
                >
                  <div class="item" @click="goAlbum(item)">
                    {{ item.videoTitle }}
                  </div>
                </div>
              </el-card>
            </div>
            <!-- 最新作品 -->
            <div
              class="section"
              style="float: left;margin-left:20px;width:70%;height:100%"
              v-for="(item, index) in articlesList"
              :key="index"
            >
              <div class="section-title">
                <i class="el-icon-refresh-right"></i>{{ item.name }}
              </div>
              <content-list :contentList="item.list"></content-list>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <scroll-top />
    <Footer />
  </div>
</template>
<script>
// import meadiaurl from "../../api/mediaurl";
import "../assets/style/global.css";
import Swiper from "@/components/Swiper.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import Head from "@/components/Head.vue";
import IndexZj from "@/components/IndexZj.vue";
import Footer from "@/components/Footer.vue";
import contentList from "@/components/ContentList.vue";
import {
  getAllArticle,
  getAllVideo,
  getAllVideoOfBrowse,
  getAllVideoOfThumse
} from "../api/index";

export default {
  data() {
    return {
      name: "index",
      articlesList: [{ name: "动态", list: [] }],
      videoOfBrowse: [], //推荐榜
      videoOfThumse: [] //热门榜
    };
  },
  created() {
    this.getVideo();
    this.getVideoOfBrowse();
    this.getVideoOfThumse();
    // console.log(this.articlesList);
  },
  methods: {
    getVideoOfBrowse() {
      //获取推荐榜,按浏览量排序
      getAllVideoOfBrowse()
        .then(res => {
          this.videoOfBrowse = res.slice(0, 5);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVideoOfThumse() {
      //获取热门榜,按浏览量排序
      getAllVideoOfThumse()
        .then(res => {
          this.videoOfThumse = res.slice(0, 5);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVideo() {
      //获取前十个视频
      getAllVideo()
        .then(res => {
          this.articlesList[0].list = res.slice(0, 12);
        })
        .catch(err => {
          console.log(err);
        });
    },
    goAlbum(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `DynamicDetails/${item.id}` });
    }
  },
  components: {
    Head,
    Swiper,
    IndexZj,
    contentList,
    ScrollTop,
    Footer
  }
};
</script>

<style scoped>
#bgImg {
  background-image: url("../assets/images/bg2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
}
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px;
}
/* 榜单 */
.text {
  font-size: 16px;
  font-family: "楷体";
}
.clearfix {
  font-size: 20px;
  font-family: "楷体";
}
.item {
  margin-bottom: 30px;
  cursor: pointer;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
/* 最新视频 */
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
/deep/.el-card__body {
  padding-left: 10px;
}

/deep/.container {
  height: 200px;
}
</style>

