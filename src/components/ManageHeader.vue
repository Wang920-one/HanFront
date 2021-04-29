<template>
  <div class="header">
    <!-- 折叠图片 -->
    <div>
      <img
        class="logologin"
        src="@/assets/images/logo.png"
      />
    </div>
    <div
      class="collapse-btn"
      @click="collapseChange"
    >
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">华夏衣裳后台管理</div>
    <div class="header-right">
      <div
        class="btn-fullscreen"
        @click="handleFunllScrean"
      >
        <el-tooltip
          :content="fullscreen?'取消全屏':'全屏'"
          placement="bottom"
        >
          <i class="el-icon-rank"></i>
        </el-tooltip>
      </div>
      <div class="user-avator">
        <img
          src="../assets/images/1.jpg"
          alt=""
        >
      </div>
      <el-dropdown
        class="manage-name"
        trigger="click"
        @command="hadleCommand"
      >
        <span class="el-dropdown-link">
          {{manageName}}
          <i class="el-icon-caret-bottom"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout"> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import bus from "../assets/js/bus";
export default {
  data() {
    return {
      collapse: true,
      fullscreen: false,
    };
  },
  computed: {
    manageName() {
      return localStorage.getItem("manageName");
    },
  },
  methods: {
    //侧边栏事件
    collapseChange() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    //全屏事件
    handleFunllScrean() {
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          //safari,Chrome
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullscreen) {
          //firefox
          document.mozCancelFullscreen();
        } else if (document.msExitFullscreen) {
          //IE
          document.msExitFullscreen();
        }
      } else {
        let element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullScreen) {
          element.msRequestFullScreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    hadleCommand(command) {
      if (command == "logout") {
        localStorage.removeItem("manageName");
        this.$router.push("/managelogin");
      }
    },
  },
};
</script>
<style scoped>
.header {
  position: relative;
  background-color: #f7a7a7;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.logologin {
  height: 70px;
  float: left;
}
.header .logo {
  float: left;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.manage-name {
  margin-left: 10px;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
</style>