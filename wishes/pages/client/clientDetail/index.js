/**
 * Created by terrorblade on 2018/3/17.
 */
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
        demand:false,
        identityId:"",
        page:1,
        size:6,
        years: years,
        year: "-",
        months: months,
        month: "-",
        days: days,
        day: "-",
        value: [date.getFullYear()-1960, 0, 0],
        birthdayShow:false,
        maskShow:false,
        userSort:false,
        userSortVal:'',
        userSortValue:['营销员','客户','营销主管'],
        userSortValues:0,
        uSuperiorValue:[],
        uSuperiorName:'',
        uSuperior:false,
        uSuperiorValues:0,
        reachBtn:false
    },
    onLoad(options){
        console.log(getCurrentPages())
        let personalData = wx.getStorageSync('loginData');
        if(options.demand){
            let specificInfo=wx.getStorageSync('specificInfo');
            console.log('1',specificInfo)
            console.log('2',typeof specificInfo)
            switch (parseInt(specificInfo.uType)){
                case 0:
                    specificInfo.uTypeName='超级管理员';
                    break;
                case 1:
                    specificInfo.uTypeName='管理员';
                    break;
                case 2:
                    specificInfo.uTypeName='业务员';
                    break;
                case 3:
                    specificInfo.uTypeName='营销人员';
                    break;
                case 4:
                    specificInfo.uTypeName='客户';
                    break;
                default:
                    specificInfo.uTypeName='营销主管';
                    break;
            }
            this.setData({
                demand:true,
                specificInfo:specificInfo
            });
            wx.setNavigationBarTitle({
                title: '客户详情',
            })
        }else {
            if(personalData.uType==3 || personalData.uType==5){
                console.log('营销员')
                this.setData({
                    userSortVal:'客户',
                    userSortValues:4,
                    uSuperiorName:personalData.userName
                })
            }
        }

        this.setData({
            personalData:personalData,
        });
        console.log(personalData.uType);
        console.log("config",$.config.API_ROOT)
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
        let personalData=this.data.personalData;
        if(personalData.uType!=5 && personalData.uType!=3){
            this.setData({
                maskShow:true,
                userSort:true
            })
        }

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
        let personalData=this.data.personalData;
        if(personalData.uType!=3){
            if(personalData.uType ==5){
                this.acquireSuperior();
            }
            let userSort=this.data.userSortVal;
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
        }


    },
    acquireSuperior(){
        let personalData = this.data.personalData,
            _this=this,type;
            if(this.data.userSortValues != 4){
                type=parseInt(this.data.userSortValues)+3 || '';
            }else{
                type=4
            }
        let userAssObj={
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
            uSuperiorValues:val,
            uSuperiorName:value.userName
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
    addAffirm(){
        this.addUserRequest()
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
        if(this.data.year=="-"){
            UserObj.uBirthday=""
        }else{
            UserObj.uBirthday=this.data.year+"-"+this.data.month+"-"+this.data.day+" " || '';
        }
        UserObj.uBankDeposit=this.data.uBankDeposit || '';
        UserObj.uBankCard=this.data.uBankCard || '';
        UserObj.uIdPic=this.data.identityId || '';
        // UserObj.userNameFirstChar=this.data.uAddUserName.split("")[0];
        if(personalData.uType<=2){
            if(this.data.uSuperiorValue.length){
                UserObj.uSuperior=this.data.uSuperiorName || ''
            }else{
                UserObj.uSuperior= '';
            }
            if(this.data.userSortValues != 4){
                UserObj.uType=parseInt(this.data.userSortValues)+3 || '';
            }else{
                UserObj.uType=4
            }

        }
        console.log(UserObj);
        console.log(typeof UserObj.userName);
        $.common('noteBankPlusManager//user/addUserWechat.htm',UserObj,function (res,resData) {
                console.log("获取成功",resData);
                if(personalData.uType<2){
                    let addClientDetial=UserObj;
                    wx.setStorage({
                        key:"addClientDetial",
                        data:addClientDetial,
                        success:res => {
                            console.log("数据储存成功",res)
                        }
                    })
                    wx.navigateTo({
                        url: '/pages/client/clientDemand/index?addClient=true'
                    });
                }else {
                    wx.showToast({
                        title: '已提交,审核中',
                        icon: 'none',
                        duration: 1000
                    });
                    wx.navigateTo({
                        url: '/pages/client/clientDemand/index'
                    });
                }
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
    },
});