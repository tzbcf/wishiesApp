/**
 * Created by terrorblade on 2018/2/10.
 */
const $= getApp().globalData.$;
Page({
    data:{
        stockData:[],
        stockTotal:{},
        page:1,
        size:3
    },
    onLoad(){
        console.log(getCurrentPages())
        let personalData = wx.getStorageSync('loginData');
        console.log("本地获取的数据",personalData)
        this.setData({
            personalData:personalData
        });
        this.stockRequest(personalData)
    },
    stockRequest(personalData){
        let _this=this,
            stockObj={
                page:this.data.page,
                size:this.data.size,
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                nTemStatus:2,
            }
        $.common('noteBankPlusManager//note/findNoteListWechat.htm',"POST",$.util.fjson2Form(stockObj),function (res,resData) {
                console.log("获取成功",res);
                console.log("获取成功",resData);
                _this.setData({
                    stockData:res,
                    stockTotal:resData.total
                })
            },function (err) {
                console.log("获取失败",err)
            }
        )
    },
    goDemand(){
        wx.navigateTo({
            url: '/pages/stock/stockDemand/index'
        })
    },
})