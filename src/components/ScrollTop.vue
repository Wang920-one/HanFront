<template>
  <el-tooltip content="回到顶部" placement="bottom" effect="light">
    <div class="scroll-top" @click="returnTop">
      <i
        class="el-icon-caret-top"
        style="font-size:25px;color:#f7a7a7;margin-bottom:15px"
      ></i>
    </div>
  </el-tooltip>
</template>

<script>
export default {
  name: "scroll-top",
  methods: {
    returnTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  }
};
</script>
<style scoped>
.scroll-top {
  position: fixed;
  width: 50px;
  height: 30px;
  right: 30px;
  bottom: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0 0 4px 3px rgba(133, 133, 133, 0.644);
}
.scroll-top:before {
  position: absolute;
  font-weight: bold;
  width: 30px;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>