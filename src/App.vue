<template>
  <div
    id="app"
    :style="{backgroundImage:'url('+this.url+')'}"
  >
    <router-view />
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      url: "",
      urlList: [],
      timer: null,
    };
  },
  computed: {
    ...mapGetters([
      "loginIn", //用户是否登录
      "id", //当前登录用户id
      "userImage",
      "userBackImg",
    ]),
  },
  mounted() {
    if (this.loginIn) {
      this.url = this.$store.state.HOST + this.userBackImg;
    } else {
      this.url = this.$store.state.HOST +'/img/defualt/backs.jpg';
    }
  },
  components: {
    Head,
    Footer,
  },
};
</script>
<style>
#app {
  /* background-image: url("./assets/images/bg2.jpg"); */
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
}
</style>
