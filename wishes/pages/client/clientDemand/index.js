const $= getApp().globalData.$,
      date = new Date(),
      years = [],
      months = [],
      days = [];

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
        clientData:[],
        demand:true,
        identityId:"",
        page:1,
        size:6,
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 1,
        days: days,
        day: 1,
        value: [date.getFullYear()-1960, 0, 0],
        birthdayShow:false,
        maskShow:false,
        userSort:false,
        userSortVal:'',
        userSortValue:['营销员','客户','营销主管'],
        userSortValues:0,
        uSuperiorValue:[],
        uSuperior:false,
        uSuperiorValues:0,
        reachBtn:false
    },
    onLoad(options){
        console.log(getCurrentPages())
        let clientData = wx.getStorageSync('clientData'),
            personalData = wx.getStorageSync('loginData'),
            clientDeObj={
                page : 1,
                size : this.data.size,
                plusType:personalData.plusType,
                plusId:personalData.plusId
            };
        if(options){
            let demand=options.demand ? false :true,
                specificInfo=JSON.parse(options.specificInfo),
                uAddUserName=specificInfo.userName,
                uPhone=specificInfo.uPhone,
                uIdNumber=specificInfo.uIdNumber;
            this.setData({
                demand:demand,
                specificInfo:specificInfo,
                uAddUserName:uAddUserName,
                uPhone:uPhone,
                uIdNumber:uIdNumber
            })
        }
        this.setData({
            clientData:clientData,
            personalData:personalData,
            clientDeObj:clientDeObj,
        });
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
     userNameInput(e){
        this.setData({
            uAddUserName:e.detail.value
        })
    },
     userPhoneInput(e){
        this.setData({
            uPhone:e.detail.value
        })
    },
     idCardInput(e){
        this.setData({
            uIdNumber:e.detail.value
        })
    },
    birthdayInput(e){
         console.log("111");
        this.setData({
            maskShow:true,
            birthdayShow:true
        })
    },
    bindBirthdayChange(e) {
      let val = e.detail.value;
      this.setData({
        birthdayVal:val
      })
    },
    bindBirthdayEns(){
        let val=this.data.birthdayVal || this.data.value;
        this.setData({
            year: this.data.years[val[0]],
            month: this.data.months[val[1]],
            day: this.data.days[val[2]],
            value:val
        })
    },
     openBankInput(e){
        this.setData({
            uBankDeposit:e.detail.value
        })
    },
     bankInput(e){
        this.setData({
            uBankCard:e.detail.value
        })
    },
    userSortBtn(e){
         this.setData({
             maskShow:true,
             userSort:true
         })
    },
    bindUserSortChange(e){
        let val = e.detail.value,
            value=this.data.userSortValue[val];
        this.setData({
            userSortVal:value,
            userSortValues:val
        })
    },
    bindUserSortEns(){
        let val = this.data.userSortValues,
            value=this.data.userSortValue[val];
        this.setData({
            userSortVal:value,
            userSortValues:val
        });
        this.acquireSuperior();
    },
    uSuperiorBtn(){
        let userSort=this.data.userSortVal;
        console.log("关联人员",this.data.uSuperiorValue)
        if(userSort){
            this.setData({
                maskShow:true,
                uSuperior:true
            })
        }else {
            wx.showToast({
                title: '请选择用户类别',
                icon: 'none',
                duration: 1000
            })
        }

    },
    acquireSuperior(){
        let personalData = this.data.personalData,
            _this=this,
            type=parseInt(this.data.userSortValues)+3,
            userAssObj={
                plusType:personalData.plusType,
                plusId:personalData.plusId,
                type:type
            };
        $.common('noteBankPlusManager//user/getUserIntelligentListWechat.htm',userAssObj,
            function (res) {
                _this.setData({
                    uSuperiorValue:res
                })
            },function (err) {
                console.log("获取失败",err)
            }
        )
    },
    bindSuperiorChange(e){
        let val = e.detail.value,
            value=this.data.uSuperiorValue[val];
        this.setData({
            uSuperiorVal:value,
            uSuperiorValues:val
        })

    },
    bindSuperiorEns(){
        let val = this.data.uSuperiorValues,
            value=this.data.uSuperiorValue[val];
        this.setData({
            uSuperiorVal:value,
            uSuperiorValues:val
        });
    },
    addIdentityId(){
        let _this=this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 压缩图
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                console.log("tempFilePaths",res.tempFilePaths[0]);
                wx.showLoading({
                    title: '上传中',
                })
                wx.uploadFile({
                    url: $.config.API_ROOT+'noteBankPlusManager/uploadimage/uploadModelImage.htm',
                    filePath: res.tempFilePaths[0],
                    name: 'uploadFile',
                    success(res){
                        wx.hideLoading();
                        let data=JSON.parse(res.data);
                        _this.setData({
                            identityId:data.rows
                        })
                        console.log("上传成功",data.rows)
                        wx.showToast({
                            title: '图片上传成功',
                            icon: 'success',
                            duration: 1000
                        })
                    },
                    fail(err){
                        console.log("失败",err)
                    }
                })
            }
        })
    },
    addData(){
        this.setData({
            demand:false
        })
    },
    addAffirm(){
        this.addUserRequest()


        // this.setData({
        //     demand:true
        // })
    },
    addUserRequest(){
        let _this=this,
            UserObj={},
            personalData=this.data.personalData;
        UserObj.userName=this.data.uAddUserName;
        UserObj.plusId=personalData.plusId;
        UserObj.plusType=personalData.plusType;
        UserObj.uAddUserName=personalData.uAddUserName || '';
        UserObj.uPhone=this.data.uPhone || '';
        UserObj.uIdNumber=this.data.uIdNumber || '';
        UserObj.uBirthday=this.data.year+"-"+this.data.month+"-"+this.data.day+" "+"00:00:00" || '';
        UserObj.uBankDeposit=this.data.uBankDeposit || '';
        UserObj.uBankCard=this.data.uBankCard || '';
        UserObj.uIdPic=this.data.identityId || '';
        // UserObj.userNameFirstChar=this.data.uAddUserName.split("")[0];
        if(personalData.uType<=2){
            if(this.data.uSuperiorValue.length){
                UserObj.uSuperior=this.data.uSuperiorValue[this.data.uSuperiorValues].userName
            }else{
                UserObj.uSuperior= '';
            }

            UserObj.uType=parseInt(this.data.userSortValues)+3 || '';
        }
        console.log(UserObj);
        console.log(typeof UserObj.userName);
        $.common('noteBankPlusManager//user/addUserWechat.htm',UserObj,function (res,resData) {
                console.log("获取成功",resData);
                let clientData=_this.data.clientData;
                clientData.unshift(UserObj);
                _this.setData({
                    clientData:clientData,
                    demand:true
                })
            },function (err) {
                wx.showToast({
                    title: '添加失败或已存在',
                    icon: 'none',
                    duration: 1000
                })
            }
        )
    },
    hideShade(){
      console.log("11111");
      this.setData({
            birthdayShow:false,
            maskShow:false,
            userSort:false,
            uSuperior:false
        })
    }
});