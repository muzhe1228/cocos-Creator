//判断token是否有效

function verifyToken() {
    getCoinlaSingle({url: '/user/mine/verifyToken', token: Cookies.get('token'), async: 1}, function (res) {
        if (res.code) {
            Cookies.remove('token')
            Cookies.remove('userMsg')
            console.log(12333)
        }
    }, function (err) {
        alert(err.message)
    })
}


//排序
function sortDom(domlist, sortDom, flag) {
    var $item = domlist.find('.table_cont');
    var $newList = Array.prototype.sort.call($item, function (a, b) {
        console.log($(a).find('.' + sortDom).attr('sort'))
        return flag ? (parseFloat($(a).find('.' + sortDom).attr('sort'))) - (parseFloat($(b).find('.' + sortDom).attr('sort'))) : (parseFloat($(b).find('.' + sortDom).attr('sort'))) - (parseFloat($(a).find('.' + sortDom).attr('sort')))
    });
    return $newList;
}


// 颜色判断
function IsColor(val) {
    if (parseFloat(val) > 0) {
        return 'color-green'
    } else if (parseFloat(val) == 0) {
        return 'color-gray'
    } else {
        return 'color-red'
    }
}

// 百分比
function Rita() {
    var List = $('.rita')
    for (var i = 0; i < List.length; i++) {
        var Val = $(List[i]).text() + '%'
        $(List[i]).text(Val)
    }
}

// 时间格式化
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

// 把时间戳转换成时间
function reset(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].date_time = resetTime(arr[i].date_time)
    }
};

// 大小写转换
function toLowerCase(name) {
    return name.toLowerCase().replace(' ', '-')
}

// 千分符
function toThousands(num) {
    var re = /\d{1,3}(?=(\d{3})+$)/g
    var n1 = (num.toString()).replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
        return s1.replace(re, "$&,") + s2;
    })
    return n1
}

// 浮点数转换成小数
function toFixeds(num, extent) {
    return num.toFixed(extent)
}

// 价格符号 百分百符号
function numRest(price, ccy, Is) {
    if (parseFloat(price)) {
        if (ccy == '%' && Is) {
            return price + ccy
        } else if (ccy == '%') {
            price = price > 0 ? '+' + price : price
            return price + ccy
        } else if (ccy == 1) {
            if (Is == ',') {
                return '$' + toThousands(price)
            }
            return '$' + price
        } else if (!ccy) {
            if (Is == ',') {
                return '¥' + toThousands(price)
            }
            return '¥' + price
        }
    } else if (parseFloat(price) == 0) {
        if (ccy == '%' && Is) {
            return price + ccy
        } else if (ccy == '%') {
            price = price > 0 ? '+' + price : price
            return price + ccy
        } else {
            return '--'
        }
    } else {
        return '未知'
    }
}

// 隐藏金额
function hidPic(price, is) {
    if (is) {
        return '***'
    } else {
        return price
    }
}

// url去掉(https://www.|http://www.|www.)
function urlRest(url) {
    if (url) {
        var pattern = /^https:\/\/|http:\/\//i
        var pattern1 = /\/$/
        return url.replace(pattern, "").replace(pattern1, "")
    } else {
        return
    }
}

// 判断价格进行整理
function priceRest(price, ccy) {
    price = parseFloat(price)
    if (ccy) {
        if (!price) {
            return '--'
        } else if (price < 1) {
            return ccy + parseFloat(price.toFixed(8))
        } else if (price < 100) {
            return ccy + parseFloat(price.toFixed(4))
        } else if (price < 10000) {
            return ccy + toThousands(parseFloat(price.toFixed(2)))
        } else if (price < 1000000) {
            return ccy + toThousands(parseFloat(price).toFixed(2))
        } else if (price < 100000000) {
            return ccy + toThousands(parseFloat((price / 10000).toFixed(2))) + "万"
        } else if (100000000 <= price) {
            return ccy + toThousands(parseFloat((price / 100000000).toFixed(2))) + "亿"
        }
    } else {
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

}

// 判断价格进行整理
function split(location) {
    return location.split(' ')
}
