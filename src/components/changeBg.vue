<template>
  <el-tooltip
    content="更换背景"
    placement="bottom"
    effect="light"
  >
    <div
      class="scroll-top"
      @click="changeBG"
    >
      <i
        class="el-icon-scissors"
        style="font-size:25px;color:#f7a7a7;margin-bottom:15px"
        @click='dialogFormVisible = true'
      ></i>
    </div>
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogFormVisible"
      width="40%"
      title="背景图片设置"
    >
      <div style="text-align: center;margin-bottom: 10px">
        <span>多张图片隔10分钟切换</span>
      </div>
      <el-upload
        style="text-align: center"
        action="你的上传图片接口"
        list-type="picture-card"
        ref="uploadImages"
        :multiple="true"
        :limit="4"
        :file-list="uploadFile.uploadImageList"
        :autoUpload="true"
        :on-remove="handleUploadRemove"
        :onPreview="handlePictureCardPreview"
        :onSuccess="handleUploadSuccess"
        :onExceed="()=>{$message.error('背景图片不能超过四张')}"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <div style="text-align: center;margin-top: 10px">
        <el-button
          type="primary"
          @click='saveImage'
        >保存</el-button>
      </div>
    </el-dialog>
  </el-tooltip>

</template>

<script>
export default {
  name: "scroll-top",
  data() {
    return {
      uploadFile: {
        dialogVisible: false,
        uploadImageList: [],
        uploadMedia: [],
      },
      dialogFormVisible: false,
    };
  },
  methods: {
    handleUploadSuccess(response, file, fileList) {
      // 上传图片成功后的回调
      this.uploadFile.uploadImageList = fileList;
      this.$message.success("上传成功");
      console.log("上传图片回调");
    },
    handleMidiaUploadSuccess(response, file, fileList) {
      // 上传媒体成功后的回调
      this.uploadFile.uploadMedia = fileList;
    },
    handleUploadRemove(file, fileList) {
      // 删除图片callback
      this.uploadFile.uploadImageList = fileList;
    },
    handleMediaRemove(response, file, fileList) {
      this.uploadFile.uploadMedia = fileList;
    },
    handlePictureCardPreview(file) {
      // 预览图片
      this.uploadFile.dialogImageUrl = file.url;
      this.uploadFile.dialogVisible = true;
    },
    saveImage() {
      this.$emit("listenToChildEvent", this.uploadFile.uploadImageList);
      this.dialogFormVisible = false;
    },
  },
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
</style>