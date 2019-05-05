<template>
  <div class="core" >
    <div v-if="coreData">
      <ul class="core-pie">
        <li class="core-pie-single">
          <p class="pie">
            <canvas id="market" width="96" height="96"></canvas>
          </p>
          <p class="size">
            <span class="size-title">上架交易所</span>
            <a style="color: #51a3d2">{{coreData.market_qty}}</a>
            <span class="size-title">当前交易所</span>
            <a>{{coreData.market_total}}</a>
          </p>
        </li>
        <li class="core-pie-single">
          <p class="pie">
            <canvas id="circulate" width="96" height="96"></canvas>
          </p>
          <p class="size">
            <span class="size-title">当前流通率</span>
            <a style="color: #623ad7">{{coreData.circulate_ratio|numRest('%','no')}}</a>
          </p>
        </li>
        <li class="core-pie-single">
          <p class="pie">
            <canvas id="turnover" width="96" height="96"></canvas>
          </p>
          <p class="size">
            <span class="size-title">转手率 (24H)</span>
            <a style="color: #e04590">{{coreData.turnover_ratio_24h|numRest('%','no')}}</a>
          </p>
        </li>
        <li class="core-pie-single">
          <p class="pie">
            <img src="~static/images/coin/allMarket.png" alt="">
          </p>
          <p class="size">
            <span class="size-title">总市值</span>
            <a style="color: #d8b452">{{coreData.total_value|numRest}}</a>
          </p>
        </li>
        <li class="core-pie-single">
          <p class="pie">
            <canvas id="total" width="96" height="96"></canvas>
          <p class="size">
            <span class="size-title">总市值占比</span>
            <a style="color: #20cae2">{{coreData.total_value_ratio|numRest('%','no')}}</a>
          </p>
        </li>
        <li class="core-pie-single">
          <p class="pie">
            <img src="~static/images/coin/rankMarket.png" alt="">
          </p>
          <p class="size">
            <span class="size-title">市值排名</span>
            <a style="color: #ff5644">NO.{{coreData.circulate_total_value_rank}}</a>
          </p>
        </li>
      </ul>
      <div class="counter">
        <p class="title">交易对占比(24h)</p>
        <div class="info">
          <div id="container1" style="width: 263px;height: 213px;padding-right: 50px;"></div>
          <ul class="info-r clear-f">
            <li class="f-l" v-for="(item,index) in coreData.pair_ratio" :key="index">
              <p class="fang" :style="{backgroundColor:colors[index]}"></p>
              <p class="size">{{item.base}}<span>{{item.ratio}}%</span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <img class="noDataImg" v-else src="~static/images/noData.png" alt="">
  </div>
</template>

<script>
  import Highcharts from 'highcharts/highcharts'
  import canvasRound from '~/components/canvasRound'
  import canvasRounds from '~/assets/js/canvasRound'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    props: ['ccyId'],
    // async asyncData({params}) {
    //   return getCoinlaSingle('/exchange/findcurrencyCoreData', {ccyId: this.ccyId})
    //     .then((res) => {
    //       return {
    //         coreData: res.data.data
    //       }
    //     })
    //     .catch((err) => {
    //       return {
    //         coreData: {}
    //       }
    //     })
    // },
    data() {
      return {
        coreData:{},
        colors: ['#f5a623', '#f8e71c', '#7ed321', '#0cb230', '#02c8c0', '#34a4e2', '#4d66cc', '#8f32dc', '#cf48e3', '#fb6830'],
      }
    },
    mounted() {
      //
      this.getCoreData()
    },
    methods: {
      getCoreData() {
        getCoinlaSingle('/exchange/findcurrencyCoreData', {ccyId: this.ccyId})
          .then((res) => {
            this.coreData = res.data.data
            this.setPieT(this.coreData)
            this.setPieB(this.coreData)
          })
      },
      setPieT(coreData) {
        if(coreData){
          let market = {
            id: 'market',
            color: ['#53a4d5', '#409bb4', '#51a3d2'],
            lineCap: 'round',
            text: ''
          }
          let circulate = {
            id: 'circulate',
            color: ['#6c2fd7', '#2978d8', '#623ad7'],
            lineCap: 'round',
            text: ''
          }
          let turnover = {
            id: 'turnover',
            color: ['#e04590', '#ce1dbb', '#d9379f'],
            lineCap: 'round',
            text: ''
          }
          let total = {
            id: 'total',
            color: ['#21cde1', '#1d75f9', '#20cae2'],
            lineCap: 'round',
            text: ''
          }
          market.angle = parseFloat(((coreData.market_qty / coreData.market_total)).toFixed(4))
          market.text = coreData.market_qty
          circulate.angle = parseFloat((parseFloat(coreData.circulate_ratio) / 100).toFixed(4))
          turnover.angle = parseFloat((parseFloat(coreData.turnover_ratio_24h) / 100).toFixed(4))
          total.angle = parseFloat((parseFloat(coreData.total_value_ratio) / 100).toFixed(4))
          canvasRounds(market)
          canvasRounds(circulate)
          canvasRounds(turnover)
          canvasRounds(total)
        }

      },
      setPieB(data) {
        let pieDat = data.pair_ratio
        let PieData = []
        for (let i = 0; i < pieDat.length; i++) {
          let arr = []
          arr[0] = pieDat[i].base
          arr[1] = pieDat[i].ratio
          PieData.push(arr)
        }
        Highcharts.chart('container1', {
          colors: this.colors,
          credits: {
            enabled: false
          },
          chart:{
            margin: [0, 0, 0, 0]
          },
          title: {
            text: ''
          },
          tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.2f}%</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: false,
              cursor: 'pointer',
              dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
              }
            }
          },
          series: [{
            type: 'pie',
            name: '交易对占比(24h)',
            borderWidth: 0,
            data: PieData
          }]
        });
      },
    },
    components: {
      canvasRound
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  .core {
    &-pie {
      display: flex
      justify-content: center
      flex-wrap: wrap
      &-single {
        width: calc(100% / 3)
        /*border: 1px solid $border-color*/
        padding: 30px 0
        display: flex
        align-items: center
        .pie {
          width: 136px
          height: 96px
          padding-left: 40px
          position: relative
          img {
            position: absolute
            top: 50%
            left: calc(50% + 20px)
            transform: translate(-50%, -50%)
          }
        }
        .size {
          flex: 1
          margin-left: 15px
          a {
            display: block
            margin-top: 5px
            font-size: $font-xl
            &:nth-of-type(1) {
              margin-bottom: 8px
              color: #53a4d5
            }
            &:nth-of-type(2) {
              color: $size-ssmain
            }
          }
          &-title {
            font-size: $font-x
          }
        }
      }
    }
    .counter {
      min-height: 200px
      padding: 16px
      .title {
        margin-top: 38px
        margin-bottom: 20px
        padding-left: 25px
        color: $size-main
        font-size: $font-l
      }
      .info {
        display: flex
        &-r {
          flex: 1
          padding-top: 10px
          li {
            width: calc(100% / 3)
            display: flex
            align-items: center
            margin-bottom: 32px
            .fang {
              width: 12px
              height: 12px
              margin-right: 10px
            }
            .size {
              color: $size-main
              span {
                font-size: 16px
                color: $size-ssmain
                margin-left: 10px
              }
            }
          }
        }
      }
    }
  }
</style>
