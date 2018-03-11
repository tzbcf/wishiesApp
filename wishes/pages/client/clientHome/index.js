//index.js
//获取应用实例
const $= getApp().globalData.$;
Page({
  data: {
      clientData:[],
      page:1,
      size:6,
      reachBtn:false
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
    let personalData=this.data.personalData,
        clientObj={
            page:this.data.page,
            size:this.data.size,
            plusType:personalData.plusType,
            plusId:personalData.plusId
        };
        this.setData({
            clientObj:clientObj
        });
      this.clientRequset()
  },
  clientRequset(){
      let _this=this,
          clientObj=this.data.clientObj,
          reachBtn=this.data.reachBtn,
          clientData=this.data.clientData;
      $.common('noteBankPlusManager/user/getUserListWechat.htm',clientObj,
          function (res) {
              console.log("获取成功",res);
              for(let item of res){
                  clientData.push(item)
              }
              _this.setData({
                  clientData:clientData
              })
              if(res.length<6){
                  wx.showToast({
                      title: '已全部加载',
                      icon: 'success',
                      duration: 1000
                  })
                  _this.setData({
                      reachBtn:true
                  })
              }
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
  },
    onReachBottom(){
      console.log('111')
        let _this=this,
            clientObj=this.data.clientObj,
            reachBtn=this.data.reachBtn;
        if(!reachBtn){
            clientObj.page++;
            this.setData({
                clientObj:clientObj
            });
            this.clientRequset()
        }
    },
    modifyUser(e){
        let index=e.currentTarget.id,
            specificInfo=JSON.stringify(this.data.clientData[index]);
        wx.navigateTo({
            url: '/pages/client/clientDemand/index?demand=false&specificInfo='+specificInfo
        });
    }
})
