Page({
    data:{
        clientData:[
            {
                userNameFirstChar:"夏",
                userName:"夏正国",
                uPhone:"18888888888",
                uSuperior:"刘德华",
                uIdNumber:"123456789123456789",
                uBirthday:"1970-12-10"
            },
            {
                userNameFirstChar:"刘",
                userName:"刘德华",
                uPhone:"18888888888",
                uSuperior:"刘德华",
                uIdNumber:"123456789123456789",
                uBirthday:"1970-12-10"
            },
            {
                userNameFirstChar:"毕",
                userName:"毕姥爷",
                uPhone:"18888888888",
                uSuperior:"刘德华",
                uIdNumber:"123456789123456789",
                uBirthday:"1970-12-10"
            },
        ],
        demand:true,
        identityId:""
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
        this.setData({
            demand:true
        })
    }
});