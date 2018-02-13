const $= getApp().globalData.$;
Page({
    data:{
        clientData:[],
        demand:true,
        identityId:"",
        page:1,
        size:1
    },
    onLoad(){
        let clientData = wx.getStorageSync('clientData'),
            personalData = wx.getStorageSync('loginData');
        this.setData({
            clientData:clientData,
            personalData:personalData
        })
        console.log(personalData.uType)
    },
    nameInput(e){
        this.setData({
            userName:e.detail.value
        })
    },
    phoneInput(e){
        this.setData({
            uPhone:e.detail.value
        })
    },
    demandData(){
        console.log("111")
        let userName = this.data.userName,
            uPhone = this.data.uPhone,
            page = this.data.page,
            size = this.data.size,
            _this =this,
            personalData = this.data.personalData;
        $.common('noteBankPlusManager/user/getUserListWechat.htm',"GET",{
          page:page,
          size:size, 
          plusType:personalData.plusType,
          plusId:personalData.plusId,
          userName:userName,
          uPhone:uPhone
        },function (res) {
          console.log("获取成功",res);
          _this.setData({
            clientData:res
          })
        },function (err) {
          console.log("获取失败",err)
        }
        )   
    },
    addIdentityId(){
        let _this=this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                _this.setData({
                    identityId:res.tempFilePaths
                })
            }
        })
    },
    addData(){
        this.setData({
            demand:false
        })
    },
    addAffirm(){
        this.setData({
            demand:true
        })
    }
});