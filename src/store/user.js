const user = {
    state: {
        id: '',      //用户useId
        userName: '',        //用户昵称
        userAccount: '',     //用户账号
        userImage: '',       //用户头像
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
        setuserAccount: (state, userAccount) => {
            state.userAccount = userAccount;
            window.sessionStorage.setItem('userAccount', JSON.stringify(userAccount));
        },
        setUserImage: (state, userImage) => {
            state.userImage = userImage;
            window.sessionStorage.setItem('userImage', JSON.stringify(userImage));
        },

    }
}

export default user