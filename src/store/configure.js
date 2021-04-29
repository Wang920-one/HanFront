const configure = ({
    state: {
        HOST: 'http://127.0.0.1:8888',
        loginIn: false,     //用户是否已经登录
        isCollect: false,    //当前稿件是否已收藏
        isThumse: false,    //当前稿件是否已点赞
        isGuanzhu: false,    //当前作者是否已关注
    },
    getters: {
        loginIn: state => {
            let loginIn = state.loginIn
            if (!loginIn.length) {
                loginIn = JSON.parse(window.sessionStorage.getItem('loginIn') || null)
            }
            return loginIn;
        },
        isCollect: state => {
            let isCollect = state.isCollect
            if (!isCollect.length) {
                isCollect = JSON.parse(window.sessionStorage.getItem('isCollect') || null)
            }
            return isCollect;
        },
        isThumse: state => {
            let isThumse = state.isThumse
            if (!isThumse.length) {
                isThumse = JSON.parse(window.sessionStorage.getItem('isThumse') || null)
            }
            return isThumse;
        },
        isGuanzhu: state => {
            let isGuanzhu = state.isGuanzhu
            if (!isGuanzhu.length) {
                isGuanzhu = JSON.parse(window.sessionStorage.getItem('isGuanzhu') || null)
            }
            return isGuanzhu;
        }
    },
    mutations: {
        setloginIn: (state, loginIn) => {
            state.loginIn = loginIn;
            window.sessionStorage.setItem('loginIn', JSON.stringify(loginIn));
        },
        setIsCollect: (state, isCollect) => {
            state.isCollect = isCollect;
            window.sessionStorage.setItem('isCollect', JSON.stringify(isCollect));
        },
        setIsThumse: (state, isThumse) => {
            state.isThumse = isThumse;
            window.sessionStorage.setItem('isThumse', JSON.stringify(isThumse));
        },
        setIsGuanzhu: (state, isGuanzhu) => {
            state.isGuanzhu = isGuanzhu;
            window.sessionStorage.setItem('isGuanzhu', JSON.stringify(isGuanzhu));
        },
    }
})

export default configure