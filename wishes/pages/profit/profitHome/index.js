/**
 * Created by terrorblade on 2018/2/10.
 */
const $= getApp().globalData.$;
Page({
    data: {
        profitData:[],
        profitTotal:{},
        profitFenData:[],
        profitFenTotal:{},
        page:1,
        size:3
    },
    onLoad(){
        wx.getUserInfo({
            success: res => {
                let userInfo=res.userInfo;
                this.setData({
                    userInfoImg:userInfo.avatarUrl
                })
            }
        });
        let personalData = wx.getStorageSync('loginData');
        console.log("本地获取的数据",personalData)
        this.setData({
            personalData:personalData
        });
        if(personalData.uType==0){
            this.embellishRequest();
        }
        if(personalData.uType > 2){
            this.fenRunRequest();
        }
        console.log(getCurrentPages())
    },
    //事件处理函数
    goDemand(){
        let personalData=this.data.personalData;
        if(personalData.uType==0){
            let profitObj={
                profitData:this.data.profitData,
                profitTotal:this.data.profitTotal
            };
            wx.setStorage({
                key:"profitObj",
                data:profitObj,
                success:res => {
                    console.log("数据储存成功",res)
                }
            })
        }
        if(personalData.uType>2){
            let profitFenObj={
                profitFenData:this.data.profitFenData,
                profitFenTotal:this.data.profitFenTotal
            };
            wx.setStorage({
                key:"profitFenObj",
                data:profitFenObj,
                success:res => {
                    console.log("数据储存成功",res)
                }
            })
        }
        wx.navigateTo({
            url: '/pages/profit/profitDemand/index'
        })
    },
    embellishRequest () {
        let personalData=this.data.personalData,
            emDataObj={
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                page:this.data.page,
                size:this.data.size,
                nTemStatus:1
            },
            _this=this;
        $.common("noteBankPlusManager//note/findNoteProfitListWechat.htm","GET",emDataObj,function (res,resData) {
                console.log("成功",res)
                for(let d of res){
                    if(d.nBuyType==0){
                        d.nBuyTypeName='纸票'
                    }
                    if(d.nBuyType==1){
                        d.nBuyTypeName='半年电票'
                    }
                    if(d.nBuyType==2){
                        d.nBuyTypeName='一年电票'
                    }
                }
                _this.setData({
                    profitData:res,
                    profitTotal:resData.total
                })
            },function (err) {
                console.log("失败",err)
            }
        )
    },
    fenRunRequest(){
        let personalData=this.data.personalData,
            emDataObj={
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                page:this.data.page,
                size:this.data.size,
                userIdM:personalData.userId
            },
            _this=this;
        $.common("noteBankPlusManager//shareBenefit/findShareBenefitDetailWechat.htm","POST",$.util.fjson2Form(emDataObj),function (res,resData) {
                console.log("成功",resData.total)
                _this.setData({
                    profitFenData:res,
                    profitFenTotal:resData.total
                })
            },function (err) {
                console.log("失败",err)
            }
        )
    }
})