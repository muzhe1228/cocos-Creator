<template>
  <div class="core">
    <div class="progress">
      <p class="title border-1px">基础数据</p>
      <div class="info-single">
        <p class="name"><span>上架交易所</span><span style="color:#fda22e">{{coreList.market_qty}}</span></p>
        <p class="gress"><span
          :style="{width:((coreList.market_qty/coreList.market_total))*100>4?((coreList.market_qty/coreList.market_total).toFixed(2))*100+'%':'4%'}"
          style="background-color:#fda22e"
          class="gressBar"></span></p>
      </div>
      <div class="info-single">
        <p class="name"><span>当前流通率</span><span style="color:#52c3e2">{{coreList.circulate_ratio}}%</span></p>
        <p class="gress"><span
          :style="{width:parseFloat(coreList.circulate_ratio)>4?coreList.circulate_ratio+'%':'4%'}"
          style="background-color:#52c3e2"
          class="gressBar"></span></p>
      </div>
      <div class="info-single">
        <p class="name"><span>转手率(24h)</span><span style="color:#72cbcd">{{coreList.turnover_ratio_24h}}%</span></p>
        <p class="gress"><span
          :style="{width:parseFloat(coreList.turnover_ratio_24h)>4?coreList.turnover_ratio_24h+'%':'4%'}"
          style="background-color:#72cbcd"
          class="gressBar"></span></p>
      </div>
    </div>
    <div class="trends">
      <p class="title border-1px">市值数据</p>
      <ul class="info">
        <li>
          <p>总市值</p>
          <p>￥{{coreList.total_value}}</p>
        </li>
        <li>
          <p>总市值占比</p>
          <p>{{coreList.total_value_ratio}}%</p>
        </li>
        <li>
          <p>流通总量</p>
          <p>{{coreList.circulate_total}}</p>
        </li>
        <li>
          <p>流通市值</p>
          <p>￥{{coreList.circulate_total_value}}</p>
        </li>
        <li>
          <p>市值排名</p>
          <p>{{coreList.circulate_total_value_rank}}</p>
        </li>
      </ul>
    </div>
    <div class="counter">
      <p class="title border-1px singTitle">交易对占比(24h)</p>
      <div class="info">
        <div id="container1"></div>
        <ul class="info-r">
          <li v-for="(item,index) in coreList.pair_ratio" :key="index">
            <p class="fang" :style="{backgroundColor:colors[index]}"></p>
            <p class="size">{{item.base}}<span>{{parseFloat(item.ratio)}}%</span></p>
          </li>
        </ul>
      </div>
    </div>
    <div class="bourse">
      <p class="title border-1px">交易所占比(24h)</p>
      <ul class="info">
        <li class="th border-1px borderT-1px">
          <p>排行</p>
          <p>交易所</p>
          <p>交易对 </p>
          <p>成交量</p>
          <p>占比</p>
        </li>
        <li class="td" v-for="(item ,index) in BourseList" :key="index">
          <p :data="item">{{index+1}}</p>
          <p>{{item.exchangeName}}</p>
          <p>{{item.currencyShortName}}/{{item.currencyRightShortName}}</p>
          <p>{{item.openVolume}}</p>
          <p>{{item.openTurnoverProportion}}%</p>
        </li>
      </ul>
    </div>
    <!--<div class="footer">-->
    <!--<p><i class="icon-redo"></i>去考拉行情APP查看完整币种资料</p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Highcharts from 'highcharts/highcharts'
  import gressBar from 'components/gressBar'
  
  export default {
    name: "core-data",
    props: {
      Dom: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        colors: ['#f5a623', '#f8e71c', '#7ed321', '#0cb230', '#02c8c0', '#34a4e2', '#4d66cc', '#8f32dc', '#cf48e3', '#fb6830'],
        PieData: [],
        BourseList: [],
        coreList: {},
      }
    },
    components: {
      gressBar
    },
    mounted() {
      this.getCore()
      this.getBourse()
    },
    methods: {
      getCore() {
        this.$http({
          url: '/exchange/findcurrencyCoreData',
          method: 'post',
          params: {ccyId: this.$utils.getUrlKey('ccyId')}
        }).then((res) => {
          this.coreList = res.data.data
          let pie = res.data.data.pair_ratio
          let PieData = []
          for (let i = 0; i < pie.length; i++) {
            let arr = []
            arr[0] = pie[i].base
            arr[1] = parseFloat(pie[i].ratio)
            PieData.push(arr)
          }
          this.setPie(PieData)
        })
      },
      getBourse() {
        this.$http({
          url: '/rank/findCurrencyDealMore',
          method: 'post',
          params: {ccyId: this.$utils.getUrlKey('ccyId')}
        }).then((res) => {
          this.BourseList = res.data.data
        })
      },
      setPie(data) {
        let Obj = document.getElementById('container1')
        Obj.style.height = Obj.offsetWidth + 'px'
        Highcharts.chart('container1', {
          colors: this.colors,
          chart: {
            margin: [0, 0, 0, 0]
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: false,
              cursor: 'pointer',
              borderWidth: 0,
              dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              }
            },
            series: {
              states: {
                hover: {
                  enabled: false
                }
              }
            }
          },
          series: [{
            type: 'pie',
            name: '占比',
            data: data
          }]
        });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  .core {
    color: $color-b
    font-size: $main-size
    .progress {
      padding: 15px
      width: 100%
      border-bottom: 4px solid #f0f0f0
      .info-single {
        margin-top: 20px
        display: flex
        justify-content: space-between
        align-items: center
        font-size: .28rem
        .name {
          width: calc(45% - 20px)
          display: flex
          span {
            display: inline-block
            &:nth-child(1) {
              width: 60%
            }
            &:nth-child(2) {
              width: 40%
            }
          }
        }
        .gress {
          flex: 1
          height: 8px
          background-color: #d8d8d8
          border-radius: 5px
          position: relative
          &Bar {
            position: absolute
            top: 0
            left: 0
            height: 8px
            border-radius: 5px
            transition: all .3s
          }
        }
      }
    }
    .trends {
      padding: 15px 15px 0 15px
      border-bottom: 4px solid #f0f0f0
      .info {
        display: flex
        flex-wrap: wrap
        padding: 10px 0
        li {
          width: calc(100% / 3)
          text-align: center
          height: 1.22rem
          padding: .24rem 0
          border-right: 1px solid #f4f4f4
          &:nth-child(-n+3) {
            border-bottom: 1px solid #f4f4f4
          }
          &:nth-child(3) {
            border-right: 1px solid transparent
          }
          p {
            &:nth-child(2) {
              font-size: $sl-size
              color: $size-color
              margin-top: .2rem
            }
          }
        }
      }
    }
    .counter {
      min-height: 200px
      padding: 15px 15px 15px 5px
      border-bottom: 4px solid #f0f0f0
      .info {
        display: flex
        justify-content: space-between
        margin-top: 10px
        #container1 {
          width: 40%
        }
        &-r {
          width: 58%
          display: flex
          flex-wrap: wrap
          align-items: flex-start
          padding: 10px 0
          li {
            width: 50%
            display: flex
            align-items: center
            .fang {
              width: .16rem
              height: .16rem
              background-color: red
              margin-right: 4px
            }
            .size {
              color: $size-color
              span {
                font-size: $s-size
                color: $color-b
                padding-left: 6px
              }
            }
            
          }
        }
      }
    }
    .bourse {
      padding: 15px
      font-size: $s-size
      .info {
        .th {
          border-1px(#f0f0f0)
          margin-top: 10px
        }
        
        .th, .td {
          display: flex
          flex-wrap: wrap
          padding: 11px 8px
          p {
            &:nth-child(1) {
              width: 12%
            }
            &:nth-child(2) {
              width: 25%
            }
            &:nth-child(3) {
              width: 28%
            }
            &:nth-child(4) {
              width: 20%
            }
            &:nth-child(5) {
              width: 15%
              text-align: right
            }
          }
        }
        .th {
          padding-top: 1px
        }
        .td {
          p {
            &:nth-child(1) {
              padding-left: .18rem
            }
          }
        }
      }
    }
    .title {
      font-size: $sl-size
      color: $size-color
      display: flex
      align-items: center
      border-1px(#f0f0f0)
      padding-bottom: 15px
    }
    .singTitle {
      margin-left: 10px
    }
    .footer {
      color: $main-color
      padding: 15px
      text-align: center
      font-size: .32rem
      i {
        margin-right: 6px
      }
    }
  }
</style>
