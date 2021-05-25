<template>
  <div
    id="message"
    v-scroll-bottom="this.sessions"
  >
    <ul
      v-for="(item,index) in this.sessions"
      :key="index"
      v-show="currentSessionId == item.friendId"
    >
      <li>
        <p class="time">
          <span>{{ item.sendTime }}</span>
        </p>
        <div
          class="main"
          :class="{ self: item.senderId == id }"
        >
          <img
            class="avatar"
            :src="(item.userId != item.senderId) ? attachImageUrl(item.userImage) : attachImageUrl(userImage)"
            alt=""
          />
          <p class="text">{{ item.content }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";
import { getUserOfId } from "../../api/index";

export default {
  name: "message",
  mixins: [mixin],
  data() {
    return {
      user: [],
      img: "../src/assets/images/1.jpg",
    };
  },
  computed: {
    ...mapGetters([
      "loginIn", //用户是否登录
      "currentSessionId", //当前对话框的好友id
      "id", //当前登录用户id
      "sessions", //聊天记录
      "userImage", //用户头像
    ]),
  },
  mounted() {
    this.getImage();
  },
  created() {
    // 每5秒刷新一次
    this.timer = setInterval(() => {
      // location.reload();
    }, 1000 * 5);
  },
  methods: {
    //获取好友的头像信息
    getImage() {
      if (this.currentSessionId != null) {
        getUserOfId(this.currentSessionId)
          .then((res) => {
            this.user = res;
          })
          .catch((err) => {
            this.$message({
              showClose: true,
              message: "头像信息获取失败",
              type: "error",
            });
          });
      }
    },
  },
  directives: {
    /*这个是vue的自定义指令,官方文档有详细说明*/
    // 发送消息后滚动到底部,未找到合理的方法解决，暂用setTimeout的方法模拟
    "scroll-bottom"(el) {
      //console.log(el.scrollTop);
      setTimeout(function () {
        el.scrollTop += 10000;
      }, 0.1);
    },
  },
};
</script>

<style lang="scss" scoped>
#message {
  padding: 15px;
  max-height: 60%;
  overflow-y: scroll;
  ul {
    list-style-type: none;
    padding-left: 0px;
    li {
      margin-bottom: 15px;
    }
  }
  .time {
    text-align: center;
    margin: 7px 0;
    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: rgb(0, 0, 0);
      background-color: #ffffff75;
      border-radius: 2px;
    }
  }
  .main {
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }
    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #fafafa;
      border-radius: 4px;
      line-height: 30px;
    }
  }
  .self {
    text-align: right;
    .avatar {
      float: right;
      margin: 0 0 0 10px;
      border-radius: 3px;
      width: 30px;
      height: 30px;
    }
    .text {
      display: inline-block;
      padding: 0 10px;
      max-width: 80%;
      background-color: #b2e281;
      border-radius: 4px;
      line-height: 30px;
    }
  }
}
</style>
