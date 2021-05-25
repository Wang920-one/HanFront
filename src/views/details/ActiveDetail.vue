<template>
  <div class="user-intro">
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
        </el-container>

        <el-container>
          <el-main>
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
      actives: {} //活动信息
    };
  },
  components: {
    Head,
    Footer,
    ScrollTop
  },
  computed: {
    ...mapGetters([
      "loginIn", //是否登录
      "id" //当前登录用户userId
    ])
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
        .then(res => {
          this.actives = res;
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "活动信息获取失败",
            type: "error"
          });
        });
    },
    goBack() {
      this.$router.back();
    }
  }
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
.album {
  /* margin-top: 35px; */
  padding-top: 100px;
  background-color: rgba(255, 255, 255, 0.5);
}
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