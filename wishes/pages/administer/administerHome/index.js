Page({
    data:{
        alone:false,
        personalData:{
            userName:"夏正国",
            uIdNumber:"123456123412131456",
            uPhone:"1234566548"
        }
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
        console.log("本地获取的数据",personalData)
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
    }
})