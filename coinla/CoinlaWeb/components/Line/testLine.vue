<template>
  <div class="app">
    <div class="box">
      <div :id="chartId" style="height: 600px;"></div>
    </div>
    <img class="noDataImg" v-show="Dat.length<3" src="~static/images/noData.png" alt="">
  </div>
</template>
<script>
  import Highcharts from 'highcharts/highstock'
  import {allChartData, restCharts, priceRest, resetTime} from '~/assets/js/case'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    props: {
      types: {
        default: 0
      },
      chartId: {
        type: String,
        default: 'container'
      }
    },
    data() {
      return {
        Dat: {
          top: [],
          bot: [],
          time: []
        },
        chart: null,
        timer: null,
        title: this.types ? "全球数字货币总市值走势图(比特币Btc除外)" : '全球数字货币总市值走势图'
      }
    },
    mounted() {
      this.getChartData(this.chartId, this.types);
    },
    methods: {
      afterSetExtremes(e) {
        // console.log(e)
        // console.log(resetTime(e.min, 1))
        // console.log(resetTime(e.max, 1))
        if (e.dataMin != e.min || e.dataMax != e.max) {
          clearTimeout(this.timer)
          this.chart.showLoading('Loading data from server...');
          this.timer = setTimeout(() => {
            getCoinlaSingle('/marketValueTendency/find', {
              timeGenre: 3,
              startTime: resetTime(e.min, 1),
              endTime: resetTime(e.max, 1),
              type: this.types
            })
              .then((res) => {
                if (res.data.code === 0) {
                  let dataAll = res.data.data
                  if (this.types) {
                    this.chart.series[0].setData(allChartData(dataAll, 'marketValueExceptUsd'));
                    this.chart.series[1].setData(allChartData(dataAll, 'turnoverExceptUsd'));
                  } else {
                    this.chart.series[0].setData(allChartData(dataAll, 'marketValueUsd'));
                    this.chart.series[1].setData(allChartData(dataAll, 'turnoverUsd'));
                  }
                }
                // console.log(allChartData(res.data.data, 1))
                this.chart.hideLoading()
              })
          }, 300)
        }
      },
      getChartData() {
        getCoinlaSingle('/marketValueTendency/find', {
          timeGenre: 3,
          startTime: '2013-01-01 08:00:00',
          endTime: resetTime(new Date(), 1),
          type: this.types
        }).then((res) => {
          if (res.data.code === 0) {
            if (this.types) {
              this.Dat.top = allChartData(res.data.data, 'marketValueExceptUsd')
              this.Dat.bot = allChartData(res.data.data, 'turnoverExceptUsd')
            } else {
              this.Dat.top = allChartData(res.data.data, 'marketValueUsd')
              this.Dat.bot = allChartData(res.data.data, 'turnoverUsd')
            }
            this.createChart(this.chartId, this.Dat)
          }
        })
      },
      createChart(id, Dat) {
        let _this = this
        Highcharts.setOptions(restCharts);
        _this.chart = Highcharts.stockChart(id, {
          chart: {zoomType: 'x'},
          colors: ['#debd63', '#debd63'],
          navigator: {adaptToUpdatedData: false,
            series: {
              color: '#debd63',
              lineWidth: 1
            }},
          scrollbar: {liveRedraw: false},
          credits: {enabled: false},
          title: {text: this.title, align: "left", style: {fontSize: "22px"}},
          subtitle: {text: ''},
          legend: {enabled: true},
          rangeSelector: {
            allButtonsEnabled: true,
            inputEnabled: true, // it supports only days
            enabled: true,
            selected: 6 // all
          },
          xAxis: [{
            events: {
              afterSetExtremes: _this.afterSetExtremes
            },
            minRange: 24 * 3600 * 1000,
          }],
          yAxis: [
            {// 第一条Y轴
              format: '{value}$',
              title: {
                text: '市值($)',
                style: {
                  color: '#DEBD63'
                }
              },
              color: '#DEBD63',
              labels: {
                formatter: function () {
                  return `${priceRest(this.value)} $`
                },
                align: 'left',
                x: 5,
                style: {
                  color: '#DEBD63'
                }
              },
              showEmpty: false,
              height: '80%',
              opposite: false,
              offset: 8,
              lineWidth: 0
            },
            {// 第二条Y轴
              title: {
                text: '24h成交额($)',
                style: {
                  color: '#DEBD63'
                }
              },
              labels: {
                formatter: function () {
                  return `${priceRest(this.value)} $`
                },
                align: 'left',
                x: 5,
                style: {
                  color: '#DEBD63'
                }
              },
              showEmpty: false,
              top: '80%',
              height: '20%',
              offset: 8,
              lineWidth: 0,
              opposite: false
            }
          ],
          tooltip: {
            formatter: function () {
              let X = resetTime(this.x, 1)
              // console.log(X)
              let s = `<span style="color:#777;font-size: 12px">\u25CF </span> <span style="font-size: 12px"> 时间 : <span style="font-size: 12px">${X}</span>`
              this.points.forEach(function (item) {
                let val = priceRest(item.y)
                s += `<br/><span style="color:${item.color};font-size: 12px">\u25CF </span> <span style="font-size: 12px">${item.series.name} : </span><b style="font-size: 12px">${val}</b>`;
              });
              return s;
            },
            split: false,
            shared: true
          },
          series: [
            {
              name: '流通市值 ($)',
              data: Dat.top,
              dataGrouping: {
                enabled: false
              }
            },
            {
              name: '24h成交额 ($)',
              data: Dat.bot,
              yAxis: 1,
              type: 'column',
              dataGrouping: {
                enabled: false
              }
            }
          ]
        });
      },
    }
  }
</script>

<style lang="stylus">
  .app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    .box {
      width: 100%;
      display: inline-block;
      overflow: hidden;
      position: relative;
    }
  }
</style>
