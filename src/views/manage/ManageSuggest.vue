<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          round
          @click="delAll"
        >
          批量删除
        </el-button>
        <el-input
          v-model="select_word"
          size="mini"
          placeholder="请输入建议标题"
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
        prop="useId"
        label="用户编号"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户昵称"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="sugTitle"
        label="投诉建议标题"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column label="投诉建议时间" width="150" align="center">
        <template slot-scope="scope">{{
          attachDate(scope.row.sugTime)
        }}</template>
      </el-table-column>
      <el-table-column label="投诉建议内容" align="center">
        <template slot-scope="scope">
          <p style="height:100px;">{{ scope.row.sugDetail }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.shopId)"
            >删除</el-button
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
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 删除投诉建议 -->
    <el-dialog
      title="删除投诉建议"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div align="center">删除后恢复不了了，是否确定删除</div>
      <span slot="footer">
        <el-button size="mini" @click="delVisible = false">取消</el-button>
        <el-button size="mini" @click="deleteRow">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllSuggest, delSuggest, getUserOfId } from "../../api/index";
import { mixin } from "../../mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      delVisible: false, //删除弹窗是否显示
      tableData: [],
      tempData: [],
      select_word: "",
      pageSize: 5, //分页的每页大小
      currentPage: 1, //当前页
      idx: -1, //当前选择项
      multipleSelection: [] //多选项
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
          if (item.sugTitle.includes(this.select_word)) {
            this.tableData.push(item);
          }
        }
      }
    }
  },
  created() {
    this.getDate();
  },

  methods: {
    //获取当前页
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    //查询所有投诉建议
    getDate() {
      this.tempData = [];
      this.tableData = [];
      getAllSuggest().then(res => {
        // this.tempData = res;
        // this.tableData = res;
        for (let item of res) {
          this.getUsers(item.useId, item); //获取用户名，连同本对象一起放到tempDate和tableDate里面
        }
        this.currentPage = 1;
      });
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

    //单项删除
    deleteRow() {
      delSuggest(this.idx)
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