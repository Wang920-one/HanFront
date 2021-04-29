<template>
  <div>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="5">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ userCount }}</div>
              <div>用户总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ articleCount + videoCount }}</div>
              <div>稿件总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ shopCount }}</div>
              <div>店铺总数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ activeCount }}</div>
              <div>活动数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <div class="grid-content">
            <div class="grid-cont-center">
              <div class="grid-num">{{ suggestCount }}</div>
              <div>投诉建议数量</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3 class="mgb20">稿件通过比例</h3>
        <div style="background-color:white">
          <ve-pie :data="atcRev" :theme="options"></ve-pie>
        </div>
      </el-col>
      <!-- <el-col :span="12">
        <h3 class="mgb20">用户性别比例</h3>
        <div style="background-color:white">
          <ve-pie :data="userSex" :theme="options"></ve-pie>
        </div>
      </el-col> -->
      <el-col :span="12">
        <h3 class="mgb20">稿件类型分类</h3>
        <div style="background-color:white">
          <ve-histogram :data="articleType"></ve-histogram>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mgb20">
      <el-col :span="12">
        <h3 class="mgb20">稿件浏览量</h3>
        <div style="background-color:white">
          <ve-histogram :data="activeType"></ve-histogram>
        </div>
      </el-col>
      <el-col :span="12">
        <h3 class="mgb20">活动类型分类</h3>
        <div style="background-color:white">
          <ve-histogram :data="activeType"></ve-histogram>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getAllUser,
  getAllShop,
  getAllActive,
  getAllSuggest,
  getAllArticle,
  getAllVideo
} from "../api/index";
export default {
  data() {
    return {
      src: "",
      userCount: 0, //用户总数
      articleCount: 0, //稿件总数
      videoCount: 0, //稿件总数
      shopCount: 0, //店铺数量
      activeCount: 0, //活动数量
      suggestCount: 0, //投诉建议

      user: [], //所有用户
      articles: [], //所有专栏
      video: [], //所有视频
      userSex: {
        //按性别分类的用户数
        columns: ["性别", "总数"],
        rows: [
          { 性别: "男", 总数: 0 },
          { 性别: "女", 总数: 0 },
          { 性别: "不明", 总数: 0 }
        ]
      },
      atcRev: {
        //按审核状态分类的稿件数
        columns: ["审核状态", "总数"],
        rows: [
          { 审核状态: "已通过", 总数: 0 },
          { 审核状态: "未通过", 总数: 0 }
        ]
      },
      options: {
        color: ["#87cefa", "#ffc0cb"]
      },
      //   options1: {
      //     color: ["yellow"]
      //   },
      articleType: {
        //按稿件类型分类
        columns: ["类型", "总数"],
        rows: [
          { 类型: "妆容", 总数: 0 },
          { 类型: "发型", 总数: 0 },
          { 类型: "搭配", 总数: 0 },
          { 类型: "种草", 总数: 0 },
          { 类型: "视频", 总数: 0 },
          { 类型: "专栏", 总数: 0 }
        ]
      },
      activeType: {
        //按活动类型分类
        columns: ["类型", "总数"],
        rows: [
          { 类型: "雅集", 总数: 0 },
          { 类型: "花朝节", 总数: 0 },
          { 类型: "祭祀", 总数: 0 },
          { 类型: "踏青", 总数: 0 },
          { 类型: "赏花", 总数: 0 },
          { 类型: "时装展", 总数: 0 },
          { 类型: "漫展", 总数: 0 },
          { 类型: "祈福", 总数: 0 },
          { 类型: "文化节", 总数: 0 }
        ]
      }
    };
  },
  created() {
    this.src = this.$store.state.configure.HOST;
  },
  mounted() {
    //页面元素加载完之后调用
    this.getUser();
    this.getArticle();
    this.getShop();
    this.getActive();
    this.getSuggest();
  },
  methods: {
    getUser() {
      //用户总数
      getAllUser().then(res => {
        this.users = res;
        this.userCount = res.length;
        this.userSex.rows[0]["总数"] = this.setSex(1, this.users);
        this.userSex.rows[1]["总数"] = this.setSex(0, this.users);
        this.userSex.rows[2]["总数"] = this.setSex(null, this.users);
      });
    },
    setSex(sex, val) {
      //根据性别获取用户数
      let count = 0;
      for (let item of val) {
        if (sex == item.userSex) {
          count++;
        }
      }
      return count;
    },
    getArticle() {
      //稿件总数
      getAllArticle().then(res => {
        this.articles = res;
        this.articleCount = res.length;
        this.articleType.rows[4]["总数"] = res.length;
        for (let item of res) {
          this.getByAtcType(item.atcType);
          this.getByAtcRe(item.atcReview);
        }
      });
      getAllVideo().then(res => {
        this.video = res;
        this.videoCount = res.length;
        this.articleType.rows[5]["总数"] = res.length;
        for (let item of res) {
          this.getByVideoType(item.videoType);
          this.getByAtcRe(item.videoReview);
        }
      });
    },

    getByAtcRe(type) {
      //根据审核状态获取稿件数
      for (let item of this.atcRev.rows) {
        if (type == 0) {
          this.atcRev.rows[1]["总数"]++;
        }
        if (type == 1) {
          this.atcRev.rows[0]["总数"]++;
        }
      }
    },
    getByAtcType(type) {
      //根据类型获取稿件数
      for (let item of this.articleType.rows) {
        if (type.includes(item["类型"])) {
          item["总数"]++;
        }
      }
    },
    getByVideoType(type) {
      //根据类型获取稿件数
      for (let item of this.articleType.rows) {
        if (type.includes(item["类型"])) {
          item["总数"]++;
        }
      }
    },
    getByActiveType(type) {
      //根据类型获取活动数
      for (let item of this.activeType.rows) {
        if (type.includes(item["类型"])) {
          item["总数"]++;
        }
      }
    },

    getShop() {
      //店铺数量
      getAllShop().then(res => {
        this.shopCount = res.length;
      });
    },

    getActive() {
      //活动数量
      getAllActive().then(res => {
        this.activeCount = res.length;
        for (let item of res) {
          this.getByActiveType(item.acForm);
        }
      });
    },

    getSuggest() {
      //投诉建议数量
      getAllSuggest().then(res => {
        this.suggestCount = res.length;
      });
    },
  }
};
</script>

<style scoped>
.grid-content {
  display: flex;
  align-items: center;
  height: 50px;
}

.grid-cont-center {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: darkgray;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}
</style>