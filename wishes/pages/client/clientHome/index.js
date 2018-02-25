//index.js
//获取应用实例
const $= getApp().globalData.$;
Page({
  data: {
      clientData:[],
      page:1,
      size:3
  },
  onLoad(){
    let personalData = wx.getStorageSync('loginData');
    console.log("本地获取的数据",personalData)
    this.setData({
      personalData:personalData
    })

      console.log(getCurrentPages())

    this.getClientData()
  },
  getClientData(){
    let page = this.data.page,
        _this=this,
        size = this.data.size,
        personalData = this.data.personalData
    $.common('noteBankPlusManager/user/getUserListWechat.htm',"GET",{
      page:page,
      size:size,
      plusType:personalData.plusType,
      plusId:personalData.plusId
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
  //事件处理函数
    goDemand(){
      let clientData=this.data.clientData;
      wx.setStorage({
        key:"clientData",
        data:clientData,
        success:res => {
            console.log("数据储存成功",res)
        }
      })
      wx.navigateTo({
          url: '/pages/client/clientDemand/index'
      })
    }
})
