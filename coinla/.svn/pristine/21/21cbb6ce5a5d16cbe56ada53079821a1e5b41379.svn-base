<template>
  <div class="deal-list" :class="{active:mt}">
    <div class="list_nav">
      <div class="list_nav_l">
        <img src="~static/images/newIndex/icon_title_2.png" alt="">
        <p class="active">币种成交量排行榜</p>
      </div>
      <nuxt-link to="/Rank/currency" class="list_nav_r">
        <p></p>
        <p></p>
        <p></p>
      </nuxt-link>
    </div>
    <div class="list_con">
      <ul class="con-title">
        <li>排名</li>
        <li>名称</li>
        <li>成交额</li>
      </ul>
      <nuxt-link class="con-cont goToUrl" v-for="(item,index) in currentList" :key="index"
                 :to="'/coin/'+ item.currencyEnglisgName | toLowerCase">
        <li :class="index<3?'color-red':''"><p>{{index+1}}</p></li>
        <li :title="item.currencyName">
          <img v-lazy="item.pic" alt="">{{item.currencyShortName}}
        </li>
        <li>{{item.openTurnover|numRest(0)}}</li>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    props: {
      mt: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentList: {},
        act: 0
      }
    },
    created() {
      this.getCurrent(0)
    },
    methods: {
      getCurrent(type) {
        let params = {
          page: 1,
          pageSize: 10,
          condition: type,
        }
        this.act = type
        getCoinlaSingle('/rank/findCurrencyDealPage', params)
          .then((res) => {
            this.currentList = res.data.data.items
          }).catch((err) => {
          this.$message(err.message)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/cptCmn.styl"
  .deal-list {
    width: 324px
    background-color: #fff
    font-size: 14px
    &.active {
      margin-top: 16px
    }
    .list_con {
      .con-title, .con-cont {
        li {
          width: 40%
          &:nth-child(1) {
            width: 20%
          }
        }
      }
    }
  }
</style>
