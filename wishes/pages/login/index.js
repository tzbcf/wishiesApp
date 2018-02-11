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
                this.setData({
                    userInfoImg:userInfo.avatarUrl
                })
            }
        })
    },
    userInput(e){
        this.setData({
            account:e.detail.value
        })
    },
    passInput(e){
        this.setData({
            password:e.detail.value
        })
    },
    login(){
        wx.showLoading({
            title: '加载中',
        });
        let account=this.data.account,
            password=this.data.password;
        if(account=='admin' && password=="12345"){
            wx.switchTab({
                url: '/pages/client/clientHome/index'
            })
        }else {
            setTimeout(function(){
                wx.showToast({
                    title: '密码错误',
                    icon: 'none',
                    duration: 2000
                })
            },2000)
        }
    }
});
