<template>
<!-- 轮播图 -->
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img style="width:100%" :src="item.picImg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { swiperList } from "../assets/data/swiper";
export default {
  name: "swiper",
  data() {
    return {
      swiperList: []
    };
  },
  created() {
    this.swiperList = swiperList;
  }
};
</script>
<style scoped>
.swiper {
  width: 90%;
  margin: auto;
  margin-top: 40px;
}
</style>