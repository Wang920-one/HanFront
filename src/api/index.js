import { get, post } from "./http";

//判断管理员是否登录成功
export const getLoginStatus = (params) => post('manage/login/status', params);

// ------------------------------用户相关---------------------------------
//注册
export const SignUp = (params) => post(`user/add`, params);
//登录
export const LoginIn = (params) => post(`user/login`, params);
//查询所有
export const getAllUser = () => get(`user/allUser`);
//修改
export const updateUser = (params) => post(`user/update`, params);
//删除
export const delUser = (id) => get(`user/delete?id=${id}`);
//根据用户id查询该用户的详细信息
export const getUserOfId = (id) => get(`/user/selectByPrimaryKey?id=${id}`);
//根据用户昵称模糊查询该用户列表
export const getUserOfName = (keywords) => get(`user/userOfName?userName=${keywords}`);

// ------------------------------管理员店铺相关---------------------------------
//添加店铺
export const setShop = (params) => post(`shop/add`, params);
//查询所有店铺
export const getAllShop = () => get(`shop/allShop`);
//修改店铺信息
export const updateShop = (params) => post(`shop/update`, params);
//删除店铺
export const delShop = (shopId) => get(`shop/delete?shopId=${shopId}`);
//根据名称模糊查询列表
export const getShopOfName = (name) => get(`shop/shopOfName?shopName=${name}`);
//降序粉丝量查询所有，热门榜
export const getAllShopOfFans = () => get(`shop/shopOfFans`);
//降序认证时间查询所有，资历榜
export const getAllShopOfTime = () => get(`shop/shopOfYear`);


// ------------------------------管理员活动相关---------------------------------
//添加
export const setActive = (params) => post(`active/add`, params);
//查询所有
export const getAllActive = () => get(`active/allActive`);
//修改
export const updateActive = (params) => post(`active/update`, params);
//删除
export const delActive = (acId) => get(`active/delete?acId=${acId}`);
//根据类型模糊查询列表
export const getActiveOfType = (form) => get(`active/activeOfForm?acForm=${form}`);
//根据名称模糊查询列表
export const getActiveOfName = (name) => get(`active/activeOfName?acName=${name}`);
//根据id查询该详细信息
export const getActiveOfId = (id) => get(`active/selectByPrimaryKey?acId=${id}`);


// ------------------------------管理员稿件相关---------------------------------
//添加
export const setArticle = (params) => post(`article/add`, params);
//查询所有
export const getAllArticle = () => get(`article/allArticle`);
//根据id查询该详细信息
export const getArticleOfId = (id) => get(`article/selectByPrimaryKey?id=${id}`);
//根据用户id查询该用户的所有视频
export const getArticleOfUseId = (id) => get(`article/articleOfUseId?useId=${id}`);
//根据标题模糊查询
export const getArticleOfBt = (keywords) => get(`article/articleOfBioati?bioati=${keywords}`);
//修改
export const updateArticle = (params) => post(`article/update`, params);
//删除
export const delArticle = (id) => get(`article/delete?id=${id}`);
//审核稿件
export const shenHeArticle = (params) => post(`article/shenHe`, params);

//视频
//添加
export const setVideo = (params) => post(`video/add`, params);
//查询所有
export const getAllVideo = () => get(`video/allVideo`);
//降序浏览量查询所有，推荐榜
export const getAllVideoOfBrowse = () => get(`video/videoOfBrowse`);
//降序收藏量查询所有
export const getAllVideoOfCollect = () => get(`video/videoOfCollect`);
//降序点赞量查询所有，热门榜
export const getAllVideoOfThumse = () => get(`video/videoOfThumse`);
//根据id查询该详细信息
export const getVideoOfId = (id) => get(`video/selectByPrimaryKey?id=${id}`);
//根据用户id查询该用户的所有视频
export const getVideoOfUseId = (id) => get(`video/videoOfUseId?useId=${id}`);
//根据标题模糊查询
export const getVideoOfBt = (keywords) => get(`video/videoOfTitle?videoTitle=${keywords}`);
//根据类型模糊查询列表
export const getVideoOfType = (type) => get(`video/videoOfType?videoType=${type}`);
//修改
export const updateVideo = (params) => post(`video/update`, params);
//删除
export const delVideo = (id) => get(`video/delete?id=${id}`);
//审核稿件
export const shenHeVideo = (params) => post(`video/shenHe`, params);


