<template>
  <div id="app">
    <div class="fixed">
      <div class="fixed-l">
        <p class="logo"><img src="./assets/app.png" alt=""></p>
        <p class="size">
          <b>CoinLa&nbsp;&nbsp;考拉行情</b>
          <span>聚合全球行情&nbsp;&nbsp;挖掘数据价值</span>
        </p>
      </div>
      <p class="fixed-r" @click="toDo(toUrl)">
        下载APP
      </p>
    </div>
    <div class="tab1 border-1px" v-show="isFixed">
      <p @click="setTab(1)" :class="{'active':tabId===1}">核心数据</p>
      <p @click="setTab(2)" :class="{'active':tabId===2}">币种介绍</p>
      <p @click="setTab(3)" :class="{'active':tabId===3}">团队成员</p>
    </div>
    <div class="top border-1px">
      <p class="top-name">{{ExchangeInfo.exchangeName}}</p>
      <div class="top-right">
        <p><span><i class="icon-favorite"></i> 关注</span></p>
        <p>{{ExchangeInfo.openAttentionnumber}}人&nbsp;已关注</p>
      </div>
    </div>
    <div class="info border-1px">
      <div class="info-l">
        <p>{{ExchangeInfo.currencyShortName}}/ {{ExchangeInfo.currencyRightShortName}}</p>
        <!--<span>￥</span>-->
        <p><span class="cry">￥</span>{{ExchangeInfo.openPrice}}<span
          :class="ExchangeInfo.openRiseFall>0?'color-green':'color-red'">{{ExchangeInfo.openRiseFall|numRest('%')}}</span>
        </p>
        <p>量(24h) <span class="color-black">{{ExchangeInfo.openTurnover}}</span></p>
      </div>
      <div class="info-r">
        <p><span>高</span><span class="color-green">{{ExchangeInfo.openHighPrice|numRest('￥')}}</span></p>
        <p><span>低</span><span class="color-red">{{ExchangeInfo.openLowPrice|numRest('￥')}}</span></p>
        <p v-if="ExchangeInfo.openNationalLowPrice"><span>OTC≈</span><span class="color-black">{{ExchangeInfo.openNationalLowPrice|numRest('￥')}}</span>
        </p>
        <p v-else></p>
      </div>
    </div>
    <div class="timeBtn border-1px">
      <p @click="getLineData(5)" :class="{'active':5===btnAct}">全部</p>
      <p v-for="(item,index) in btnArr" @click="getLineData(index)" :class="{'active':index===btnAct}">{{item}}</p>
    </div>
    <div class="line border-1px">
      <div v-show="isShowLine" id="container" style="width:100%;height:366px"></div>
      <img v-show="!isShowLine" style="max-width:40%;" src="./assets/notData.png" alt="">
    </div>
    <div class="download border-1px">
      <p @click="toDo(toUrl)">下载考拉行情APP  实时跟踪数据变化</p>
    </div>
    <div class="tab border-1px" ref="tab">
      <p @click="setTab(1)" :class="{'active':tabId===1}">核心数据</p>
      <p @click="setTab(2)" :class="{'active':tabId===2}">币种介绍</p>
      <p @click="setTab(3)" :class="{'active':tabId===3}">团队成员</p>
    </div>
    <div ref="Top">
      <core-data v-if="tabId === 1"></core-data>
      <intod v-if="tabId === 2" :intodList="intodList"></intod>
      <team v-if="tabId === 3"></team>
    </div>
    
    <div class="footer"></div>
    <transition name="bounce">
      <p v-if="down" @click="toDo(toUrl)" class="fixedDown">下载Coinla App</p>
    </transition>
  
  </div>
</template>

