<template>
  <div id="app">
    <!-- <Head /> -->
    <router-view />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: {
    Head,
    Footer
  }
};
</script>
<style>
/* #app {
  background-image: url("./assets/images/bg2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
} */

</style>
