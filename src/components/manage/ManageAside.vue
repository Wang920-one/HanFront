<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      default-active="MInfo"
      :collapse="collapse"
      background-color="#fcdada"
      text-color="#ffffff"
      active-text-color="#409EFF"
      router
    >
      <template v-for="item in items">
        <template>
          <el-menu-item
            :index="item.index"
            :key="item.index"
          >
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import bus from "../../assets/js/bus";
export default {
  data() {
    return {
      collapse: false,
      items: [
        {
          icon: "el-icon-house",
          index: "MInfo",
          title: "系统首页",
        },
        {
          icon: "el-icon-user",
          index: "MUser",
          title: "用户管理",
        },
        {
          icon: "el-icon-document",
          index: "MArticle",
          title: "稿件管理",
        },
        // {
        //   icon: "el-icon-folder-add",
        //   index: "MContribute",
        //   title: "投稿管理",
        // },
        {
          icon: "el-icon-goods",
          index: "MShop",
          title: "店铺管理",
        },
        {
          icon: "el-icon-basketball",
          index: "MActive",
          title: "活动管理",
        },
        {
          icon: "el-icon-message",
          index: "MSuggest",
          title: "投诉管理",
        },
      ],
    };
  },
  created() {
    //通过bus进行组件间的通信来折叠侧面菜单栏
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
    });
  },
  computed: {},
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  /* left: 0; */
  top: 80px;
  bottom: 0;
  background-color: #fcdada;
  overflow-y: scroll;
}

.sidebar::-webkit-scrollbar {
  width: 0;
}

.sidebar-el-menu:not(.el-menu--collapse) {
  width: 150px;
}

.sidebar > ul {
  height: 100%;
}
</style>