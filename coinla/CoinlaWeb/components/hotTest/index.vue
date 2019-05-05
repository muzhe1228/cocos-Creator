<template>
  <div class="hot-list" v-if="false" :class="{active:mt}">
    <div class="list_nav">
      <div class="list_nav_l">
        <img src="~static/images/newIndex/icon_title_4.png" alt="">
        <p class="active">最热门</p>
      </div>
      <nuxt-link to="/Rank/currency" tag="div" class="list_nav_r">
        <p></p>
        <p></p>
        <p></p>
      </nuxt-link>
    </div>
    <ul class="hot_con">
      <li>最热门</li>
      <li>最热门热门</li>
      <li>最热门</li>
      <li>最热门</li>
      <li>最热热门热门门</li>
      <li>最热门</li>
      <li>最热门</li>
      <li>最热</li>
      <li>最门</li>
      <li>最热门</li>
    </ul>
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
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/cptCmn.styl"
  .hot-list {
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
