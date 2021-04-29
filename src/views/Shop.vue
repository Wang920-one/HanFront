<template>
  <div>
    <Head></Head>
    <el-container>
      <el-main id="bgImg">
        <div style="text-align:center">
          <el-button
            type="primary"
            @click="goBack"
            style="float:left;color:#f7a7a7;font-size:25px;padding-left:10px;padding-top:5px;background-color:#ffffff00;border-color:#ffffff00"
            icon="el-icon-back"
          ></el-button>
          <h3 style="font-size: 19px;font-family: '楷体';color:#f7a7a7">
            汉服商铺
          </h3>
          <!-- 分割线 -->
          <el-divider></el-divider>
        </div>

        <div>
          <!-- 店铺资历榜 -->
          <div style="width:10%;float: left;margin-left:10px">
            <el-card
              class="box-card"
              style="width:100%;background-color: #ffffff30;"
            >
              <div slot="header" class="clearfix" style="text-align: center;">
                <span>店铺资历榜</span>
              </div>
              <div
                v-for="(item, index) in shopofFans"
                :key="index"
                class="text"
                style="text-align: center;"
              >
                <div class="item">
                  <a class="item-name" :href="item.shopHttp" target="_blank">
                    {{ item.shopName }}
                  </a>
                </div>
              </div>
            </el-card>
          </div>

          <!-- 热门店铺 -->
          <div style="width:10%;float: right;;margin-right:10px">
            <el-card
              class="box-card"
              style="width:100%;background-color: #ffffff30;"
            >
              <div slot="header" class="clearfix" style="text-align: center;">
                <span>热门店铺</span>
              </div>
              <div
                v-for="(item, index) in shopofTime"
                :key="index"
                class="text"
                style="text-align: center;"
              >
                <div class="item">
                  <a class="item-name" :href="item.shopHttp" target="_blank">
                    {{ item.shopName }}
                  </a>
                </div>
              </div>
            </el-card>
          </div>

          <!-- 分类栏 -->
          <div>
            <content-list1 :contentList1="data" :lab="false"></content-list1>
            <div class="pagination">
              <el-pagination
                style="margin-left:35%"
                @current-change="handleCurrentChange"
                background
                layout="total,prev,pager,next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="allShop.length"
              >
              </el-pagination>
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
import Footer from "@/components/Footer.vue";
import Head from "@/components/Head.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import IndexZj from "@/components/IndexZj.vue";
import { mixin } from "../mixins";
import ContentList1 from "@/components/ContentList1.vue";
import {
  getVideoOfType,
  getAllShop,
  getAllShopOfFans,
  getAllShopOfTime
} from "../api/index";
export default {
  name: "Shop",
  data() {
    return {
      allShop: [], //所有商铺
      shopofFans: [], //热门榜
      shopofTime: [], //资历榜
      pageSize: 5, //页面大小，一页5条数据
      currentPage: 1 //当前默认页
      //   activeName: "first"
    };
  },
  computed: {
    //计算当前表格中的数据
    data() {
      return this.allShop.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    }
  },
  created() {
    // this.forms = forms;
    this.getShopList();
    this.getShopOfFans();
    this.getShopOfTime();
  },
  methods: {
    getShopOfFans() {
      //获取推荐榜,按浏览量排序
      getAllShopOfFans()
        .then(res => {
          this.shopofFans = res.slice(0, 5);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getShopOfTime() {
      //获取热门榜,按浏览量排序
      getAllShopOfTime()
        .then(res => {
          this.shopofTime = res.slice(0, 5);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    goBack() {
      this.$router.go(-1);
    },
    getShopList() {
      getAllShop().then(res => {
        this.allShop = res;
      });
    }
  },
  components: {
    Head,
    Footer,
    IndexZj,
    ScrollTop,
    ContentList1
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
</style>