//判断价格进行整理
export const priceRest = function (price) {
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
export const chartData = function (data, type) {
  let newData = []
  try {
    for (let i = 0; i < data.length; i++) {
      let arr = []
      let restStr = data[i].createTime.toString()
      let Dat = new Date(restStr.replace(/-/g,"/"))
      arr[0] = Dat.getTime()
      if (type === 1) {
        arr[1] = parseFloat(data[i].openPrice)
      } else if (type === 2) {
        arr[1] = parseFloat(data[i].lowPrice)
      } else if (type === 3) {
        arr[1] = parseFloat(data[i].lastPrice)
      } else if (type === 4) {
        arr[1] = parseFloat(data[i].turnover)
      } else if (type === 'time') {
        arr.push(data[i].createTime)
      }else {
        arr[1] = parseFloat(data[i].closePrice)
      }
      newData.push(arr)
    }
  } catch (err) {
    console.log(err.message)
  }
  return newData
}
//曲线图数据格式化
export const chartData1 = function (data, type) {
  let newData = []
  try {
    for (let i = 0; i < data.length; i++) {
      if (type === 1) {
        newData.push(parseFloat(data[i].openPrice))
      } else if (type === 2) {
        newData.push(parseFloat(data[i].lowPrice))
      } else if (type === 3) {
        newData.push(parseFloat(data[i].lastPrice))
      } else if (type === 4) {
        newData.push(parseFloat(data[i].volume))
      } else if (type === 'time') {
        let restStr = data[i].createTime
        let Dat = new Date(restStr.replace(/-/g,"/"))
        newData.push(Dat.getTime())
      } else {
        newData.push(parseFloat(data[i].closePrice))
      }
    }
  } catch (err) {
    console.log(err.message)
  }
  return newData
}
export const restTime = function (timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ';
  let h = date.getHours() + ':';
  let m = date.getMinutes() + ':';
  let s = date.getSeconds();
  return Y + M + D + h + m + s;
}
//socket数据格式化
export const numRest = function (price, ccy) {
  if (ccy === '%') {
    price = price > 0 ? '+' + price : price
    return price + ccy
  } else if (ccy) {
    return ccy + price
  } else {
    return price
  }
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
      second: '%d %H:%M:%S',
      minute: '%d %H:%M:%S',
      hour: '%Y-%m-%d',
      day: '%Y-%m-%d',
      week: '%Y-%m-%d',
      month: '%Y-%m-%d',
      year: '%Y-%m'
    }
  },

  /**
   * Highstock
   */


  rangeSelector: {
    inputDateFormat: '%Y-%m-%d',
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
        text: '1天'
      }, {
        type: 'week',
        count: 1,
        text: '7天'
      }, {
        type: 'month',
        count: 1,
        text: '1月'
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
  }
}

//url去掉(https://www.|http://www.|www.)
export const urlRest = function (url) {
  if (url) {
    let pattern = /^https:\/\/www.|http:\/\/www.|https:\/\/|http:\/\/|www./i
    let pattern1 = /\/$/
    return url.replace(pattern, "").replace(pattern1, "")
  } else {
    return
  }
}
