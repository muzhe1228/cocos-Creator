<template>
  <div class="links">
    <div class="links-info">
      <div class="links-info-title">
        友情链接：
      </div>
      <div class="links-info-all">
        <a v-for="item in linkList" :key="item.linkId" :href="item.link" target="_blank" :title="item.name">{{item.name}}</a>
      </div>
    </div>
    <Vline></Vline>
  </div>
</template>

<script>
  import Vline from '~/components/Line/Line.vue'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState(['linkList'])
    },
    components: {
      Vline
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  .links {
    padding: 40px 0
    &-info {
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      align-items: flex-start
      &-title {
        min-width: 100px
        line-height: 34px
        padding: 20px 0
        font-size: $font-m
        color: #fff
      }
      &-all {
        flex: 1
        padding: 20px 0
        a {
          display: inline-block
          font-size: $font-s
          margin: 10px
          transition: all .2s linear
          color: #b5b5b5
          &:hover {
            color: #fff
          }
        }
      }
      /*a {
        padding: 13px 0
        display: flex
        width: 25%
        justify-content: center
        border-right: 1px solid $border-color
        position: relative
        &:nth-child(4n) {
          border-right-color: transparent
        }
        img {
          width: 148px
          height: 34px
        }
        .hover {
          position: absolute
          left: 50%
          top: 50%
          transform: translate(-50%, -50%)
          opacity: 0
          transition: all .2s linear
        }
        &:hover {
          .hover {
            opacity: 1
          }
        }
      }*/
    }
  }
</style>
