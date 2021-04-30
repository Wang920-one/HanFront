<template>
  <div id="uesrtext">
    <textarea
      placeholder="按 Ctrl + Enter 发送"
      v-model="content"
      v-on:keyup="addMessage"
    ></textarea>

    <el-button
      style="background-color:#f7a7a7;color:#ffffff"
      icon="iconfont icon-shouye1"
      circle
      @click="addMessage()"
    >点击发送</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";
import { setMessage } from "../../api/index";
export default {
  name: "uesrtext",
  mixins: [mixin],
  data() {
    return {
      content: "",
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
  methods: {
    addMessage(e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        let params = new URLSearchParams();
        params.append("userId", this.id);
        params.append("friendId", this.currentSessionId);
        params.append("senderId", this.id);
        params.append("receiverId", this.currentSessionId);
        params.append("content", this.content);
        setMessage(params).then((res) => {
          if (res.code == 1) {
            this.$store.commit("setSessions", []);
            this.getFriendList();
            this.$message({
              showClose: true,
              message: "信息发送成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "信息发送失败",
              type: "error",
            });
          }
        });
        this.content = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#uesrtext {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #ddd;
  > textarea {
    padding: 10px;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
  }
}
</style>
