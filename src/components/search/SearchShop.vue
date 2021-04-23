<template>
  <div>
    <div class="search-article">
      <div class="content">
        <h1 class="title">
          <slot name="title"></slot>
          <hr />
        </h1>
        <ul>
          <li>
            <div class="article-item">
              <span class="item-index"></span>
              <span class="item-title">商铺名称</span>
              <span class="item-name">粉丝量</span>
              <span class="item-intro">地址</span>
            </div>
          </li>
          <li v-for="(item, index) in listOfShop" :key="index">
            <div class="article-item">
              <span class="item-index">
                {{ index + 1 }}
              </span>
              <span class="item-title">{{ item.shopName }}</span>
              <span class="item-name">{{ item.shopFans }}</span>
              <a class="item-intro" :href="item.shopHttp" target="_blank">
                {{ item.shopHttp }}
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import ContentList from "../ContentList";
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";

export default {
  name: "search-shop",
  mixins: [mixin],
  components: {},
  computed: {
    ...mapGetters(["listOfShop"])
  },
  mounted() {
    this.getShop();
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

.article-item {
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