//logs.js
const $= getApp().globalData.$;
Page({
    data: {
    },
    onLoad: function () {
        let _this=this,userInfo;
        _this.getUser(userInfo)


    },
    getUser(userInfo){
        wx.getUserInfo({
            success: res => {
                userInfo=res.userInfo;
                console.log(userInfo)
                this.setData({
                    userInfoImg:userInfo.avatarUrl
                })
            }
        })
    },
});
