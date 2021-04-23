import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import qs from "qs";
import 'jquery';
import VDistpicker from 'v-distpicker'
import VCharts from 'v-charts'
import './assets/CSS/main.css'
//视频播放
import VideoPlayer from 'vue-video-player'

// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入富文本编辑器样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//导入图标样式
import './assets/iconfont/iconfont.css'

// import 'babel-polyfill'

Vue.config.productionTip = false
//修改原型链，全局使用axios。这样之后可在每个组件的methods中调用$axios命令完成数据请求
Vue.prototype.$axios=axios
Vue.prototype.$qs = qs;

//设置axios的基础url部分
axios.defaults.baseURL = "http://localhost:8888/"; //将axios挂载到vue上，使用是就可以 this.$axios 这样使用了

Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.component('v-distpicker', VDistpicker)
Vue.use(VideoPlayer);
Vue.use(VCharts)


// router.beforeEach(function(to, from, next) {
//     let user = sessionStorage.getItem("user");
//     //除了登录、管理员登录、注册、首页、汉服知识、汉服出行、汉服广场、汉服商铺之外，都需要判断是否登录了
//     if (
//       !(
//         to.path == "/" ||
//         to.path == "/index" ||
//         to.path == "/login" ||
//         to.path == "/managelogin"||
//         to.path == "/register"||
//         to.path == "/knows"||
//         to.path == "/active"||
//         to.path == "/square"||
//         to.path == "/shop"
//       )
//     ) {
//       if (user == null) {
//         router.push("/login");
//         location.reload();
//       }
//     }
//     next();
//   });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
