//logs.js
const $= getApp().globalData.$;
Page({
    data: {
    },
    onLoad: function () {
        let _this=this,userInfo;
        _this.getUser(userInfo);//获取头像
        console.log(getCurrentPages())
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
        this.setData({//获取账号
            account:e.detail.value
        })
    },
    passInput(e){
        this.setData({//获取密码
            password:e.detail.value
        })
    },
    login(){
        wx.showLoading({
            title: '加载中',
        });
        let loginObj={
            account:this.data.account,
            password:this.data.password
        };
        $.common("noteBankPlusManager/user/loginManagerWechat.htm",loginObj,//登录
            function (res) {
                console.log("成功",res);
                if(res.uType==4){
                    wx.showToast({
                        title: '客户暂时无权限',
                        icon: 'none',
                        duration: 2000
                    })
                }else{
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
                }

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
