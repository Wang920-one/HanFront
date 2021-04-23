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
          placeholder="请输入店铺名称"
          class="handle-input"
          ><i
            class="el-icon-search el-input__icon"
            slot="suffix"
            style="color: #f7a7a7"
          >
          </i
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          style="float:right"
          round
          @click="centerDialogVisible = true"
        >
          添加店铺
        </el-button>
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
        prop="shopName"
        label="店铺名称"
        width="150"
        align="center"
      >
      </el-table-column>
      <el-table-column label="店铺图片" width="110" align="center">
        <template slot-scope="scope">
          <div class="shop-img">
            <img :src="getUrl(scope.row.pic)" style="width:100%" />
          </div>
          <el-upload
            :action="uploadUrl(scope.row.shopId)"
            :before-upload="beforeImgUpload"
            :on-success="handleImgSuccess"
          >
            <el-button size="mini" round>更新图片</el-button>
          </el-upload>
        </template>
      </el-table-column>

      <el-table-column label="店铺认证时间" width="150" align="center">
        <template slot-scope="scope">{{
          attachDate(scope.row.shopYear)
        }}</template>
      </el-table-column>
      <el-table-column
        prop="shopFans"
        label="店铺粉丝量"
        width="150"
        align="center"
      ></el-table-column>
      <el-table-column label="店铺链接" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.shopHttp" target="_blank">
            {{ scope.row.shopHttp }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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

    <!-- 添加店铺 -->
    <el-dialog
      title="添加店铺"
      :visible.sync="centerDialogVisible"
      width="400px"
      center
    >
      <el-form :model="registerForm" ref="registerForm" label-width="80px">
        <el-form-item prop="shopName" label="店铺名称" size="mini">
          <el-input
            v-model="registerForm.shopName"
            placeholder="店铺名称"
          ></el-input>
        </el-form-item>
        <el-form-item prop="shopHttp" label="店铺链接" size="mini">
          <el-input
            v-model="registerForm.shopHttp"
            placeholder="店铺链接"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item prop="shopYear" label="店铺认证时间" size="mini">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="registerForm.shopYear"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="shopFans" label="店铺粉丝量" size="mini">
          <el-input
            v-model="registerForm.shopFans"
            placeholder="店铺粉丝量"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="centerDialogVisible = false"
          >取消</el-button
        >
        <el-button size="mini" @click="addShop">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改店铺 -->
    <el-dialog
      title="修改店铺信息"
      :visible.sync="editVisible"
      width="400px"
      center
    >
      <el-form :model="form" ref="form" label-width="80px">
        <el-form-item prop="shopName" label="店铺名称" size="mini">
          <el-input v-model="form.shopName" placeholder="店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="店铺链接" size="mini">
          <el-input
            v-model="form.shopHttp"
            placeholder="店铺链接"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺认证时间" size="mini">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.shopYear"
            style="width:100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="shopFans" label="店铺粉丝量" size="mini">
          <el-input v-model="form.shopFans" placeholder="店铺粉丝量"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="editVisible = false">取消</el-button>
        <el-button size="mini" @click="editShop">确定</el-button>
      </span>
    </el-dialog>

    <!-- 删除店铺 -->
    <el-dialog title="删除店铺" :visible.sync="delVisible" width="300px" center>
      <div align="center">删除后恢复不了了，是否确定删除</div>
      <span slot="footer">
        <el-button size="mini" @click="delVisible = false">取消</el-button>
        <el-button size="mini" @click="deleteRow">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllShop, setShop, updateShop, delShop } from "../api/index";
import { mixin } from "../mixins";
export default {
  mixins: [mixin],
  data() {
    return {
      centerDialogVisible: false, //添加弹窗是否显示
      editVisible: false, //编辑弹窗是否显示
      delVisible: false, //删除弹窗是否显示
      registerForm: {
        //添加框
        shopName: "",
        shopHttp: "",
        shopYear: "",
        shopFans: ""
      },
      form: {
        //编辑框
        shopId: "",
        shopName: "",
        shopHttp: "",
        shopYear: "",
        shopFans: ""
      },
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
          if (item.shopName.includes(this.select_word)) {
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

    //查询所有店铺
    getDate() {
      this.tempData = [];
      this.tableData = [];
      getAllShop().then(res => {
        this.tempData = res;
        this.tableData = res;
        this.currentPage = 1;
      });
    },

    //添加店铺
    addShop() {
      let d = this.registerForm.shopYear;
      let datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      let params = new URLSearchParams();
      params.append("shopName", this.registerForm.shopName);
      params.append("shopHttp", this.registerForm.shopHttp);
      params.append("pic", "/img/defualt/shop.png");
      params.append("shopYear", datetime);
      params.append("shopFans", this.registerForm.shopFans);

      setShop(params)
        .then(res => {
          if (res.code == 1) {
            this.getDate();
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "添加失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.centerDialogVisible = false;
    //   location.reload(); //刷新当前页面，解决添加表单不清空数据的问题
    },

    //弹出编辑页面
    handleEdit(row) {
      (this.editVisible = true),
        (this.form = {
          shopId: row.shopId,
          shopName: row.shopName,
          shopHttp: row.shopHttp,
          shopYear: row.shopYear,
          shopFans: row.shopFans
        });
    },

    //保存编辑页面的数据
    editShop() {
      let d = new Date(this.form.shopYear);
      let datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      let params = new URLSearchParams();
      params.append("shopId", this.form.shopId);
      params.append("shopName", this.form.shopName);
      params.append("shopHttp", this.form.shopHttp);
      params.append("shopYear", datetime);
      params.append("shopFans", this.form.shopFans);

      updateShop(params)
        .then(res => {
          if (res.code == 1) {
            this.getDate();
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: "修改失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.editVisible = false;
    },
    //更新图片
    uploadUrl(shopId) {
      return `${this.$store.state.HOST}/shop/updateShopImage?shopId=${shopId}`;
    },
    //单项删除
    deleteRow() {
      delShop(this.idx)
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