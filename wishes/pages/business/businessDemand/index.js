const date = new Date();
const years = [];
const months = [];
const days = [];
const $= getApp().globalData.$;
for (let i = 0; i <= date.getFullYear(); i++) {
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
        businessData:[],
        businessTotal:{},
        page:1,
        size:6,
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
        dateShow:false,
        startDateSel:false,
        endDateSel:false,
        reachBtn:false
    },
    onLoad(){
        console.log(getCurrentPages())
        let personalData = wx.getStorageSync('loginData'),
            buseinessMonth,
            buseinsessDay;
        if(date.getMonth()+1 > 9){
            buseinessMonth=date.getMonth()+1
        }else{
            buseinessMonth="0"+(date.getMonth()+1)
        }
        if(date.getDate() > 9){
            buseinsessDay=date.getDate()
        }else{
            buseinsessDay="0"+date.getDate()
        }
        let businessDeObj={
                page:1,
                size:this.data.size,
                plusType:personalData.plusType,
                plusId:personalData.plusId,
                startTime:date.getFullYear().toString()+"-"+buseinessMonth.toString()+"-"+buseinsessDay.toString(),
                endTime:date.getFullYear().toString()+"-"+buseinessMonth.toString()+"-"+buseinsessDay.toString()
            };
        if(personalData.uType>2){
            businessDeObj.userIdM=personalData.userId || '';
        }
        this.setData({
            personalData:personalData,
            businessDeObj:businessDeObj
        });
        this.businessDeRequest();
    },
    onReachBottom(){
        let _this=this,
            businessDeObj=this.data.businessDeObj,
            reachBtn=this.data.reachBtn;
        console.log(businessDeObj);
        if(!reachBtn){
            businessDeObj.page++;
            this.setData({
                businessDeObj:businessDeObj
            });
            this.businessDeRequest()
        }
    },
    businessDeRequest(){
        let reachBtn=this.data.reachBtn,
            businessDeObj=this.data.businessDeObj,
            businessData=this.data.businessData,
            businessTotal=this.data.businessTotal,
            _this=this;
        if(!reachBtn){
            $.common('noteBankPlusManager/note/findNoteBusinessListWechat.htm',businessDeObj,
                function (res,resData) {
                    console.log("获取成功",res);
                    if(!res.length){
                        wx.showToast({
                            title: '查询无结果',
                            icon: 'none',
                            duration: 1000
                        })
                        _this.setData({
                            businessTotal:resData.total
                        })
                    }else{
                        for(let item of res){
                            businessData.push(item)
                        }
                        _this.setData({
                            businessData:businessData,
                            businessTotal:resData.total
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
                    }

                },function (err,resData){
                    wx.showToast({
                        title: '查询失败',
                        icon: 'none',
                        duration: 1000
                    });
                    console.log("获取失败",err)
                }
            )
        }

    },
    silverTicket(e){
        this.setData({
            nbNumber:e.detail.value
        })
    },
    userName(e){
        this.setData({
            nbMarketer:e.detail.value
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
    query(){
        let _this=this,businessDeObj=this.data.businessDeObj;
        businessDeObj.startTime=this.data.startYear.toString()+"-"+this.data.startMonth.toString()+"-"+this.data.startDay.toString() || '';
        businessDeObj.endTime=this.data.endYear.toString()+"-"+this.data.endMonth.toString()+"-"+this.data.endDay.toString() || '';
        businessDeObj.nbNumber=this.data.nbNumber || '';
        businessDeObj.nbMarketer=this.data.nbMarketer || '';
        this.setData({
            businessDeObj:businessDeObj,
            businessData:[],
            reachBtn:false
        })
        console.log(typeof businessDeObj.nbNumber)
        this.businessDeRequest()
    }
})