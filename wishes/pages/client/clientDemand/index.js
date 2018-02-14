const $= getApp().globalData.$,
      date = new Date(),
      years = [],
      months = [],
      days = [];

for (let i = 1960; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}

Page({
    data:{
        clientData:[],
        demand:false,
        identityId:"",
        page:1,
        size:1,
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 2,
        days: days,
        day: 2,
        value: [9999, 1, 1],
        birthdayShow:false
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
     userNameInput(e){
        this.setData({
            uPhone:e.detail.value
        })
    },
     userPhoneInput(e){
        this.setData({
            uPhone:e.detail.value
        })
    },
     idCardInput(e){
        this.setData({
            uPhone:e.detail.value
        })
    },
    birthdayInput(e){
        this.setData({
            birthdayShow:true
        })
    },
    bindChange: function(e) {
      const val = e.detail.value
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]]
      })
    },
     openBankInput(e){
        this.setData({
            uPhone:e.detail.value
        })
    },
     bankInput(e){
        this.setData({
            uPhone:e.detail.value
        })
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
    },
    hideShade(){
      console.log("11111")
      this.setData({
            birthdayShow:false
        })
    }
});