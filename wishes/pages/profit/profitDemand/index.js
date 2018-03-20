const date = new Date();
const years = [];
const months = [];
const days = [];
const $= getApp().globalData.$;
for (let i = 1960; i <= date.getFullYear(); i++) {
    years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
    months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
    days.push(i)
}

Page({
    data:{
        profitData:[],
        profitTotal:{},
        profitFenData:[],
        profitFenTotal:[],
        years: years,
        startYear: date.getFullYear(),
        endYear: date.getFullYear(),
        months: months,
        startMonth: $.util.formatNumber(date.getMonth()+1),
        endMonth: $.util.formatNumber(date.getMonth()+1),
        days: days,
        startDay: $.util.formatNumber(date.getDate()),
        endDay: $.util.formatNumber(date.getDate()),
        startValue: [date.getFullYear()-1960, date.getMonth(), date.getDate()-1],
        endValue:[date.getFullYear()-1960, date.getMonth(), date.getDate()-1],
        page:1,
        size:6,
        uSuperiorValues:0,
        uSuperiorValue:[],
        timeSorter:false,
        dateShow:false,
        reachBtn:false
    },
    onLoad(){
        let personalData = wx.getStorageSync('loginData'),
            profitObj={
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                page:this.data.page||1,
                size:this.data.size||6,
            };
        this.setData({
            personalData:personalData,
            profitObj:profitObj
        })
        if(personalData.uType==0){
            this.profitRequest()
        }
        if(personalData.uType>2){
            wx.setNavigationBarTitle({
                title: '分润查询',
            })
            this.profitFenRequest()
        }

        console.log(personalData);
        console.log(getCurrentPages())
    },
    silverInput(e){
        let val=e.detail.value;
        this.setData({
            nbNumber:val
        })
    },
    userInput(e){
        let val=e.detail.value;
        this.setData({
            sbdCustomer:val
        })
    },
    superInput(e){
        let val=e.detail.value;
        this.setData({
            superName:val
        })
    },
    startBtn(){
        this.setData({
            dateShow:true,
            startDateSel:true
        })
    },
    bindStartChange(e){
        let val = e.detail.value;
        this.setData({
            startValue:val
        })
    },
    bindStartEns(){
        let val=this.data.startValue;
        this.setData({
            startYear: this.data.years[val[0]],
            startMonth: $.util.formatNumber(this.data.months[val[1]]),
            startDay: $.util.formatNumber(this.data.days[val[2]]),
            dateShow:false,
            startDateSel:false
        })
    },
    endBtn(){
        this.setData({
            dateShow:true,
            endDateSel:true
        })
    },
    bindEndChange(e){
        let val = e.detail.value;
        this.setData({
            endValue:val
        })
    },
    bindEndEns(){
        let val=this.data.endValue;
        this.setData({
            endYear: this.data.years[val[0]],
            endMonth: $.util.formatNumber(this.data.months[val[1]]),
            endDay: $.util.formatNumber(this.data.days[val[2]]),
            endShow:false,
            endDateSel:false
        })
    },
    uSuperiorBtn(){
        this.acquireSuperior();
        this.setData({
            dateShow:true,
            uSuperior:true
        })
    },
    bindSuperiorChange(e){
        let val = e.detail.value;
        this.setData({
            uSuperiorValues:val
        })
    },
    bindSuperiorEns(){
        let val=this.data.uSuperiorValues,
            value=this.data.uSuperiorValue[val];
        this.setData({
            uSuperiorName:value.userName
        })
    },
    hideShade(){
        this.setData({
            dateShow:false,
            startDateSel:false,
            endDateSel:false,
            uSuperior:false
        })
    },
    acquireSuperior(){
        let personalData=this.data.personalData,
            _this=this,
            userAssObj={
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                type:2
            };
        $.common('noteBankPlusManager//user/getUserIntelligentListWechat.htm',userAssObj,
            function (res) {
                _this.setData({
                    uSuperiorValue:res
                })
            },function (err) {
                console.log("获取失败",err)
            }
        )
    },
    profitQuery(){
        let personalData=this.data.personalData,
            profitObj=this.data.profitObj,
            _this=this;
        this.setData({
            reachBtn:false
        })
        if(personalData.uType==0){
            profitObj.nbNumber=_this.data.nbNumber||'';
            profitObj.nTemStatus=1;
            profitObj.startTime=this.data.startYear.toString()+"-"+this.data.startMonth.toString()+"-"+this.data.startDay.toString() || '';
            profitObj.endTime=this.data.endYear.toString()+"-"+this.data.endMonth.toString()+"-"+this.data.endDay.toString() || '';
            let superName=_this.data.uSuperiorName;
            if(this.data.uSuperiorValue.length){
                profitObj.userIdM=this.data.uSuperiorValue[this.data.uSuperiorValues].userId
            }else{
                profitObj.userIdM='';
            }

            this.setData({
                profitObj:profitObj,
                profitData:[]
            })
            console.log("323",_this.data.reachBtn);


            _this.profitRequest()


        }
        if(personalData.uType>2){
            profitObj.sbdNumber=this.data.nbNumber||'';
            profitObj.sbdCustomer=this.data.sbdCustomer||'';
            profitObj.userIdM=personalData.userId;
            profitObj.startTime=this.data.startYear.toString()+"-"+this.data.startMonth.toString()+"-"+this.data.startDay.toString() || '';
            profitObj.endTime=this.data.endYear.toString()+"-"+this.data.endMonth.toString()+"-"+this.data.endDay.toString() || '';
            this.setData({
                profitObj:profitObj,
                profitFenData:[]
            })
            _this.profitFenRequest()
        }
        console.log(profitObj)
    },
    profitRequest(){
        let _this=this,
            reachBtn=this.data.reachBtn,
            profitObj=this.data.profitObj,
            profitData=this.data.profitData,
            profitTotal=this.data.profitTotal;
            profitObj.nTemStatus=1;
            console.log("223",reachBtn)
        if(!reachBtn){
            console.log("223")
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
                        _this.setData({
                            profitTotal:resData.total
                        })
                    }

                },function (err) {
                    console.log("失败",err)
                }
            )
        }

    },
    profitFenRequest(){
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
                        _this.setData({
                            profitFenTotal:resData.total
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
                this.profitRequest();
            }
            if (personalData.uType > 2) {
                this.profitFenRequest();
            }
        }
    },
    marketRequest(superName,profitObj){
        let personalData=this.data.personalData,
            marketObj={
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                type:2
            },
            _this=this;
        $.common("noteBankPlusManager//user/getUserIntelligentListWechat.htm",marketObj,
            function (res,resData) {
                console.log("成功",res)
                for(let data of res){
                    if(data.userName==superName){
                        if(data.uType==3){
                            profitObj.userIdM=data.userId
                        }
                        if(data.uType==5){
                            profitObj.superId=data.uSuperiorId
                        }
                        _this.setData({
                            profitObj:profitObj
                        })
                        _this.profitRequest()
                    }

                }
            },function (err) {
                console.log("失败",err)
            }
        )
    }
})