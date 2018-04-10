/**
 * Created by terrorblade on 2018/2/10.
 */
const $= getApp().globalData.$;
Page({
    data: {
        businessData:[],
        businessTotal:{},
        page:1,
        size:6,
        reachBtn:false
    },
    onLoad: function () {
        console.log(getCurrentPages())
        let personalData = wx.getStorageSync('loginData'),
            businessObj={
                page:1,
                size:this.data.size,
                plusType:personalData.plusType,
                plusId:personalData.plusId,
                nbNumber:'',
                nbMarketer:''
            };
        let date=new Date(),
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
        businessObj.startTime=date.getFullYear().toString()+"-"+buseinessMonth.toString()+"-"+buseinsessDay.toString();
        businessObj.endTime=date.getFullYear().toString()+"-"+buseinessMonth.toString()+"-"+buseinsessDay.toString();
        if(personalData.uType>2){
            businessObj.userIdM=personalData.userId || '';
        }
        console.log("本地获取的数据",personalData);

        this.setData({
            personalData:personalData,
            businessObj:businessObj
        });

        this.acquireBussinessData()
    },
    acquireBussinessData(){
        let _this=this,
            reachBtn=this.data.reachBtn,
            businessData=this.data.businessData,
            businessTotal=this.data.businessTotal,
            businessObj=this.data.businessObj;
        if(!reachBtn){
            $.common('noteBankPlusManager/note/findNoteBusinessListWechat.htm',businessObj,
                function (res,resData) {
                    for(let item of res){
                        businessData.push(item)
                    }
                    _this.setData({
                        businessData:businessData,
                        businessTotal:resData.total,
                    })
                    if(res.length<6){
                        wx.showToast({
                            title: '已全部加载',
                            icon: 'success',
                            duration: 1000
                        });
                        _this.setData({
                            reachBtn:true
                        })
                    }
                },function (err) {
                    console.log("获取失败",err)
                }
            )
        }
    },
    onReachBottom(){
        console.log('111')
        let _this=this,
            businessObj=this.data.businessObj,
            reachBtn=this.data.reachBtn;
        if(!reachBtn){
            businessObj.page++;
            this.setData({
                businessObj:businessObj
            });
            this.acquireBussinessData()
        }
    },
    goDemand(){
        wx.navigateTo({
            url: '/pages/business/businessDemand/index'
        })
    }
})