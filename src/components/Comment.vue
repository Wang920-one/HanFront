<template>
  <div>
    <div class="comment">
      <h2>评论</h2>
      <div class="comment-msg">
        <div class="comment-img">
          <img
            style="width: 100%;border-radius: 50%;"
            :src="attachImageUrl(userImage)"
          />
        </div>
        <el-input
          class="comment-input"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea"
        ></el-input
        ><el-button type="primary" round class="sub-btn" @click="postComment"
          >评论</el-button
        >
      </div>
    </div>
    <p style="margin-left:10%">精彩评论：共{{ commentList.length }}条评论</p>
    <ul class="popular" v-for="(item, index) in commentList" :key="index">
      <li>
        <div class="popular-img">
          <img
            style="width: 100%;border-radius: 50%;"
            :src="attachImageUrl(userImgs[index])"
          />
        </div>
        <div class="popular-msg">
          <ul>
            <li class="name">{{ userNames[index] }}</li>
            <li class="time">{{ item.comtTime }}</li>
            <li class="content">{{ item.comtContent }}</li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { mixin } from "../mixins";
import { mapGetters } from "vuex";
import { setComment, setLike, getUserOfId, getAllComment } from "../api/index";
export default {
  //   mixins: [mixin],
  name: "comment",
  props: [
    "playId", //视频或者专栏id
    "type" //0视频1专栏
  ],

  computed: {
    ...mapGetters([
      //   "atcId", //专栏id
      //   "videoId", //视频id
    //   "id", //专栏或者视频id
      "loginIn", //是否登录
      "id", //当前登录用户userId
      "userImage" //当前登录用户头像
    ])
  },
  data() {
    return {
      textarea: "", //输入的评论内容
      commentList: [], //存放评论列表
      userImgs: [], //用户头像
      userNames: [] //用户昵称
    };
  },
  mounted() {
    this.getComment();
  },
  methods: {
    //获取图片地址
    attachImageUrl(srcurl) {
      return srcurl
        ? this.$store.state.HOST + srcurl
        : this.$store.state.HOST + "/img/defualt/user.png";
    },
    //提交评论
    postComment() {
      if (this.loginIn) {
        let params = new URLSearchParams();
        if (this.type == 0) {
          params.append("videoid", this.playId);
        } else {
          params.append("articleid", this.playId);
        }
        params.append("useId", this.id);
        params.append("type", this.type);
        params.append("comtContent", this.textarea);
        setComment(params)
          .then(res => {
            if (res.code == 1) {
              this.$message({
                showClose: true,
                message: "评论成功",
                type: "success"
              });
              this.textarea = "";
              this.getComment();
            } else {
              this.$message({
                showClose: true,
                message: "评论失败",
                type: "error"
              });
            }
          })
          .catch(err => {
            this.$message({
              showClose: true,
              message: "评论失败",
              type: "error"
            });
          });
      } else {
        this.$message({
          showClose: true,
          message: "请先登录",
          type: "error"
        });
      }
    },
    //获取用户的头像和昵称
    getUsers(id) {
      getUserOfId(id)
        .then(res => {
          this.userImgs.push(res.userImage);
          this.userNames.push(res.userName);
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "评论加载失败",
            type: "error"
          });
        });
    },
    //评论列表
    getComment() {
      getAllComment(this.type, this.playId)
        .then(res => {
          this.commentList = res;
          for (let i of res) {
            this.getUsers(i.useId);
          }
        })
        .catch(err => {
          this.$message({
            showClose: true,
            message: "评论加载失败",
            type: "error"
          });
        });
    }
  }
};
</script>
<style scoped>
.comment,
.popular {
  width: 80%;
  margin-left: 10%;
}
.sub-btn {
  /* margin-top: 10px; */
  margin-left: 5%;
  background-color: #f7a7a7;
  color: #ffffff;
  border-color: #ffffff;
}
.sub-btn:hover {
  /* margin-top: 10px; */
  background-color: #f56c6c;
}
.comment-msg {
  display: flex;
}
.comment-input {
  margin-left: 10px;
  width: 80%;
  /* flex: 1; */
}
.comment-img {
  width: 70px;
}
.comment h2 {
  margin-bottom: 20px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(0, 0, 0);
}

.popular li {
  border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  padding:10px 0;
  display: flex;
}
.popular-img {
  width: 50px;
}
.popular-msg {
  padding: 0 20px;
  flex: 1;
}
.popular-msg li {
  width: 100%;
}
.name {
  font-size: 1rem;
}
.time {
  font-size: 0.6rem;
  color: rgba(0, 0, 0, 0.5);
}
.content {
  font-size: 1rem;
}
</style>
