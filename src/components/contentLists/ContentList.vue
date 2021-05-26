<template>
  <div class="content-list">
    <ul class="section-content">
      <li
        class="content-item"
        v-for="(item, index) in contentList"
        :key="index"
      >
        <div
          class="kuo"
          @click="goAlbum(item, item.bioati)"
        >
          <div class="item-img">
            <img :src="attachImageUrl(item.pic)" />
          </div>

          <div class="mask">
            <svg class="icon">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
        </div>
        <p class="item-name">{{ item.videoTitle || item.bioati }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { mixin } from "../../mixins";
export default {
  mixins: [mixin],
  name: "content-list",
  props: ["contentList"],
  methods: {
    goAlbum(item, type) {
      this.$store.commit("setTempList", item);
      if (type) {
        //专栏
        this.$router.push({ path: `columnDetails/${item.id}` });
      } else {
        //视频
        this.$router.push({ path: `DynamicDetails/${item.id}` });
      }
    },
  },
};
</script>
<style scoped>
/* @import '../assets/css/content-list.scss'; */
.content-list {
  min-height: 500px;
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
  width: 14%;
  margin: 20px 1%;
  overflow: hidden;
  /* border-radius: 4px; */
  position: relative;
  text-align: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  background-color: rgba(240, 248, 255, 0);
}
.content-item:hover {
  /* 鼠标放上去阴影加深 */
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.15);
}
.content-item p{
  font-size: 18px;
  font-family: "楷体";
  float: left;
  margin-top: 5px;
}
.item-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin: 10px 8px;
}
.item-img{
  
  width: 100%;
  height: 9em;
}
.item-img img{
  border-radius: 4px;
  width: 100%;
  height: 100%;
  /* transition: all 0.4s ease; */
}
.item-img:hover {
  /* 鼠标放上去图片放大 */
  transform: scale(1.1);
}
.kuo,
.mask {
  /* width: 80%; */
  padding-bottom: 100%;
  /* padding-left: 10%; */
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