<script>
  import Scroll from 'components/scroll'
  import Highcharts from 'highcharts/highcharts'
  import coreData from 'components/coreData'
  import intod from 'components/intod'
  import team from 'components/team'
  import {chartData, chartData1, priceRest, restCharts, restTime} from 'common/lineReset'
  
  export default {
    name: 'App',
    components: {
      coreData,
      intod,
      team,
      Scroll
    },
    data() {
      return {
        down: false,
        chart: null,
        Dat: [],
        ExchangeInfo: {},
        btnArr: ['两周', '1月', '3月', '6月', '1年'],
        btnAct: '',
        toUrl: '',
        isShowLine: true,
        tabId: 1,
        isFixed: false,
        intodList: {},
        shareList: {}
      }
    },
    mounted() {
      this.getLineData(0)
      this.getExchangeInfo()
      this.isIos()
      let _this = this
      this.$nextTick(() => {
        this.initScroll()
        window.onresize = function windowResize() {
          _this.isIos()
          let Obj = document.getElementById('container1')
          Obj.style.height = Obj.offsetWidth + 'px'
        }
      })
    },
    methods: {
      getIntodList() {
        this.$http({
          url: '/currency/findCurrencyIntra',
          method: 'post',
          params: {ccyId: this.$utils.getUrlKey('ccyId')}
        }).then((res) => {
          this.intodList = res.data.data
          this.shareList.pic = res.data.data.pic
          this.shareWeixin(this.shareList)
        })
      },
      initScroll() {
        let h = this.$refs.tab.offsetTop
        let H = this.$refs.tab.offsetHeight
        this.$refs.Top.style.transition = 'all .3s'
        document.addEventListener('scroll', function () {
          if (document.documentElement.scrollTop > 50 || document.body.scrollTop > 50) {
            this.down = true
          } else {
            this.down = false
          }
          if (document.documentElement.scrollTop > h || document.body.scrollTop > h) {
            this.isFixed = true
          } else {
            this.isFixed = false
          }
        }.bind(this), false)
      },
      setTab(id) {
        this.tabId = id
      },
      isIos() {
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          //这个是安卓操作系统
          this.toUrl = 'https://www.pgyer.com/coinla'
        } else if (isIOS) {
          //这个是ios操作系统
          this.toUrl = 'https://itunes.apple.com/cn/app/coinla/id1359706851?mt=8'
        } else {
          //PC端
          this.toUrl = 'https://www.coinla.com/'
        }
      },
      getExchangeInfo() {
        this.$http({
          url: '/exchange/exchangeInfo',
          method: 'post',
          params: {cerId: this.$utils.getUrlKey('cerId')}
        }).then((res) => {
          this.ExchangeInfo = res.data.data
          this.shareList.title = res.data.data.currencyShortName + '/' + res.data.data.currencyRightShortName + ' - ' + res.data.data.exchangeName
          this.shareList.desc = `当前价 ￥${res.data.data.openPrice}\n涨跌幅 ${res.data.data.openRiseFall > 0 ? '+' + res.data.data.openRiseFall : res.data.data.openRiseFall}%`
          document.title = res.data.data.currencyName
          this.getIntodList()
        })
      },
      getLineData(nav) {
        console.log(nav)
        //防止重复点击
        if (nav === this.btnAct) return
        this.btnAct = nav
        this.$http({
          url: '/kline/find',
          method: 'post',
          params: {relationId: this.$utils.getUrlKey('cerId'), type: nav}
        }).then((res) => {
          if (res.data.data.length > 3) {
            this.isShowLine = true
            this.Dat[0] = chartData(res.data.data)
            this.Dat[1] = chartData(res.data.data, 4)
            let arr = chartData1(res.data.data)
            let arr1 = chartData1(res.data.data, 4)
            let max = Math.max.apply(null, arr),
              min = Math.min.apply(null, arr)
            
            this.setLine(this.Dat, max, min)
          } else {
            this.isShowLine = false
          }
        })
      },
      toDo(url) {
        window.open(url)
      },
      setLine(Dat, max, min) {
        Highcharts.setOptions(restCharts)
        this.chart = Highcharts.chart('container',
          {
            colors: ['#e2bd51', '#f00000', '#00b785', '#DDDF00', '#ED561B', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
            credits: {
              enabled: false
            },
            chart: {
              zoomType: 'x',
              panning: true,
              panKey: 'shift',
              ignoreHiddenSeries: true
            },
            title: {
              text: false
            },
            subtitle: {
              text: false
            },
            xAxis: {
              gridLineWidth: 1,
              gridLineColor: '#f0f0f0',
              type: 'datetime',
            },
            yAxis: [
              {//第一条Y轴
                allowDecimals: true,
                gridLineWidth: 1,
                gridLineColor: '#f0f0f0',
                lineWidth: 1,
                lineColor: '#f0f0f0',
                height: '72%',
                title: false,
                visible: true,
                max: max,
                min: min,
                startOnTick: false,
                labels: {
                  x: 5,
                  y: -2,
                  align: 'left',
                },
              },
              {// 第二条Y轴
                allowDecimals: true,
                gridLineWidth: 1,
                gridLineColor: '#f0f0f0',
                lineWidth: 1,
                lineColor: '#f0f0f0',
                title: false,
                top: '75%',
                height: '25%',
                visible: true,
                labels: {
                  x: 5,
                  y: -2,
                  align: 'left',
                  formatter: function () {
                    return priceRest(this.value)
                  },
                }
              }
            ],
            plotOptions: {
              areaspline: {
                fillColor: {
                  linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                  },
                  stops: [
                    [0, '#e2bd51'],
                    [1, Highcharts.Color('#e2bd51').setOpacity(0).get('rgba')]
                  ]
                },
                lineWidth: 1,
                states: {
                  hover: {
                    lineWidth: 1
                  }
                },
                marker: {
                  enabled: false,
                }
              }
            },
            legend: {
              enabled: false
            },
            tooltip: {
              positioner: function () {
                return {
                  x: 30,
                  y: 0
                }
              },
              backgroundColor: 'rgba(255,255,255,0.4)',
              formatter: function () {
                let X = restTime(this.x)
                let s = `<span style="color:#64E572;font-size: 12px">\u25CF </span> <span style="font-size: 12px"> 时间 : <span style="font-size: 12px">${X}</span>`
                this.points.forEach(function (item) {
                  let val = priceRest(item.y)
                  s += `<br/><span style="color:${item.color};font-size: 12px">\u25CF </span> <span style="font-size: 12px">${item.series.name} : </span><b style="font-size: 12px">${val}</b>`;
                });
                return s;
              },
              crosshairs: [{
                width: 1,
                color: '#dcdcdc'
              }, {
                width: 1,
                color: '#dcdcdc'
              }],
              shadow: false,
              borderWidth: 1,
              borderColor: '#e6e6e6',
              split: false,
              shared: true
            },
            series: [
              {
                type: 'areaspline',
                name: '价格',
                data: Dat[0]
              }, {
                name: '成交额',
                type: 'column',
                yAxis: 1,
                data: Dat[1],
                dataGrouping: {
                  enabled: false
                },
                zones: [{
                  value: Dat[1][0][1],
                  color: '#f00000'
                }, {
                  color: '#00b785'
                }]
              }
            ],
            navigation: {
              menuItemStyle: {
                fontSize: '10px'
              }
            }
          })
      },
      shareWeixin(shareData) {
        // console.log('share', shareData)
        //alert(window.location.href);/***用于获得当前连接url用**/
        /***用户点击分享到微信圈后加载接口接口*******/
        this.$http({
          url: 'https://api.coinla.com/wechatParam',
          method: 'post',
          params: {url: window.location.href}
        }).then((data) => {
          data = data.data
          let linkUrl = data.url, shareTitle = shareData.title, shareImg = shareData.pic, shareContent = shareData.desc,
            metaStr = '<meta itemprop="name" content="' + shareTitle + '"/><meta name="description" itemprop="description" content="' + shareContent + '"/><meta itemprop="image" content="' + shareImg + '"/>';
          $('head').append(metaStr);
          $('title').html(shareTitle);
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
          
          wx.ready(function () {
            wx.onMenuShareTimeline({
              title: shareTitle, // 分享标题
              desc: shareContent, // 分享描述
              link: linkUrl, // 分享链接
              imgUrl: shareImg, // 分享图标
              success: function (e) {
                // 用户确认分享后执行的回调函数
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
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
          });
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  #app {
    width: 100%
    font-size: $main-size
    .fixedDown {
      position: fixed
      bottom: 50px
      width: 40%
      padding: 10px
      text-align: center
      background-color: $main-color
      border-radius: calc((.3rem + 20px) / 2)
      color: #fff
      font-size: .3rem
      cursor: pointer
      z-index: 9999
      left: 30%
      &:before {
        content: ''
        position: absolute
        top: -10px
        left: -10px
        right: -10px
        bottom: -10px
      }
    }
    .bounce-enter-active {
      animation: bounce-in .5s
    }
    .bounce-leave-active {
      animation: bounce-in .5s reverse
    }
    @keyframes bounce-in {
      0% {
        transform: scale(0)
      }
      50% {
        transform: scale(1.5)
      }
      100% {
        transform: scale(1)
      }
    }
    .recommend-content {
      height: 90vh
      overflow: hidden
    }
    
    .fixed {
      width: 100%
      background-color: rgba(153, 153, 153, .9)
      height: 58px
      display: flex
      align-items: center
      justify-content: space-between
      padding: 0 16px
      z-index: 999
      font-size: .24rem
      &-l {
        display: flex
        .logo {
          margin-right: 8px
          width: .68rem
          height: .68rem
          max-height: 50px
          max-width: 50px
          img {
            width: 100%
            height: 100%
          }
        }
        .size {
          display: flex
          flex-direction: column
          justify-content: space-between
          b {
            padding-top: 3px
            font-size: .28rem
          }
          span {
            font-size: .22rem
          }
        }
      }
      &-r {
        extend-click()
        padding: 7px 15px 5px 15px
        border: 1px solid $main-color
        background-color: $main-color
        color: #000
        border-radius: calc((0.24rem + 14px) / 2)
      }
    }
    .top {
      display: flex
      justify-content: space-between
      align-items: center
      padding: 10px 16px
      border-1px($border-color)
      &-name {
        font-size: .4rem
        color: $size-color
      }
      &-right {
        p {
          &:nth-of-type(1) {
            display: flex
            font-size: .28rem
            span {
              i {
                color: $main-color
                margin-right: 4px
              }
              &:nth-of-type(2) {
                margin-left: 20px
                color: $size-color
              }
            }
          }
          &:nth-of-type(2) {
            margin-top: 10px
            color: $color-b
            text-align: right
          }
        }
      }
    }
    .info {
      display: flex
      justify-content: space-between
      border-1px($border-color)
      padding: 15px
      color: $color-b
      &-l {
        p {
          margin: 6px 0
          span {
            margin-left: 6px
          }
          &:nth-child(1) {
            font-size: $sl-size
          }
          &:nth-child(2) {
            font-size: $big-size
            color: $size-color
            span {
              font-size: .28rem
              &:nth-child(1) {
                margin-left: 0
              }
            }
          }
        }
      }
      &-r {
        display flex
        flex-direction: column
        justify-content: center
        padding-right: 10px
        p {
          margin: 6px 0
          span {
            display: inline-block
            &:nth-child(1) {
              width: 1rem
              text-align: right
            }
            &:nth-child(2) {
              margin-left: 6px
            }
          }
        }
      }
    }
    .timeBtn {
      display: flex
      justify-content: space-between
      padding: 8px 16px
      border-1px($border-color)
      p {
        color: $color-b
        min-width: 40px
        padding: 4px 6px
        font-size: 0.28rem
        border-radius: calc((0.28rem + 8px) / 2)
        text-align: center
        cursor: pointer
        transition: all .3s
        extend-click()
        &.active {
          background: $main-color
          color: #fff
        }
      }
    }
    .download {
      border-1px($border-color)
      padding: .16rem 15px
      p {
        width: 100%
        padding: 10px
        text-align: center
        background-color: $main-color
        border-radius: calc((.3rem + 20px) / 2)
        color: #fff
        font-size: .3rem
        cursor: pointer
      }
    }
    .line {
      min-height: 300px
      padding: 10px 0
      border-1px($border-color)
      position: relative
      img {
        width: 200px
        position: absolute
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)
      }
    }
    .tab, .tab1 {
      display: flex
      justify-content: space-between
      padding: 8px 16px
      border-1px($border-color)
      transition: all .3s
      width: 100%
      p {
        color: $color-b
        width: calc(80% / 3)
        padding: 4px 0
        font-size: 0.28rem
        border-radius: calc((0.28rem + 8px) / 2)
        text-align: center
        cursor: pointer
        transition: all .3s
        extend-click()
        &.active {
          background: $main-color
          color: #fff
        }
      }
    }
    
    .tab1 {
      position: fixed
      top: 0
      background-color: rgba(255, 255, 255, .9)
      z-index: 999
    }
    
    .footer {
      height: .5rem
      min-height: 20px
      background-color: #f7f7f7
    }
  }


</style>
