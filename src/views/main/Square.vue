<template>
  <div>

    <Head></Head>
    <el-container>
      <el-main>
        <div style="text-align:center">
          <el-button
            class="goback"
            type="primary"
            @click="goBack"
            icon="el-icon-back"
          ></el-button>
          <div class="words">
            <h3>
              汉服广场
            </h3>
          </div>
          <!-- 分割线 -->
          <el-divider></el-divider>
        </div>
        <!-- 热门榜 -->
        <div style="width:10%;float: left;margin-left:10px">
          <el-card
            class="box-card"
            style="width:100%;background-color: #ffffff30;"
          >
            <div
              slot="header"
              class="clearfix"
              style="text-align: center;"
            >
              <span>热门榜</span>
            </div>
            <div
              v-for="(item, index) in videoOfThumse"
              :key="index"
              class="text"
              style="text-align: center;"
            >
              <div
                class="item"
                @click="goAlbum(item)"
              >
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
            <div
              slot="header"
              class="clearfix"
              style="text-align: center;"
            >
              <span>推荐榜</span>
            </div>
            <div
              v-for="(item, index) in videoOfBrowse"
              :key="index"
              class="text"
              style="text-align: center;"
            >
              <div
                class="item"
                @click="goAlbum(item)"
              >
                {{ item.videoTitle }}
              </div>
            </div>
          </el-card>
        </div>
        <div>
          <!-- 最新作品 -->
          <div>
            <ul class="gaojian-list-header">
              <li
                v-for="(item, index) in allTypes"
                :key="index"
                @click="handleChangeView(item.name)"
                :class="{ active: item.name == activeName }"
              >
                {{ item.name }}
              </li>
            </ul>
            <div>
              <div class="wenzi">
                <h5 style="font-size: 17px;font-family: '楷体';margin:0px">
                  <i class="el-icon-refresh-right"></i>全部作品
                </h5>
              </div>
              <content-list
                class="content"
                :contentList="data"
              ></content-list>
              <div class="pagination">
                <el-pagination
                  @current-change="handleCurrentChange"
                  background
                  layout="total,prev,pager,next"
                  :current-page="currentPage"
                  :page-size="pageSize"
                  :total="allVideos.length"
                >
                </el-pagination>
              </div>
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
import "../../assets/style/global.css";
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import IndexZj from "@/components/IndexZj.vue";
import Swiper from "@/components/Swiper.vue";
import { mixin } from "../../mixins";
import ContentList from "@/components/contentLists/ContentList.vue";
import {
  getVideoOfType,
  getAllVideo,
  getAllVideoOfBrowse,
  getAllVideoOfThumse,
  getAllArticle,
} from "../../api/index";
import { allTypes } from "../../assets/data/allType";

export default {
  name: "Square",
  mixins: [mixin],
  data() {
    return {
      activeName: "first",
      pageSize: 18, //页面大小，一页18条数据
      currentPage: 1, //当前默认第一页
      allVideos: [], //存放所有视频
      allArticles: [], //存放所有专栏
      allTypes: [], //类型
      activeName: "全部作品", //当前类型
      videoOfBrowse: [], //推荐榜
      videoOfThumse: [], //热门榜
      imgList: [
        {
          url: require("../../assets/images/1.jpg"),
        },
        {
          url: require("../../assets/images/2.jpg"),
        },
        {
          url: require("../../assets/images/3.jpg"),
        },
        {
          url: require("../../assets/images/4.jpg"),
        },
      ],
    };
  },
  computed: {
    //计算当前表格中的数据
    data() {
      return this.allVideos.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  mounted() {
    this.allTypes = allTypes;
    this.getVideoList();
    this.getArticleList();
    this.getVideoOfBrowse();
    this.getVideoOfThumse();
  },
  methods: {
    //获取所有视频
    getVideoList() {
      getAllVideo().then((res) => {
        this.currentPage = 1;
        this.allVideos = res;
      });
    },
    //获取所有专栏
    getArticleList() {
      getAllArticle().then((res) => {
        this.currentPage = 1;
        this.allArticles = res;
        for (let item of res) {
          this.allVideos.push(item);
        }
      });
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //根据type显示对应的稿件
    handleChangeView(name) {
      this.activeName = name;
      this.allVideos = [];
      if (name == "全部作品") {
        this.getArticleList();
      } else {
        this.goVideoListOfType(name);
      }
    },
    //根据type查询对应的稿件
    goVideoListOfType(type) {
      if (type == "专栏") {
        getAllArticle().then((res) => {
          this.currentPage = 1;
          this.allVideos = res;
        });
      } else {
        getVideoOfType(type).then((res) => {
          this.currentPage = 1;
          this.allVideos = res;
        });
      }
    },
    getVideoOfBrowse() {
      //获取推荐榜,按浏览量排序
      getAllVideoOfBrowse()
        .then((res) => {
          this.videoOfBrowse = res.slice(0, 5);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getVideoOfThumse() {
      //获取热门榜,按浏览量排序
      getAllVideoOfThumse()
        .then((res) => {
          this.videoOfThumse = res.slice(0, 5);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //返回上一个页面
    goBack() {
      this.$router.go(-1);
    },
    goAlbum(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `DynamicDetails/${item.id}` });
    },
  },
  components: {
    Head,
    Footer,
    Swiper,
    IndexZj,
    ScrollTop,
    ContentList,
  },
};
</script>

<style scoped>
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding-top: 0px;
  min-height: 900px;
  background-color: rgba(255, 255, 255, 0.4);
}
/****************返回按钮层*****************/
.goback {
  float: left;
  color: #ffffff;
  font-size: 15px;
  border-radius: 30px;
  font-family: "楷体";
  background-color: #f7a7a7;
  border-color: lightpink;
}
.goback:hover {
  /* 鼠标放上去变色 */
  border-color: rgb(255, 255, 255);
  background-color: #f38787e5;
}
.words {
  font-size: 19px;
  font-family: "楷体";
  width: 10%;
  height: 40px;
  margin-left: 45%;
  background-color: #ffffff;
  border-radius: 30px;
  color: #f7a7a7;
}
.words h3 {
  padding-top: 8px;
}
/****************返回按钮层*****************/
.pagination {
  margin-bottom: 10%;
}
/****************列表*****************/
.gaojian-list-header {
  width: 70%;
  margin-left: 15%;
  padding: 0 5px;
  /* background-color: #f7a7a7; */
}
.wenzi,
.pagination {
  width: 70%;
  margin-left: 15%;
}
.gaojian-list-header li {
  display: inline-block;
  line-height: 40px;
  border: darkgray;
  margin: 0px 30px 0px 0px;
  font-size: 20px;
  font-family: "楷体";
  font-weight: 400;
  color: rgb(0, 0, 0);
  cursor: pointer;
}
.gaojian-list-header li.active {
  color: #f7a7a7;
  border-bottom: 2px solid rgb(255, 255, 255);
}
/****************列表*****************/
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
/* 榜单 */
</style>

