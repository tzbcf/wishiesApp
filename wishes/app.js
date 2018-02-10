//app.js
const $ = require("./base/global");
const config = require('./base/config.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    });
    // 获取用户信息
    this.getSet();
  },
  getSet(){
    let _this=this;
    wx.getSetting({
        success : res => {
          if(!res.authSetting['scope.userInfo']){
              _this.author()
          }
        }
    })
  },
  author(){
      wx.authorize({
        scope:'scope.userInfo',
        success: res => {},
        fail: err => {
          console.log("err",err)
        }
      })
  },
  globalData: {
      config:config,
      $:$
  }
})