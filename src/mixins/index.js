import { getArticleOfBt, getVideoOfBt, getUserOfName, getUserOfId, getActiveOfName, getShopOfName } from '../api/index';
export const mixin = {
    methods: {
        //--------------------------用户方法-------------------------
        //弹出删除视频窗口
        uhandleDelete1(id) {
            this.idx1 = id;
            this.delVisible1 = true
        },
        //弹出删除专栏窗口
        uhandleDelete2(id) {
            this.idx2 = id;
            this.delVisible2 = true
        },
        //弹出取消收藏窗口
        uhandleDelete3(id) {
            this.idx3 = id;
            this.delVisible3 = true
        },
        //弹出取消关注窗口
        uhandleDelete4(id) {
            this.idx4 = id;
            this.delVisible4 = true
        },
        //获取图片地址
        attachImageUrl(srcurl) {
            return srcurl ? this.$store.state.HOST + srcurl : this.$store.state.HOST + '/img/defualt/user.png';
        },
        //获取用户名，连同本对象一起放到tempDate和tableDate里面
        getUsers(id, item) {
            getUserOfId(id)
                .then(res => {
                    let o = item;
                    o.userName = res.userName;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取
        getArticle() {
            if (!this.$route.query.keywords) {
                this.$store.commit('setlistOfArticle', []);
                // this.$message.error('您输入的内容为空！');
                this.$message({
                    showClose: true,
                    message: "您输入的内容为空！",
                    type: "error"
                });
            } else {
                getArticleOfBt(this.$route.query.keywords).then(res => {
                    if (!res.length) {
                        this.$store.commit('setlistOfArticle', []);
                        // this.$message.error('暂无符合条件的专栏内容');
                        this.$message({
                            showClose: true,
                            message: "暂无符合条件的专栏内容",
                            type: "error"
                        });
                    } else {
                        this.$store.commit('setlistOfArticle', res);
                        for (let item of res) {
                            this.getUsers(item.useId, item); //获取用户名，连同本对象一起放到tempDate和tableDate里面
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        //获取
        getActive() {
            if (!this.$route.query.keywords) {
                this.$store.commit('setlistOfActive', []);
                // this.$message.error('您输入的内容为空！');
                this.$message({
                    showClose: true,
                    message: "您输入的内容为空！",
                    type: "error"
                });
            } else {
                getActiveOfName(this.$route.query.keywords).then(res => {
                    if (!res.length) {
                        this.$store.commit('setlistOfActive', []);
                        // this.$message.error('暂无符合条件的专栏内容');
                        this.$message({
                            showClose: true,
                            message: "暂无符合条件的活动",
                            type: "error"
                        });
                    } else {
                        this.$store.commit('setlistOfActive', res);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        //获取
        getShop() {
            if (!this.$route.query.keywords) {
                this.$store.commit('setlistOfShop', []);
                // this.$message.error('您输入的内容为空！');
                this.$message({
                    showClose: true,
                    message: "您输入的内容为空！",
                    type: "error"
                });
            } else {
                getShopOfName(this.$route.query.keywords).then(res => {
                    if (!res.length) {
                        this.$store.commit('setlistOfShop', []);
                        // this.$message.error('暂无符合条件的专栏内容');
                        this.$message({
                            showClose: true,
                            message: "暂无符合条件的商铺",
                            type: "error"
                        });
                    } else {
                        this.$store.commit('setlistOfShop', res);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        //获取
        getVideo() {
            if (!this.$route.query.keywords) {
                this.$store.commit('setlistOfVideo', []);
                // this.$message.error('您输入的内容为空！');
                this.$message({
                    showClose: true,
                    message: "您输入的内容为空！",
                    type: "error"
                });
            } else {
                getVideoOfBt(this.$route.query.keywords).then(res => {
                    if (!res.length) {
                        this.$store.commit('setlistOfVideo', []);
                        // this.$message.error('暂无符合条件的视频内容');
                        this.$message({
                            showClose: true,
                            message: "暂无符合条件的视频内容",
                            type: "error"
                        });
                    } else {
                        this.$store.commit('setlistOfVideo', res);
                        for (let item of res) {
                            this.getUsers(item.useId, item); //获取用户名，连同本对象一起放到tempDate和tableDate里面
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        //获取
        getUser() {
            if (!this.$route.query.keywords) {
                this.$store.commit('setlistOfUser', []);
                // this.$message.error('您输入的内容为空！');
                this.$message({
                    showClose: true,
                    message: "您输入的内容为空！",
                    type: "error"
                });
            } else {
                getUserOfName(this.$route.query.keywords).then(res => {
                    if (!res.length) {
                        this.$store.commit('setlistOfUser', []);
                        // this.$message.error('暂无符合条件的视频内容');
                        this.$message({
                            showClose: true,
                            message: "暂无符合条件的用户",
                            type: "error"
                        });
                    } else {
                        this.$store.commit('setlistOfUser', res);
                        // for (let item of res) {
                        //     this.getUsers(item.useId, item); //获取用户名，连同本对象一起放到tempDate和tableDate里面
                        // }
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },


        //--------------------------管理员方法--------------------
        //提示信息
        notify(title, type) {
            this.$notify({
                title: title,
                type: type
            })
        },
        //根据相对地址获取绝对地址
        getUrl(url) {
            return `${this.$store.state.HOST}/${url}`
        },
        //获取性别中文
        changeSex(value) {
            if (value == 0) {
                return '女';
            }
            if (value == 1) {
                return '男';
            }
            if (value == null) {
                return '不明';
            }
            return value;
        },
        //获取分类中文
        changetype(value) {
            if (value == 0) {
                return '视频';
            }
            if (value == 1) {
                return '专栏';
            }
            return value;
        },

        //获取日期
        attachDate(val) {
            return String(val).substr(0, 10);
        },
        //获取省
        attachProvince(str) {
            let arr = str.split('-');
            return arr[0];
        },
        //获取市
        attachCity(str) {
            let arr = str.split('-');
            return arr[1];
        },
        //获取区
        attachArea(str) {
            let arr = str.split('-');
            return arr[2];
        },
        //上传图片之前的校验
        beforeImgUpload(file) {
            const isjpg = (file.type === 'image/jpeg') || (file.type === 'image/png');
            if (!isjpg) {
                this.$message.error('上传图片格式只能是jpg或者png格式');
                return false;
            }
            const isLt10M = (file.size / 1024 / 1024) < 5;
            if (!isLt10M) {
                this.$message.error('上传图片大小不能超过5MB');
                return false;
            }
            return true;
        },
        //上传图片成功之后要做的工作
        handleImgSuccess(res, file) {
            let _this = this;
            if (res.code == 1) {
                _this.getDate();
                _this.$message.success('上传成功');
            } else {
                _this.$message.error('上传失败');
            }
        },
        //弹出删除窗口
        handleDelete(id) {
            this.idx = id;
            this.delVisible = true
        },
        //弹出删除窗口
        handleDelete1(id) {
            this.idx1 = id;
            this.delVisible1 = true
        },
        //弹出审核窗口
        handleReview(id) {
            this.idx = id;
            this.ReVisible = true
        },

        //弹出审核窗口
        handleReview1(id) {
            this.idx1 = id;
            this.ReVisible1 = true
        },
        //把已经选择的项赋值给multipleSelection
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //把已经选择的项赋值给multipleSelection
        handleSelectionChange1(val) {
            this.multipleSelection = val;
        },
        //批量删除已经选择的项
        delAll() {
            for (let item of this.multipleSelection) {
                this.handleDelete(item.shopId);//
                this.deleteRow();
            }
            this.multipleSelection = [];
        },
        delAllAc() {
            for (let item of this.multipleSelection) {
                this.handleDelete(item.acId);//
                this.deleteRow();
            }
            this.multipleSelection = [];
        },
        delAllUser() {
            for (let item of this.multipleSelection) {
                this.handleDelete(item.id);//
                this.deleteRow();
            }
            this.multipleSelection = [];
        },
        delAllSuggest() {
            for (let item of this.multipleSelection) {
                this.handleDelete(item.sugId);//
                this.deleteRow();
            }
            this.multipleSelection = [];
        },
        delAllArticle() {
            for (let item of this.multipleSelection) {
                this.handleDelete(item.id);//
                this.deleteRow();
            }
            this.multipleSelection = [];
        },
        delAllVideo() {
            for (let item of this.multipleSelection) {
                this.handleDelete1(item.id);//
                this.deleteRow1();
            }
            this.multipleSelection = [];
        },

    }
}