const date = new Date();
const years = [];
const months = [];
const days = [];

for (let i = 1990; i <= date.getFullYear(); i++) {
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
        stockData:[
            {
                "nExpireTimeIn": "2017-11-26",
                "nNumber": "11111111115",
                "nTypeName": "纸票",
                "nTemName": "",
                "nEnterBankIn": "建设银行",
                "nMoney": 10000,
                "nType": 0,
                "nSalePrice": "",
                "nOpenTime": "2017-11-26",
                "nBuyDiscount": 0.1,
                "noteId": 19,
                "nBuyTime": "2017-11-26 09:13:41"
            },
            {
                "nExpireTimeIn": "2017-11-26",
                "nNumber": "11111111116",
                "nTypeName": "纸票",
                "nTemName": "",
                "nEnterBankIn": "招商银行",
                "nMoney": 10000,
                "nType": 0,
                "nSalePrice": "",
                "nOpenTime": "2017-11-26",
                "nBuyDiscount": 0.1,
                "noteId": 20,
                "nBuyTime": "2017-11-26 09:13:41"
            }
        ],
        stockTotal:{
            "businessHalfYearMoneyTotal": "0",
            "financeYearMoneyTotal": "0",
            "businessYearMoneyTotal": "0",
            "paperMoneyTotal": "150000.00",
            "electroHalfYearMoneyTotal": "0",
            "financeHalfYearMoneyTotal": "0",
            "electroYearMoneyTotal": "0"
        },
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 2,
        days: days,
        day: 2,
        value: [9999, 1, 1],
        timeSorter:false,
        navActive:0
    },
    onLoad(){
        console.log(getCurrentPages())
        let personalData = wx.getStorageSync('loginData');
        console.log("本地获取的数据",personalData)
        this.setData({
            personalData:personalData
        });
    },
    inventoryTap(){
        this.setData({
            navActive:0
        })
    },
    temporaryTap(){
        this.setData({
            navActive:1
        })
    },
    shortTap(){
        this.setData({
            navActive:2
        })
    },
    bindChange(e) {
        const val = e.detail.value
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]]
        })
    }
})