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
              汉服出行
            </h3>
          </div>
          <!-- 分割线 -->
          <el-divider></el-divider>
        </div>

        <div>
          <!-- 分类栏 -->
          <div>
            <ul class="active-list-header">
              <li
                v-for="(item, index) in forms"
                :key="index"
                @click="handleChangeView(item.name)"
                :class="{ active: item.name == activeName }"
              >
                {{ item.name }}
              </li>
            </ul>
            <content-list1
              class="content"
              :contentList1="data"
              :lab="true"
            ></content-list1>
            <div class="pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                background
                layout="total,prev,pager,next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="allActive.length"
              >
              </el-pagination>
            </div>
          </div>
        </div>
      </el-main>
    </el-container>
    <scroll-top />
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import IndexZj from "@/components/IndexZj.vue";
import contentList1 from "@/components/contentLists/ContentList1.vue";
import { forms } from "../../assets/data/activeForm";
// import { mixin } from "../mixins";
import { getAllActive, getActiveOfType } from "../../api/index";
export default {
  name: "Active",
  //   mixins: [mixin],
  data() {
    return {
      activeName: "全部活动",
      forms: [], //分类
      pageSize: 5, //页面大小，一页5条数据
      currentPage: 1, //当前默认页
      allActive: [], //所有活动
    };
  },
  computed: {
    //计算当前表格中的数据
    data() {
      return this.allActive.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  created() {
    this.forms = forms;
    this.getActiveList();
  },
  methods: {
    getActiveList() {
      getAllActive().then((res) => {
        this.allActive = res;
      });
    },

    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //根据type显示对应的歌单
    handleChangeView(name) {
      this.activeName = name;
      this.allActive = [];
      if (name == "全部活动") {
        this.getActiveList();
      } else {
        this.goActiveListOfForm(name);
      }
    },
    //根据type查询对应的歌单
    goActiveListOfForm(type) {
      getActiveOfType(type).then((res) => {
        this.currentPage = 1;
        this.allActive = res;
      });
    },

    goBack() {
      this.$router.go(-1);
    },
  },
  components: {
    Head,
    Footer,
    IndexZj,
    ScrollTop,
    contentList1,
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
.active-list-header {
  width: 70%;
  margin-left: 15%;
  padding: 0 5px;
  /* background-color: #f7a7a7; */
}
.content {
  width: 70%;
  margin-left: 12%;
  /* background-color: #f7a7a7; */
}
.wenzi,
.pagination {
  width: 70%;
  margin-left: 15%;
}
.active-list-header li {
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
.active-list-header li.active {
  color: #f7a7a7;
  border-bottom: 2px solid rgb(255, 255, 255);
}
/****************列表*****************/
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
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
/* 卡片 */
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 10px;
  line-height: 5px;
}

.button {
  padding: 0 50px;
  text-align: right;
  /* margin-left: 900px; */
}

.image {
  width: 100%;
  display: block;
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
</style>