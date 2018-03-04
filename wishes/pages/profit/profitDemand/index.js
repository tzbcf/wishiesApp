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
        years: years,
        startYear: date.getFullYear(),
        endYear: date.getFullYear(),
        months: months,
        startMonth: $.util.formatNumber(date.getMonth()+1),
        endMonth: $.util.formatNumber(date.getMonth()+1),
        days: days,
        startDay: $.util.formatNumber(date.getDate()),
        endDay: $.util.formatNumber(date.getDate()),
        startValue: [date.getFullYear(), date.getMonth(), date.getDate()-1],
        endValue:[date.getFullYear(), date.getMonth(), date.getDate()-1],
        page:1,
        size:3,
        timeSorter:false,
        dateShow:false
    },
    onLoad(){
        let personalData = wx.getStorageSync('loginData');
        if(personalData.uType==0){
            let profitObj=wx.getStorageSync('profitObj');
            this.setData({
                profitData:profitObj.profitData,
                profitTotal:profitObj.profitTotal
            })
        }
        if(personalData.uType>2){
            let profitFenObj=wx.getStorageSync('profitFenObj');
            this.setData({
                profitFenData:profitFenObj.profitFenData,
                profitFenTotal:profitFenObj.profitFenTotal
            })
        }
        this.setData({
            personalData:personalData
        });
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
    hideShade(){
        this.setData({
            dateShow:false,
            startDateSel:false,
            endDateSel:false
        })
    },
    profitQuery(){
        let personalData=this.data.personalData,
            profitObj={
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                nTemStatus:1,
                page:this.data.page||1,
                size:this.data.size||3,
                startTime:this.data.startYear.toString()+"-"+this.data.startMonth.toString()+"-"+this.data.startDay.toString()+" "+"00:00:00",
                endTime:this.data.endYear.toString()+"-"+this.data.endMonth.toString()+"-"+this.data.endDay.toString()+" "+"00:00:00"
            },
            _this=this;
        if(personalData.uType==0){
            profitObj.nbNumber=_this.data.nbNumber||'';
            let superName=_this.data.superName;
            if(superName){
                _this.marketRequest(superName,profitObj);
            }else{
                _this.profitRequest(profitObj)
            }

        }
        if(personalData.uType>2){
            profitObj.sbdNumber=this.data.nbNumber||'';
            profitObj.sbdCustomer=this.data.sbdCustomer||'';
            profitObj.userIdM=personalData.userId;
            console.log("21",profitObj)
            _this.profitFenRequest(profitObj)
        }
        console.log(profitObj)
    },
    profitRequest(obj){
        let _this=this;
        $.common("noteBankPlusManager//note/findNoteProfitListWechat.htm","POST",$.util.fjson2Form(obj),function (res,resData) {
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
    profitFenRequest(obj){
        let _this=this;
        $.common("noteBankPlusManager//shareBenefit/findShareBenefitDetailWechat.htm","POST",$.util.fjson2Form(obj),function (res,resData) {
                console.log("成功",res)
                _this.setData({
                    profitFenData:res,
                    profitFenTotal:resData.total
                })
            },function (err) {
                console.log("失败",err)
            }
        )
    },
    marketRequest(superName,profitObj){
        let personalData=this.data.personalData,
            marketObj={
                plusId:personalData.plusId,
                plusType:personalData.plusType,
                type:2
            },
            _this=this;
        $.common("noteBankPlusManager//user/getUserIntelligentListWechat.htm","POST",$.util.fjson2Form(marketObj),function (res,resData) {
                console.log("成功",res)
                for(let data of res){
                    if(data.userName==superName){
                        if(data.uType==3){
                            profitObj.userIdM=data.userId
                        }
                        if(data.uType==5){
                            profitObj.superId=data.uSuperiorId
                        }
                        _this.profitRequest(profitObj)
                    }

                }
            },function (err) {
                console.log("失败",err)
            }
        )
    }
})