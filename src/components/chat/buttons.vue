<template>
  <div id="buttons">
    <el-tooltip
      content="删除聊天记录"
      placement="bottom"
      effect="light"
    >
      <el-button
        class="del"
        icon="el-icon-delete"
        @click="delVisible = true"
      ></el-button>
    </el-tooltip>
    <!-- 删除聊天记录 -->
    <el-dialog
      title="删除聊天记录"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div align="center">删除后恢复不了了，是否确定删除</div>
      <span slot="footer">
        <el-button
          size="mini"
          @click="delVisible = false"
        >取消</el-button>
        <el-button
          size="mini"
          @click="delRecord"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";
import { delFriendRecord } from "../../api/index";
export default {
  name: "buttons",
  mixins: [mixin],
  data() {
    return {
      content: "",
      delVisible: false,
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
    //删除和当前用户的聊天记录
    delRecord() {
      delFriendRecord(this.id, this.currentSessionId)
        .then((res) => {
          if (res) {
            this.$store.commit("setSessions", []);
            this.getFriendList();
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "删除失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.delVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#buttons {
  position: absolute;
  bottom: 28%;
  right: 0;
  width: 100%;
  height: 60px;
  border-top: solid 1px #ddd;
  .del {
    float: right;
    background-color: #ffffff;
    margin-top: 1px;
    margin-right: 20px;
    border: 1px solid #ffffff00;
    color: #409eff;
  }
}
</style>
