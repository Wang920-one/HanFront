const user = {
    state: {
        id: '',      //用户useId
        currentSessionId: '',//聊天框好友id
        sessions: [], //聊天记录
        userName: '',        //用户昵称
        userAccount: '',     //用户账号
        userImage: '',       //用户头像
        userBackImg: '',       //用户头像
    },
    getters: {
        id: state => {
            let id = state.id
            if (!id) {
                id = JSON.parse(window.sessionStorage.getItem('id'))
            }
            return id;
        },
        userName: state => {
            let userName = state.userName
            if (!userName) {
                userName = JSON.parse(window.sessionStorage.getItem('userName'))
            }
            return userName;
        },
        currentSessionId: state => {
            let currentSessionId = state.currentSessionId
            if (!currentSessionId) {
                currentSessionId = JSON.parse(window.sessionStorage.getItem('currentSessionId'))
            }
            return currentSessionId;
        },
        sessions: state => {
            let sessions = state.sessions
            if (!sessions) {
                sessions = JSON.parse(window.sessionStorage.getItem('sessions') || null)
            }
            return sessions;
        },
        userAccount: state => {
            let userAccount = state.userAccount
            if (!userAccount) {
                userAccount = JSON.parse(window.sessionStorage.getItem('userAccount'))
            }
            return userAccount;
        },
        userImage: state => {
            let userImage = state.userImage
            if (!userImage) {
                userImage = JSON.parse(window.sessionStorage.getItem('userImage'))
            }
            return userImage;
        },
        userBackImg: state => {
            let userBackImg = state.userBackImg
            if (!userBackImg) {
                userBackImg = JSON.parse(window.sessionStorage.getItem('userBackImg'))
            }
            return userBackImg;
        }
    },
    mutations: {
        setId: (state, id) => {
            state.id = id;
            window.sessionStorage.setItem('id', JSON.stringify(id));
        },
        setUserName: (state, userName) => {
            state.userName = userName;
            window.sessionStorage.setItem('userName', JSON.stringify(userName));
        },
        setCurrentSessionId: (state, currentSessionId) => {
            state.currentSessionId = currentSessionId;
            window.sessionStorage.setItem('currentSessionId', JSON.stringify(currentSessionId));
        },
        setSessions: (state, sessions) => {
            state.sessions = sessions;
            window.sessionStorage.setItem('sessions', JSON.stringify(sessions));
        },
        setuserAccount: (state, userAccount) => {
            state.userAccount = userAccount;
            window.sessionStorage.setItem('userAccount', JSON.stringify(userAccount));
        },
        setUserImage: (state, userImage) => {
            state.userImage = userImage;
            window.sessionStorage.setItem('userImage', JSON.stringify(userImage));
        },
        setUserBackImg: (state, userBackImg) => {
            state.userBackImg = userBackImg;
            window.sessionStorage.setItem('userBackImg', JSON.stringify(userBackImg));
        },
    }
}

export default user