import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Index from '../views/main/Index.vue'
import Register from '../views/Register.vue'
import Knows from '../views/main/Knows.vue'
import Active from '../views/main/Active.vue'
import DynamicDetails from '../views/details/DynamicDetails.vue'
import ColumnDetails from '../views/details/ColumnDetails.vue'
import Manage from '../views/manage/Manage.vue'
import Personal from '../views/Personal.vue'
import Shop from '../views/main/Shop.vue'
import Square from '../views/main/Square.vue'
import Publish from '../views/contributions/Publish.vue'
import PublishVideo from '../views/contributions/PublishVideo.vue'
import ManageLogin from '../views/manage/ManageLogin.vue'
import Search from '../views/Search.vue'
import AuthorDetail from '../views/details/AuthorDetail.vue'
import ActiveDetail from '../views/details/ActiveDetail.vue'
import EditVideo from '../views/contributions/EditVideo.vue'
import EditArticle from '../views/contributions/EditArticle.vue'
import FriendChat from '../views/chat/FriendChat.vue'
// import Helloworld from "../views/HelloWorld.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: Index
    },
    {
        path: '/managelogin',
        name: 'ManageLogin',
        component: ManageLogin
    },
    {
        path: '/manage',
        name: 'Manage',
        component: Manage
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/knows',
        name: 'Knows',
        component: Knows
    },
    {
        path: '/active',
        name: 'Active',
        component: Active
    },
    {
        path: '/dynamicdetails/:id',
        name: 'DynamicDetails',
        component: DynamicDetails
    },
    {
        path: '/columnDetails/:id',
        name: 'ColumnDetails',
        component: ColumnDetails
    },
    {
        path: '/editVideo/:id',
        name: 'EditVideo',
        component: EditVideo
    },
    {
        path: '/editArticle/:id',
        name: 'EditArticle',
        component: EditArticle
    },
    {
        path: '/author-detail/:id',
        name: 'author-detail',
        component: AuthorDetail
    },
    {
        path: '/activeDetail/:id',
        name: 'activeDetail',
        component: ActiveDetail
    },
    {
        path: '/search',
        name: 'Search',
        component: Search
    },
    {
        path: '/personal/:id',
        name: 'Personal',
        component: Personal,
    }, 
    {
        path: '/friendchat',
        name: 'FriendChat',
        component: FriendChat
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop
    },
    , {
        path: '/square',
        name: 'Square',
        component: Square
    },
    {
        path: '/publish',
        name: 'Pulish',
        component: Publish
    },
    {
        path: '/publishvideo',
        name: 'PublishVideo',
        component: PublishVideo
    },
    {
        path: '/MHome',
        component: resolve => require(['../components/manage/ManageHome.vue'], resolve),
        children: [
            {
                path: '/MInfo',
                component: resolve => require(['../views/manage/ManageInfo.vue'], resolve)
            },
            {
                path: '/MUser',
                component: resolve => require(['../views/manage/ManageUser.vue'], resolve)
            },
            {
                path: '/MArticle',
                component: resolve => require(['../views/manage/ManageArticle.vue'], resolve)
            },
            {
                path: '/MContribute',
                component: resolve => require(['../views/manage/ManageContribute.vue'], resolve)
            },
            {
                path: '/MShop',
                component: resolve => require(['../views/manage/ManageShop.vue'], resolve)
            },
            {
                path: '/MActive',
                component: resolve => require(['../views/manage/ManageActive.vue'], resolve)
            },
            {
                path: '/MSuggest',
                component: resolve => require(['../views/manage/ManageSuggest.vue'], resolve)
            },
        ]
    },
]

//解决重复出发一个路由的问题
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
