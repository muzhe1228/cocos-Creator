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
  console.log(bp)
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
        return '¥' + toThousands(price)
      }
      return '¥' + price
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

//滚动条
export const scrollbot = function (e, w) {
  // e - Element
  // w - scrollbar width
  var _this = this;
  this.orgPar = document.querySelector(e);

  // init function, if not ie 8 and below this will run
  this.init = function () {
    if (w == undefined) {
      this.sbw = 5;
    } else {
      this.sbw = w;
    }
    // scrollspeed for scroll trackpad click event
    this.scrollSpeed = 200;
    // parent content
    this.parContent = this.orgPar.innerHTML;
    this.orgPar.innerHTML = "";
    this.newPar = document.createElement("div");
    this.sbContainer = document.createElement("div");
    this.scrollBarHolder = document.createElement("div");
    this.scrollBar = document.createElement("div");
    this.inP = document.createElement("div");
    this.newPar.className = "scrollbot-outer-parent";
    this.scrollBarHolder.className = "scrollbot-scrollbar-holder";
    this.scrollBar.className = "scrollbot-scrollbar";
    this.inP.className = "scrollbot-inner-parent";
    this.newPar.style.position = "relative";
    this.newPar.style.paddingRight = this.sbw + "px";
    this.newPar.style.zIndex = "9999999";
    this.newPar.style.height = "100%";
    this.newPar.style.overflow = "hidden";
    this.inPWidth = (this.orgPar.clientWidth - this.sbw) + "px";
    this.inP.style.cssText = "height:100%;overflow-y:auto;overflow-x:hidden;padding-right:" + (this.sbw + 20) + "px;width:100%;box-sizing:content-box;";
    this.inP.innerHTML = this.parContent;
    this.inP.style.height = "100%";
    this.newPar.appendChild(this.inP);
    this.scrollBarHolder.appendChild(this.scrollBar);
    this.newPar.appendChild(this.scrollBarHolder);
    this.orgPar.appendChild(this.newPar);
    this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
    this.mdown = false;
    this.customHeight = false;
    this.scrollElement = this.inP;
    this.onScroll = function (f) {
      _this.onScrollF = f
    };
    this.sB = {
      width: _this.sbw + "px",
      height: _this.sbHeight + "%",
      position: "absolute",
      right: 0,
      top: 0,
      backgroundColor: "#ccc",
      borderRadius: "15px"
    };

    this.sBH = {
      width: _this.sbw + "px",
      height: "100%",
      position: "absolute",
      right: 0,
      top: 0,
      backgroundColor: "#ADADAD",
      borderRadius: "15px"
    };


    for (var p in this.sB) {
      this.scrollBar.style[p] = this.sB[p]
    }
    ;
    for (var p in this.sBH) {
      this.scrollBarHolder.style[p] = this.sBH[p];
    }


    this.inP.addEventListener("scroll", function () {
      _this.scrollBar.style.top = _this.inP.scrollTop * 100 / _this.inP.scrollHeight + (_this.sbHeight - parseFloat(_this.sB.height)) * _this.inP.scrollTop / (_this.inP.scrollHeight - _this.inP.clientHeight) + "%";
      if ("onScrollF" in _this) {
        _this.onScrollF();
      }

    })

    this.setScroll = function (p, d) {
      if (d == undefined || d <= 0) d = 500;
      if (p >= _this.inP.scrollHeight - _this.inP.clientHeight) {
        p = _this.inP.scrollHeight - _this.inP.clientHeight;
      }
      ;

      var difference = p - _this.inP.scrollTop;
      var perTick = difference / d * 10;

      setTimeout(function () {
        _this.inP.scrollTop += perTick;
        if (Math.abs(p - _this.inP.scrollTop) < 5) return;
        _this.setScroll(p, d - 10);
      }, 10);
    }

    this.scrollBarHolder.onmousedown = function (e) {
      if (e.target != this) return;
      var relPos = (e.pageY - _this.scrollBarHolder.getBoundingClientRect().top) * 100 / _this.scrollBarHolder.clientHeight;
      _this.setScroll(_this.inP.scrollHeight * relPos / 100, _this.scrollSpeed);
    }

    this.scrollBar.onmousedown = function (e) {
      _this.mdown = true;
      _this.posCorrection = e.pageY - _this.scrollBar.getBoundingClientRect().top;
      _this.btmCorrection = _this.scrollBar.clientHeight * 100 / _this.newPar.clientHeight;
      return false;
    }
    this.orgPar.onmouseup = function () {
      _this.mdown = false;
    }
    this.orgPar.onmousemove = function (e) {
      if (_this.mdown) {
        if (document.selection) {
          document.selection.empty();
        } else {
          window.getSelection().removeAllRanges();
        }
        _this.relY = e.pageY - _this.newPar.getBoundingClientRect().top;
        _this.pC = (_this.relY - _this.posCorrection) * 100 / _this.newPar.clientHeight;
        if (_this.pC >= 0 && (_this.pC + _this.btmCorrection) <= 100) {
          _this.scrollBar.style.top = _this.pC + "%";
          _this.inP.scrollTop = (parseFloat(_this.scrollBar.style.top) - (_this.sbHeight - parseFloat(_this.sB.height)) * _this.inP.scrollTop / (_this.inP.scrollHeight - _this.inP.clientHeight)) * _this.inP.scrollHeight / 100;
        } else {
          if (_this.pC < 0 && parseFloat(_this.scrollBar.style.top) > 0) {
            _this.scrollBar.style.top = "0%";
            _this.inP.scrollTop = 0;
          }
        }
        if ("onScrollF" in _this) {
          _this.onScrollF();
        }
      } else {
        return false;
      }
    }

    this.refresh = function () {
      _this.sbHeight = _this.inP.clientHeight * 100 / _this.inP.scrollHeight;
      if (_this.sbHeight >= 100) {
        _this.scrollBarHolder.style.display = "none";
      } else {
        _this.scrollBarHolder.style.display = "block"
      }
      _this.sbHeight = this.inP.clientHeight * 100 / this.inP.scrollHeight;
      _this.sB["height"] = _this.customHeight ? _this.sB["height"] : _this.sbHeight + "%";
      if (_this.inP.scrollHeight > _this.inP.clientHeight) {
        _this.scrollBar.style.height = _this.sB.height;
      }
    }
    this.refresh();
    this.setStyle = function (sb, sbh) {
      if (sb != undefined) {
        sb["width"] = _this.sbw;
        if ("height" in sb) {
          _this.customHeight = true;
          sb["height"] = (parseFloat(sb["height"]) * 100 / _this.newPar.clientHeight) + "%";
        }
        for (var x in sb) {
          _this.sB[x] = sb[x];
          _this.scrollBar.style[x] = sb[x];
        }
      }
      if (sbh != undefined) {
        sbh["width"] = _this.sbw;
        for (var x in sbh) {
          _this.sBH[x] = sbh[x];
          _this.scrollBarHolder.style[x] = sbh[x];
        }
      }
      return _this;
    }
  }

  this.destroy = function () {
    _this.orgPar.innerHTML = _this.parContent;
    _this.orgPar.style.overflow = "auto";
    _this.init = null;
  }

  function isIE() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
  }

  if (!isIE() || (isIE() && isIE() < 9)) {
    _this.init();
  }
}
