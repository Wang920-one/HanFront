<template>
  <div>
    <Head></Head>
    <el-container>
      <el-main id="bgImg">
        <el-page-header @back="goBack" content="详情页面"> </el-page-header>
        <el-container>
          <el-header
            ><h3
              style="font-size: 19px;font-family: '楷体';color:#f7a7a7;text-align:center"
            >
              发布专栏
            </h3>
            <!-- 分割线 -->
            <el-divider></el-divider
          ></el-header>
          <el-container>
            <el-main
              style="text-align:c
            enter;"
            >
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="70px"
                class="demo-ruleForm"
                style="width:80%;margin-left:10%"
              >
                <el-form-item label="标题" prop="bioati">
                  <el-input v-model="ruleForm.bioati"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="atcDescribe">
                  <el-input
                    type="textarea"
                    v-model="ruleForm.atcDescribe"
                  ></el-input>
                </el-form-item>
                <!-- <el-form-item label="分类" prop="atcType">
                  <el-checkbox-group v-model="ruleForm.atcType">
                    <el-checkbox label="妆容" name="type"></el-checkbox>
                    <el-checkbox label="发型" name="type"></el-checkbox>
                    <el-checkbox label="搭配" name="type"></el-checkbox>
                    <el-checkbox label="种草" name="type"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item> -->
                <!-- <el-form-item label="封面" prop="pic">
                  <el-upload
                    action="#"
                    list-type="picture-card"
                    style="float:left"
                    :auto-upload="false"
                  >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                      />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleDownload(file)"
                        >
                          <i class="el-icon-download"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="" />
                  </el-dialog>
                </el-form-item> -->
                <el-form-item label="内容" prop="actText">
                  <quill-editor
                    v-model="ruleForm.actText"
                    ref="myQuillEditor"
                  ></quill-editor>
                  <!-- <qul-editor v-model="ruleForm.actText"></qul-editor> -->
                  <!-- :options="editorOption" -->
                </el-form-item>

                <el-form-item>
                  <!-- <quill-show :quillHtmlStr.sync="quillHtmlStr"></quill-show> -->
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm()"
                    >发布</el-button
                  >
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
import qulEditor from "@/components/quEditor.vue"; //富文本编辑器组件的路径
import { mixin } from "../mixins";
import { mapGetters } from "vuex";
import {
  setArticle,
  getUserOfId,
  getArticleOfId,
  updateArticle
} from "../api/index";

export default {
  name: "EditArticle",
  mixins: [mixin],
  data() {
    return {
      articleid: "",
      text: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        bioati: "",
        atcDescribe: "",
        pic: "",
        atcType: [],
        actText: ""
      },
      rules: {
        bioati: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        atcDescribe: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        pic: [{ required: true, message: "请上传封面" }],
        atcType: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个标签",
            trigger: "blur"
          }
        ],
        actText: [
          {
            required: true,
            message: "请输入内容"
          }
        ]
      }
    };
  },
  created() {
    this.articleid = this.$route.params.id;
  },
  mounted() {
    // console.log(this.id);
    this.getMsg(this.articleid);
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    ...mapGetters([
      "loginIn", //用户是否登录
      "id" //当前登录用户id
    ])
  },
  components: {
    Head,
    Footer,
    ScrollTop,
    qulEditor
    // tinymceEditor,
    // EditorBar,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getMsg(articleid) {
      getArticleOfId(articleid)
        .then(res => {
          this.ruleForm.bioati = res.bioati;
          this.ruleForm.atcDescribe = res.atcDescribe;
          this.ruleForm.actText = res.actText;
          //   this.ruleForm.videoType = res.videoType;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm() {
      let params = new URLSearchParams();
      params.append("id", this.articleid);
      params.append("useId", this.id);
      params.append("bioati", this.ruleForm.bioati);
      params.append("atcDescribe", this.ruleForm.atcDescribe);
    //   params.append("atcType", this.ruleForm.atcType);
      params.append("actText", this.ruleForm.actText);
      updateArticle(params).then(res => {
        if (res.code == 1) {
          //   this.getDate();
          this.$router.push({ path: `/personal/${this.id}` });
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改失败",
            type: "error"
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
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
  height: 41rem !important;
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