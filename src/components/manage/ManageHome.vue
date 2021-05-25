<template>
  <div>
    <manage-header></manage-header>
    <manage-aside></manage-aside>
    <div
      class="content-box"
      :class="{'content-collapse':collapse}"
    >
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import bus from "../../assets/js/bus";
import ManageHeader from "./ManageHeader";
import ManageAside from "./ManageAside";
// import bus from "../assets/js/bus";

export default {
  components: {
    ManageHeader,
    ManageAside,
  },
  data() {
    return {
      collapse: false,
    };
  },
  created() {
    //通过bus进行组件间的通信来折叠侧面菜单栏
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
    });
  },
};
</script>