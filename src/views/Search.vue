<template>
  <div>

    <Head />
    <el-container>
      <el-main>
        <div class="search">
          <nav
            class="searchList-nav"
            ref="change"
          >
            <span
              :class="{isActive: toggle=='Article'}"
              @click="handleChangeView('Article')"
            >专栏</span>
            <span
              :class="{isActive: toggle=='Video'}"
              @click="handleChangeView('Video')"
            >视频</span>
            <span
              :class="{isActive: toggle=='User'}"
              @click="handleChangeView('User')"
            >用户</span>
            <span
              :class="{isActive: toggle=='Active'}"
              @click="handleChangeView('Active')"
            >活动</span>
            <span
              :class="{isActive: toggle=='Shop'}"
              @click="handleChangeView('Shop')"
            >商铺</span>
          </nav>
          <component :is="currentView"></component>
        </div>

      </el-main>
    </el-container>
    <Footer />
  </div>
</template>
<script>
import Head from "@/components/Head.vue";
import Footer from "@/components/Footer.vue";
import searchArticle from "@/components/search/SearchArticle.vue";
import searchVideo from "@/components/search/SearchVideo.vue";
import searchActive from "@/components/search/SearchActive.vue";
import searchShop from "@/components/search/SearchShop.vue";
import searchUser from "@/components/search/SearchUser.vue";
export default {
  name: "search",
  components: {
    Head,
    Footer,
    searchArticle,
    searchVideo,
    searchActive,
    searchShop,
    searchUser,
  },
  data() {
    return {
      toggle: "Article",
      currentView: "searchArticle",
    };
  },
  methods: {
    //切换组件
    handleChangeView(component) {
      this.currentView = "search" + component;
      this.toggle = component;
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
  min-height: 900px;
  background-color: rgba(255, 255, 255, 0.4);
}
.search {
  margin: auto;
  margin-top: 90px;
  margin-bottom: 30%;
  background-color: #ffffff48;
  border-radius: 12px;
  width: 900px;
  /* height: 400px; */
  position: relative;
}
.searchList-nav {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  font-size: 1.5rem;
  color: #000000;
}
.searchList-nav span {
  line-height: 50px;
  cursor: pointer;
}

.isActive {
  font-weight: 600;
  color: #f7a7a7;
  border-bottom: 5px solid #ffffff;
}
</style>