<template>
  <div>
    <el-container>
      <el-header style="background-color: #f7a7a7;"
        ><img class="logologin" src="@/assets/images/logo.png" />
        <router-link to="/login">
          <el-button
            type="primary"
            icon="el-icon-user"
            class="shouye"
            style="background-color:#ffffff10;border: lightpink;float: right;margin-top: 10px;"
          ></el-button>
        </router-link>
      </el-header>

      <el-container>
        <el-aside width="12%">
          <el-card class="box-card">
            <div slot="header" class="clearfix" style="text-align:center">
              <span>管理员名称</span>
            </div>
            <div style="text-align:center;margin-bottom: 18px;">
              <ul>
                <li v-for="item in 5" :key="item">
                  <div class="info_type">
                    <span class="iconfont">{{ item }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-card>
        </el-aside>
        <el-main>
          <el-tabs type="border-card">
            <el-tab-pane label="用户管理">
              <el-container>
                <el-header style="text-align:center;">
                  <!-- 搜索框 -->
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  >
                    <i
                      class="el-icon-search el-input__icon"
                      slot="suffix"
                      style="color: #f7a7a7"
                      @click="handleIconClick"
                    >
                    </i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.value }}</div>
                      <span class="addr">{{ item.address }}</span>
                    </template>
                  </el-autocomplete>
                </el-header>
                <el-main>
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                      fixed
                      prop="id"
                      label="用户编号"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="useraccount"
                      label="用户账号"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="username"
                      label="用户昵称"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column prop="sex" label="用户性别" width="120">
                    </el-table-column>
                    <el-table-column prop="email" label="用户邮箱" width="120">
                    </el-table-column>
                    <el-table-column prop="phone" label="用户电话" width="120">
                    </el-table-column>
                    <el-table-column prop="qq" label="用户QQ" width="120">
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="用户地址"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column prop="image" label="用户头像" width="120">
                    </el-table-column>
                    <el-table-column prop="birth" label="用户生日" width="120">
                    </el-table-column>
                    <el-table-column prop="sign" label="个性签名" width="120">
                    </el-table-column>
                    <el-table-column
                      prop="createt"
                      label="创建时间"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="updatet"
                      label="更新时间"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button
                          @click="handleClick(scope.row)"
                          type="text"
                          size="small"
                          >查看</el-button
                        >
                        <el-button type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-tab-pane>

            <el-tab-pane label="稿件管理">
              <el-container>
                <el-header style="text-align:center;">
                  <!-- 搜索框 -->
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  >
                    <i
                      class="el-icon-search el-input__icon"
                      slot="suffix"
                      style="color: #f7a7a7"
                      @click="handleIconClick"
                    >
                    </i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.value }}</div>
                      <span class="addr">{{ item.address }}</span>
                    </template>
                  </el-autocomplete>
                </el-header>
                <el-main>
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                      fixed
                      prop="id"
                      label="稿件编号"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="useraccount"
                      label="用户账号"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="username"
                      label="用户昵称"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="atcTitle"
                      label="稿件标题"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column prop="atcImg" label="稿件封面" width="120">
                    </el-table-column>
                    <el-table-column
                      prop="atcDescribe"
                      label="稿件描述"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="atcType"
                      label="稿件分类"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="atcLabel"
                      label="稿件标签"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="atcTime"
                      label="发布时间"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="atcBrowse"
                      label="浏览量"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="atcThumbs"
                      label="点赞量"
                      width="120"
                    >
                    </el-table-column>
                    <el-table-column prop="atcShare" label="分享量" width="120">
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button
                          @click="handleClick(scope.row)"
                          type="text"
                          size="small"
                          >查看</el-button
                        >
                        <el-button type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-tab-pane>

            <el-tab-pane label="投稿管理">
              <el-container>
                <el-header style="text-align:center;">
                  <!-- 搜索框 -->
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  >
                    <i
                      class="el-icon-search el-input__icon"
                      slot="suffix"
                      style="color: #f7a7a7"
                      @click="handleIconClick"
                    >
                    </i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.value }}</div>
                      <span class="addr">{{ item.address }}</span>
                    </template>
                  </el-autocomplete>
                </el-header>
                <el-main>
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                      fixed
                      prop="ctbtid"
                      label="投稿编号"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column prop="atcid" label="稿件编号" width="150">
                    </el-table-column>
                    <el-table-column
                      prop="username"
                      label="用户昵称"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="atctitle"
                      label="稿件标题"
                      width="200"
                    ></el-table-column>
                    <el-table-column
                      prop="atcclass"
                      label="稿件分类"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="atctype"
                      label="稿件标签"
                      width="150"
                    >
                    </el-table-column>

                    <el-table-column
                      prop="atcreview"
                      label="审核状态"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="ctbttime"
                      label="投稿时间"
                      width="150"
                    >
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button
                          @click="handleClick(scope.row)"
                          type="text"
                          size="small"
                          >查看</el-button
                        >
                        <el-button type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-tab-pane>

            <el-tab-pane label="店铺管理">
              <el-container>
                <el-header style="text-align:center;">
                  <!-- 搜索框 -->
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  >
                    <i
                      class="el-icon-search el-input__icon"
                      slot="suffix"
                      style="color: #f7a7a7"
                      @click="handleIconClick"
                    >
                    </i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.value }}</div>
                      <span class="addr">{{ item.address }}</span>
                    </template>
                  </el-autocomplete>
                </el-header>
                <el-main>
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                      fixed
                      prop="shopid"
                      label="店铺编号"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shopName"
                      label="店铺名称"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shopHttp"
                      label="店铺地址"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shopImage"
                      label="店铺封面"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shopFans"
                      label="店铺粉丝"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="shopYear"
                      label="认证时间"
                      width="200"
                    >
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="150">
                      <template slot-scope="scope">
                        <el-button
                          @click="handleClick(scope.row)"
                          type="text"
                          size="small"
                          >查看</el-button
                        >
                        <el-button type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-tab-pane>

            <el-tab-pane label="活动管理">
              <el-container>
                <el-header style="text-align:center;">
                  <!-- 搜索框 -->
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  >
                    <i
                      class="el-icon-search el-input__icon"
                      slot="suffix"
                      style="color: #f7a7a7"
                      @click="handleIconClick"
                    >
                    </i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.value }}</div>
                      <span class="addr">{{ item.address }}</span>
                    </template>
                  </el-autocomplete>
                </el-header>
                <el-main>
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                      fixed
                      prop="actid"
                      label="活动编号"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="actName"
                      label="活动名称"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="actAdress"
                      label="活动地址"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="actTime"
                      label="活动时间"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="actForm"
                      label="活动形式"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="actSponsor"
                      label="活动主办方"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="actDetail"
                      label="活动详情"
                      width="200"
                    >
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="200">
                      <template slot-scope="scope">
                        <el-button
                          @click="handleClick(scope.row)"
                          type="text"
                          size="small"
                          >查看</el-button
                        >
                        <el-button type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-tab-pane>

            <el-tab-pane label="投诉管理">
              <el-container>
                <el-header style="text-align:center;">
                  <!-- 搜索框 -->
                  <el-autocomplete
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入内容"
                    @select="handleSelect"
                  >
                    <i
                      class="el-icon-search el-input__icon"
                      slot="suffix"
                      style="color: #f7a7a7"
                      @click="handleIconClick"
                    >
                    </i>
                    <template slot-scope="{ item }">
                      <div class="name">{{ item.value }}</div>
                      <span class="addr">{{ item.address }}</span>
                    </template>
                  </el-autocomplete>
                </el-header>
                <el-main>
                  <el-table :data="tableData" border style="width: 100%">
                    <el-table-column
                      fixed
                      prop="sugid"
                      label="投诉编号"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column prop="userid" label="用户编号" width="200">
                    </el-table-column>
                    <el-table-column
                      prop="sugTitle"
                      label="投诉标题"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="sugDetaile"
                      label="投诉内容"
                      width="250"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="sugTime"
                      label="投诉时间"
                      width="200"
                    >
                    </el-table-column>

                    <el-table-column fixed="right" label="操作" width="200">
                      <template slot-scope="scope">
                        <el-button
                          @click="handleClick(scope.row)"
                          type="text"
                          size="small"
                          >查看</el-button
                        >
                        <el-button type="text" size="small">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "Manage",
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        ,
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ]
    };
  }
};
</script>
<style scoped>
.el-header {
  /* background-color: #b3c0d1;
  color: #333; */
  /* text-align: center; */
  height: 150px;
  /* background-color: #f7a7a7; */
  /* color: #f7a7a7; */
  /* margin-top: 20px; */
}
.logologin {
  height: 80%;
  margin-top: 10px;
  float: left;
}
</style>