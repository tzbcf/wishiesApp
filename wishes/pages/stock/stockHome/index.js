/**
 * Created by terrorblade on 2018/2/10.
 */
const $= getApp().globalData.$;
Page({
    data:{
        stockData:[],
        stockTotal:{},
        page:1,
        size:6,
        reachBtn:false
    },
    onLoad(){
        console.log(getCurrentPages())
        let personalData = wx.getStorageSync('loginData'),
            stockObj={
                page:this.data.page,
                size:this.data.size,
                plusId:personalData.plusId,
                plusType:personalData.plusType
            };
        if(personalData.uType<3) {
            stockObj.nTemStatus = '';
        }else{
            stockObj.nTemStatus = 0;
        }
        console.log("本地获取的数据",personalData)
        this.setData({
            personalData:personalData,
            stockObj:stockObj
        });
        this.stockRequest()
    },
    stockRequest(){
        let _this=this,
            stockObj=this.data.stockObj,
            reachBtn=this.data.reachBtn,
            stockData=this.data.stockData,
            stockTotal=this.data.stockTotal;
        if(!reachBtn){
            $.common('noteBankPlusManager//note/findNoteListWechat.htm',stockObj,
                function (res,resData) {
                    console.log("获取成功",res);
                    console.log("获取成功",resData);
                    for(let item of res){
                        stockData.push(item)
                    }
                    _this.setData({
                        stockData:stockData,
                        stockTotal:resData.total
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
        }
    },
    onReachBottom(){
        console.log('111')
        let _this=this,
            stockObj=this.data.stockObj,
            reachBtn=this.data.reachBtn;
        if(!reachBtn){
            stockObj.page++;
            this.setData({
                clientObj:stockObj
            });
            this.stockRequest()
        }
    },
    goDemand(){
        wx.navigateTo({
            url: '/pages/stock/stockDemand/index'
        })
    },
})