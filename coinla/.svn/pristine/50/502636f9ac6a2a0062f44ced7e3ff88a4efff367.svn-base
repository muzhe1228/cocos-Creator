var GET_URL = 'https://api.coinla.com';
// var GET_URL = 'http://47.96.93.94:7080';

function getCoinlaSingle(params, fnSuccess, fnError) {
    return $.ajax({
        url: GET_URL + params.url,
        timeout: 10000, // 超时时间 10 秒
        headers: {
            apiVersion: '1.6.0',
            token: params.token || '',
            loginType: 'web'
        },
        data: params.data,
        dataType: 'JSON',
        type: 'POST',
        async: params.async ? false : true,
        success: function (res) {
            fnSuccess(res)
        },
        error: fnError
    })
}