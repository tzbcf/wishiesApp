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
        size:1,
        years: years,
        year: date.getFullYear(),
        months: months,
        month: 1,
        days: days,
        day: 1,
        value: [9999, 0, 0],
        birthdayShow:false,
        maskShow:false,
        userSort:false,
        userSortVal:'',
        userSortValue:['营销员','客户','营销主管'],
        userSortValues:0,
        uSuperiorValue:[],
        uSuperior:false,
        uSuperiorValues:0
    },
    onLoad(){
        let clientData = wx.getStorageSync('clientData'),
            personalData = wx.getStorageSync('loginData');
        this.setData({
            clientData:clientData,
            personalData:personalData
        })
        console.log(personalData.uType)
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
        let userName = this.data.userName,
            uPhone = this.data.uPhone,
            page = this.data.page,
            size = this.data.size,
            _this =this,
            personalData = this.data.personalData;
        console.log("111",userName);
        console.log("111",uPhone);
        if(!userName && !uPhone){
            wx.showToast({
                title: '请填写用户名与手机号',
                icon: 'none',
                duration: 1000
            })
        }else{
            $.common('noteBankPlusManager/user/getUserListWechat.htm',"GET",{
                    page:page,
                    size:size,
                    plusType:personalData.plusType,
                    plusId:personalData.plusId,
                    userName:userName,
                    uPhone:uPhone
                },function (res) {
                    console.log("获取成功",res);
                    _this.setData({
                        clientData:res
                    })
                },function (err) {
                    console.log("获取失败",err)
                }
            )
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
        let val=this.data.birthdayVal;
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
            type=parseInt(this.data.userSortValues)+3;
        $.common('noteBankPlusManager//user/getUserIntelligentListWechat.htm',"GET",{
                plusType:personalData.plusType,
                plusId:personalData.plusId,
                type:type
            },function (res) {
                console.log("获取成功",res);
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
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                _this.setData({
                    identityId:res.tempFilePaths
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
            uBirthday=this.data.year+this.data.month+this.data.day,
            uBankDeposit=this.data.uBankDeposit,
            uBankCard=this.data.uBankCard,
            personalData = this.data.personalData,
            clientData=this.data.clientData,
            uType;
        UserObj.userName=this.data.uAddUserName;
        UserObj.uPhone=this.data.uPhone;
        UserObj.uIdNumber=this.data.uIdNumber;
        UserObj.uBirthday=this.data.year+"-"+this.data.month+"-"+this.data.day;
        UserObj.userNameFirstChar=this.data.uAddUserName.split("")[0];
        if(personalData.uType<=2){
            UserObj.uSuperior=this.data.uSuperiorValue[this.data.uSuperiorValues];
            uType=parseInt(this.data.userSortValues)+3;
        }else {
            UserObj.uSuperior="";
            uType="";
        }
        $.common('noteBankPlusManager//user/addUserWechat.htm',"POST",{
                uAddUserName:UserObj.userName,
                uPhone:UserObj.uPhone,
                uIdNumber:UserObj.uIdNumber,
                uBirthday:uBirthday,
                uBankDeposit:uBankDeposit,
                uBankCard:uBankCard,
                uSuperior:UserObj.uSuperior,
                uType:uType
            },function (res) {
                console.log("获取成功",res);
                clientData.unshift(UserObj);
                // wx.setStorage({
                //     key:"clientData",
                //     data:clientData,
                //     success:res => {
                //         console.log("数据储存成功",res)
                //     }
                // });
                _this.setData({
                    clientData:clientData,
                    demand:true
                })
            },function (err) {
                wx.showToast({
                    title: err.msg,
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