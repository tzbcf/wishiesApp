//index.js
//获取应用实例
Page({
  data: {
      clientData:[
          {
              userNameFirstChar:"夏",
              userName:"夏正国",
              uPhone:"18888888888",
              uSuperior:"刘德华",
              uIdNumber:"123456789123456789",
              uBirthday:"1970-12-10"
          },
          {
              userNameFirstChar:"刘",
              userName:"刘德华",
              uPhone:"18888888888",
              uSuperior:"刘德华",
              uIdNumber:"123456789123456789",
              uBirthday:"1970-12-10"
          },
          {
              userNameFirstChar:"毕",
              userName:"毕姥爷",
              uPhone:"18888888888",
              uSuperior:"刘德华",
              uIdNumber:"123456789123456789",
              uBirthday:"1970-12-10"
          },
      ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  }
})
