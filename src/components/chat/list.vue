<template>
  <div id="list">
    <ul style="padding-left:0px">
      <li
        v-for="(item,index) in users"
        :key="index"
        :class="{ active: item.friendId === currentSessionId }"
        v-on:click="changeCurrentSessionId(item.friendId)"
      >
        <!--   :class="[item.id === currentSessionId ? 'active':'']" -->
        <img
          class="avatar"
          :src="attachImageUrl(item.userImage)"
          :alt="item.userName"
        />
        <p class="name">{{ item.userName }}</p>
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
  getFriendRecord,
} from "../../api/index";

export default {
  name: "list",
  mixins: [mixin],
  data() {
    return {
      users: [],
      friendsessions: [],
    };
  },
  created() {
    this.getMessageList(this.id);
  },
  computed: {
    ...mapGetters([
      "loginIn", //用户是否登录
      "currentSessionId", //当前对话框的好友id
      "sessions", //聊天记录
      "id", //当前登录用户id
    ]),
  },
  methods: {
    //获取用户的信息列表
    getMessageList(userId) {
      getMessageOfUser(userId)
        .then((res) => {
          for (let item of res) {
            this.getUsers(item.friendId, item);
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
    //通过id查询用户信息
    getUsers(useId, item) {
      getUserOfId(useId)
        .then((res) => {
          let o = item;
          o.userName = res.userName;
          o.userImage = res.userImage;
          this.users.push(o);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changeCurrentSessionId: function (id) {
      this.$store.commit("setCurrentSessionId", id);
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
}
</style>
