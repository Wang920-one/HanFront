<template>
  <div>
    <el-tooltip
      content="回到顶部"
      placement="bottom"
      effect="light"
    >
      <div
        class="scroll-top"
        @click="returnTop"
      >
        <i
          class="el-icon-caret-top"
          style="font-size:25px;color:#f7a7a7;margin-bottom:15px"
        ></i>
      </div>
    </el-tooltip>
    <el-tooltip
      content="更换背景"
      placement="bottom"
      effect="light"
      v-show="loginIn"
    >
      <div
        class="scroll-top1"
        style=""
      >
        <i
          class="el-icon-magic-stick"
          style="font-size:25px;color:#f7a7a7;margin-bottom:15px"
          @click="uploadImg"
        ></i>
      </div>
    </el-tooltip>
    <el-dialog
      :visible.sync="dialogFormVisible"
      width="40%"
      title="背景图片设置"
    >
      <el-upload
        class="avatar-uploader"
        style="text-align: center"
        :action="uploadUrl(this.id)"
        :before-upload="beforeImgUpload"
        :on-success="handleImgSuccess"
      >
        <i class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div style="text-align: center;margin-top: 10px">
        <el-button
          type="primary"
          @click='saveImage'
        >确定更换</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "scroll-top",
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  computed: {
    ...mapGetters([
      "loginIn", //用户是否登录
      "id", //当前登录用户id
      "userImage",
      "userBackImg",
    ]),
  },
  methods: {
    returnTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    uploadImg() {
      if (this.loginIn) {
        this.dialogFormVisible = true;
      } else {
        this.$message({
          showClose: true,
          message: "请先登录！",
          type: "error",
        });
      }
    },
    //更新图片
    uploadUrl(userId) {
      return `${this.$store.state.HOST}/user/updateUserBackImg?id=${userId}`;
    },
    //上传之前的校验
    beforeImgUpload(file) {
      const isJPG = file.type == "image/jpeg" || file.type === "image/png";
      const isLt10M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message({
          showClose: true,
          message: "上传背景图片只能是jpg格式或者png格式",
          type: "error",
        });
        return false;
      }
      if (!isLt10M) {
        this.$message({
          showClose: true,
          message: "上传背景图片不能大于20MB",
          type: "error",
        });
        return false;
      }
      return true;
    },
    //上传成功
    handleImgSuccess(res, file) {
      if (res.code == 1) {
        this.$store.commit("setUserBackImg", res.userBackImg);
        // this.$message({
        //   showClose: true,
        //   message: "更换成功",
        //   type: "success",
        // });
      } else {
        this.$message({
          showClose: true,
          message: "更换失败",
          type: "error",
        });
      }
    },
    saveImage() {
      this.dialogFormVisible = false;
      this.$router.go(0); //刷新当前页面
    },
  },
};
</script>
<style scoped>
.scroll-top {
  position: fixed;
  width: 50px;
  height: 30px;
  left: 30px;
  bottom: 100px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0 0 4px 3px rgba(133, 133, 133, 0.247);
}
.scroll-top:before {
  position: absolute;
  font-weight: bold;
  width: 30px;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.scroll-top1 {
  position: fixed;
  width: 50px;
  height: 30px;
  left: 30px;
  bottom: 180px;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 100%;
  overflow: hidden;
  box-shadow: 0 0 4px 3px rgba(133, 133, 133, 0.247);
}
/* .scroll-top1:before {
  position: absolute;
  font-weight: bold;
  width: 30px;
  top: -40%;
  left: 50%;
  transform: translate(-40%, -50%);
} */
</style>