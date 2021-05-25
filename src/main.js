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
import VideoPlayer from 'vue-video-player'
import VueQuillEditor from 'vue-quill-editor'
// import vshare from 'vshare'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import './assets/iconfont/iconfont.css'

import JwChat from 'jwchat';

/* 在 0.2.041 之前的版本需要引入 css */
// import 'jwchat/lib/JwChat.css';
Vue.use(JwChat)

Vue.config.productionTip = false
//修改原型链，全局使用axios。这样之后可在每个组件的methods中调用$axios命令完成数据请求
Vue.prototype.$axios=axios
Vue.prototype.$qs = qs;

//设置axios的基础url部分
axios.defaults.baseURL = "http://localhost:8888/"; //将axios挂载到vue上，使用是就可以 this.$axios 这样使用了

// Vue.use(vshare)
Vue.use(VueQuillEditor)
Vue.use(ElementUI);
Vue.component('v-distpicker', VDistpicker)
Vue.use(VideoPlayer);
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
