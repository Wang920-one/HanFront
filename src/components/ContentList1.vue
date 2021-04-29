<template>
  <div class="content-list">
    <ul class="section-content">
      <li
        class="content-item"
        v-for="(item, index) in contentList1"
        :key="index"
      >
        <div class="kuo">
          <img class="item-img" :src="attachImageUrl(item.pic)" />
          <div class="mask">
            <svg class="icon">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
        </div>
        <div v-show="lab" @click="goAlbum(item)">
          <p class="item-name">名称：{{ item.acName }}</p>
          <p class="item-name">地址：{{ item.acAddress }}</p>
          <p class="item-name">时间：{{ attachDate(item.acTime) }}</p>
          <p class="item-name">形式：{{ item.acForm }}</p>
          <p class="item-name">主办方：{{ item.acSponsor }}</p>
          <p class="item-name">详情：{{ item.acDetails }}</p>
        </div>
        <div v-show="!lab">
          <p class="item-name">名称：{{ item.shopName }}</p>
          <p class="item-name">认证时间：{{ attachDate(item.shopYear) }}</p>
          <p class="item-name">粉丝量：{{ item.shopFans }}</p>
          <a class="item-name" :href="item.shopHttp" target="_blank">
            店铺链接
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mixin } from "../mixins";
export default {
  name: "content-list1",
  mixins: [mixin],
  props: ["contentList1", "lab"],
  methods: {
    goAlbum(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `activeDetail/${item.acId}` });
    }
  }
};
</script>
<style scoped>
/* @import '../assets/css/content-list.scss'; */
.content-list {
  min-height: 800px;
  padding: 0 10px;
  /* margin-bottom: 50px; */
  align-items: center;
}
.section-content {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
}
.content-item {
  width: 100%;
  height: 220px;
  margin-bottom: 2%;
  margin-right: 35px;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  /* text-align: center; */
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.164);
  background-color: rgba(240, 248, 255, 0.5);
}
.content-item:hover {
  /* 鼠标放上去阴影加深 */
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.267);
}
.item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 10px 8px;
  padding-left: 2%;
}
.item-img {
  width: 100%;
  /* height: 100%; */
}
.item-img:hover {
  /* 鼠标放上去图片放大 */
  transform: scale(1.1);
}
.kuo,
.mask {
  width: 16%;
  float: left;
  padding-bottom: 100%;
  height: 0;
  overflow: hidden;
  /* background-color: rgba(240, 248, 255, 0.5); */
}
</style>
<style type="text/css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
