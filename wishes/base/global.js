"use strict";
const util = require('util.js');
const config = require('config.js');
const $ = {
    common(api_cmd,method,data,success,error){
        wx.request({
            url:config.API_ROOT+api_cmd,
            method:method,
            data:data,
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
module.exports = $;