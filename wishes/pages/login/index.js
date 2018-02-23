//logs.js
const $= getApp().globalData.$;
Page({
    data: {
    },
    onLoad: function () {
        let _this=this,userInfo;
        _this.getUser(userInfo);
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
        $.common("noteBankPlusManager/user/loginManagerWechat.htm","GET",{
            account:account,
            password:password
        },function (res) {
            console.log("成功",res)
            wx.reLaunch({
                url: '/pages/client/clientHome/index'
            })
            wx.setStorage({
                key:"loginData",
                data:res,
                success:res => {
                    console.log("数据储存成功",res)
                }
            })
            },function (err) {
                console.log("失败",err)
                wx.hideLoading();
                wx.showToast({
                    title: '密码错误',
                    icon: 'none',
                    duration: 2000
                })
               
            }
        )
    }
});
