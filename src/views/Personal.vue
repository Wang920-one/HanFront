<template>
  <div>

    <Head></Head>
    <el-container id="bgImg">
      <el-main style="">
        <div style="border:1px #ccc solid;background-color:#ffffff50">
          <!-- <el-divider direction="vertical"></el-divider> -->
          <el-container style="">
            <el-header style="height:20%;">
              <div>
                <div style="text-align:center;height:25px;">
                  <el-button
                    type="primary"
                    @click="goBack"
                    style="float:left;color:#f7a7a7;font-size:25px;padding-left:10px;padding-top:5px;background-color:#ffffff00;border-color:#ffffff00"
                    icon="el-icon-back"
                  ></el-button>
                  <h4 style="font-family:'楷体';font-size:25px">个人中心</h4>
                </div>
                <!-- 分割线 -->
                <el-divider></el-divider>
                <div style="width:40%;float:left;font-size:20px">
                  <div>
                    <!-- <el-avatar
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                      
                    ></el-avatar> -->
                    <div
                      class="user-img"
                      style="margin-left:20%;float:left;"
                    >
                      <img
                        :src="attachImageUrl(this.userDate.userImage)"
                        style="width: 60px;height: 60px;border-radius: 50%;"
                      />
                    </div>
                    <el-row style="margin-left:20%;float:left;font-family:'楷体'">
                      <el-col>
                        <span>昵称：{{ this.userDate.userName }}</span>
                      </el-col>
                      <el-col>
                        <span>个性签名：{{ this.userDate.userSign }}</span>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div style="width:50%;float:right;font-family:'楷体';font-size:20px">
                  <div
                    style="float:left;"
                    @click="changeActiveNamez"
                  >
                    <div><span>粉丝</span></div>
                    <div style="text-align:center">
                      <span>{{ this.fansDate.length }}</span>
                    </div>
                  </div>
                  <div
                    style="float:left;padding-left:35%;"
                    @click="changeActiveNamez"
                  >
                    <div><span>关注</span></div>
                    <div style="text-align:center">
                      <span>{{ this.guanzDate.length }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-header>
            <!-- 分割线 -->
            <el-divider></el-divider>

            <el-main>
              <el-tabs
                type="border-card"
                v-model="activeNamez"
                :tab-position="tabPosition"
                style="min-height: 700px;font-family:'楷体';background:#ffffff00"
              >
                <el-tab-pane
                  label="个人信息"
                  style="text-align:center"
                  name="mymessage"
                >
                  <div>
                    <div style="text-align:left">
                      <el-form
                        :model="perForm"
                        ref="perForm"
                        class="demo-ruleForm"
                        label-width="80px"
                      >
                        <h1
                          style="padding-top:20px"
                          align="center"
                        >
                          个人信息
                        </h1>
                        <el-form-item
                          label="头像"
                          width="110"
                          align="left"
                        >
                          <template>
                            <div class="user-img">
                              <img
                                :src="attachImageUrl(this.userDate.userImage)"
                                style="width:100px"
                              />
                            </div>
                            <el-upload
                              :action="uploadUrl(this.userDate.id)"
                              :show-file-list="false"
                              :before-upload="beforeImgUpload"
                              :on-success="handleImgSuccess"
                            >
                              <el-button
                                size="mini"
                                round
                              >更换头像</el-button>
                            </el-upload>
                          </template>
                        </el-form-item>
                        <el-form-item
                          width="110px"
                          prop="userName"
                          label="昵称"
                          size="mini"
                        >
                          <el-input
                            v-model="perForm.userName"
                            placeholder="昵称"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          prop="userAccount"
                          label="账号"
                          align="left"
                        >
                          <span>{{ perForm.userAccount }}</span>
                          <!-- <el-input
                            v-model="userDate.userAccount"
                            placeholder="账号"
                          ></el-input> -->
                        </el-form-item>
                        <el-form-item
                          prop="userSex"
                          label="性别"
                          align="left"
                        >
                          <el-radio-group v-model="perForm.userSex">
                            <el-radio :label="0">女</el-radio>
                            <el-radio :label="1">男</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item
                          label="修改密码"
                          prop="userPassword"
                        >
                          <el-input
                            type="password"
                            placeholder="修改密码"
                            v-model="perForm.userPassword"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="确认密码"
                          prop="checkPass"
                        >
                          <el-input
                            type="password"
                            placeholder="确认密码"
                            v-model="perForm.checkPass"
                            autocomplete="off"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="生日">
                          <el-date-picker
                            type="date"
                            v-model="perForm.userBirthday"
                            placeholder="选择日期"
                            style="width: 100%;"
                          ></el-date-picker>
                        </el-form-item>
                        <el-form-item
                          prop="userSign"
                          label="签名"
                        >
                          <el-input
                            v-model="perForm.userSign"
                            placeholder="签名"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          prop="userPhone"
                          label="手机"
                        >
                          <el-input
                            v-model="perForm.userPhone"
                            placeholder="手机"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          prop="userEmail"
                          label="邮箱"
                        >
                          <el-input
                            v-model="perForm.userEmail"
                            placeholder="邮箱"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          prop="userQQ"
                          label="QQ"
                        >
                          <el-input
                            v-model="perForm.userQQ"
                            placeholder="QQ"
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          label="地区"
                          align="left"
                        >
                          <v-distpicker
                            @selected="selected"
                            :province="attachProvince(perForm.userAddress)"
                            :city="attachCity(perForm.userAddress)"
                            :area="attachArea(perForm.userAddress)"
                          ></v-distpicker>
                        </el-form-item>
                        <div
                          class="login-btn"
                          align="center"
                        >
                          <el-button
                            type="primary"
                            @click="edit"
                          >提交修改</el-button>
                        </div>
                      </el-form>
                    </div>
                  </div>
                </el-tab-pane>

                <el-tab-pane
                  label="稿件管理"
                  name="article"
                >
                  <el-tabs
                    v-model="activeName"
                    style="padding-top: 15px;line-height: 35px;"
                  >
                    <el-tab-pane
                      label="视频"
                      name="two1"
                    >
                      <div>
                        <div
                          v-show="videoDate.length == 0"
                          align="center"
                        >
                          <span>
                            你还没有发布视频哦
                          </span>
                        </div>
                        <el-col>
                          <el-row
                            :span="8"
                            v-for="(item, index) in data1"
                            :key="index"
                          >
                            <div>
                              <el-card
                                :body-style="{ padding: '0px' }"
                                style="background-color:#ffffff10;height:100px"
                              >
                                <div @click="govideo(item)">
                                  <img
                                    class="image"
                                    style="float:left;height:100px"
                                    :src="attachImageUrl(item.pic)"
                                  />
                                  <div style="padding: 10px;float:left;">
                                    <span>标题：{{ item.videoTitle }}</span>
                                    <div class="bottom clearfix">
                                      <div class="bottom clearfix">
                                        <span style="font-size:8px">发布时间：{{ item.videoTime }}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div style="padding: 10px;float:right;margin-top:20px">
                                  <div style="float:left;padding-right: 10px;">
                                    <el-upload
                                      :action="uploadUrl1(item.id)"
                                      :before-upload="beforeImgUpload"
                                      :on-success="handleImgSuccess"
                                    >
                                      <el-button
                                        size="mini"
                                        round
                                      >更新封面</el-button>
                                    </el-upload>
                                  </div>
                                  <!-- <el-button size="mini">更换封面</el-button> -->
                                  <el-button
                                    size="mini"
                                    type="danger"
                                    @click="uhandleDelete1(item.id)"
                                  >删除</el-button>
                                  <el-button
                                    size="mini"
                                    type="primary"
                                    @click="goEditVideo(item.id)"
                                  >编辑</el-button>
                                </div>
                              </el-card>
                            </div>
                            <hr />
                          </el-row>
                        </el-col>
                      </div>
                      <!-- 添加分页组件 -->
                      <div class="pagination">
                        <el-pagination
                          background
                          layout="total,prev,pager,next"
                          :current-page="currentPage1"
                          :page-size="pageSize1"
                          :total="videoDate.length"
                          @current-change="handleCurrentChange1"
                        ></el-pagination>
                      </div>
                    </el-tab-pane>

                    <el-tab-pane
                      label="专栏"
                      name="two2"
                    >
                      <div>
                        <div
                          v-show="articleDate.length == 0"
                          align="center"
                        >
                          <span>
                            你还没有发布专栏哦
                          </span>
                        </div>
                        <el-col>
                          <el-row
                            :span="8"
                            v-for="(item, index) in articleDate"
                            :key="index"
                          >
                            <div>
                              <el-card
                                :body-style="{ padding: '0px' }"
                                style="background-color:#ffffff10;height:100px"
                              >
                                <div @click="goarticle(item)">
                                  <img
                                    class="image"
                                    style="float:left;height:100px"
                                    :src="attachImageUrl(item.pic)"
                                  />
                                  <div style="padding: 10px;float:left;">
                                    <span>标题：{{ item.bioati }}</span>
                                    <div class="bottom clearfix">
                                      <div class="bottom clearfix">
                                        <span style="font-size:8px">发布时间：{{ item.atcTime }}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div style="padding: 10px;float:right;margin-top:20px">
                                  <div style="float:left;padding-right: 10px;">
                                    <el-upload
                                      :action="uploadUrl2(item.id)"
                                      :before-upload="beforeImgUpload"
                                      :on-success="handleImgSuccess"
                                    >
                                      <el-button
                                        size="mini"
                                        round
                                      >更新封面</el-button>
                                    </el-upload>
                                  </div>
                                  <el-button
                                    size="mini"
                                    type="danger"
                                    @click="uhandleDelete2(item.id)"
                                  >删除</el-button>
                                  <el-button
                                    size="mini"
                                    type="primary"
                                    @click="goEditArticle(item.id)"
                                  >编辑</el-button>
                                </div>
                              </el-card>
                            </div>
                            <hr />
                          </el-row>
                        </el-col>
                      </div>
                    </el-tab-pane>

                    <el-tab-pane
                      label="我的收藏"
                      name="two3"
                    >
                      <div>
                        <div
                          v-show="collectDate.length == 0"
                          align="center"
                        >
                          <span>
                            你暂时没有收藏的作品哦
                          </span>
                        </div>
                        <el-col>
                          <el-row
                            :span="8"
                            v-for="(item, index) in collectDate"
                            :key="index"
                          >
                            <div>
                              <el-card
                                :body-style="{ padding: '0px' }"
                                style="background-color:#ffffff10;height:150px"
                              >
                                <div @click="goDetails(item, item.type)">
                                  <img
                                    class="image"
                                    style="float:left;height:150px"
                                    :src="attachImageUrl(item.pic)"
                                  />
                                  <div style="padding: 10px;float:left;weight:100%">
                                    <span>标题：{{
                                        item.bioati || item.videoTitle
                                      }}</span>
                                    <div class="bottom clearfix">
                                      <div class="bottom clearfix">
                                        <span style="font-size:8px">类型：{{
                                            changetype(item.type)
                                          }}</span><br />
                                        <span style="font-size:8px">收藏时间：{{ item.cltTime }}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div style="padding: 10px;float:right;margin-top:40px">
                                  <el-button
                                    size="mini"
                                    type="danger"
                                    @click="uhandleDelete3(item.id)"
                                  >取消收藏</el-button>
                                </div>
                              </el-card>
                            </div>
                            <hr />
                          </el-row>
                        </el-col>
                      </div>
                    </el-tab-pane>
                    <el-dialog
                      title="删除视频"
                      :visible.sync="delVisible1"
                      width="300px"
                      center
                    >
                      <div align="center">是否确定删除视频？</div>
                      <span slot="footer">
                        <el-button
                          size="mini"
                          @click="delVisible1 = false"
                        >取消</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="udelVideo"
                        >确定</el-button>
                      </span>
                    </el-dialog>
                    <el-dialog
                      title="删除专栏"
                      :visible.sync="delVisible2"
                      width="300px"
                      center
                    >
                      <div align="center">是否确定删除专栏？</div>
                      <span slot="footer">
                        <el-button
                          size="mini"
                          @click="delVisible2 = false"
                        >取消</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="udelArticle"
                        >确定</el-button>
                      </span>
                    </el-dialog>
                    <el-dialog
                      title="取消收藏"
                      :visible.sync="delVisible3"
                      width="300px"
                      center
                    >
                      <div align="center">是否确定取消收藏该作品？</div>
                      <span slot="footer">
                        <el-button
                          size="mini"
                          @click="delVisible3 = false"
                        >取消</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="udelCollect"
                        >确定</el-button>
                      </span>
                    </el-dialog>
                  </el-tabs>
                </el-tab-pane>

                <el-tab-pane
                  label="好友管理"
                  name="friend"
                >
                  <el-tabs
                    v-model="activeName1"
                    style="padding-top: 15px;line-height: 35px;"
                  >
                    <el-tab-pane
                      label="我的关注"
                      name="three1"
                    >
                      <div>
                        <div
                          v-show="guanzDate.length == 0"
                          align="center"
                        >
                          <span>
                            你暂时没有关注任何人哦
                          </span>
                        </div>
                        <el-col>
                          <el-row
                            :span="8"
                            v-for="(item, index) in guanzDate"
                            :key="index"
                          >
                            <el-card
                              :body-style="{ padding: '0px' }"
                              style="background-color:#ffffff10;height:80px"
                            >
                              <img
                                class="image"
                                style="float:left;height:80px"
                                :src="attachImageUrl(item.userImage)"
                              />
                              <div style="padding-left: 10px;float:left">
                                <span>昵称：{{ item.userName }}</span><br />
                                <span>关注时间：{{ item.time }}</span>
                                <div
                                  class="bottom clearfix"
                                  style="float:right"
                                ></div>
                              </div>
                              <div style="padding: 10px;float:right;margin-top:10px">
                                <el-button
                                  size="mini"
                                  type="danger"
                                  @click="uhandleDelete4(item.id)"
                                >取消关注</el-button>
                              </div>
                            </el-card>
                            <hr />
                          </el-row>
                        </el-col>
                      </div>
                    </el-tab-pane>
                    <el-dialog
                      title="取消关注"
                      :visible.sync="delVisible4"
                      width="300px"
                      center
                    >
                      <div align="center">是否确定取消关注该用户？</div>
                      <span slot="footer">
                        <el-button
                          size="mini"
                          @click="delVisible4 = false"
                        >取消</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="udelSubscribe"
                        >确定</el-button>
                      </span>
                    </el-dialog>

                    <el-tab-pane
                      label="粉丝列表"
                      name="three2"
                    >
                      <div>
                        <div
                          v-show="fansDate.length == 0"
                          align="center"
                        >
                          <span>
                            暂时没有粉丝关注你哦
                          </span>
                        </div>

                        <el-col>
                          <el-row
                            :span="8"
                            v-for="(item, index) in fansDate"
                            :key="index"
                          >
                            <el-card
                              :body-style="{ padding: '0px' }"
                              style="background-color:#ffffff10;height:80px"
                            >
                              <img
                                class="image"
                                style="float:left;width:80px;height:80px"
                                :src="attachImageUrl(item.userImage)"
                              />
                              <div style="padding-left: 10px;float:left;weight:100%">
                                <span>昵称：{{ item.userName }}</span><br />
                                <span>被关注时间：{{ attachDate(item.time) }}</span>
                                <div
                                  class="bottom clearfix"
                                  style="float:right"
                                ></div>
                              </div>
                            </el-card>
                            <hr />
                          </el-row>
                        </el-col>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                </el-tab-pane>

                <!-- <el-tab-pane label="我的消息" name="message">
                  <div>
                    <h3
                      style="font-size: 19px;font-family: '楷体';color:#f7a7a7;"
                    >
                      <i class="el-icon-s-unfold"></i>消息列表
                    </h3>
                    <el-col>
                      <el-row
                        :span="4"
                        v-for="(o, index) in 4"
                        :key="o"
                        :offset="index > 0 ? 4 : 0"
                      >
                        <el-card
                          :body-style="{ padding: '0px' }"
                          style="background-color:#ffffff10;height:60px"
                        >
                          <div style="padding: 20px;float:left;weight:100%">
                            <span>用户昵称</span>
                            <div
                              class="bottom clearfix"
                              style="float:right"
                            ></div>
                          </div>
                        </el-card>
                        <hr />
                      </el-row>
                    </el-col>
                  </div>
                </el-tab-pane> -->

                <el-tab-pane
                  label="投诉建议"
                  style="text-align:center"
                  name="suggest"
                >
                  <div style="font-size:30px;margin-top:5%">
                    <el-form
                      ref="form"
                      :model="form"
                      label-width="80px"
                      align="left"
                    >
                      <el-form-item label="投诉标题">
                        <el-input v-model="form.sugTitle"></el-input>
                      </el-form-item>
                      <el-form-item label="投诉内容">
                        <el-input v-model="form.sugDetail"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button
                          type="primary"
                          @click="onSubmit"
                        >提交</el-button>
                        <el-button @click="resetForm('form')">重置</el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                </el-tab-pane>

                <el-tab-pane
                  label="合作联系"
                  style="text-align:center"
                  name="hezuo"
                >
                  <div style="font-size:50px;margin-top:10%">
                    <span>合作请联系2919006783@qq.com</span>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
    <scroll-top />
    <Footer />
  </div>
</template>
<script>
import Head from "@/components/Head.vue";
import Footer from "@/components/Footer.vue";
import ScrollTop from "@/components/ScrollTop.vue";
import VDistpicker from "v-distpicker";
import { mixin } from "../mixins";
import {
  setSuggest,
  getUserOfId,
  getListOfSubscribe,
  getListOfBeSubscribe,
  getVideoOfUseId,
  getArticleOfUseId,
  getCollectOfUseId,
  getVideoOfId,
  getArticleOfId,
  updateUser,
  delVideo,
  delArticle,
  delShouc,
  delSubscribe,
} from "../api/index";
export default {
  name: "Personal",
  mixins: [mixin],
  data() {
    return {
      userId: "", //前面传来的用户id
      activeNamez: "mymessage",
      activeName: "two1",
      activeName1: "three1",
      tabPosition: "left",
      userDate: {}, //用户信息
      fansDate: [], //粉丝列表
      guanzDate: [], //关注列表
      videoDate: [], //视频列表
      articleDate: [], //专栏列表
      collectDate: [], //用户的收藏列表
      pageSize1: 5, //分页的每页大小
      currentPage1: 1, //当前页
      delVisible1: false,
      delVisible2: false,
      delVisible3: false,
      delVisible4: false,
      idx1: -1,
      idx2: -1,
      idx3: -1,
      idx4: -1,
      //用户信息
      perForm: {
        id: "",
        userAccount: "", //账号
        userName: "", //用户名
        userPassword: "", //密码
        checkPass: "", //确认密码
        userSex: "", //性别
        userPhone: "", //手机
        userEmail: "", //邮箱
        userQQ: "", //qq
        userBirthday: "", //生日
        userSign: "", //签名
        userAddress: "", //地区
      },
      //投诉建议
      form: {
        sugTitle: "",
        sugDetail: " ",
      },
    };
  },
  components: {
    Head,
    Footer,
    VDistpicker,
    ScrollTop,
  },
  computed: {
    //计算当前搜索结果表里的数据
    data1() {
      //根据分页计算
      return this.videoDate.slice(
        (this.currentPage1 - 1) * this.pageSize1,
        this.currentPage1 * this.pageSize1
      );
    },
  },
  created() {
    this.userId = this.$route.params.id;
    this.userOfId();
    this.getFansList();
    this.getVideoList();
    this.getArticleList();
    this.getGuanzList();
    this.getCollectList();
  },
  mounted() {
    this.getMsg(this.userId);
  },
  methods: {
    //获取当前页
    handleCurrentChange1(val) {
      this.currentPage1 = val;
    },

    //显示用户信息
    getMsg(userId) {
      getUserOfId(userId)
        .then((res) => {
          this.perForm.userName = res.userName;
          this.perForm.userAccount = res.userAccount;
          this.perForm.userSex = res.userSex;
          this.perForm.userPassword = res.userPassword;
          this.perForm.userBirthday = res.userBirthday;
          this.perForm.userSign = res.userSign;
          this.perForm.userPhone = res.userPhone;
          this.perForm.userEmail = res.userEmail;
          this.perForm.userQQ = res.userQQ;
          this.perForm.userAddress = res.userAddress;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //地区选择器
    selected(data) {
      this.perForm.userAddress =
        data.province.value + "-" + data.city.value + "-" + data.area.value;
    },
    //修改用户信息
    edit() {
      let _this = this;
      let d = new Date(this.perForm.userBirthday);
      let nowDate = new Date();
      let datetime =
        d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
      let datetime1 =
        nowDate.getFullYear() +
        "-" +
        (nowDate.getMonth() + 1) +
        "-" +
        nowDate.getDate();
      let params = new URLSearchParams();
      params.append("id", this.userId);
      params.append("userName", this.perForm.userName);
      params.append("userPassword", this.perForm.userPassword);
      params.append("userSex", this.perForm.userSex);
      params.append("userPhone", this.perForm.userPhone);
      params.append("userQQ", this.perForm.userQQ);
      params.append("userBirthday", datetime);
      params.append("userSign", this.perForm.userSign);
      params.append("userEmail", this.perForm.userEmail);
      params.append("userAddress", this.perForm.userAddress);
      params.append("updateTime", datetime1);
      updateUser(params).then((res) => {
        if (res.code == 1) {
          _this.$message({
            showClose: true,
            message: "修改成功",
            type: "success",
          });
        } else {
          _this.$message({
            showClose: true,
            message: "修改失败",
            type: "error",
          });
        }
        this.$store.commit("setUserName", this.perForm.userName);
        this.$router.go(0); //刷新当前页面
      });
    },
    //更新图片
    uploadUrl(userId) {
      return `${this.$store.state.HOST}/user/updateUserImg?id=${userId}`;
    },
    //上传之前的校验
    beforeImgUpload(file) {
      const isJPG = file.type == "image/jpeg";
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message({
          showClose: true,
          message: "上传头像图片只能是JPG格式",
          type: "error",
        });
        return false;
      }
      if (!isLt10M) {
        this.$message({
          showClose: true,
          message: "上传头像图片不能大于10MB",
          type: "error",
        });
        return false;
      }
      return true;
    },
    //上传成功
    handleImgSuccess(res, file) {
      if (res.code == 1) {
        this.$store.commit("setUserImage", res.userImage);
        this.$message({
          showClose: true,
          message: "修改成功",
          type: "success",
        });
      } else {
        this.$message({
          showClose: true,
          message: "修改失败",
          type: "error",
        });
      }
      this.$router.go(0); //刷新当前页面
    },
    //查询粉丝列表
    getFansList() {
      getListOfBeSubscribe(this.userId)
        .then((res) => {
          for (let item of res) {
            this.getUsers1(item.subscribe, item);
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "粉丝列表加载失败",
            type: "error",
          });
        });
    },
    //通过id查询用户信息
    getUsers1(useId, item) {
      getUserOfId(useId)
        .then((res) => {
          let o = item;
          o.userName = res.userName;
          o.userImage = res.userImage;
          this.fansDate.push(o);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询关注列表
    getGuanzList() {
      getListOfSubscribe(this.userId)
        .then((res) => {
          for (let item of res) {
            this.getUsers(item.beSubscribe, item);
          }
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "关注列表加载失败",
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
          this.guanzDate.push(o);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询专栏列表
    getArticleList() {
      getArticleOfUseId(this.userId)
        .then((res) => {
          this.articleDate = res;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "专栏列表加载失败",
            type: "error",
          });
        });
    },
    //查询视频列表
    getVideoList() {
      getVideoOfUseId(this.userId)
        .then((res) => {
          this.videoDate = res;
          this.currentPage1 = 1;
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: "专栏列表加载失败",
            type: "error",
          });
        });
    },
    //查询收藏列表
    getCollectList() {
      this.collectDate = [];
      getCollectOfUseId(this.userId).then((res) => {
        // console.log(res);
        for (let item of res) {
          if (item.type == 0) {
            this.getVideo(item.videoId, item);
          } else {
            this.getArticle(item.atcId, item);
          }
        }
      });
    },
    //获取视频信息，连同本对象一起放到collectDate里面
    getVideo(videoid, item) {
      getVideoOfId(videoid)
        .then((res) => {
          let o = item;
          o.videoTitle = res.videoTitle;
          o.videoDes = res.videoDes;
          o.pic = res.pic;
          this.collectDate.push(o);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取专栏信息，连同本对象一起放到collectDate里面
    getArticle(articleid, item) {
      getArticleOfId(articleid)
        .then((res) => {
          let o = item;
          o.bioati = res.bioati;
          o.pic = res.pic;
          o.atcDescribe = res.atcDescribe;
          this.collectDate.push(o);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询用户信息
    userOfId() {
      this.userDate = {};
      getUserOfId(this.userId).then((res) => {
        this.userDate = res;
      });
    },
    //投诉建议
    onSubmit() {
      let params = new URLSearchParams();
      params.append("useId", this.userId);
      params.append("sugTitle", this.form.sugTitle);
      params.append("sugDetail", this.form.sugDetail);
      setSuggest(params)
        .then((res) => {
          if (res.code == 1) {
            this.$message({
              showClose: true,
              message: "提交成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "提交失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除视频
    udelVideo() {
      delVideo(this.idx1)
        .then((res) => {
          if (res) {
            // this.getDate();
            this.getVideoList();
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
      this.delVisible1 = false;
    },
    //删除专栏
    udelArticle() {
      delArticle(this.idx2)
        .then((res) => {
          if (res) {
            // this.getDate();
            this.getArticleList();
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
      this.delVisible2 = false;
    },
    //取消收藏
    udelCollect() {
      delShouc(this.idx3)
        .then((res) => {
          if (res) {
            // this.getDate();
            this.getCollectList();
            this.$message({
              showClose: true,
              message: "取消收藏成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "取消失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.delVisible3 = false;
    },
    //取消关注
    udelSubscribe() {
      delSubscribe(this.idx4)
        .then((res) => {
          if (res) {
            // this.getGuanzList();
            this.$router.go(0); //刷新当前页面
            this.$message({
              showClose: true,
              message: "取消关注成功",
              type: "success",
            });
          } else {
            this.$message({
              showClose: true,
              message: "取消失败",
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.delVisible4 = false;
    },

    //更新视频封面
    uploadUrl1(id) {
      return `${this.$store.state.HOST}/video/updateVideoImg?id=${id}`;
    },
    //更新专栏封面
    uploadUrl2(id) {
      return `${this.$store.state.HOST}/article/updateArticleImg?id=${id}`;
    },
    //切换到好友界面
    changeActiveNamez() {
      this.activeNamez = "friend";
    },
    //切换到编辑视频界面
    goEditVideo(id) {
      this.$router.push({ path: `/editvideo/${id}` });
    },
    //切换到编辑专栏界面
    goEditArticle(id) {
      this.$router.push({ path: `/editArticle/${id}` });
    },
    govideo(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `/DynamicDetails/${item.id}` });
    },
    goarticle(item) {
      this.$store.commit("setTempList", item);
      this.$router.push({ path: `/columnDetails/${item.id}` });
    },
    goDetails(item, type) {
      if (type == 0) {
        getVideoOfId(item.videoId).then((res) => {
          this.$store.commit("setTempList", res);
          this.$router.push({ path: `/DynamicDetails/${res.id}` });
        });
      } else {
        getArticleOfId(item.atcId).then((res) => {
          this.$store.commit("setTempList", res);
          this.$router.push({ path: `/columnDetails/${res.id}` });
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
#bgImg {
  background-image: url("../assets/images/bg2.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
}
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;
  overflow: auto;
  box-sizing: border-box;
  padding: 0px;
}

.avatar-uploader .el-upload {
  border: 10px dashed #000000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* 侧边栏设置 */
/deep/.el-tabs--border-card > .el-tabs__header {
  background-color: #f5f7fa00;
  border-bottom: 1px solid #e4e7ed00;
  margin: 0;
}
/deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  color: #f7a7a7;
  background-color: rgba(255, 255, 255, 0.2);
  border-right-color: #dcdfe6;
  border-left-color: #dcdfe6;
}
/deep/.el-tabs__item {
  /* padding: 0 5%; */
  padding-left: 10px;
  /* margin-right: 20px; */
  /* padding-top: 35px; */
  height: 50px;
  box-sizing: border-box;
  /* line-height: 30px; */
  display: inline-block;
  list-style: none;
  font-size: 22px;
  font-family: "楷体";
  background-color: rgba(255, 255, 255, 0);
  font-weight: 50;
  color: #000000;
  position: relative;
}
/deep/.el-tabs__active-bar {
  position: absolute;
  /* padding-left: 20px; */
  bottom: 0;
  left: 40%;
  height: 2px;
  background-color: #40a0ff00;
  z-index: 1;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  list-style: none;
}
/deep/.el-button {
  font-family: "楷体";
  border-radius: 30px;
  /* width: 20%; */
}

.demo-ruleForm {
  /* background-image: url("../assets/logo.png"); */
  background-color: #ffffff41;
  /* max-width: 900px; */
  margin: 0 auto;
  /* height: 870px; */
  /* margin-top: 300px; */
  margin-bottom: 200px;
  border: lightpink;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-form-item {
  margin-bottom: 15px;
}

/deep/ .el-form-item__label {
  /* 输入框字体颜色 */
  color: rgb(255, 255, 255);
  font-family: "楷体";
  margin-top: 10px;
}

/deep/.el-input__inner {
  /* 输入框椭圆 */
  border-radius: 30px;
  height: 28px;
  width: 30%;
  font-weight: initial;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/deep/.el-button {
  font-family: "楷体";
  border-radius: 30px;
  /* width: 20%; */
}
.login-btn {
  padding-bottom: 20px;
}
/deep/.el-form-item__content {
  margin-right: 50px;
}
/deep/.el-form-item__content {
  margin-top: 10px;
}
/deep/.distpicker-address-wrapper select {
  /* padding: .5rem .75rem; */
  height: 35px;
  font-size: 15px;
  font-family: "楷体";
  line-height: 1.25;
  /* color: #464a4c; */
  background-color: #fff;
  background-image: none;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  /* border: 1px solid rgba(0,0,0,0.15); */
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
}
</style>