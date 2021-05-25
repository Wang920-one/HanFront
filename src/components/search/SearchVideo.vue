<template>
  <div>
    <div class="search-video">
      <div class="content">
        <h1 class="title">
          <slot name="title"></slot>
          <hr />
        </h1>
        <ul>
          <li>
            <div class="video-item">
              <span class="item-index"></span>
              <span class="item-title">标题</span>
              <span class="item-name">分类</span>
              <span class="item-intro">描述</span>
            </div>
          </li>
          <li v-for="(item, index) in listOfVideo" :key="index">
            <div class="video-item" @click="goAlbum(item)">
              <span class="item-index">
                {{ index + 1 }}
              </span>
              <span class="item-title">{{ item.videoTitle }}</span>
              <span class="item-name">{{ item.videoType }}</span>
              <span class="item-intro">{{ item.videoDes }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";

export default {
  name: "search-video",
  mixins: [mixin],
  components: {},
  computed: {
    ...mapGetters(["listOfVideo"])
  },
  mounted() {
    this.getVideo();
  },
  methods: {
    goAlbum(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `DynamicDetails/${item.id}` });
    }
  }
};
</script>
<style scoped>
.search-article {
  min-height: 300px;
}
.content {
  background-color: rgba(255, 255, 255, 0);
  border-radius: 10px;
  padding: 20px 40px;
  min-width: 700px;
}
.content ul {
  /* width: 100%; */
  padding-bottom: 50px;
}
.content ul li {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: block;
  height: 50px;
  line-height: 50px;
  text-indent: 20px;
  cursor: pointer;
}

.video-item {
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-index {
  width: 5%;
}
.item-title {
  width: 30%;
}
.item-name {
  width: 25%;
}
.item-intro {
  width: 40%;
}
</style>