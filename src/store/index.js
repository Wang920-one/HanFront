import Vue from 'vue'
import Vuex from 'vuex'
import configure from './configure'
import user from './user'
import article from './article'
import { mapGetters } from "vuex";
import SockJS from 'sockjs-client';
// import Stomp from 'stompjs'

Vue.use(Vuex)

const now = new Date();

const store = new Vuex.Store({
    state: {
        HOST: 'http://127.0.0.1:8888',
        sessions: [],
        users: [],
        currentSessionId: 1,
        filterKey: '',
        stomp:null
    },
    computed: {
        ...mapGetters(["id"])
    },
    getters: {

    },
    mutations: {
        changeCurrentSessionId(state, id) {
            state.currentSessionId = id;
        },
        addMessage(state, msg) {
            state.sessions[state.currentSessionId - 1].messages.push({
                content: msg,
                date: new Date(),
                self: true
            })
        },
        INIT_DATA(state) {
            //浏览器本地的历史聊天记录
            // let data = localStorage.getItem('vue-chat-session');
            // //console.log(data)
            // if (data) {
            //     state.sessions = JSON.parse(data);
            // }
        },
        INIT_USERS(state, data) {
            state.users = data;
        },
    },
    actions: {
        connect(context){
            // context.state.stomp
        },
        initData(context) {
            getRequest('/chat/users').then(res => {
                if (res) {
                    context.commit('INIT_USERS', res)
                }
            })

        }
    },
    modules: {
        configure,
        user,
        article
    }
})

store.watch(function (state) {
    return state.sessions
}, function (val) {
    // console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
}, {
    deep: true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
})

export default store