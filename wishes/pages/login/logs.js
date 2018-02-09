//logs.js
const $= getApp().globalData.$;
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    console.log($.util.formatMoney(556))
  },
  add(){
      let _this=this;
    console.log("aaa");
    this.setData({
        showToast:true
    });
    wx.showToast({
        title: '数据加载中',
        icon: 'loading',
        duration: 3000
    },function () {
        _this.setData({
            showToast:false
        });
    });
  }
});
