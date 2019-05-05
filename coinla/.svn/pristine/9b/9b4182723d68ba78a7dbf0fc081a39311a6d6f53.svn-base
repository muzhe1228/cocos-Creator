
function account(val, error) {//手机号正则
    if (!val.trim()) {
        error.text('请输入手机号!')
        console.log('请输入手机号!')
    } else if (!/^(13|15|16|17|18|19)[0-9]{9}$/.test(val)) {
        error.text('手机号格式错误!')
        console.log('手机号格式错误!')
    } else {
        error.text('')
    }
}

function captcha(val, error) {//验证码正则
    if (!val.trim()) {
        error.text('请输入手机验证码!')
        console.log('请输入手机验证码!')
    } else if (!/^[0-9]{6}$/.test(val)) {
        error.text('验证码为6位数字!')
        console.log('验证码为6位数字!')
    } else {
        error.text('')
    }
}

function passWd(val, error) {//密码正则
    if (!val.trim()) {
        error.text('密码不能为空!')
    } else if (!/^(\w+){6,16}$/.test(val)) {
        error.text('6-16位数字，字母，下划线!')
    } else {
        error.text('')
    }
}

function nick(val, error) {
    if (!val.trim()) {
        error.text('请输入用户名')
        console.log('请输入用户名!')
    } else if (!/^[a-zA-Z\d\_\u2E80-\u9FFF]{3,10}$/.test(val)) {
        error.text('长度在3-10个字符!')
        console.log('长度在3-10个字符!!')
    } else {
        error.text('')
    }
}

// 发送验证码
function sendCode(params, dom) {
    getCoinlaSingle({
        url: '/captcha/sms',
        data: params,
        token: ''
    }, function (res) {
        console.log(res)
        if (res.code == 0) {
            dom.attr('disabled', true).text('60S')
            var num = 60, timer = null;
            timer = setInterval(function () {
                num--
                if (num <= 0) {
                    dom.attr('disabled', false).text('发送验证码')
                    clearInterval(timer)
                } else {
                    dom.text(num + 'S')
                }
            }, 1000)
        } else {
            alert(res.message)
        }
    })
}


function coinlaMode(Size, callback) {
    $('body').append('<div class="modeWrap" style="display: none"><div class="config"><div class="config-info"><p>'
        + Size + '</p></div><div class="config-btn"><button id="config-yes">' +
        '确定</button><button id="config-not">取消</button></div></div></div>')
    $('.config').click(function () {
        return false
    })
    $('.modeWrap').click(function () {
        $('.modeWrap').fadeOut(function () {
            $(this).remove()
        })
    }).fadeIn()
    $('#config-not').click(function () {
        $('.modeWrap').fadeOut(function () {
            $(this).remove()
        })
    })
    return false
}

function resetSvgTop(svgData) {
    var arrS = []
    for (var i = 0; i < svgData.length; i++) {
        var Dat = ''
        try {
            var List = svgData[i].list// 判断svg list 的名
            if (List) {
                var svgList = []
                List.forEach(function (item) {
                    svgList.push(parseFloat(item.lastPrice))// 美元价格添加数组
                })
                var min = Math.min.apply(null, svgList)// 最小值
                var diff = Math.max.apply(null, svgList) - min// 最大值 - 最小值
                diff = diff ? diff : 1// diff = 0 时默认=1
                var ratio = 92 / svgList.length
                for (var j = 0; j < svgList.length; j++) {
                    Dat += ' ' + j * ratio + ' ' + (svgList[j] - min) / diff * 20// svgs
                    // 数据拼接
                }
            }
        } catch (err) {
            console.log(err.message)
        }
        arrS[svgData[i].relationId] = Dat
    }
    return arrS
}

// 分页
function pageListRest(total, page) {
    var pageList = []
    if (page > 4) {
        if (total < 8) {
            pageList = total
        } else {
            if (page + 4 > total) {
                pageList = [1, 'prev', total - 5, total - 4, total - 3, total - 2, total - 1, total]
            } else {
                pageList = [1, 'prev', page - 2, page - 1, page, page + 1, page + 2, 'next', total]
            }
        }
    } else {
        if (total < 8) {
            for (var i = 0; i < total; i++) {
                pageList.push((i + 1))
            }
        } else {
            pageList = [1, 2, 3, 4, 5, 6, 'next', total]
        }
    }
    return pageList
}

