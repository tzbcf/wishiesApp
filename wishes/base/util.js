const init={
    formatTime(date){
      "use strict";
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    },
    formatNumber(n){
      "use strict";
        n = n.toString();
        return n[1] ? n : '0' + n
    },
    //为地址加时间戳
    gotoUrl(_url) {
        if (typeof _url == 'string') {
            // 已经有query直接加后面, 没有的话加query
            if (_url.indexOf('?') >= 0) {
                _url += '&t=' + Date.now();
            } else {
                _url += '?t=' + Date.now();
            }
            location.href = _url;
        } else {
            console.log('URL error', _url);
        }
    },
    // 格式化金额
    formatMoney(value, unit) {
        if (value === undefined) value = 0;
        var parts = Number(value).toFixed(2).toString().split('.');
        return parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '.' + parts[1] + (unit ? ' ' + unit : '');
    },
    // 手机号、邮箱地址打码
    formatName(str) {
        str = str ? String(str) : "";
        return str.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2').replace(/^(.{3})[^@]*(@.+)$/, '$1****$2');
    },
};



module.exports = init;
