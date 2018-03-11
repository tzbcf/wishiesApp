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
        size:6,
        reachBtn:false
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
        let personalData = wx.getStorageSync('loginData'),
            profitObj={
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                page:this.data.page,
                size:this.data.size
            }
        console.log("本地获取的数据",personalData)
        this.setData({
            personalData:personalData,
            profitObj:profitObj
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
        wx.navigateTo({
            url: '/pages/profit/profitDemand/index'
        })
    },
    embellishRequest () {
        let profitObj=this.data.profitObj,
            _this=this,
            profitData=this.data.profitData,
            profitTotal=this.data.profitTotal,
            reachBtn=this.data.reachBtn;
        profitObj.nTemStatus=1;
        if(!reachBtn){
            $.common("noteBankPlusManager//note/findNoteProfitListWechat.htm",profitObj,
                function (res,resData) {
                    if(res.length){
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
                            profitData.push(d)
                        }
                        _this.setData({
                            profitData:profitData,
                            profitTotal:resData.total
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
                    }else{
                        wx.showToast({
                            title: '查询无结果',
                            icon: 'none',
                            duration: 1000
                        })
                    }

                },function (err) {
                    console.log("失败",err)
                }
            )
        }

    },
    fenRunRequest(){
        let profitObj=this.data.profitObj,
            personalData=this.data.personalData,
            reachBtn=this.data.reachBtn,
            profitFenData=this.data.profitFenData,
            profitFenTotal=this.data.profitFenTotal,
            _this=this;
            profitObj.userIdM=personalData.userId;
        if(!reachBtn){
            $.common("noteBankPlusManager//shareBenefit/findShareBenefitDetailWechat.htm",profitObj,
                function (res,resData) {
                    if(res.length){
                        for(let d of res){
                            profitFenData.push(d)
                        }
                        _this.setData({
                            profitFenData:profitFenData,
                            profitFenTotal:resData.total
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
                    }else{
                        wx.showToast({
                            title: '查询无结果',
                            icon: 'none',
                            duration: 1000
                        })
                    }

                },function (err) {
                    console.log("失败",err)
                }
            )
        }
    },
    onReachBottom(){
        let _this = this,
            profitObj = this.data.profitObj,
            reachBtn = this.data.reachBtn,
            personalData = this.data.personalData;
        console.log(profitObj);
        if (!reachBtn) {
            profitObj.page++;
            this.setData({
                profitObj: profitObj
            });
            if (personalData.uType == 0) {
                this.embellishRequest();
            }
            if (personalData.uType > 2) {
                this.fenRunRequest();
            }
        }
    }
})