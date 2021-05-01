<template>
  <div id="list">
    <ul style="padding-left:0px">
      <li
        v-for="(item,index) in users"
        :key="index"
        :class="{ active: item.friendId === currentSessionId }"
        v-on:click="changeCurrentSessionId(item)"
      >
        <img
          class="avatar"
          :src="attachImageUrl(item.userImage)"
          :alt="item.userName"
        />
        <p class="name">{{ item.userName }}</p>
        <el-badge
          :hidden="item.unread==0"
          :value="item.unread"
          class="item"
        ></el-badge>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";
import {
  getMessageOfUser,
  getUserOfId,
  getFriendUnRead,
  updateStatus,
} from "../../api/index";

export default {
  name: "list",
  mixins: [mixin],
  data() {
    return {
      index: 0,
      hideBadge: true,
      friendrecord: [], //好友未读消息数
      users: [],
      friendsessions: [],
      timer: null, // 定时器
    };
  },
  created() {
    this.getMessageList(this.id);
    // 每10秒刷新一次
    this.timer = setInterval(() => {
      this.users = [];
      this.getMessageList(this.id);
      this.index += 1;
    }, 1000 * 10);
  },
  mounted() {},
  computed: {
    ...mapGetters([
      "loginIn", //用户是否登录
      "currentSessionId", //当前对话框的好友id
      "sessions", //聊天记录
      "id", //当前登录用户id
    ]),
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    //获取该好友未读信息的数量
    getFUnReadList(senderId, receiverId, friendId, item) {
      getFriendUnRead(senderId, receiverId, friendId)
        .then((res) => {
          this.friendrecord = res;
          let i = item;
          item.unread = this.friendrecord.length;
          getUserOfId(friendId).then((res) => {
            i.userName = res.userName;
            i.userImage = res.userImage;
            this.users.push(i);
          });
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "未读信息数量获取失败",
            type: "error",
          });
        });
    },
    //获取用户的信息列表
    getMessageList(userId) {
      getMessageOfUser(userId)
        .then((res) => {
          for (let item of res) {
            this.getFUnReadList(item.friendId, userId, item.friendId, item);
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "信息列表加载失败",
            type: "error",
          });
        });
    },
    changeCurrentSessionId: function (item) {
      this.$store.commit("setCurrentSessionId", item.friendId);
      let params = new URLSearchParams();
      //   this.form.actReview = !this.form.actReview;
      params.append("senderId", item.friendId);
      params.append("receiverId", item.userId);
      params.append("status", "2");
      updateStatus(params)
        .then((res) => {
          if (res.code == 1) {
          } else {
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.$store.commit("setSessions", []);
      this.getFriendList();
    },
  },
};
</script>

<style lang="scss" scoped>
#list {
  li {
    padding: 0px 15px;
    border-bottom: 1px solid #292c33;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.03);
    }
  }
  li.active {
    /*注意这个是.不是冒号:*/
    background-color: rgba(255, 255, 255, 0.25);
  }
  .avatar {
    border-radius: 2px;
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
  .name {
    display: inline-block;
    margin-left: 15px;
  }
  .item {
    float: right;
    margin-top: 15px;
  }
}
</style>
