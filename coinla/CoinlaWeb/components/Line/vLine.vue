<template>
  <div class="app">
    <div class="box" v-show="Dat.lastPriceUsd.length>3">
      <div :id="chartId" style="height: 600px;"></div>
    </div>
    <img class="noDataImg" v-show="Dat.lastPriceUsd.length<4" src="~static/images/noData.png" alt="">
  </div>
</template>
<script>
  import Highcharts from 'highcharts/highstock'
  import {allChartDataV, restCharts, priceRest, resetTime} from '~/assets/js/case'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    props: {
      ccyId: {
        default: 161
      },
      chartId: {
        type: String,
        default: 'container'
      }
    },
    data() {
      return {
        Dat: {
          lastPriceUsd: [],
          TotalValueUsd: [],
          turnoverUsd: []
        },
        chart: null
      }
    },
    mounted() {
      // this.createChart(this.chartId);
      this.getLine()
    },
    methods: {
      getLine() {
        let params = {
          timeGenre: 3,
          startTime: '2010-05-30 08:00:00',
          endTime: resetTime(new Date(), 1),
          ccyId: this.ccyId
        }
        getCoinlaSingle('/marketValueTendency/findList', params)
          .then((res) => {
            this.Dat.lastPriceUsd = allChartDataV(res.data.data, 'lastPriceUsd')
            this.Dat.TotalValueUsd = allChartDataV(res.data.data, 'circulateTotalValueUsd')
            this.Dat.turnoverUsd = allChartDataV(res.data.data, 'turnoverUsd')
            this.createChart(this.chartId, this.Dat)
          })
      },
      afterSetExtremes(e) {
        // console.log(e)
        // console.log(resetTime(e.min, 1))
        // console.log(resetTime(e.max, 1))
        if (e.dataMin != e.min || e.dataMax != e.max) {
          clearTimeout(this.timer)
          this.chart.showLoading('Loading data from server...');
          this.timer = setTimeout(() => {
            getCoinlaSingle('/marketValueTendency/findList', {
              timeGenre: 3,
              startTime: resetTime(e.min, 1),
              endTime: resetTime(e.max, 1),
              ccyId: this.ccyId
            })
              .then((res) => {
                if (res.data.code === 0) {
                  let dataAll = res.data.data
                  this.chart.series[0].setData(allChartDataV(dataAll, 'lastPriceUsd'));
                  this.chart.series[1].setData(allChartDataV(dataAll, 'circulateTotalValueUsd'));
                  this.chart.series[2].setData(allChartDataV(dataAll, 'turnoverUsd'));
                }
                this.chart.hideLoading()
              })
          }, 300)
        }
      },
      createChart(id, data) {
        let _this = this
        Highcharts.setOptions(restCharts);
        _this.chart = Highcharts.stockChart(id, {
          chart: {zoomType: 'x', type: 'line', ignoreHiddenSeries: true},
          legend: {
            enabled: true,
            align: 'center',
            backgroundColor: '#FFFFFF',
            borderColor: 'black',
            borderWidth: 0,
            layout: 'horizontal',
            verticalAlign: 'bottom',
            y: 0,
            shadow: false,
            floating: false
          },
          navigator: {
            adaptToUpdatedData: false,
            series: {
              color: '#debd63',
              lineWidth: 1
            }
          },
          // scrollbar: {liveRedraw: false},
          credits: {enabled: false},
          rangeSelector: {
            allButtonsEnabled: true,
            inputEnabled: true, // it supports only days
            enabled: true,
            selected: 6
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
                text: '当前价 ($)',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              },
              labels: {
                formatter: function () {
                  return `${priceRest(this.value)} $`
                },
                x: 5,
                align: 'left',
                style: {
                  color: Highcharts.getOptions().colors[0]
                }
              },
              showEmpty: false,
              height: '80%',
              offset: 8,
              opposite: false,
              lineWidth: 0,
            },
            {// 第二条Y轴
              title: {
                text: '流通市值 ($)',
                style: {
                  color: Highcharts.getOptions().colors[1]
                }
              },
              labels: {
                formatter: function () {
                  return `${priceRest(this.value)} $`
                },
                align: 'right',
                x: -5,
                style: {
                  color: Highcharts.getOptions().colors[1]
                }
              },
              showEmpty: false,
              height: '80%',
              offset: 8,
              lineWidth: 0,
              opposite: true
            },
            { // 第三条Y轴
              title: {
                text: '24h成交额 ($)',
                style: {
                  color: Highcharts.getOptions().colors[2]
                }
              },
              labels: {
                formatter: function () {
                  return `${priceRest(this.value)}`
                },
                align: 'left',
                x: 5,
                style: {
                  color: Highcharts.getOptions().colors[2]
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
          title: {
            text: '',
            style: {
              color: '#454545',
              fontWeight: 'bold',
              fontSize: '18px'
            }
          },
          tooltip: {
            formatter: function () {
              let X = resetTime(this.x, 1)
              let s = `<span style="color:#777777;font-size: 12px">\u25CF </span> <span style="font-size: 12px"> 时间 : <span style="font-size: 12px">${X}</span>`
              this.points.forEach(function (item) {
                let val = priceRest(item.y)
                s += `<br/><span style="color:${item.color};font-size: 12px">\u25CF </span> <span style="font-size: 12px">${item.series.name} : </span><b style="font-size: 12px">${val}</b>`;
              });
              return s;
            },
            shared: true
          },
          series: [
            {
              name: '当前价 ($)',
              data: data.lastPriceUsd,
              dataGrouping: {
                enabled: false
              },
            },
            {
              name: '流通市值 ($)',
              data: data.TotalValueUsd,
              yAxis: 1,
              dataGrouping: {
                enabled: false
              },
              // visible: false
            },
            {
              name: '24h成交额 ($)',
              data: data.turnoverUsd,
              yAxis: 2,
              type: 'column',
              dataGrouping: {
                approximation: "average",
                enabled: false
              }
            }
          ]
        });
        // });
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
    margin-top: 10px
    .box {
      width: 100%;
      display: inline-block;
      overflow: hidden;
      position: relative;
    }
  }
</style>
