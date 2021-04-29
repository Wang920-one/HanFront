<template>
  <div class="the-footer">
    <p>关于 | 帮助 |条款 |反馈</p>
    <p>Copyright ©2020</p>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.the-footer {
  width: 100%;
  height: 180px;
  background-color: #ebb4b4;
  /* background-color: #dfdfdf; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.the-footer p {
  height: 30px;
}
</style>
