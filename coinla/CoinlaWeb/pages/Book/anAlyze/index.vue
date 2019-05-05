<template>
  <div class="child-stat">
    <div class="child-stat-top">
      <div class="child-stat-top-l">
        <div id="statPie" style="width: 206px;height: 206px;"></div>
      </div>
      <ul class="child-stat-top-r">
        <li v-for="(item,index) in topData" :key="index">
          <p class="legend" :style="{backgroundColor: colors[index] }"></p>
          <p class="name">{{item.name}}</p>
          <p class="ratio">{{item.storageProportion|numRest('%','no')}}</p>
        </li>
      </ul>
    </div>
    <div class="info">
      <ul class="info-title">
        <li>序号</li>
        <li>币种</li>
        <li>资产价值</li>
        <li>占比</li>
        <li>具体数量</li>
      </ul>
      <div class="info-single" v-for="(item,index) in ccyData.currencyCountList" :key="index">
        <ul class="show-ul">
          <li>{{(index+1)>9?(index+1):'0'+(index+1)}}</li>
          <li class="pic_name" :data="item.name">
            <img v-lazy="item.pic" alt=""><b>{{item.name}}</b>
          </li>
          <li class="btn" @click="toggle($event,item.list.length)"><p>{{item.currencyProperty|numRest}} <span></span>
          </p></li>
          <li>{{item.storageProportion | numRest('%','no')}}</li>
          <li>{{item.currencyNumber}}个</li>
        </ul>
        <ul class="none-ul">
          <li v-for="(subItem,i) in item.list" :key="i">
            <p class="name">{{subItem.name}} : </p>
            <p>{{subItem.currencyNumber}} 个</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts/highcharts'
  import {variablePie} from '~/assets/js/variablePie'
  import {pieRestData} from '~/assets/js/case'

  export default {
    props: {
      ccyData: {
        type: Object
      }
    },
    data() {
      return {
        topData: [],
        colors: ["#d3758f", "#f3d999", "#a5d8c3", "#564e50", "#c6b38f", "#001751", "#f4e8c8", "#305791", "#8fb2a2", "#e02053"],
      }
    },
    head() {
      return {
        title: '考拉账本币种统计--考拉行情-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '数字货币行情, 虚拟币行情, 数字货币数据分析, 数字货币行业大数据, 虚拟币数据分析,区块链'},
          {
            hid: 'description',
            name: 'description',
            content: '考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一,专注于为数字货币用户提供数据分析,数据挖掘服务。我们拥有全球1000多个数字货币,150多家交易平台,5千多个交易对的数据资源,提供最专业的数字货币趋势分析,行情分析等多维度,全方位的分析服务,数字货币账本服务'
          },
        ],
        link: [
          {rel: 'index', href: 'http://www.coinla.com'}
        ]
      }
    },
    mounted() {
      this.$ToSeo()
      this.restPie()
    },
    methods: {
      restPie() {
        let pie = this.ccyData.currencyCountList.slice(0, 10).concat(),
          pieLength = this.ccyData.currencyCountList.length,
          PieData = [], elesRatio = 0, num = pie[0].list.length,
          H = parseInt((Math.ceil(num / 3) * 36) + 80) + 'px'
        debugger
        this.$('.info-single').eq(0).css({//设置第一个下拉的高度展开
          height: H
        })
        if (pieLength > 10) {
          for (let i = 0; i < 9; i++) {
            elesRatio += parseFloat(pie[i].storageProportion)
          }
          pie[9].name = '其他'
          pie[9].storageProportion = parseFloat((100 - elesRatio).toFixed(2))
          PieData = pieRestData(pie)
          this.pie(PieData)
        } else {
          PieData = pieRestData(pie)
          this.pie(PieData)
        }
        this.topData = pie
      },
      toggle(e, num) {
        let _this = e.currentTarget,
          H = parseInt((Math.ceil(num / 3) * 36) + 80) + 'px',
          isH = this.$(_this).parents('.info-single').height()
        if (isH > 60) {
          this.$(_this).parents('.info-single').css({
            height: "60px"
          })
        } else {
          this.$(_this).parents('.info-single').css({
            height: H
          }).siblings('.info-single').css({
            height: "60px"
          })
        }
      },
      pie(data) {
        variablePie(Highcharts)
        Highcharts.chart('statPie', {
          credits: {
            enabled: false
          },
          colors: this.colors,
          chart: {
            type: 'variablepie',
            margin: [0, 0, 0, 0]
          },
          title: {
            text: ''
          },
          subtitle: {
            text: ''
          },
          plotOptions: {
            variablepie: {
              allowPointSelect: false,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              }
            },
            series: {
              states: {
                hover: {
                  halo: {
                    size: 0
                  }
                }
              }
            }
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:#00b785">\u25CF</span>币种: <b> {point.name}</b><br/>' +
            '<span style="color:{point.color}">\u25CF</span>占比: <b>{point.ratio}%</b><br/>'
          },
          series: [{
            minPointSize: '1%',
            innerSize: '20%',
            zMin: 0,
            borderWidth: 0,
            data: data
          }]
        });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  @import "~assets/stylus/bookCmn"
  .stat {
    .info {
      &-title, .show-ul {
        li {
          width: 24%
          display: flex
          align-items: center
          &:first-child {
            padding-left: 22px
            width: 12%
          }
          &:last-child {
            width: 16%
            padding-right: 22px
            justify-content: flex-end
          }
        }
      }
    }
  }
</style>
