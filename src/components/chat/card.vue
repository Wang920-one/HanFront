<template>
  <div id="card">
    <header>
      <img
        class="avatar"
        v-bind:src="attachImageUrl(this.user.userImage)"
        v-bind:alt="this.user.userName"
      />
      <p class="name">{{ this.user.userName }}</p>
    </header>
    <footer>
      <input
        class="search"
        type="text"
        v-model="$store.state.filterKey"
        placeholder="search user..."
      />
    </footer>
  </div>
</template>

<script>
import { getUserOfId } from "../../api/index";
import { mapGetters } from "vuex";
import { mixin } from "../../mixins";
export default {
  name: "card",
  mixins: [mixin],
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.userOfId();
  },
  computed: {
    ...mapGetters(["id", "loginIn", "userImage", "userName"])
  },
  methods: {
    //查询用户信息
    userOfId() {
      this.user = {};
      getUserOfId(this.id).then(res => {
        this.user = res;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#card {
  padding: 12px;
  .avatar {
    width: 40px;
    height: 40px;
    vertical-align: middle; /*这个是图片和文字居中对齐*/
  }
  .name {
    display: inline-block;
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
  }
  .search {
    background: #26292e;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid #3a3a3a;
    border-radius: 4px;
    outline: none; /*鼠标点击后不会出现蓝色边框*/
    color: #fff;
  }
}
</style>
