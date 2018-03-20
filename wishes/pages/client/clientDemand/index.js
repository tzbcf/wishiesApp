const $= getApp().globalData.$;

Page({
    data:{
        clientData:[],
        demand:true,
        size:6,
        identityId:"",
        reachBtn:false,
        addClient:false
    },
    onLoad(options){
        console.log(getCurrentPages())

        let personalData = wx.getStorageSync('loginData'),
            clientDeObj={
                page : 1,
                size : this.data.size || 6,
                plusType:personalData.plusType,
                plusId:personalData.plusId
            };
        if(personalData.uType>2){
            clientDeObj.userIdM=personalData.userId || '';
        }
        if(options.addClient){
            let addClientDetial = wx.getStorageSync('addClientDetial'),
                clientData=this.data.clientData;
            clientData.push(addClientDetial);
            this.setData({
                addClient:true,
                clientData:clientData
            })
        }
        this.setData({
            personalData:personalData,
            clientDeObj:clientDeObj,
        });
        this.clientDeRequest();
        console.log(personalData.uType);
        console.log("config",$.config.API_ROOT)
    },
    nameInput(e){
        this.setData({
            userName:e.detail.value
        })
    },
    phoneInput(e){
        this.setData({
            uPhone:e.detail.value
        })
    },
    demandData(){
        console.log("111");
        let clientDeObj=this.data.clientDeObj;
        clientDeObj.userName=this.data.userName || '';
        clientDeObj.uPhone=this.data.uPhone || '';
        clientDeObj.page=1;
        this.setData({
            clientDeObj:clientDeObj,
            reachBtn:false,
            clientData:[]
        });
        this.clientDeRequest()
    },
    clientDeRequest(){
        let _this=this,
            clientDeObj=this.data.clientDeObj,
            reachBtn=this.data.reachBtn,
            clientData=this.data.clientData;
        if(!reachBtn){
            $.common('noteBankPlusManager/user/getUserListWechat.htm',clientDeObj,
                function (res) {
                    console.log("获取成功",res);
                    if(res.length){
                        for(let item of res){
                            clientData.push(item)
                        }
                        _this.setData({
                            clientData:clientData
                        });
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
                            reachBtn:true
                        })
                    }

                },function (err) {
                    wx.showToast('服务不可用');
                    console.log("获取失败",err)
                }
            )
        }
    },
    onReachBottom(){
        let _this=this,
            clientDeObj=this.data.clientDeObj,
            reachBtn=this.data.reachBtn;
        console.log(clientDeObj);
        if(!reachBtn){
            clientDeObj.page++;
            this.setData({
                clientDeObj:clientDeObj
            });
            this.clientDeRequest()
        }
    },
    addData(){
        wx.navigateTo({
            url: '/pages/client/clientDetail/index'
        });
    },

    modifyUser(e){
        let index=e.currentTarget.id,
            specificInfo=this.data.clientData[index],
            personalData=this.data.personalData;
        if(personalData.uType<2){
            wx.setStorage({
                key:"specificInfo",
                data:specificInfo,
                success:res => {
                    console.log("数据储存成功",res)
                }
            })
            wx.navigateTo({
                url: '/pages/client/clientDetail/index?demand=false'
            });
        }
        console.log("index",specificInfo)
    }
});