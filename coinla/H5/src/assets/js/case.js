import {getCoinlaSingle} from 'assets/js/httpAll'
//分页
export const pageListRest = function (total, page) {
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
export const pageNumRest = function (page, pageNum) {
  pageNum = getPage(pageNum)
  if (page === 1) {
    return ''
  } else if (pageNum > 4) {
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
export const nextPage = function (page, total) {
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
export const prevPage = function (page) {
  page = getPage(page)
  if (page <= 2) {
    return ''
  } else if (page > 2) {
    return page - 1
  }
}
//获取
export const getPage = function (page) {
  if (page) {
    page = page + ''
    return parseInt(page.replace('page', ''))
  } else {
    return 1
  }

}
//设置
export const setPage = function (page) {
  return page ? 'page' + page : ''
}
//seo
export const seoTo = function () {
  var bp = document.createElement('script');
  var curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  }
  else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bp, s);
}


//title滚动监听
export const _initScroll = function (Obj) {
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
export const compare = function (property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value2 - value1;
  }
}
//socket数据格式化
export const numRest = function (price, ccy) {
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
export const numRestccy = function (price, ccy, Is) {
  if (parseFloat(price)) {
    if (ccy === '%' && Is) {
      return price + ccy
    } else if (ccy === '%') {
      price = price > 0 ? '+' + price : price
      return price + ccy
    } else if (ccy === 1) {
      if (Is === ',') {
        return '$' + toThousands(price)
      }
      return '$' + price
    } else if (!ccy) {
      if (Is === ',') {
        return '￥' + toThousands(price)
      }
      return '￥' + price
    }
  } else if (parseFloat(price) === 0) {
    if (ccy === '%' && Is) {
      return price + ccy
    } else if (ccy === '%') {
      price = price > 0 ? '+' + price : price
      return price + ccy
    } else {
      return '--'
    }
  } else {
    return '未知'
  }
}
//svg数据格式化首页
export const resetSvg = function (svgData) {
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

//svg数据格式化国行
export const resetSvgTop = function (svgData) {
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

export const priceRest = function (price) {
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
export const allChartData = function (data, typeName) {
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
export const allChartDataV = function (data, typeName) {
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
export const pieRestData = function (data) {
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
export const resetTime = function (inputTime, type) {
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
export const chartTime = function (inputTime, type) {
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
export const reset = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i].date_time = resetTime(arr[i].date_time)
  }
};

//socket监听的Ids数组
export const socketIds = function (data, type) {
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
export const socketUpdate = function (data, socktData) {
  let List = data.items
  try {
    for (let i = 0; i < List.length; i++) {
      if (List[i].cerId === socktData.cerId) {
        List[i].openPrice = socktData.openPrice
        List[i].openTurnover = socktData.openTurnover
        List[i].openRiseFall = socktData.openRiseFall
        break
      }
    }
  } catch (err) {
    console.log(err.message)
  }
  return data
}

//重置highcharts 数据
export const restCharts = {
  global: {useUTC: false},
  lang: {
    // Highcharts
    contextButtonTitle: '图表导出菜单',
    decimalPoint: '.',
    downloadJPEG: "下载JPEG图片",
    downloadPDF: "下载PDF文件",
    downloadPNG: "下载PNG文件",
    downloadSVG: "下载SVG文件",
    drillUpText: "返回 {series.name}",
    invalidDate: '无效的时间',
    loading: '加载中...',
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    noData: "没有数据",
    numericSymbols: null,
    printChart: "打印图表",
    resetZoom: '重置缩放比例',
    resetZoomTitle: '重置为原始大小',
    shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    thousandsSep: ',',
    weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],

    // Highstock
    rangeSelectorFrom: '从',
    rangeSelectorTo: '至',
    rangeSelectorZoom: '范围',

    // Highmaps
    zoomIn: '缩小',
    zoomOut: '放大'
  },
  title: {
    text: '图表标题'
  },

  tooltip: {
    dateTimeLabelFormats: {
      millisecond: '%Y-%m-%d %H:%M:%S.%L',
      second: '%Y-%m-%d %H:%M:%S',
      minute: '%Y-%m-%d %H:%M',
      hour: '%Y-%m-%d %H:%M',
      day: '%Y-%m-%d',
      week: '%Y-%m-%d',
      month: '%Y-%m',
      year: '%Y'
    },
    split: false
  },
  xAxis: {
    dateTimeLabelFormats: {
      millisecond: '%H:%M:%S.%L',
      second: '%H:%M:%S',
      minute: '%H:%M:%S',
      hour: '%H:%M:%S',
      day: '%Y-%m-%d',
      week: '%Y-%m',
      month: '%Y-%m',
      year: '%Y'
    }
  },

  /**
   * Highstock
   */


  rangeSelector: {
    // inputDateFormat: '%Y-%m-%d',
    buttonTheme: {
      width: 'auto',
      style: {
        fontSize: '12px',
        padding: '4px'
      }
    },
    buttons: [
      {
        type: 'day',
        count: 1,
        text: '天'
      }, {
        type: 'week',
        count: 1,
        text: '周'
      }, {
        type: 'month',
        count: 1,
        text: '月'
      }, {
        type: 'month',
        count: 3,
        text: '季度'
      }, {
        type: 'ytd',
        text: '今年'
      }, {
        type: 'year',
        count: 1,
        text: '1年'
      }, {
        type: 'all',
        text: '所有'
      }]
  },

  plotOptions: {
    series: {
      dataGrouping: {
        dateTimeLabelFormats: {
          millisecond: ['%Y-%m-%d %H:%M:%S.%L', '%Y-%m-%d %H:%M:%S.%L', ' ~ %H:%M:%S.%L'],
          second: ['%Y-%m-%d %H:%M:%S', '%Y-%m-%d %H:%M:%S', ' ~ %H:%M:%S'],
          minute: ['%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M', ' ~ %H:%M'],
          hour: ['%Y-%m-%d %H:%M', '%Y-%m-%d %H:%M', ' ~ %H:%M'],
          day: ['%Y-%m-%d', '%Y-%m-%d', ' ~ %Y-%m-%d'],
          week: ['%Y-%m-%d', '%Y-%m-%d', ' ~ %Y-%m-%d'],
          month: ['%Y-%m', '%Y-%m', ' ~ %Y-%m'],
          year: ['%Y', '%Y', ' ~ %Y']
        }
      }
    },
    spline: {
      lineWidth: 1.1,
      fillOpacity: 0.1,
      marker: {
        enabled: false,
        states: {
          hover: {
            enabled: true,
            radius: 1
          }
        }
      },
      shadow: false
    },
    ohlc: {
      tooltip: {
        split: false,
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
        '开盘：{point.open}<br/>' +
        '最高：{point.high}<br/>' +
        '最低：{point.low}<br/>' +
        '收盘：{point.close}<br/>'
      }
    },
    candlestick: {
      tooltip: {
        split: false,
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {series.name}</b><br/>' +
        '开盘：{point.open}<br/>' +
        '最高：{point.high}<br/>' +
        '最低：{point.low}<br/>' +
        '收盘：{point.close}<br/>'
      }
    }
  },
  colors: ['#debd63', '#777777', '#debd63', '#DDDF00', '#ED561B', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
}

//获取cookie数据格式的内容
export const Cook = function api(key, value) {
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
export const Url = function getRootPath_web() {
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

export const setTitle = function (shareData) {
  return {
    title: shareData.title, // set a title
    meta: [{                 // set meta
      name: 'keyWords',
      content: 'My Example App'
    }, {                 // set meta
      itemprop: 'image',
      content: shareData.pic
    }, {                 // set meta
      itemprop: 'name',
      content: shareData.title
    }, {                 // set meta
      itemprop: 'description',
      content: shareData.note
    }],

    link: [{                 // set link
      rel: 'asstes',
      href: 'https://assets-cdn.github.com/'
    }]
  }
}

export const shareWeixin = function (getUrl, shareData) {
  //alert(window.location.href);/***用于获得当前连接url用**/
  /***用户点击分享到微信圈后加载接口接口*******/
  getCoinlaSingle('/wechatParam', {url: getUrl}).then((res) => {
    let data = res.data
    setShareInfo({
      title: shareData.title,
      summary: shareData.note,
      pic: shareData.pic,
      url: getUrl,
      WXconfig: {
        swapTitleInWX: true,
        appId: data.appid,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature
      }
    });
    wx.config({
      // debug: true,
      appId: data.appid,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'checkJsApi',
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
        "onMenuShareWeibo",
        "onMenuShareQZone"
      ]
    });
    /*新改 url->shareUrl*/
    let linkUrl = getUrl, shareTitle = shareData.title, shareImg = shareData.pic, shareContent = shareData.note
    wx.ready(function () {
      wx.onMenuShareTimeline({
        title: shareTitle, // 分享标题
        desc: shareContent, // 分享描述
        link: linkUrl, // 分享链接
        imgUrl: shareImg, // 分享图标
        success: function (e) {
          // 用户确认分享后执行的回调函数
          tishiMode('分享成功')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareContent, // 分享描述
        link: linkUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareImg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          tishiMode('分享成功')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      //获取“分享到QQ”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQQ({
        title: shareTitle, // 分享标题
        desc: shareContent, // 分享描述
        link: linkUrl, // 分享链接
        imgUrl: shareImg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          tishiMode('分享成功')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
      wx.onMenuShareWeibo({
        title: shareTitle, // 分享标题
        desc: shareContent, // 分享描述
        link: linkUrl, // 分享链接
        imgUrl: shareImg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          tishiMode('分享成功')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
      //获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
      wx.onMenuShareQZone({
        title: shareTitle, // 分享标题
        desc: shareContent, // 分享描述
        link: linkUrl, // 分享链接
        imgUrl: shareImg, // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          tishiMode('分享成功')
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });
    })
  })
}

export const isIos = function () {
  let u = navigator.userAgent, app = navigator.appVersion;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    return false
  } else if (isIOS) {
    return true
  }
}

export const openInApp = function () {
  let ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    //alert('微信打开')
    return false
  } else if (ua.match(/QQ/i) == 'qq') {
    //alert("扣扣打开")
    return false
  } else if (ua.match(/WeiBo/i) == "weibo") {
    //alert('微博打开')
    return false
  } else {
    if (ua.match(/Android/i) != null) {
     //alert('andriod')
      return ua.match(/browser/i) == null
    } else if (ua.match(/iPhone/i) != null) {
      //alert('iphone')
      return ua.match(/safari/i) == null
    } else {
      //alert('mac')
      return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
    }
  }
}
