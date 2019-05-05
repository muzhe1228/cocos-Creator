<template>
  <div class="new-list" :class="{active:mt}">
    <div class="list_nav">
      <div class="list_nav_l">
        <img src="~static/images/newIndex/icon_title_3.png" alt="">
        <p class="active">新币上市</p>
      </div>
    </div>
    <div class="list_con">
      <ul class="con-title">
        <li>日期</li>
        <li>名称</li>
        <li>涨跌幅</li>
        <li>价格</li>
      </ul>
      <nuxt-link class="con-cont goToUrl" v-for="(item,index) in newList" :key="index"
                 :to="'/coin/'+ item.currencyEnglisgName | toLowerCase">
        <li :data="item.index">{{item.initiateCreateDate|resetTime}}</li>
        <li :title="item.currencyName">{{item.currencyShortName}}</li>
        <li :class="item.openRiseFall | IsColor">{{item.openRiseFall|numRest('%')}}</li>
        <li>{{item.openPrice|numRest}}</li>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {mapState} from 'vuex'

  export default {
    props: {
      mt: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        newList: []
      }
    },
    computed: {
      ...mapState(['Token'])
    },
    created() {
      this.getNewsCurrent()
    },
    methods: {
      getNewsCurrent() {
        getCoinlaSingle('/exchange/findNewCurrencyList', {page: 1, pageSize: 10}, this.Token)
          .then((res) => {
            this.newList = res.data.data.slice(0, 10)
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/cptCmn.styl"
  .new-list {
    width: 324px
    background: #fff
    font-size: 14px
    &.active {
      margin-top: 16px
    }
    .list_con {
      .con-title, .con-cont {
        li {
          width: 22%
          &:nth-child(1) {
            width: 34%
          }
        }
      }
    }
  }
</style>
