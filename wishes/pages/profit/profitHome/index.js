/**
 * Created by terrorblade on 2018/2/10.
 */
Page({
    data: {
        profitData:[
            {
                "nbCost": 9000,
                "nbParValue": 10000,
                "nbTypeName": "托收",
                "nTypeName": "纸票",
                "nbNetReceipts": 10000,
                "nbPayment": 0,
                "nbDate": "2017-11-26 09:26:16",
                "nbType": '买入',
                "noteprofitId": 34,
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
                "noteprofitId": 33,
                "nbNumber": "11111111113",
                "nbDiscount": 0.1,
                "nType": 0,
                "nbRealIncome": 9000,
                "nbMarketer": "王五"
            }
        ],
        profitTotal:{
            "sum": {
                "subtotalActualSum": 1.4249,
                "subtotalYingSum": 1872.45,
                "subtotalProfitSum": 1.4249,
                "subtotalShareum": 34217.99
            },
            "businessHalfYearMoneyTotal": "0",
            "businessYearMoneyTotal": "0",
            "paperMoneyTotal": "120165",
            "electroHalfYearMoneyTotal": "223157",
            "financeHalfYearMoneyTotal": "0",
            "electroYearMoneyTotal": "1812",
            "financeYearMoneyTotal":"25522"
        }
    },
    onLoad(){
        console.log(getCurrentPages())
    },
    //事件处理函数
    goDemand(){
        wx.navigateTo({
            url: '/pages/profit/profitDemand/index'
        })
    },
    onLoad: function () {
    }
})