function pageNumRest(total, page, item) {
    if (total < 8) {
        return item
    } else {
        if (page > 4) {
            if (item == 'prev') {
                return page - 3
            } else if (item == 'next') {
                return page + 3
            } else {
                return item
            }
        } else {
            if (item == 'next') {
                return 7
            } else {
                return item
            }
        }
    }
}



//分页dom设置以及点击事件

function setPageDom(total, page, callback) {
    if (total > 1) {
        $('.newPage').show()
        var newPageStr = '<a href="javascript:0;" class="' + (page == 1 ? 'aDisabled' : '') + '" page="' + (page - 1) + '">上一页</a>'
        pageListRest(total, page).forEach(function (item) {
            newPageStr += '<a href="javascript:0;" class="' + (item == page ? "active" : "") + '" page="' + pageNumRest(total, page, item) + '">' + (item == "prev" || item == "next" ? "···" : item) + '</a>'
        })
        newPageStr += '<a href="javascript:0;" class="' + (page == total ? 'aDisabled' : '') + '" page="' + (page + 1) + '">下一页</a>'
        $('.newPage').html(newPageStr)
        $(".newPage a").click(function () {
            if ($(this).attr('page') < 1 || $(this).attr('page') > total) {
                return
            } else {
                callback($(this).attr('page'))
            }
        })
    }
}
//分页滚动条
function ScrollTop() {
    let scrollToptimer = setInterval(function () {
        let top = document.body.scrollTop || document.documentElement.scrollTop;
        let speed = top / 4;
        if (document.body.scrollTop !== 0) {
            document.body.scrollTop -= speed;
        } else {
            document.documentElement.scrollTop -= speed;
        }
        if (top === 0) {
            clearInterval(scrollToptimer);
        }
    }, 30);
}

// 设置
function setPage(page) {
    return page ? 'page' + page : ''
}

// seo
function seoTo() {
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    console.log(bp)
    s.parentNode.insertBefore(bp, s);
}


// title滚动监听
function _initScroll(Obj) {
    var h = Obj.$(Obj.$refs.titleFix).offset().top
    document.addEventListener('scroll', function () {
        if (document.documentElement.scrollTop > h || document.body.scrollTop > h) {
            Obj.$(Obj.$refs.titleFix).addClass('active')
        } else {
            Obj.$(Obj.$refs.titleFix).removeClass('active')
        }
    }.bind(Obj), false)
}

// 首页排序
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}

// socket数据格式化
function numRestSocket(price, ccy) {
    price = parseFloat(price)
    if (ccy === '%') {
        price = price.indexOf("-") < 0 ? '+' + price : price
        return price + ccy
    } else if (ccy) {
        return ccy + price
    } else {
        return price
    }
}

// svg数据格式化首页
function resetSvg(svgData) {
    for (var i = 0; i < svgData.length; i++) {
        var Dat = ''
        try {
            var List = svgData[i].list// 判断svg list 的名
            if (List) {
                var svgList = []
                List.forEach(function (item) {
                    svgList.push(parseFloat(item.lastPrice))// 美元价格添加数组
                })
                var min = Math.min.apply(null, svgList)// 最小值
                var diff = Math.max.apply(null, svgList) - min// 最大值 - 最小值
                diff = diff ? diff : 1// diff = 0 时默认=1
                var ratio = 80 / svgList.length
                for (var j = 0; j < svgList.length; j++) {
                    Dat += ' ' + j * ratio + ' ' + (svgList[j] - min) / diff * 20// svgs
                    // 数据拼接
                }
            }
        } catch (err) {
            console.log(err.message)
        }
        svgData[i].list = Dat
    }
    return svgData
}


function priceRest(price) {
    price = parseFloat(price)
    if (price < 1) {
        return parseFloat(price.toFixed(8))
    } else if (price < 100) {
        return parseFloat(price.toFixed(4))
    } else if (price < 10000) {
        return parseFloat(price.toFixed(2))
    } else if (price < 1000000) {
        return parseFloat(price).toFixed(2)
    } else if (price < 100000000) {
        return parseFloat((price / 10000).toFixed(2)) + "万"
    } else if (100000000 <= price) {
        return parseFloat((price / 100000000).toFixed(2)) + "亿"
    }
}

