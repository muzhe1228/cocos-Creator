<template>
  <div class="index">
    <div class="top-black clear-f">
      <img class="bg-black" src="~static/images/icon/banner_hand.png" alt="">
      <div class="container">
        <p class="img_b"><img src="~static/images/icon/fonts_b.png" alt=""></p>
        <p class="img_s"><img src="~static/images/icon/fonts_s.png" alt=""></p>
        <div class="download-img">
          <a href="https://www.pgyer.com/coinla" target="_blank">
            <p>
              <img src="~static/images/icon/android_download.png" alt="">
              <img ref="android" @mouseover="hoverAndroid('1')" @mouseout="hoverAndroid('0')"
                   src="~static/images/icon/android_download_hover.png" alt="">
            </p>
          </a>
          <a href="https://itunes.apple.com/cn/app/coinla/id1359706851?mt=8" target="_blank">
            <p>
              <img src="~static/images/icon/IOS_download.png" alt="" >
              <img ref="Ios" @mouseover="hoverIos('1')" @mouseout="hoverIos('0')"
                   src="~static/images/icon/IOS_download_hover.png" alt="">
            </p>
          </a>
        </div>
      </div>
    </div>
    <div class="cont-top">
      <div class="container">
        <p>
          考拉行情（CoinLa）采集了全球1000多个数字货币，200多家交易所的大量数据对接源，专注于为投资者提供数字货币的数据挖掘、数据分析。同时考拉行情社区对每个数字货币采集其全面的信息，诸如项目介绍、货币发行数据、团队介绍等，并实施更新项目进度等，为投资者提供一个关于该数字货币的专业讨论平台。</p>
        <p>考拉行情（CoinLa）的愿景是致力创建并维护成一个集数字资产行情工具+智能内容社区推送+讨论社区+智能理财于一体的全球区块链投融资数据综合生态平台。</p>
        <div class="cont-img">
          <img src="~static/images/icon/X.png" alt="">
        </div>
      </div>
    </div>
    <div class="cont-bot">
      <div class="container">
        <ul>
          <li>
            <p><img src="~static/images/icon/icon_free.png" alt=""></p>
            <p>免费</p>
            <p>考拉行情的所有功能将对考拉用户免费使用，我们的团队为您保驾护航。</p>
          </li>
          <li>
            <p><img src="~static/images/icon/icon_time.png" alt=""></p>
            <p>实时</p>
            <p>考拉行情及时跟踪各大交易所的交易数据，让您拿到一手的行情。</p>
          </li>
          <li>
            <p><img src="~static/images/icon/icon_overall.png" alt=""></p>
            <p>全面</p>
            <p>考拉行情采集了全球1000多种币种，200多家主流交易所行情，数据全面齐备。</p>
          </li>
          <li>
            <p><img src="~static/images/icon/icon_convenient.png" alt=""></p>
            <p>快捷</p>
            <p>考拉行情拥有IOS和安卓客户端，让您随时随地便捷的了解数字货币行情。</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: '考拉行情--聚合全球行情，挖掘数据价值-CoinLa',
        meta: [
          {hid: 'keyWords', name: 'keyWords', content: '数字货币行情app 虚拟币行情APP'},
          {
            hid: 'description',
            name: 'description',
            content: '考拉行情（CoinLa）致力创建并维护成一个集数字资产行情工具+智能内容社区推送以及社区讨论+只能理财与一体的全球区块链投融资数据综合生态平台。'
          }
        ],
        link: [
          {rel: 'index', href: 'http://www.coinla.com'}
        ]
      }
    },
    methods: {
      hoverAndroid(src) {
        this.$refs.android.style.opacity = src
      },
      hoverIos(src) {
        this.$refs.Ios.style.opacity = src
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .index {
    min-width: 1040px
    .top-black {
      position: relative
      background-color: $color-main
      padding-top: 264px
      padding-bottom: 150px
      transition: all .8s
      overflow: hidden
      .bg-black {
        position: absolute
        top: 0
        right: 0
        z-index: 1
        transition: all .6s
        width: 60%
      }
      .container {
        position: relative
        z-index: 2
        display: flex
        flex-direction: column
        .img_b {

        }
        .img_s {
          margin: 32px 0 100px 0
        }
        .download-img {
          display: flex
          a {
            &:nth-child(1) {
              margin-right: 50px
            }
            p {
              position: relative
              img {
                cursor: pointer
                transition: all .5s
                &:nth-child(2) {
                  position: absolute
                  left: 0
                  top: 0
                  opacity: 0
                }
              }
            }
          }
        }
      }
    }
    .cont-top {
      background-color: $color-cont
      padding-top: 49px
      height: 613px
      transition: all .8s
      p {
        font-size: 15px
        line-height: 42px
        text-indent: 32px
        color: $size-b
      }
      .cont-img {
        background-image: url("~static/images/icon/map.png")
        background-size: cover
        margin-top: 47px
        text-align: center
      }
    }
    .cont-bot {
      height: 496px
      background-color: $size-a
      padding: 100px 0 95px 0
      transition: all .8s
      ul {
        display: flex
        li {
          padding: 0 20px
          text-align: center
          flex: 1
          p {
            color: $size-b
            &:nth-child(2) {
              padding: 46px 0 23px 0
              font-size: $font-l-x
              font-weight: 700
            }

            &:nth-child(3) {
              font-size: $font-m
              line-height: 28px
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1690px) {
    .index {
      .top-black {
        padding-top: 176px
        .bg-black {
          width: 880px
        }
        .container {
          .img_b {
            img {
              width: 425px
            }

          }
          .img_s {
            img {
              width: 425px
            }
            margin: 32px 0 70px 0
          }

          .download-img {
            a {
              display: inline-block
              &:nth-child(1) {
                margin-right: 40px
              }
              p {
                position: relative
                img {
                  width: 185px
                }
              }
            }
          }
        }
      }
      .cont-top {
        height: 503px
        padding: 25px 15px 10px 15px
        p {
          font-size: 15px
          line-height: 28px
          text-indent: 32px
        }
        .cont-img {
          margin-top: 35px
          img {
            width: 290px
          }
        }

      }
      .cont-bot {
        height: 400px
        padding: 60px 0 55px 0
        ul {
          li {
            p {
              &:nth-child(2) {
                padding: 30px 0 16px 0
                font-size: 20px
              }
              &:nth-child(3) {
                font-size: 14px
                line-height: 28px
              }
              img {
                width: 136px
                height: 136px
              }
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1400px) {
    .index {
      .top-black {
        padding-top: 132px
        .bg-black {
          width: 750px
          min-width: 600px
        }
        .container {
          .img_b {
            img {
              width: 380px
            }
          }
          .img_s {
            img {
              width: 380px
            }
            margin: 32px 0 60px 0
          }

          .download-img {
            a {
              &:nth-child(1) {
                margin-right: 32px
              }
              p {
                position: relative
                img {
                  width: 180px
                }
              }
            }
          }
        }
      }
      .cont-top {
        height: 442px
        padding: 25px 0 10px 0
        p {
          font-size: 15px
          line-height: 28px
          text-indent: 32px
        }
        .cont-img {
          margin-top: 35px
          img {
            width: 240px
          }
        }

      }
      .cont-bot {
        height: 360px
        padding: 50px 0 45px 0
        ul {
          li {
            p {
              &:nth-child(2) {
                padding: 20px 0 10px 0
                font-size: 18px
              }
              &:nth-child(3) {
                font-size: 13px
                line-height: 28px
              }
              img {
                width: 120px
                height: 120px
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1040px) {
    .index {
      .top-black {
        padding-top: 132px
        .bg-black {
          width: 750px
          min-width: 600px
        }
        .container {
          .img_b {
            img {
              width: 380px
            }
          }
          .img_s {
            img {
              width: 380px
            }
            margin: 32px 0 60px 0
          }

          .download-img {
            a {
              &:nth-child(1) {
                margin-right: 32px
              }
              p {
                position: relative
                img {
                  width: 180px
                }
              }
            }
          }
        }
      }
      .cont-top {
        height: 442px
        padding: 25px 0 10px 0
        p {
          font-size: 15px
          line-height: 28px
          text-indent: 32px
        }
        .cont-img {
          margin-top: 40px
          img {
            width: 194px
          }
        }

      }
      .cont-bot {
        height: 360px
        padding: 50px 0 45px 0
        ul {
          li {
            p {
              &:nth-child(2) {
                padding: 20px 0 10px 0
                font-size: 18px
              }
              &:nth-child(3) {
                font-size: 13px
                line-height: 28px
              }
              img {
                width: 120px
                height: 120px
              }
            }
          }
        }
      }
    }
  }
</style>
