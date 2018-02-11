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
        businessData:[
            {
                "nbCost": 9000,
                "nbParValue": 10000,
                "nbTypeName": "托收",
                "nTypeName": "纸票",
                "nbNetReceipts": 10000,
                "nbPayment": 0,
                "nbDate": "2017-11-26 09:26:16",
                "nbType": '买入',
                "noteBusinessId": 34,
                "nbNumber": "11111111114",
                "nbDiscount": 0.1,
                "nType": 1,
                "nbRealIncome": 10000,
                "nbMarketer": "张三"
            },
            {
                "nbCost": 9000,
                "nbParValue": 10000,
                "nbTypeName": "换出",
                "nTypeName": "纸票",
                "nbNetReceipts": 9000,
                "nbPayment": 0,
                "nbDate": "2017-11-26 09:22:54",
                "nbType": '卖出',
                "noteBusinessId": 33,
                "nbNumber": "11111111113",
                "nbDiscount": 0.1,
                "nType": 0,
                "nbRealIncome": 9000,
                "nbMarketer": "王五"
            }
        ],
        businessTotal:{
            "saleMoneyTotal": "10000.00",
            "exchangeMoneyTotal": "110000.00",
            "buyMoneyTotal": "100000.00"
        },
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 2,
        days: days,
        day: 2,
        value: [9999, 1, 1],
        timeSorter:false
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