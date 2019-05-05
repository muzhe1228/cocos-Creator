<template>
  <div class="trend">
    <div class="con_nav">
      <p class="con_nav_l">币值趋势<span>Currency Trends</span></p>
    </div>
    <div class="trend-cont">
      <div class="chart" v-for="(item,index) in chartId" :key="index">
        <v-line class="slider" :chartId="item.id" :types="item.type"></v-line>
      </div>
    </div>
  </div>
</template>

<script>
  import vLine from '~/components/Line/testLine'

  export default {
    data() {
      return {
        chartId: [
          {id: "container", type: 0},
          {id: "container1", type: 1},
        ]
      }
    },
    head() {
      return {
        title: '加密货币币值趋势走势图--考拉行情-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '加密货币走势图'},
          {
            hid: 'description',
            name: 'description',
            content: '考拉行情为您展示全球每天每时加密货币走势图。'
          }
        ]
      }
    },
    mounted(){
      this.$ToSeo()
    },
    components: {
      vLine
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .trend {
    width: 850px
    &-cont {
      padding: 20px
      .chart {
        border: 1px solid $border-color
        margin-top: 20px
        &:first-child{
          margin-top: 0
        }
      }
    }

  }
</style>
