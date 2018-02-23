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
        endDateSel:false
    },
    onLoad(){
        let busData = wx.getStorageSync('busData'),
            personalData = wx.getStorageSync('loginData');
        console.log("bus",busData);
        this.setData({
            busData:busData,
            businessData:busData.rows,
            businessTotal:busData.total,
            personalData:personalData
        })
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
        let startTime=this.data.startYear.toString()+this.data.startMonth.toString()+this.data.startDay.toString(),
            endTime=this.data.endYear.toString()+this.data.endMonth.toString()+this.data.endDay.toString(),
            nbNumber=this.data.nbNumber,
            nbMarketer=this.data.nbMarketer,
            personalData=this.data.personalData,
            _this=this;
        $.common('noteBankPlusManager/note/findNoteBusinessListWechat.htm',"GET",{
                page:1,
                size:3,
                plusType:personalData.plusType,
                plusId:personalData.plusId,
                startTime:startTime,
                endTime:endTime,
                nbNumber:nbNumber,
                nbMarketer:nbMarketer
            },function (res) {
                console.log("获取成功",res);
                if(!res.length){
                    wx.showToast({
                        title: '查询无结果',
                        icon: 'none',
                        duration: 1000
                    })
                }
                _this.setData({
                    businessData:res
                })
            },function (err) {
                console.log("获取失败",err)
            }
        )
    }
})