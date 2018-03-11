"use strict";
const util = require('util.js');
const config = require('config.js');
const $ = {
    common(api_cmd,data,success,error){
        wx.request({
            url:config.API_ROOT+api_cmd,
            method:'POST',
            data:util.fjson2Form(data),
            dataType:'json',
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success:res=>{
                console.log(res);
                if(res.data.status==200){
                    success(res.data.rows,res.data)
                }else {
                    error(res.data.msg)
                }
            },
            fail:err=>{
                error(err)
            }
        })
    },
};
Object.defineProperty($,'util',{
    value:util,
    writable:false,
    enumerable:false,
    configurable:false
});
Object.defineProperty($,'config',{
    value:config,
    writable:false,
    enumerable:false,
    configurable:false
});
module.exports = $;