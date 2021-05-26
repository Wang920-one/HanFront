<template>
  <div>
    <Head></Head>
    <el-container>
      <el-main>
        <div style="text-align:center">
          <el-button
            type="primary"
            class="goback"
            @click="goBack"
            icon="el-icon-back"
          ></el-button>
          <div class="words">
            <h3>
              详情界面
            </h3>
          </div>
          <!-- 分割线 -->
          <el-divider></el-divider>
        </div>
        <div class="album">
          <div class="img">
            <img :src="attachImageUrl(actives.pic)" />
          </div>
          <div class="album-content">
            <ul class="info">
              <li>活动名称：{{ actives.acName }}</li>
              <li>活动地址：{{ actives.acAddress }}</li>
              <li>活动时间：{{ attachDate(actives.acTime) }}</li>
              <li>活动形式：{{ actives.acForm }}</li>
              <li>活动主办方：{{ actives.acSponsor }}</li>
              <li>活动详情：{{ actives.acDetails }}</li>
            </ul>
          </div>
        </div>
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
import { mixin } from "../../mixins";
import { mapGetters } from "vuex";
import { getActiveOfId } from "../../api/index";
export default {
  name: "activeDetail",
  mixins: [mixin],
  data() {
    return {
      acId: "", //前面传过来的活动id
      actives: {}, //活动信息
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
    ]),
  },
  created() {
    this.acId = this.$route.params.id;
    this.getActives();
  },
  methods: {
    //获取图片地址
    attachImageUrl(srcurl) {
      return srcurl
        ? this.$store.state.HOST + srcurl
        : this.$store.state.HOST + "/img/defualt/user.png";
    },
    // 根据用户id查询用户信息
    getActives() {
      getActiveOfId(this.acId)
        .then((res) => {
          this.actives = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "活动信息获取失败",
            type: "error",
          });
        });
    },
    goBack() {
      this.$router.back();
    },
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
  min-height:900px;
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
  /* background-image: url("../../assets/images/background/ba.jpg"); */
  background-size: 100% 100%;
  border-radius: 30px;
  color: #f7a7a7;
}
.words h3{
  padding-top: 8px;
}
/****************返回按钮层*****************/
.img {
  height: 300px;
  width: 300px;
  top: -100px;
  left: 50px;
  float: left;
  margin-left: 10%;
  border-radius: 10%;
  border: 5px solid #fff;
  background-color: #fff;
}
.img img {
  width: 100%;
}
.info {
  color: rgb(0, 0, 0);
  font-size: 20px;
  font-weight: 500;
  margin-top: -80px;
  margin-bottom: 20%;
  padding: 30px 40px 30px 60px;
}
.info li {
  font-family: "楷体";
  font-size: 25px;
  list-style-type: none;
  width: 100%;
  height: 100px;
}
.album-content {
  margin-top: 5%;
  margin-left: 25%;

  padding: 30px 100px;
  /* float: right; */
}
</style>