<template>
  <div class="bookInfo">
    <nuxt-link tag="ul" to="/user" class="bookInfo-top">
      <li class="avatar">
        <img v-lazy="userMsg.headImg" alt="">
      </li>
      <li class="user-name">{{userMsg.nickName}}</li>
      <li class="user-intro">{{userMsg.intra}}</li>
      <li class="filterImg" :style="`backgroundImage:url(${userMsg.headImg})`"></li>
    </nuxt-link>
    <ul class="bookInfo-cont">
      <li class="top">
        <p class="title">
          <a class="isHover">
            <span class="left">总资产<i class="icon-ken_quest"></i></span>
            <span class="title-hover">
              <span>账面总资产</span>&nbsp;：&nbsp;现有购入未卖出的所有币种的总资产。
            </span>
          </a>
          <nuxt-link to="/Book/anAlyze" class="goToUrl">资产分布</nuxt-link>
        </p>
        <p class="price">
          <a>
            <span>{{hid?'':'≈¥'}}</span>{{infoData.presentTotalProperty|hidPic(hid)}}
          </a>
          <a class="goToUrl showIshid" @click="hidIs()">{{hid?'显示':'隐藏'}}</a>
        </p>
        <!--&lt;!&ndash;<p class="goToUrl showIshid" @click="hidIs()">{{hid?'显示':'隐藏'}}</p>&ndash;&gt;-->
        <!--<p class="goToUrl showIshid" @click="hidIs()">{{hid?'显示':'隐藏'}}</p>-->
      </li>
      <li class="single">
        <p>
          <a class="title">
            <span>账面盈利<i class="icon-kenquestion"></i></span>
            <span class="title-hover">
              <span>账面盈利</span>&nbsp;：&nbsp;现有购入未卖出的所有币种的未套现账面盈利。
            </span>
          </a>
          <a class="bookPic" :class="infoData.presentProfit | IsColor">
            <span>{{hid?'':'¥'}}</span>&nbsp;{{infoData.presentProfit|hidPic(hid)}}</a>
        </p>
        <p>
          <a class="title">
            <span>套现盈利<i class="icon-kenquestion"></i></span>
            <span class="title-hover">
              <span>套现盈利</span>&nbsp;：&nbsp;所有买入且已卖出套现成功的币种盈利总和。
            </span>
          </a>
          <a class="bookPic" :class="infoData.historyRate | IsColor">
            <span>{{hid?'':'¥'}}&nbsp;</span>{{infoData.historyRate|hidPic(hid)}}</a>
        </p>
      </li>
      <li class="single">
        <p>
          <a class="title">
            <span>账面盈利率<i class="icon-kenquestion"></i></span>
            <span class="title-hover">
              <span>账面盈利率</span>&nbsp;：&nbsp;现有购入未卖出的所有币种盈利占总盈利的百分比。
            </span>
          </a>
          <a class="bookPic" :class="infoData.presentProfitRate | IsColor">
            {{infoData.presentProfitRate|numRest('%')|hidPic(hid)}}</a>
        </p>
        <p>
          <a class="title">
            <span>今日盈利率<i class="icon-kenquestion"></i></span>
            <span class="title-hover">
              <span>今日盈利率</span>&nbsp;：&nbsp;现有购入未卖出的所有币种当前盈利占当日零点盈利的百分比。
            </span>
          </a>
          <a class="pic" :class="infoData.todayProfitRate | IsColor">
            {{infoData.todayProfitRate|numRest('%')|hidPic(hid)}}</a>
        </p>
      </li>
    </ul>
    <ul class="bookInfo-con" v-show="false">
      <nuxt-link tag="li" to="/Book/anAlyze">
        <p class="left">
          <img src="~static/images/newIndex/icon_link.png" alt="">
          <span>币种统计</span>
        </p>
        <p><i class="icon-ken_right"></i></p>
      </nuxt-link>
      <nuxt-link tag="li" to="/Book/anAlyze/location">
        <p class="left">
          <img src="~static/images/newIndex/icon_link.png" alt="">
          <span>存放场所</span>
        </p>
        <p><i class="icon-ken_right"></i></p>
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: {
      infoData: {
        type: Object,
        default: null
      }
    },
    computed: {
      ...mapState(['Token', 'userMsg', 'hid'])
    },
    mounted() {
      this.setHid(sessionStorage.getItem('hid'))
    },
    methods: {
      hidIs() {
        if (sessionStorage.getItem('hid')) {
          this.setHid(0)
          sessionStorage.removeItem('hid')
        } else {
          this.setHid('*')
          sessionStorage.setItem('hid', '*')
        }
      },
      ...mapMutations(['setHid'])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .bookInfo {
    width: 324px
    &-top {
      /*background-color: #fff*/
      height: 180px
      padding: 26px 20px
      width: 100%
      display: flex
      flex-direction: column
      justify-content: center
      border-bottom: 1px solid #dedede
      text-align: center
      position: relative
      color: #fff
      overflow: hidden
      hover-hand()
      .filterImg {
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        background: no-repeat
        background-size: 360px 280px
        background-position: center
        filter: blur(6px)
        z-index: -1
      }
      .avatar {
        img {
          vertical-align: middle
          width: 64px
          height: 64px
          border-radius: 32px
        }
      }
      .user-name {
        margin-top: 18px
        font-size: $font-m
      }
      .user-intro {
        margin-top: 12px
        font-size: $font-s
      }
    }
    &-cont {
      background-color: #fff
      padding: 20px 26px 10px
      font-size: $font-s
      li {
        border-bottom: 1px solid $border-color
        &:last-child {
          border-color: transparent
        }
      }
      .top {
        padding-bottom: 24px
        .title {
          color: $size-smain
          display: flex
          justify-content: space-between
          position: relative
          .goToUrl {
            color: $size-ssmain
            &:hover {
              color: $main-color
              text-decoration: underline
              transition: linear
            }
          }
          &-hover {
            font-size: $font-s
            position: absolute
            top: 110%
            left: 40px
            z-index: 2
            width: 400px
            min-height: 48px
            padding: 10px 20px
            box-shadow: 0 0 15px rgba(0, 0, 0, .2)
            overflow: hidden
            line-height: 28px
            background-color: #fff
            color: $size-smain
            transform: scale(1, 0)
            transition: all .2s linear
            span {
              color: $size-main
            }
          }
          .isHover {
            .left {
              display: flex
              align-items: flex-end
              i {
                color: $main-color
                font-size: $font-s
                margin-left: 6px
                padding-top: 1px
              }
            }
            &:hover {
              hover-hand()
              .title-hover {
                transform: scale(1, 1)
                z-index: 10
              }
            }
          }
        }
        .price {
          padding-top: 32px
          font-size: 28px
          display: flex
          justify-content: space-between
          align-items: center
          span {
            font-size: $font-s
          }
          .showIshid {
            color: $size-smain
            font-size: $font-s
          }
        }
      }
      .single {
        display: flex
        flex-wrap: wrap
        p {
          margin: 20px 0 18px 0
          width: 50%
          display: flex
          flex-direction: column
          text-align: center
          &:nth-child(odd) {
            border-right: 1px solid #eee
          }
          .title {
            color: $size-smain
            position: relative
            hover-hand()
            i {
              font-size: $font-s
              color: $main-color
              margin-left: 6px
            }
            &-hover {
              font-size: $font-s
              position: absolute
              top: 110%
              left: 80px
              width: 400px
              min-height: 48px
              transform: scale(1, 0)
              line-height: 28px
              background-color: #fff
              color: $size-smain
              overflow: hidden
              padding: 10px 20px
              box-shadow: 0 0 15px rgba(0, 0, 0, .2)
              transition: all .2s linear
              z-index: 2
              span {
                color: $size-main
              }
            }
            &:hover {
              .title-hover {
                transform: scale(1, 1)
                z-index: 10
              }
            }
          }
          .bookPic {
            margin-top: 16px
            font-size: $font-m
            span {
              font-size: $font-x
            }
          }
        }
      }

    }
    &-con {
      margin-top: 16px
      background-color: #fff
      li {
        padding: 0 20px
        height: 60px
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid $border-color
        hover-hand()
        &:last-child {
          border-bottom: none
        }
        p {
          color: $size-main
          display: flex
          align-items: flex-end
          font-size: $font-s
          span {
            margin-left: 8px
          }
          img {
            width: 16px
          }
          i {
            transition: all .2s linear
            color: $size-smain
            font-size: $font-s
          }
        }
        &:hover {
          p {
            i {
              color: $main-color
            }
          }
        }
      }
    }
  }
</style>