// 曲线图数据格式化
function allChartData(data, typeName) {
    var newData = []
    try {
        for (var i = 0; i < data.length; i++) {
            var arr = []
            arr[0] = data[i].time
            arr[1] = parseFloat(data[i][typeName])
            newData.push(arr)
        }
    } catch (err) {
        console.log(err.message)
    }
    return newData
}

// 曲线图数据格式化
function allChartDataV(data, typeName) {
    var newData = []
    try {
        for (var i = 0; i < data.length; i++) {
            var arr = []
            var restStr = data[i].createTime.toString()
            var Dat = new Date(restStr.replace(/-/g, "/"))
            arr[0] = Dat.getTime()
            arr[1] = parseFloat(data[i][typeName])
            newData.push(arr)
        }
    } catch (err) {
        console.log(err.message)
    }
    return newData
}

// pie 饼状图数据格式化
function pieRestData(data) {
    var PieData = [], arrs = []
    for (var j = 0; j < data.length; j++) {
        arrs.push(parseFloat(data[j].storageProportion))
    }
    for (var i = 0; i < data.length; i++) {
        var Obj = {}
        Obj.name = data[i].name
        Obj.ratio = data[i].storageProportion
        Obj.y = parseFloat(data[i].storageProportion)
        Obj.z = (parseFloat(data[i].storageProportion) / Math.max.apply(null, arrs)) * 10000
        PieData.push(Obj)
    }
    return PieData
}


// 时间格式化//待使用
function chartTime(inputTime, type) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if (type === "%H:%M:%S") {
        return h + ':' + minute + ':' + second;
    } else if (type === "%Y-%m-%d") {
        return y + '-' + m + '-' + d;
    } else {
        return y + '-' + m;
    }
};

// socket监听的Ids数组
function socketIds(data, type) {
    var ids = []
    try {
        data.forEach(function (item) {
            ids.push(item.cerId)
        })
    } catch (err) {
        console.log(err.message)
    }
    return ids
}

// socket 数据更新到页面
function socketUpdate(data, socktData) {
    var List = data.items
    try {
        for (var i = 0; i < List.length; i++) {
            if (List[i].cerId === socktData.cerId) {
                List[i].openPrice = socktData.openPrice
                List[i].openTurnover = socktData.openTurnover
                List[i].openRiseFall = socktData.openRiseFall
            }
        }
    } catch (err) {
        console.log(err.message)
    }
    return data
}

// 获取cookie数据格式的内容
function Cook(key, value) {
    var result;
    try {
        var cookies = value ? value.split('; ') : [];
        var rdecode = /(%[0-9A-Z]{2})+/g;
        var i = 0;
        for (; i < cookies.length; i++) {
            var parts = cookies[i].split('=');
            var cookie = parts.slice(1).join('=');
            try {
                var name = parts[0].replace(rdecode, decodeURIComponent);
                cookie = cookie.replace(rdecode, decodeURIComponent);
                try {
                    cookie = JSON.parse(cookie);
                } catch (err) {
                }
                if (key === name) {
                    result = cookie;
                    break;
                }

                if (!key) {
                    result[name] = cookie;
                }
            } catch (err) {
                console.log('kenken', err.message)
            }
        }
    } catch (err) {
        console.log('kenken', err.message)
    }
    return result;
}

// url获取主机名
function getRootPath_web() {
    var url = {}
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    url.all = window.document.location.href;
    // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    url.pathName = window.document.location.pathname;
    var pos = url.all.indexOf(url.pathName);
    // 获取主机地址，如： http://localhost:8083
    url.Paht = url.all.substring(0, pos);
    return url
}

function getUrlKey(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

// select选择框
function setSelect(main, callback) {
    main = $(main)
    var sub = main.find('.options')
    main.click(function () {
        $('.options').not(sub).slideUp()
        sub.slideToggle()
        for (var i = 0; i < sub.find('li').length; i++) {
            if ($(sub.find('li')[i]).text() === main.find('.value').text()) {
                $(sub.find('li')[i]).addClass('active')
                break
            }
        }
        return false
    })
    sub.children('li').click(function (e) {
        var value = main.find('.value')
        if ($(this).text() === value.text()) {
            return
        }
        sub.slideToggle()
        $(this).addClass('active').siblings().removeClass('active')
        main.find('.value').text($(this).text())
        callback($(this).attr('data'), $(this).text())// 参数，选项的值，
        return false
    })
    $(document).click(function () {
        sub.slideUp()
    });
}