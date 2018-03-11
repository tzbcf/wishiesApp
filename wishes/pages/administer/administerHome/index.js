Page({
    data:{
        personalData:{}
    },
    onLoad(){
        wx.getUserInfo({
            success: res => {
                let userInfo=res.userInfo;
                this.setData({
                    userInfoImg:userInfo.avatarUrl
                })
            }
        });
        let personalData = wx.getStorageSync('loginData');
        this.setData({
            personalData:personalData
        })


        console.log(getCurrentPages())
    },
    exit(){
        wx.clearStorage();
        wx.reLaunch({
            url: '/pages/login/index'
        })
    },
    incomeRouter(){
        wx.navigateTo({
            url: '/pages/administer/adminDemand/index?queryType=1'
        })
    },
    bankRouter(){
        wx.navigateTo({
            url: '/pages/administer/adminDemand/index?queryType=2'
        })
    },
    oderRouter(){
        wx.navigateTo({
            url: '/pages/administer/adminDemand/index?queryType=3'
        })
    }
})