/**
 * Created by terrorblade on 2018/2/25.
 */
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
        incomeData:[],
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
        endDateSel:false,
        bankShow:false,
        bankValue:["工商银行","农业银行","招商银行"],
        bankValues:0,
        bankValueItem:"工商银行",
        page:1,
        size:3
    },
    onLoad(options){
        let  queryType=options.queryType,
            _this=this,
            personalData = wx.getStorageSync('loginData');
        console.log(queryType)
        console.log("adminDemand",personalData);
        this.setData({
            personalData:personalData,
            queryType:queryType,
            startValue:[date.getFullYear(), date.getMonth(), date.getDate()-1],
            endValue:[date.getFullYear(), date.getMonth(), date.getDate()-1],
            page:1,
            size:3
        });
        switch (queryType){
            case '1':
                _this.incomeData();
                break;
            case '2':
                _this.bankBalance();
                break;
            default:
                _this.otherIncome()
        }
    },
    incomeData(type){
        let personalData=this.data.personalData,
            dataObj={
                page:this.data.page,
                size:this.data.size,
                plusType:personalData.plusType,
                plusId:personalData.plusId,
            },
            _this=this;
            console.log("incomeData")
        if(type==1){
            dataObj.startTime=this.data.startYear.toString()+this.data.startMonth.toString()+this.data.startDay.toString();
            dataObj.userName=this.data.userName;
            dataObj.endTime=this.data.endYear.toString()+this.data.endMonth.toString()+this.data.endDay.toString();
            dataObj.bankId=this.data.bankValueItem;
            console.log(this.data.userName)
        }
        $.common('noteBankPlusManager//bank/findBankProfitListWechat.htm',"GET",dataObj,function (res,resData) {
                console.log("获取成功",res);
                if(!res.length){
                    wx.showToast({
                        title: '查询无结果',
                        icon: 'none',
                        duration: 1000
                    })
                }
                _this.setData({
                    incomeData:res,
                    incomeTotal:resData.total
                })
            },function (err) {
                wx.showToast({
                    title: '查询失败',
                    icon: 'none',
                    duration: 1000
                })
                console.log("获取失败",err)
            }
        )
    },
    bankBalance(type){
        console.log("bankBalance")
        let personalData=this.data.personalData,
            dataObj={
                page:this.data.page,
                size:this.data.size,
                plusType:personalData.plusType,
                plusId:personalData.plusId,
            },
            _this=this;
        if(type==2){
            dataObj.bankId=this.data.bankValues;
            console.log("银行查询")
        }
        $.common('noteBankPlusManager//bank/findBankListWechat.htm',"GET",dataObj,function (res) {
                console.log("获取成功",res);
                if(!res.length){
                    wx.showToast({
                        title: '查询无结果',
                        icon: 'none',
                        duration: 1000
                    })
                }
                _this.setData({
                    bankBalanceData:res
                })
            },function (err) {
                wx.showToast({
                    title: '查询失败',
                    icon: 'none',
                    duration: 1000
                })
                console.log("获取失败",err)
            }
        )
    },
    otherIncome(queryType){},
    query(){
        this.incomeData(1)
    },
    bankQuery(){
        this.bankBalance(2)
    },
    userNameInput(e){
        this.setData({
            userName:e.detail.value
        })
    },
    bankSel(){
        console.log("11")
        this.setData({
            dateShow:true,
            bankShow:true
        })
    },
    startBtn(){
        this.setData({
            dateShow:true,
            startDateSel:true
        })
    },
    endBtn(){
        this.setData({
            dateShow:true,
            endDateSel:true
        })
    },
    bindStartChange(e){
        let val = e.detail.value;
        this.setData({
            startValue:val
        })
    },
    bindEndChange(e){
        let val = e.detail.value;
        this.setData({
            endValue:val
        })
    },
    bankChange(e){
        let val = e.detail.value;
        this.setData({
            bankValues:val
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
    bankEns(){
        let val=this.data.bankValues,
            bankValue=this.data.bankValue;
        this.setData({
            bankValueItem:bankValue[val]
        })
    },
    hideShade(){
        this.setData({
            dateShow:false,
            startDateSel:false,
            endDateSel:false,
            bankShow:false
        })
    }
})