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
        })
    },
    exit(){
        wx.redirectTo({
            url: '/pages/login/index'
        })
    }
})