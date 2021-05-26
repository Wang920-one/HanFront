<template>
  <div class="content-list">
    <ul class="section-content">
      <li
        class="content-item"
        v-for="(item, index) in contentList2"
        :key="index"
      >
        <div class="kuo">
          <img
            class="item-img"
            :src="attachImageUrl(item.pic)"
          />
        </div>
        <div v-show="lab">
          <div @click="goAlbum(item)">
            <p class="item-name">标题：{{ item.videoTitle }}</p>
            <p class="item-name">发布时间：{{ item.videoTime }}</p>
          </div>
          <div class="mask">
            <div>
              <el-upload
                :action="uploadUrl1(item.id)"
                :before-upload="beforeImgUpload"
                :on-success="handleImgSuccess"
              >
                <el-button
                  size="mini"
                  round
                >更新封面</el-button>
              </el-upload>
            </div>
            <el-button
              size="mini"
              type="danger"
              @click="uhandleDelete1(item.id)"
            >删除</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="goEditVideo(item.id)"
            >编辑</el-button>
          </div>
        </div>
        <div v-show="!lab">
          <p class="item-name">名称：{{ item.shopName }}</p>
          <p class="item-name">认证时间：{{ attachDate(item.shopYear) }}</p>
          <p class="item-name">粉丝量：{{ item.shopFans }}</p>
          <a
            class="item-name"
            :href="item.shopHttp"
            target="_blank"
          >
            店铺链接
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { mixin } from "../../mixins";
export default {
  name: "content-list2",
  mixins: [mixin],
  props: ["contentList2", "lab"],
  methods: {
    goAlbum(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `activeDetail/${item.acId}` });
    },
    //上传之前的校验
    beforeImgUpload(file) {
      const isJPG = file.type == "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message({
          showClose: true,
          message: "上传头像图片只能是JPG格式",
          type: "error",
        });
        return false;
      }
      if (!isLt10M) {
        this.$message({
          showClose: true,
          message: "上传头像图片不能大于10MB",
          type: "error",
        });
        return false;
      }
      return true;
    },
    //上传成功
    handleImgSuccess(res, file) {
      if (res.code == 1) {
        this.$store.commit("setUserImage", res.userImage);
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      } else {
        this.$message({
          showClose: true,
          message: "修改失败",
          type: "error",
        });
      }
      this.$router.go(0); //刷新当前页面
    },
    //更新视频封面
    uploadUrl1(id) {
      return `${this.$store.state.HOST}/video/updateVideoImg?id=${id}`;
    },
    //更新专栏封面
    uploadUrl2(id) {
      return `${this.$store.state.HOST}/article/updateArticleImg?id=${id}`;
    },

    //切换到编辑视频界面
    goEditVideo(id) {
      this.$router.push({ path: `/editvideo/${id}` });
    },
  },
};
</script>
<style scoped>
/* @import '../assets/css/content-list.scss'; */
.content-list {
  min-height: 800px;
  padding: 0 0px;
  /* margin-bottom: 50px; */
  align-items: center;
}
.section-content {
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
}
.content-item {
  width: 100%;
  height: 150px;
  margin-bottom: 2%;
  /* margin-right: 35px; */
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  /* text-align: center; */
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.164);
  background-color: rgba(240, 248, 255, 0.5);
}
.content-item:hover {
  /* 鼠标放上去阴影加深 */
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.267);
}
.item-name {
  font-size:10px;
  width: 10%;
  padding-left: 2%;
}
.item-img {
  width: 150px;
  height: 100px;
}
.item-img:hover {
  /* 鼠标放上去图片放大 */
  transform: scale(1.1);
}
.kuo,
.mask {
  width: 16%;
  float: left;
  padding-bottom: 100%;
  height: 0;
  overflow: hidden;
  /* background-color: rgba(240, 248, 255, 0.5); */
}
</style>
<style type="text/css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
