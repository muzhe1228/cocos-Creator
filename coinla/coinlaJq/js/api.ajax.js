var GET_URL = 'http://pcapi.coinla.com';

function getCoinlaSingle(params, fnSuccess, fnError) {
    return $.ajax({
        url: GET_URL + params.url,
        timeout: 10000, // 超时时间 10 秒
        headers: {
            'token': params.token || '',
            'loginType': 'web'
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