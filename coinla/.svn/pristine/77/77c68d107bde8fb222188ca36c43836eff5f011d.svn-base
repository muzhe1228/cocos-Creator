<template>
  <div class="price-list" :class="{active:mt}">
    <div class="list_nav">
      <div class="list_nav_l">
        <img src="~static/images/newIndex/icon_title_1.png" alt="">
        <p class="goToUrl" :class="types === 'top' ? 'active':''" @click="handleType('top',1)">涨幅榜</p>
        <p class="goToUrl" :class="types === 'fall' ? 'active':''" @click="handleType('fall',1)">跌幅榜</p>
      </div>
      <nuxt-link to="/rank" tag="div" class="list_nav_r">
        <p></p>
        <p></p>
        <p></p>
      </nuxt-link>
    </div>
    <div class="list_btn">
      <p @click="handleType(types,0)" :class="num === 0 ? 'active':''">一小时</p>
      <p @click="handleType(types,1)" :class="num === 1 ? 'active':''">24小时</p>
      <p @click="handleType(types,3)" :class="num === 3 ? 'active':''">一周</p>
    </div>
    <div class="list_con resetLoading"
         element-loading-text="数据加载中，请耐心等待"
         element-loading-background="rgba(0, 0, 0, 0.6)"
         v-loading="mainLoading">
      <ul class="con-title">
        <li>排名</li>
        <li>名称</li>
        <li>价格</li>
        <li>涨幅</li>
      </ul>
      <nuxt-link class="con-cont goToUrl" v-for="(item,index) in List.items" :key="index"
                 :to="'/coin/'+ item.currencyEnglisgName | toLowerCase">
        <li :class="index<3?'color-red':''"><p>{{index+1}}</p></li>
        <li :title="item.exchangeName">{{item.currencyShortName}}</li>
        <li>{{item.openPrice|numRest(0,',')}}</li>
        <li :class="item.openRiseFall | IsColor">
          {{item.openRiseFall|numRest("%")}}
        </li>
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
    mounted() {
      this.handleType(0, 1)
    },
    computed: {
      ...mapState(['Token'])
    },
    data() {
      return {
        List: {},
        types: 'top',
        num: 1,
        mainLoading: false
      }
    },
    methods: {
      handleType(type, num) {
        if (this.types === type && num === undefined || num === this.num && this.types === type) return//防止重复点击
        this.mainLoading = true
        this.types = type || 'top'
        if (num === 0) {
          this.num = num
        } else {
          this.num = num || 1
        }
        let params = {
          type: num,
          page: 1,
          pageSize: 10,
        }
        if (type === 'fall') {
          getCoinlaSingle("/rank/findFallPage", params, this.Token)
            .then((res) => {
              this.List = res.data.data
              this.mainLoading = false
            })
        } else {
          getCoinlaSingle("/rank/findRisePage", params, this.Token)
            .then((res) => {
              this.List = res.data.data
              this.mainLoading = false
            })
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/cptCmn.styl"
  .price-list {
    width: 324px
    font-size: 14px
    background-color: #fff
    &.active {
      margin-top: 16px
    }
    .list_con {
      .con-title, .con-cont {
        li {
          width: calc(80% / 3)
          &:nth-child(1) {
            width: 20%
          }
        }
      }
    }
  }
</style>
