/**
 * Created by terrorblade on 2018/2/10.
 */
Page({
    data: {
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
        }
    },
    onLoad: function () {
    },
    goDemand(){
        wx.navigateTo({
            url: '/pages/business/businessDemand/index'
        })
    }
})