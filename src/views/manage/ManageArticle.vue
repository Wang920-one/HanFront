<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane label="专栏管理" name="article">
      <div class="table">
        <div class="container">
          <div class="handle-box">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              round
              @click="delAllArticle"
            >
              批量删除
            </el-button>
            <el-input
              v-model="select_word"
              size="mini"
              placeholder="请输入专栏标题"
              class="handle-input"
              ><i
                class="el-icon-search el-input__icon"
                slot="suffix"
                style="color: #f7a7a7"
              >
              </i
            ></el-input>
          </div>
        </div>

        <!-- 显示数据 -->
        <el-table
          size="mini"
          border
          style="width:100%"
          height="680px"
          :data="data"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40"> </el-table-column>
          <el-table-column
            prop="userName"
            label="作者昵称"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="bioati"
            label="稿件标题"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column label="封面" width="110" align="center">
            <template slot-scope="scope">
              <div class="article-img">
                <img :src="getUrl(scope.row.pic)" style="width:100%" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="150" align="center">
            <template slot-scope="scope">
              <span
                :style="{
                  color: actiColor
                }"
                v-if="scope.row.actReview === 0"
              >
                {{ changeReview(scope.row.actReview) }}
              </span>
              <span
                :style="{
                  color: actColor
                }"
                v-if="scope.row.actReview == 1"
              >
                {{ changeReview(scope.row.actReview) }}
              </span>
              <!-- <span :style="{ color: actColor }">
                {{ changeReview(scope.row.actReview) }}
              </span> -->
            </template>
            <!-- <el-button
              type="success"
              size="mini"
              @click="handleEdit1(scope.row)"
            >审核通过</el-button> -->
          </el-table-column>
          <el-table-column
            prop="atcDescribe"
            label="描述"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column label="发布时间" width="150" align="center">
            <template slot-scope="scope">{{
              attachDate(scope.row.atcTime)
            }}</template>
          </el-table-column>
          <el-table-column label="内容" align="center">
            <template slot-scope="scope">
              <p style="height:100px;">{{ scope.row.actText }}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="handleReview(scope.row.id)"
                >通过</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 添加分页组件 -->
        <div class="pagination">
          <el-pagination
            background
            layout="total,prev,pager,next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="tableData.length"
            @current-change1="handleCurrentChange"
          ></el-pagination>
        </div>

        <!-- 查看稿件 -->
        <el-dialog
          title="详细信息"
          :visible.sync="viewVisible"
          width="400px"
          center
        >
          <el-form :model="form" ref="form" label-width="80px">
            <el-form-item prop="atcId" label="稿件编号" size="mini">
              <el-input v-model="form.id" placeholder="稿件编号"></el-input>
            </el-form-item>
            <el-form-item prop="useId" label="用户编号" size="mini">
              <el-input v-model="form.useId" placeholder="用户编号"></el-input>
            </el-form-item>
            <el-form-item prop="userName" label="作者昵称" size="mini">
              <el-input
                v-model="form.userName"
                placeholder="作者昵称"
              ></el-input>
            </el-form-item>
            <el-form-item prop="bioati" label="稿件标题" size="mini">
              <el-input v-model="form.bioati" placeholder="稿件标题"></el-input>
            </el-form-item>
            <el-form-item label="描述" size="mini">
              <el-input
                v-model="form.atcDescribe"
                placeholder="描述"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="发布时间" size="mini">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.atcTime"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="atcType" label="分类" size="mini">
              <el-input v-model="form.atcType" placeholder="分类"></el-input>
            </el-form-item>
            <el-form-item prop="atcLabel" label="标签" size="mini">
              <el-input v-model="form.atcLabel" placeholder="标签"></el-input>
            </el-form-item>
            <el-form-item prop="atcBrowse" label="浏览量" size="mini">
              <el-input
                v-model="form.atcBrowse"
                placeholder="浏览量"
              ></el-input>
            </el-form-item>
            <el-form-item prop="atcThumes" label="点赞量" size="mini">
              <el-input
                v-model="form.atcThumes"
                placeholder="点赞量"
              ></el-input>
            </el-form-item>
            <el-form-item prop="actShare" label="分享量" size="mini">
              <el-input v-model="form.actShare" placeholder="分享量"></el-input>
            </el-form-item>
            <el-form-item prop="actSc" label="分享量" size="mini">
              <el-input v-model="form.actSc" placeholder="分享量"></el-input>
            </el-form-item>
            <el-form-item prop="actText" label="内容" size="mini">
              <el-input
                v-model="form.actText"
                placeholder="内容"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button size="mini" @click="viewVisible = false">关闭</el-button>
          </span>
        </el-dialog>
      </div>
    </el-tab-pane>
    <!-- 审核稿件 -->
    <el-dialog title="审核专栏" :visible.sync="ReVisible" width="300px" center>
      <div align="center">是否通过审核？</div>
      <span slot="footer">
        <el-button size="mini" @click="ReVisible = false">取消</el-button>
        <el-button size="mini" @click="actRe">确定</el-button>
      </span>
    </el-dialog>

    <el-tab-pane label="视频管理" name="video">
      <div class="table">
        <div class="container">
          <div class="handle-box">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              round
              @click="delAllVideo"
            >
              批量删除
            </el-button>
            <el-input
              v-model="select_word1"
              size="mini"
              placeholder="请输入视频标题"
              class="handle-input"
              ><i
                class="el-icon-search el-input__icon"
                slot="suffix"
                style="color: #f7a7a7"
              >
              </i
            ></el-input>
          </div>
        </div>

        <!-- 显示数据 -->
        <el-table
          size="mini"
          border
          style="width:100%"
          height="680px"
          :data="data1"
          @selection-change="handleSelectionChange1"
        >
          <el-table-column type="selection" width="40"> </el-table-column>
          <el-table-column
            prop="userName"
            label="作者昵称"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="videoTitle"
            label="标题"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column label="封面" width="110" align="center">
            <template slot-scope="scope">
              <div class="video-img">
                <img :src="getUrl(scope.row.pic)" style="width:100%" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="审核状态" width="150" align="center">
            <template slot-scope="scope">
              <span
                :style="{
                  color: actiColor
                }"
                v-if="scope.row.videoReview == 0"
              >
                {{ changeReview(scope.row.videoReview) }}
              </span>
              <span
                :style="{
                  color: actColor
                }"
                v-if="scope.row.videoReview == 1"
              >
                {{ changeReview(scope.row.videoReview) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="videoDes"
            label="描述"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column label="发布时间" width="150" align="center">
            <template slot-scope="scope">{{
              attachDate(scope.row.videoTime)
            }}</template>
          </el-table-column>
          <el-table-column label="内容" align="center">
            <template slot-scope="scope">
              <a :href="attachImageUrl(scope.row.videoFile)" target="_blank">
                {{ scope.row.videoFile }}
              </a>
              <!-- <p style="height:100px;">{{ scope.row.videoFile }}</p> -->
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit1(scope.row)"
                >查看</el-button
              >
              <el-button
                size="mini"
                type="success"
                @click="handleReview1(scope.row.id)"
                >通过</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 添加分页组件 -->
        <div class="pagination">
          <el-pagination
            background
            layout="total,prev,pager,next"
            :current-page="currentPage1"
            :page-size="pageSize1"
            :total="tableData1.length"
            @current-change="handleCurrentChange1"
          ></el-pagination>
        </div>

        <!-- 查看 -->
        <el-dialog
          title="详细信息"
          :visible.sync="viewVisible1"
          width="400px"
          center
        >
          <el-form :model="form1" ref="form1" label-width="80px">
            <el-form-item prop="userName" label="作者昵称" size="mini">
              <el-input
                v-model="form1.userName"
                placeholder="作者昵称"
              ></el-input>
            </el-form-item>
            <el-form-item prop="videoTitle" label="稿件标题" size="mini">
              <el-input
                v-model="form1.videoTitle"
                placeholder="稿件标题"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述" size="mini">
              <el-input
                v-model="form1.videoDes"
                placeholder="描述"
                type="textarea"
              ></el-input>
            </el-form-item>
            <el-form-item label="发布时间" size="mini">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form1.videoTime"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
            <el-form-item prop="videoType" label="分类" size="mini">
              <el-input v-model="form1.videoType" placeholder="分类"></el-input>
            </el-form-item>
            <el-form-item prop="videoLabel" label="标签" size="mini">
              <el-input
                v-model="form1.videoLabel"
                placeholder="标签"
              ></el-input>
            </el-form-item>
            <el-form-item prop="videoBrowse" label="浏览量" size="mini">
              <el-input
                v-model="form1.videoBrowse"
                placeholder="浏览量"
              ></el-input>
            </el-form-item>
            <el-form-item prop="videoThumes" label="点赞量" size="mini">
              <el-input
                v-model="form1.videoThumes"
                placeholder="点赞量"
              ></el-input>
            </el-form-item>
            <el-form-item prop="videoShare" label="分享量" size="mini">
              <el-input
                v-model="form1.videoShare"
                placeholder="分享量"
              ></el-input>
            </el-form-item>
            <el-form-item prop="videoSc" label="收藏量" size="mini">
              <el-input v-model="form1.videoSc" placeholder="收藏量"></el-input>
            </el-form-item>
            <el-form-item prop="videoFile" label="内容" size="mini">
              <el-input
                v-model="form1.videoFile"
                placeholder="内容"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button size="mini" @click="viewVisible1 = false"
              >关闭</el-button
            >
          </span>
        </el-dialog>
      </div> </el-tab-pane
    ><!-- 审核稿件 -->
    <el-dialog title="审核视频" :visible.sync="ReVisible1" width="300px" center>
      <div align="center">是否通过审核？</div>
      <span slot="footer">
        <el-button size="mini" @click="ReVisible1 = false">取消</el-button>
        <el-button size="mini" @click="videoRe">确定</el-button>
      </span>
    </el-dialog>
  </el-tabs>
</template>

<script>
import {
  getAllArticles,
  delArticle,
  getAllVideos,
  delVideo,
  getUserOfId,
  shenHeVideo,
  shenHeArticle
} from "../../api/index";
import { mixin } from "../../mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      activeName: "article",
      actColor: "green",
      actiColor: "red",
      viewVisible: false, //查看弹窗是否显示
      delVisible: false, //删除弹窗是否显示
      viewVisible1: false, //查看弹窗是否显示
      delVisible1: false, //删除弹窗是否显示
      ReVisible: false, //审核
      ReVisible1: false, //审核
      form: {
        //查看框
        id: "",
        useId: "",
        userName: "",
        bioati: "",
        atcDescribe: "",
        atcTime: "",
        atcType: "",
        atcLabel: "",
        atcBrowse: "",
        atcThumes: "",
        actShare: "",
        actSc: "",
        actText: "",
        actReview: "0"
      },
      form1: {
        //查看框
        id: "",
        useId: "",
        userName: "",
        videoTitle: "",
        videoDes: "",
        videoTime: "",
        videoType: "",
        videoLabel: "",
        videoBrowse: "",
        videoThumes: "",
        videoShare: "",
        videoSc: "",
        videoFile: "",
        videoReview: "0"
      },
      tableData: [],
      tempData: [],

      tableData1: [],
      tempData1: [],

      select_word: "",
      select_word1: "",

      pageSize: 5, //分页的每页大小
      currentPage: 1, //当前页
      idx: -1, //当前选择项

      pageSize1: 5, //分页的每页大小
      currentPage1: 1, //当前页
      idx1: -1, //当前选择项

      multipleSelection: [], //多选项
      multipleSelection1: [] //多选项
    };
  },
  computed: {
    //计算当前搜索结果表里的数据
    data() {
      //根据分页计算
      return this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    data1() {
      //根据分页计算
      return this.tableData1.slice(
        (this.currentPage1 - 1) * this.pageSize1,
        this.currentPage1 * this.pageSize1
      );
    }
  },
  watch: {
    //搜索框里面的内容发生变化的时候，搜索结果table列表的内容跟着它的内容发生变化
    select_word: function() {
      if (this.select_word == "") {
        this.tableData = this.tempData;
      } else {
        this.tableData = [];
        for (let item of this.tempData) {
          if (item.bioati.includes(this.select_word)) {
            this.tableData.push(item);
          }
        }
      }
    },
    select_word1: function() {
      if (this.select_word1 == "") {
        this.tableData1 = this.tempData1;
      } else {
        this.tableData1 = [];
        for (let item of this.tempData1) {
          if (item.videoTitle.includes(this.select_word1)) {
            this.tableData1.push(item);
          }
        }
      }
    }
  },
  created() {
    this.getDate();
    this.getDate1();
  },

  methods: {
    //获取审核状态中文
    changeReview(value) {
      if (value == 0) {
        return "未通过";
      }
      if (value == 1) {
        return "已通过";
      }
      return value;
    },
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //获取当前页
    handleCurrentChange1(val) {
      this.currentPage1 = val;
    },

    //查询所有稿件
    getDate() {
      this.tempData = [];
      this.tableData = [];
      getAllArticles().then(res => {
        for (let item of res) {
          this.getUsers(item.useId, item); //获取用户名，连同本对象一起放到tempDate和tableDate里面
        }
        this.currentPage = 1;
      });
    },

    //查询所有视频
    getDate1() {
      this.tempData1 = [];
      this.tableData1 = [];
      getAllVideos().then(res => {
        for (let item of res) {
          this.getUsers1(item.useId, item); //获取用户名，连同本对象一起放到tempDate和tableDate里面
        }
        this.currentPage1 = 1;
      });
    },

    //弹出查看页面
    handleEdit(row) {
      (this.viewVisible = true),
        (this.form = {
          id: row.id,
          useId: row.useId,
          userName: row.userName,
          bioati: row.bioati,
          atcDescribe: row.atcDescribe,
          atcTime: row.atcTime,
          atcType: row.atcType,
          atcLabel: row.atcLabel,
          atcBrowse: row.atcBrowse,
          atcThumes: row.atcThumes,
          actShare: row.actShare,
          actText: row.actText,
          actReview: row.actReview
        });
    },

    //弹出查看页面
    handleEdit1(row) {
      (this.viewVisible1 = true),
        (this.form1 = {
          userName: row.userName,
          videoTitle: row.videoTitle,
          videoDes: row.videoDes,
          videoTime: row.videoTime,
          videoType: row.videoType,
          videoLabel: row.videoLabel,
          videoBrowse: row.videoBrowse,
          videoThumes: row.videoThumes,
          videoShare: row.videoShare,
          videoFile: row.videoFile,
          videoReview: row.videoReview
        });
    },

    //专栏审核通过
    actRe() {
      let params = new URLSearchParams();
      //   this.form.actReview = !this.form.actReview;
      params.append("id", this.idx);
      params.append("actReview", "1");

      shenHeArticle(params)
        .then(res => {
          if (res.code == 1) {
            this.getDate();
            this.$message({
              showClose: true,
              message: "审核通过",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "审核失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.ReVisible = false;
    },
    //视频审核通过
    videoRe() {
      let params = new URLSearchParams();
      // this.form1.videoReview = 1;
      // this.form.actReview = !this.form.actReview;
      params.append("id", this.idx1);
      params.append("videoReview", "1");

      shenHeVideo(params)
        .then(res => {
          if (res.code == 1) {
            this.getDate1();
            this.$message({
              showClose: true,
              message: "审核通过",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "审核失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.ReVisible1 = false;
    },

    //获取用户名，连同本对象一起放到tempDate和tableDate里面
    getUsers(useId, item) {
      getUserOfId(useId)
        .then(res => {
          let o = item;
          o.userName = res.userName;
          this.tempData.push(o);
          this.tableData.push(o);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取用户名，连同本对象一起放到tempDate和tableDate里面
    getUsers1(useId, item) {
      getUserOfId(useId)
        .then(res => {
          let o = item;
          o.userName = res.userName;
          this.tempData1.push(o);
          this.tableData1.push(o);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //单项删除
    deleteRow() {
      delArticle(this.idx)
        .then(res => {
          if (res) {
            this.getDate();
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.delVisible = false;
    },
    //单项删除
    deleteRow1() {
      delVideo(this.idx1)
        .then(res => {
          if (res) {
            this.getDate1();
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.delVisible1 = false;
    }
  }
};
</script>
<style scoped>
.handle-box {
  margin-bottom: 7px;
}
.shop-img {
  width: 100%;
  height: 70px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}
.handle-input {
  width: 250px;
  border-radius: 30px;
  margin-left: 40%;
  display: inline-block;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>