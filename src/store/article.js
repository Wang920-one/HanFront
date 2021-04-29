const article = ({
    state: {
        listOfArticle: [],  //当前专栏列表
        listOfVideo: [],  //当前视频列表
        listOfShop: [],//当前店铺列表
        listOfActive: [],//当前活动列表
        listOfUser: [],//当前用户列表
        tempList: {},  //单个视频信息或者专栏信息
        videoId: "",  //视频id
        atcId: '',     //专栏id
    },
    getters: {
        videoId: state => {
            let videoId = state.videoId
            if (!videoId.length) {
                videoId = JSON.parse(window.sessionStorage.getItem('videoId') || null)
            }
            return videoId;
        },
        atcId: state => {
            let atcId = state.atcId
            if (!atcId.length) {
                atcId = JSON.parse(window.sessionStorage.getItem('atcId') || null)
            }
            return atcId;
        },
        listOfVideo: state => {
            let listOfVideo = state.listOfVideo
            if (!listOfVideo.length) {
                listOfVideo = JSON.parse(window.sessionStorage.getItem('listOfVideo') || null)
            }
            return listOfVideo;
        },
        listOfShop: state => {
            let listOfShop = state.listOfShop
            if (!listOfShop.length) {
                listOfShop = JSON.parse(window.sessionStorage.getItem('listOfShop') || null)
            }
            return listOfShop;
        },
        listOfActive: state => {
            let listOfActive = state.listOfActive
            if (!listOfActive.length) {
                listOfActive = JSON.parse(window.sessionStorage.getItem('listOfActive') || null)
            }
            return listOfActive;
        },
        listOfArticle: state => {
            let listOfArticle = state.listOfArticle
            if (!listOfArticle.length) {
                listOfArticle = JSON.parse(window.sessionStorage.getItem('listOfArticle') || null)
            }
            return listOfArticle;
        },
        listOfUser: state => {
            let listOfUser = state.listOfUser
            if (!listOfUser.length) {
                listOfUser = JSON.parse(window.sessionStorage.getItem('listOfUser') || null)
            }
            return listOfUser;
        },
        tempList: state => {
            let tempList = state.tempList;
            if (!tempList) {
                tempList = JSON.parse(window.sessionStorage.getItem('tempList') || null);
            }
            return tempList;
        },
    },
    mutations: {
        setlistOfVideo: (state, listOfVideo) => {
            state.listOfVideo = listOfVideo;
            window.sessionStorage.setItem('listOfVideo', JSON.stringify(listOfVideo));
        },
        setlistOfShop: (state, listOfShop) => {
            state.listOfShop = listOfShop;
            window.sessionStorage.setItem('listOfShop', JSON.stringify(listOfShop));
        },
        setlistOfActive: (state, listOfActive) => {
            state.listOfActive = listOfActive;
            window.sessionStorage.setItem('listOfActive', JSON.stringify(listOfActive));
        },
        setlistOfArticle: (state, listOfArticle) => {
            state.listOfArticle = listOfArticle;
            window.sessionStorage.setItem('listOfArticle', JSON.stringify(listOfArticle));
        },
        setlistOfUser: (state, listOfUser) => {
            state.listOfUser = listOfUser;
            window.sessionStorage.setItem('listOfUser', JSON.stringify(listOfUser));
        },
        setTempList: (state, tempList) => {
            state.tempList = tempList;
            window.sessionStorage.setItem('tempList', JSON.stringify(tempList));
        },
        setAtcId: (state, atcId) => {
            state.atcId = atcId;
            window.sessionStorage.setItem('atcId', JSON.stringify(atcId));
        },
        setVideoId: (state, videoId) => {
            state.videoId = videoId;
            window.sessionStorage.setItem('videoId', JSON.stringify(videoId));
        },
    }
})

export default article