// ------------------------------管理员投诉建议相关---------------------------------
//添加
export const setSuggest = (params) => post(`suggest/add`, params);
//查询所有
export const getAllSuggest = () => get(`suggest/allSuggest`);
//删除
export const delSuggest = (sugId) => get(`suggest/delete?sugId=${sugId}`);


// ------------------------------评论相关---------------------------------
//添加
export const setComment = (params) => post(`comment/add`, params);
//点赞
export const setLike = (params) => post(`comment/like`, params);
//返回当前歌单或歌曲的评论列表,评论类型（0视频1专栏）
export const getAllComment = (type, id) => {
    if (type == 0) {    //视频
        return get(`comment/commentOfVideoId?videoid=${id}`)
    } else {          //专栏
        return get(`comment/commentOfArticleId?articleid=${id}`)
    }
}


// ------------------------------收藏相关---------------------------------
//添加收藏
export const setCollect = (params) => post(`collect/add`, params);
//指定用户的收藏列表
export const getCollectOfUseId = (useId) => get(`collect/collectOfUseId?useId=${useId}`);
//取消收藏
export const delShouc = (id) => get(`collect/delete?id=${id}`);
//修改收藏量
export const updateShouC = (params) => post(`video/shouC`, params);
//修改收藏量
export const updateShouC1 = (params) => post(`article/shouC`, params);


// ------------------------------点赞相关---------------------------------
//添加点赞
export const setThumb = (params) => post(`thumb/add`, params);
//指定用户的点赞列表
export const getThumbOfUseId = (useId) => get(`thumb/thumbOfUseId?useId=${useId}`);
//取消点赞
export const delThumb = (id) => get(`thumb/delete?id=${id}`);
//修改点赞量
export const updateLike = (params) => post(`video/like`, params);
//修改点赞量
export const updateLike1 = (params) => post(`article/like`, params);


// ------------------------------分享相关---------------------------------
//修改分享量
export const updateShare = (params) => post(`video/share`, params);
//修改分享量
export const updateShare1 = (params) => post(`article/share`, params);


// ------------------------------浏览相关---------------------------------
//修改浏览量
export const updateBrowse = (params) => post(`video/browse`, params);
//修改浏览量
export const updateBrowse1 = (params) => post(`article/browse`, params);

// ------------------------------关注相关---------------------------------
//添加关注
export const setSubscribe = (params) => post(`subscribe/add`, params);
//指定用户的关注列表
export const getListOfSubscribe = (subscribe) => get(`subscribe/listOfSubscribe?subscribe=${subscribe}`);
//取消关注
export const delSubscribe = (id) => get(`subscribe/delete?id=${id}`);
//指定用户的粉丝列表
export const getListOfBeSubscribe = (beSubscribe) => get(`subscribe/listOfBeSubscribe?beSubscribe=${beSubscribe}`);

// ------------------------------私信相关---------------------------------
//添加信息
export const setMessage = (params) => post(`message/add`, params);
//查询用户的信息列表
export const getMessageOfUser = (id) => get(`message/allRecord?userId=${id}`);
//删除和某个用户的聊天记录
export const delFriendRecord = (userId,friendId) => get(`message/delFriendRecord?userId=${userId}&friendId=${friendId}`);
//查询某个用户和另一个用户的聊天记录
export const getFriendRecord = (userId,friendId) => get(`message/friendRecord?userId=${userId}&friendId=${friendId}`);