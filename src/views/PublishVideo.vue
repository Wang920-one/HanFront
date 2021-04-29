<template>
  <div>
    <Head></Head>
    <el-container>
      <el-main id="bgImg" style="min-height:900px">
        <el-page-header @back="goBack" content="详情页面"> </el-page-header>
        <el-container>
          <el-header>
            <h3
              style="font-size: 19px;font-family: '楷体';color:#f7a7a7;text-align:center"
            >
              发布视频
            </h3>
            <!-- 分割线 -->
            <el-divider></el-divider>
          </el-header>
          <el-container>
            <el-main>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="70px"
                class="demo-ruleForm"
                action=""
                id="tf"
                enctype="multipart/form-data"
                style="width:80%;margin-left:10%"
              >
                <el-form-item label="标题" prop="videoTitle">
                  <el-input v-model="ruleForm.videoTitle"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="videoDes">
                  <el-input
                    type="textarea"
                    v-model="ruleForm.videoDes"
                  ></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="videoType">
                  <el-checkbox-group v-model="ruleForm.videoType">
                    <el-checkbox label="妆容" name="type"></el-checkbox>
                    <el-checkbox label="发型" name="type"></el-checkbox>
                    <el-checkbox label="搭配" name="type"></el-checkbox>
                    <el-checkbox label="种草" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <!-- <el-form-item label="封面" prop="pic"> </el-form-item> -->

                <el-form-item
                  label="添加视频"
                  class="video-upload"
                  prop="videoFile"
                >
                  <input type="file" name="file" />
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm">发布</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>

            </el-main>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
    <scroll-top />
    <Footer />
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Footer from "@/components/Footer.vue";
import ScrollTop from "@/components/ScrollTop.vue";
// import tinymceEditor from "@/components/imcoder-tinymce.vue";
import { mixin } from "../mixins";
import { mapGetters } from "vuex";
import { setVideo, getUserOfId } from "../api/index";

export default {
  name: "publishvideo",
  mixins: [mixin],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,

      uploadUrl: "http://localhost:8888/video/add/",
      //   deleteUrl: "http://localhost:8888/video/add",

      videoFlag: false, //刚开始的时候显示为flase
      videoUploadPercent: "0%", //进度条刚开始的时候为0%
      paramsdata: {
        参数: "参数值" //添加其他参数
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        videoTitle: "",
        videoDes: "",
        videoType: []
      },
      rules: {
        videoTitle: [
          { required: true, message: "请输入标题", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ],
        videoDes: [{ required: true, message: "请输入描述", trigger: "blur" }],
        videoType: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个标签",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    // console.log(this.id);
  },
  computed: {
    ...mapGetters([
      "loginIn", //用户是否登录
      "id" //当前登录用户id
    ])
  },
  components: {
    Head,
    Footer,
    ScrollTop
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submitForm() {
      //   let params = new URLSearchParams();
      let _this = this;
      var form = new FormData(document.getElementById("tf"));
      form.append("useId", this.id);
      form.append("videoTitle", this.ruleForm.videoTitle);
      form.append("pic", "/img/defualt/video.png");
      form.append("videoDes", this.ruleForm.videoDes);
      form.append("videoType", this.ruleForm.videoType);
      form.append("videoFile", this.ruleForm.file);
      var req = new XMLHttpRequest();
      req.onreadystatechange = function() {
        //req.readyState == 4 获取到返回的完整数据
        //req.status == 200 和后台正常交互完成
        if (req.readyState == 4 && req.status == 200) {
          let res = JSON.parse(req.response);
          if (res.code) {
            // _this.ruleForm = {};
            _this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
          } else {
            _this.$message({
              showClose: true,
              message: "发布失败",
              type: "error"
            });
          }
        }
      };
      req.open("post", `${_this.$store.state.HOST}/video/add`, false);
      req.send(form);
      this.$router.push({ path: `/personal/${this.id}` });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
       
  }
};
</script>
<style scoped>
#bgImg {
  background-image: url("../assets/images/bg2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
}
/* 编辑器内部出现滚动条 */
/deep/.ql-container {
  overflow-y: auto;
  height: 42rem !important;
}
/*滚动条整体样式*/
/deep/.ql-container ::-webkit-scrollbar {
  width: 10px; /*竖向滚动条的宽度*/
  height: 10px; /*横向滚动条的高度*/
}
/deep/.ql-container ::-webkit-scrollbar-thumb {
  /*滚动条里面的小方块*/
  background: #f7a7a7;
  border-radius: 5px;
}
/deep/.ql-container ::-webkit-scrollbar-track {
  /*滚动条轨道的样式*/
  background: rgba(255, 255, 255, 0.575);
  border-radius: 5px;
}
/deep/.el-button {
  font-family: "楷体";
}
</style>