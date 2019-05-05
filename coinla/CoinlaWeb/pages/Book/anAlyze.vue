<template>
  <div class="stat">
    <ul class="stat_nav">
      <nuxt-link tag="li" to="/Book/anAlyze/">币种统计</nuxt-link>
      <nuxt-link tag="li" to="/Book/anAlyze/location">存放场所</nuxt-link>
    </ul>
    <div>
      <nuxt-child :ccyData="infoData"/>
    </div>
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    props: {
      infoData: {
        type: Object
      }
    },
    mounted(){
      this.$ToSeo()
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  .stat {
    width: 850px
    margin-bottom: 16px
    padding-bottom: 21px
    background-color: #fff
    &_nav {
      height: 60px
      background-color: #fff
      display: flex
      align-items: center
      border-bottom: 1px solid $border-color
      li {
        padding: 0 20px
        line-height: 58px
        border-bottom: 2px solid transparent
        transition: all .2s linear
        user-select: none
        hover-hand()
        &.nuxt-link-exact-active {
          background-color: #fff
          color: $main-color
          border-color: $main-color
        }
      }
    }
  }
</style>
