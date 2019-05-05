<template>
  <div class="user-wrap">
    <div class="container" v-if="this.Token">
      <div class="user-left">
        <ul class="left-top">
          <li class="avatar">
            <img v-lazy="userMsg.headImg" alt="">
          </li>
          <li class="user-name">
            <b>{{userMsg.nickName}}</b>
            <p>{{userMsg.intra}}</p>
          </li>
        </ul>
        <div class="user-menu">
          <nuxt-link tag="div" class="menuSingle" to="/user">
            <div class="left">
              <p class="title">个人资料</p>
              <p class="intro">填写/修改详细的个人资料</p>
            </div>
            <p class="right">
              <i class="icon-ken_right"></i>
            </p>
          </nuxt-link>
          <nuxt-link tag="div" class="menuSingle" to="/user/action">
            <div class="left">
              <p class="title">账号中心</p>
              <p class="intro">账户安全使用更放心</p>
            </div>
            <p class="right">
              <i class="icon-ken_right"></i>
            </p>
          </nuxt-link>
          <nuxt-link tag="div" class="menuSingle" to="/user/msg">
            <div class="left">
              <p class="title">消息中心</p>
              <p class="intro">币种涨跌实时接收</p>
            </div>
            <p class="right">
              <i class="icon-ken_right"></i>
            </p>
          </nuxt-link>
        </div>
      </div>
      <div class="user-right">
        <nuxt-child/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    scrollToTop: true,
    head() {
      return {
        title: '个人中心----聚合全球行情,挖掘数据价值-CoinLa',
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
    data() {
      return {
        userData: {}
      }
    },
    computed: {
      ...mapState(['userMsg','Token']),
    },
    mounted() {
      this.$ToSeo()
      if(!this.Token){
        this.$router.push('/')
      }
    },
    methods: {
      ...mapMutations(['setUserMsg'])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .user-wrap {
    margin: 16px 0
    .container {
      display: flex
      justify-content: center
      .user-left {
        width: 324px
        margin-right: 16px
        .left-top {
          height: 108px
          width: 100%
          padding: 22px 20px
          display: flex
          background-color: #fff
          border-bottom: 1px solid $border-color
          hover-hand()
          .avatar {
            width: 64px
            height: 64px
            margin-right: 16px
            img {
              width: 100%
              height: 100%
              border-radius: 32px
            }
          }
          .user-name {
            flex: 1
            display: flex
            flex-direction: column
            line-height: 24px
            justify-content: center
            b {
              font-size: $font-m
              color: $size-main
            }
            p {
              width: 204px
              font-size: $font-s
              color: $size-smain
              no-wrap()
            }
          }
        }
        .user-menu {
          background-color: #fff
          .menuSingle {
            height: 80px
            padding: 0 20px
            display: flex
            align-items: center
            justify-content: space-between
            position: relative
            hover-hand()
            &:after {
              content: ' '
              position: absolute
              width: calc(100% - 40px)
              height: 1px
              background-color: $border-color
              bottom: 0
              left: 20px
            }
            &:last-child {
              &:after {
                background-color: transparent
              }
            }
            .left {
              .title {
                font-size: $font-m
              }
              .intro {
                margin-top: 12px
                font-size: $font-s
                color: $size-smain
              }
            }
            .right {
              i {
                color: transparent
              }
            }
            &.nuxt-link-exact-active {
              background-color: rgba(222, 189, 99, .25)
              &:after {
                background-color: transparent
              }
              .right {
                i {
                  color: $main-color
                }
              }
            }
          }
        }
      }
      .user-right {
        flex: 1
      }
    }
  }
</style>
