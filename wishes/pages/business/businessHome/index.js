/**
 * Created by terrorblade on 2018/2/10.
 */
const $= getApp().globalData.$;
Page({
    data: {
        businessData:[],
        businessTotal:{},
        page:1,
        size:3
    },
    onLoad: function () {
        let personalData = wx.getStorageSync('loginData');
        console.log("本地获取的数据",personalData)
        this.setData({
            personalData:personalData
        });
        this.acquireBussinessData()
    },
    acquireBussinessData(){
        let page = this.data.page,
            _this=this,
            size = this.data.size,
            personalData = this.data.personalData;
        $.common('noteBankPlusManager/note/findNoteBusinessListWechat.htm',"GET",{
                page:page,
                size:size,
                plusType:personalData.plusType,
                plusId:personalData.plusId
            },function (res,resData) {
                console.log("获取成功",res);
                console.log("获取成功",resData);
                _this.setData({
                    businessData:res,
                    businessTotal:resData.total,
                    busData:resData
                })
            },function (err) {
                console.log("获取失败",err)
            }
        )
    },
    goDemand(){
        let busData=this.data.busData;
        wx.setStorage({
            key:"busData",
            data:busData,
            success:res => {
                console.log("数据储存成功",res)
            }
        })
        wx.navigateTo({
            url: '/pages/business/businessDemand/index'
        })
    }
})