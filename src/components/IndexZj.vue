<template>
  <div style="text-align: center;">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      style="float: center;background-color: #ffffff30;color:#f7a7a7;
      font-family: '楷体';padding-left:10px;"
    >
      <el-menu-item index="1" class="menus">首页</el-menu-item>
      <el-menu-item index="2" class="menus" @click="goToKnows()"
        >汉服知识</el-menu-item
      >
      <el-menu-item index="4" class="menus" @click="goToSquare()"
        >汉服广场</el-menu-item
      >
      <el-menu-item index="3" class="menus" @click="goToActive()"
        >汉服出行</el-menu-item
      >
      <el-menu-item index="5" class="menus" @click="goToShop()"
        >汉服商铺</el-menu-item
      >
    </el-menu>
    <div class="line"></div>
  </div>
</template>
<script>
export default {
  name: "IndexZj",
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    goToKnows() {
      this.$router.push("/knows");
    },
    goToActive() {
      this.$router.push("/active");
    },
    goToSquare() {
      this.$router.push("/square");
    },
    goToShop() {
      this.$router.push("/shop");
    }
  }
};
</script>
<style scoped>
/deep/.menus {
  /* display: none; */
  padding: 0 6.4%;
  font-size: 21px;
  /* margin-left: 10px; */
  /* color: #000000; */
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #52d1f800;
  color: #f7a7a7;
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #000000;
}
</style>