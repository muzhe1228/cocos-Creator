function resetSvgTop(svgData) {
    let arrS = []
    for (let i = 0; i < svgData.length; i++) {
        let Dat = ''
        try {
            let List = svgData[i].list//判断svg list 的名
            if (List) {
                let svgList = []
                List.forEach(function (item) {
                    svgList.push(parseFloat(item.lastPrice))//美元价格添加数组
                })
                let min = Math.min.apply(null, svgList)//最小值
                let diff = Math.max.apply(null, svgList) - min//最大值 - 最小值
                diff = diff ? diff : 1//diff = 0 时默认=1
                let ratio = 92 / svgList.length
                for (let i = 0; i < svgList.length; i++) {
                    Dat += ' ' + i * ratio + ' ' + (svgList[i] - min) / diff * 20//svgs 数据拼接
                }
            }
        } catch (err) {
            console.log(err.message)
        }
        arrS[svgData[i].relationId] = Dat
    }
    return arrS
}


//百分比
function Rita() {
    let List = $('.rita')
    console.log(List)
    for (let i = 0; i < List.length; i++) {
        let Val = $(List[i]).text() + '%'
        $(List[i]).text(Val)
    }
}


//分页
function pageListRest(total, page) {
    total = getPage(total)
    page = getPage(page)
    let pageList = []
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
            pageList = total
        } else {
            pageList = [1, 2, 3, 4, 5, 6, 'next', total]
        }
    }
    return pageList
}

function pageNumRest(page, pageNum) {
    pageNum = getPage(pageNum)
    if (page === 1) {
        return ''
    } else if (pageNum > 4) {
        console.log()
        if (page === 'prev') {
            return pageNum - 3
        } else if (page === 'next') {
            return pageNum + 3
        } else {
            return page
        }
    } else {
        if (page === 'next') {
            return 7
        } else {
            return page
        }
    }
}

//上一页
function nextPage(page, total) {
    page = getPage(page)
    total = getPage(total)
    if (page) {
        if (page < total) {
            return parseInt(page) + 1
        } else {
            return page
        }
    } else {
        return 2
    }

}

//下一页
function prevPage(page) {
    page = getPage(page)
    if (page <= 2) {
        return ''
    } else if (page > 2) {
        return page - 1
    }
}

//获取
function getPage(page) {
    if (page) {
        page = page + ''
        return parseInt(page.replace('page', ''))
    } else {
        return 1
    }

}

//设置
function setPage(page) {
    return page ? 'page' + page : ''
}

//seo
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


//title滚动监听
function _initScroll(Obj) {
    let h = Obj.$(Obj.$refs.titleFix).offset().top
    document.addEventListener('scroll', function () {
        if (document.documentElement.scrollTop > h || document.body.scrollTop > h) {
            Obj.$(Obj.$refs.titleFix).addClass('active')
        } else {
            Obj.$(Obj.$refs.titleFix).removeClass('active')
        }
    }.bind(Obj), false)
}

//首页排序
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}

//socket数据格式化
function numRest(price, ccy) {
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

//svg数据格式化首页
function resetSvg(svgData) {
    let arrS = []
    for (let i = 0; i < svgData.length; i++) {
        let Dat = ''
        try {
            let List = svgData[i].list//判断svg list 的名
            if (List) {
                let svgList = []
                List.forEach(function (item) {
                    svgList.push(parseFloat(item.lastPrice))//美元价格添加数组
                })
                let min = Math.min.apply(null, svgList)//最小值
                let diff = Math.max.apply(null, svgList) - min//最大值 - 最小值
                diff = diff ? diff : 1//diff = 0 时默认=1
                let ratio = 80 / svgList.length
                for (let i = 0; i < svgList.length; i++) {
                    Dat += ' ' + i * ratio + ' ' + (svgList[i] - min) / diff * 20//svgs 数据拼接
                }
            }
        } catch (err) {
            console.log(err.message)
        }
        arrS[svgData[i].relationId] = Dat
    }
    return arrS
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

//曲线图数据格式化
function allChartData(data, typeName) {
    let newData = []
    try {
        for (let i = 0; i < data.length; i++) {
            let arr = []
            arr[0] = data[i].time
            arr[1] = parseFloat(data[i][typeName])
            newData.push(arr)
        }
    } catch (err) {
        console.log(err.message)
    }
    return newData
}

//曲线图数据格式化
function allChartDataV(data, typeName) {
    let newData = []
    try {
        for (let i = 0; i < data.length; i++) {
            let arr = []
            let restStr = data[i].createTime.toString()
            let Dat = new Date(restStr.replace(/-/g, "/"))
            arr[0] = Dat.getTime()
            arr[1] = parseFloat(data[i][typeName])
            newData.push(arr)
        }
    } catch (err) {
        console.log(err.message)
    }
    return newData
}

//pie 饼状图数据格式化
function pieRestData(data) {
    let PieData = [], arrs = []
    for (let j = 0; j < data.length; j++) {
        arrs.push(parseFloat(data[j].storageProportion))
    }
    for (let i = 0; i < data.length; i++) {
        let Obj = {}
        Obj.name = data[i].name
        Obj.ratio = data[i].storageProportion
        Obj.y = parseFloat(data[i].storageProportion)
        Obj.z = (parseFloat(data[i].storageProportion) / Math.max.apply(null, arrs)) * 10000
        PieData.push(Obj)
    }
    return PieData
}

//时间格式化
function resetTime(inputTime, type) {
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
    if (type) {
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    } else {
        return y + '-' + m + '-' + d;
    }
};

//时间格式化//待使用
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

//把时间戳转换成时间
function reset(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].date_time = resetTime(arr[i].date_time)
    }
};

//socket监听的Ids数组
function socketIds(data, type) {
    let ids = []
    try {
        data.forEach(function (item) {
            ids.push(item.cerId)
        })
    } catch (err) {
        console.log(err.message)
    }
    return ids
}

//socket 数据更新到页面
function socketUpdate(data, socktData) {
    let List = data.items
    try {
        for (let i = 0; i < List.length; i++) {
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

//获取cookie数据格式的内容
function Cook(key, value) {
    let result;
    try {
        let cookies = value ? value.split('; ') : [];
        let rdecode = /(%[0-9A-Z]{2})+/g;
        let i = 0;
        for (; i < cookies.length; i++) {
            let parts = cookies[i].split('=');
            let cookie = parts.slice(1).join('=');
            try {
                let name = parts[0].replace(rdecode, decodeURIComponent);
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

//url获取主机名
function getRootPath_web() {
    let url = {}
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    url.all = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    url.pathName = window.document.location.pathname;
    let pos = url.all.indexOf(url.pathName);
    //获取主机地址，如： http://localhost:8083
    url.Paht = url.all.substring(0, pos);
    return url
}


//select选择框
function setSelect(main, callback) {
    main = $(main)
    let sub = main.find('.options')
    main.click(function () {
        $('.options').not(sub).slideUp()
        sub.slideToggle()
        for (let i = 0; i < sub.find('li').length; i++) {
            if ($(sub.find('li')[i]).text() === main.find('.value').text()) {
                $(sub.find('li')[i]).addClass('active')
                break
            }
        }
        return false
    })
    sub.children('li').click(function (e) {
        let value = main.find('.value')
        if ($(this).text() === value.text()) {
            return
        }
        sub.slideToggle()
        $(this).addClass('active').siblings().removeClass('active')
        main.find('.value').text($(this).text())
        callback($(this).attr('data'), $(this).text())//参数，选项的值，
        return false
    })
    $(document).click(function () {
        sub.slideUp()
    });
}