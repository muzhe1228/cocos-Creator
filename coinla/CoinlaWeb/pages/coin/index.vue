<template>
  <div class="detailWrap container">
    <ul class="detailWrap_nav">
      <nuxt-link tag="li" to="/">考拉行情首页&nbsp;&nbsp;>&nbsp;&nbsp;</nuxt-link>
      <nuxt-link tag="li" to="/Optional">自选&nbsp;&nbsp;>&nbsp;&nbsp;</nuxt-link>
      <li class="active">{{Index.currencyShortName}}详情</li>
    </ul>
    <div class="details">
      <div class="details_l">
        <div class="details_l_top">
          <ul class="top_l">
            <li class="Nos"><p>NO.{{Index.ranking}}</p></li>
            <li class="b_logo"><img v-lazy="Index.pic" alt=""></li>
            <li class="b_name">
              <p>{{Index.currencyName}}</p>
              <p>{{Index.currencyShortName}}</p>
            </li>
            <li class="bot">
              <p>
                <span class="size">{{Index.openAttentionnumber}}人</span>
                <span>关注</span>
              </p>
            </li>
          </ul>
          <div class="top_r">
            <div class="top_r_title">
              <p class="name"><span>{{Index.currencyName}}</span><span>{{Index.currencyShortName}}</span></p>
              <p class="follow" v-if="Index.attention" @click="noFollow(Index.cerId)"><i
                class="icon-ken_star color-starA"></i>已关注</p>
              <p class="follow" v-else @click="Follow(Index.cerId)"><i class="icon-ken_star color-star"></i>添加关注</p>
            </div>
            <p class="englishName">{{Index.currencyEnglisgName}}</p>
            <div class="top_r_info">
              <ul class="top_r_info_l">
                <li class="nav">当前价</li>
                <li class="price">
                  <span>¥</span>{{Index.openPrice|toThousands}}
                  <span class="Rise" :class="Index.openRiseFall | IsColor">{{Index.openRiseFall|numRest('%')}}</span>
                </li>
                <li class="rightName">{{Index.currencyShortName}}/{{Index.currencyRightShortName}}</li>
              </ul>
              <ul class="top_r_info_r">
                <li>最高&nbsp;：<span v-if="true" class="color-green">{{Index.openHighPrice|numRest(0,',')}}</span>
                  <span v-else class="color-green">{{Index.openHighPriceToday|numRest(0,',')}}</span></li>
                <li>最低&nbsp;：<span v-if="true" class="color-red">{{Index.openLowPrice|numRest(0,',')}}</span>
                  <span v-else class="color-red">{{Index.openLowPriceToday|numRest(0,',')}}</span></li>
                <li>国行&nbsp;：<span>≈{{Index.openNationalLowPrice|numRest(0,',')}}</span><span></span></li>
              </ul>
            </div>
            <div class="top_r_bot">
              <ul class="top_r_bot_l">
                <li>成交额(24h)&nbsp;：<span v-if="true">&nbsp;{{Index.openTurnover|numRest}}</span></li>
                <li>流通市值&nbsp;：<span v-if="true">&nbsp;{{Index.openCirculateTotalValue|numRest}}</span></li>
              </ul>
              <ul class="top_r_bot_r">
                <li>流通总量&nbsp;：<span v-if="true">&nbsp;{{Index.openCirculateTotal}}</span></li>
                <li>发行总量&nbsp;：<span v-if="true">&nbsp;{{Index.openTotal}}</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="details_l_con">
          <!--v-if="'Optional-id-index-intro'!==$route.name"-->
          <div class="details_l_con_nav">
            <!--<ul class="nav_tab">-->
            <!--<nuxt-link tag="li" :to="'/coin/'+$route.params.id" >核心数据</nuxt-link>-->
            <!--<nuxt-link tag="li" :to="'/coin/'+$route.params.id+'/market'">交易所行情</nuxt-link>-->
            <!--<nuxt-link tag="li" :to="'/coin/'+$route.params.id+'/trend'">市值趋势</nuxt-link>-->
            <!--&lt;!&ndash;<nuxt-link tag="li" :to="'/Optional/'+$route.params.id+'/msg'">最新公告</nuxt-link>&ndash;&gt;-->
            <!--<nuxt-link tag="li" :to="'/coin/'+$route.params.id+'/history'">历史数据</nuxt-link>-->
            <!--<nuxt-link tag="li" :to="'/coin/'+$route.params.id+'/intro'">币种介绍</nuxt-link>-->
            <!--</ul>-->

            <el-tabs v-model="activeName" @tab-click="handleClick(activeName,$route.params.id)">
              <el-tab-pane label="核心数据" name="coin-id-index"></el-tab-pane>
              <el-tab-pane label="交易所行情" name="coin-id-index-market"></el-tab-pane>
              <el-tab-pane label="市值趋势" name="coin-id-index-trend"></el-tab-pane>
              <el-tab-pane label="历史数据" name="coin-id-index-history"></el-tab-pane>
              <el-tab-pane label="币种介绍" name="coin-id-index-intro"></el-tab-pane>
            </el-tabs>
            <!--<el-select v-model="value8" filterable placeholder="当前价排序">-->
            <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
            <!--</el-option>-->
            <!--</el-select>-->
          </div>
          <nuxt-child :introduce="Details.introduce" :ccyId="Index.ccyId" class="child"/>
        </div>
      </div>

      <div class="details_r">
        <div class="list_nav">
          <div class="list_nav_l">
            <img src="~static/images/newIndex/icon_title_1.png" alt="">
            <p class="active">基本资料</p>
          </div>
        </div>
        <ul class="details_r_con resetLoading"
            element-loading-text="数据加载中，请耐心等待"
            element-loading-background="rgba(0, 0, 0, 0.6)"
            v-loading="mainLoading">
          <li v-if="Details.currencyName">
            <p>名称&nbsp;：&nbsp;<span>{{Details.currencyName}}</span></p>
          </li>
          <li v-if="Details.english">
            <p>英文&nbsp;：&nbsp;<span>{{Details.english}}</span></p>
          </li>
          <li v-if="Details.shortName">
            <p>简称&nbsp;：&nbsp;<span>{{Details.shortName}}</span></p>
          </li>
          <li v-if="Details.initiateCreateDate">
            <p>发布时间&nbsp;：&nbsp;<span>{{Details.initiateCreateDate}}</span></p>
          </li>
          <li v-if="Details.concept">
            <p>板块概念&nbsp;：&nbsp;<span>{{Details.concept}}</span></p>
          </li>
          <li v-if="Details.total">
            <p>发行总量&nbsp;：&nbsp;<span>{{Details.total}}</span></p>
          </li>
          <!--<li>-->
          <!--<p>总市值</p>-->
          <!--<p>{{Details.appTotalValue}}</p>-->
          <!--</li>-->
          <!--<li>-->
          <!--<p>流通总量</p>-->
          <!--<p>{{Details.appCirculateTotalValue}}</p>-->
          <!--</li>-->
          <!--<li>-->
          <!--<p>流通市值</p>-->
          <!--<p>{{Details.appTotalValue}}</p>-->
          <!--</li>-->
          <li v-if="Details.guanw">
            <p>官网&nbsp;：&nbsp;<span class="Href" @click="aPath(Details.guanw)">{{Details.guanw|urlRest}}</span></p>
          </li>
          <li v-if="Details.isIco">
            <p>募集&nbsp;：&nbsp;<span>{{Details.isIco?"有":"无"}}</span></p>
          </li>
          <li v-if="Details.isIco">
            <p>募集时间&nbsp;：&nbsp;<span>{{Details.privateTime}}</span></p>
          </li>
          <li v-if="Details.isIco">
            <p>募集总价值&nbsp;：&nbsp;<span>{{Details.privateTotalValue?Details.privateTotalValue:"未知"}}</span></p>
          </li>
          <li v-if="Details.isIco">
            <p>募集数量&nbsp;：&nbsp;<span>{{Details.ico?Details.ico:'未知'}}</span></p>
          </li>
          <li>
            <p>是否可挖矿&nbsp;：&nbsp;<span>{{Details.ismining?"是":"否"}}</span></p>
          </li>
          <li class="B_letter" v-if="Details.consensusMechanism">
            <p>共识机制&nbsp;：&nbsp;</p>
            <p class="cont_letter">{{Details.consensusMechanism}}</p>
          </li>
          <!--<li v-if="Details.appIntroduce">-->
          <!--<p>当前应用&nbsp;：&nbsp;<span>{{Details.appIntroduce}}</span></p>-->
          <!--</li>-->
          <li class="B_letter">
            <p>币种简介&nbsp;：&nbsp;</p>
            <p>{{Details.introduce}}</p>
            <nuxt-link :to="'/coin/'+$route.params.id+'/intro'">查看更多</nuxt-link>
          </li>
        </ul>
        <!--<div class="B_letter" v-if="Details.teamIntroduce">-->
        <!--<p><span>团队简介</span>-->
        <!--<nuxt-link target="_blank" :to="'/Optional/'+$route.params.id+'/intro'">查看更多</nuxt-link>-->
        <!--</p>-->
        <!--<p>{{Details.teamIntroduce}}</p>-->
        <!--</div>-->
        <ul class="details_r_bot">
          <li v-if="Details.blockChain" @click="aPath(Details.blockChain)">
            <p class="left">
              <img src="~static/images/newIndex/icon_link.png" alt="">
              <span>区块链浏览器</span>
            </p>
            <p><i class="icon-ken_right"></i></p>
          </li>
          <li v-if="Details.officialCommunity" @click="aPath(Details.officialCommunity)">
            <p class="left">
              <img src="~static/images/newIndex/icon_community.png" alt="">
              <span>官方社区</span>
            </p>
            <p><i class="icon-ken_right"></i></p>
          </li>
          <li v-if="Details.whitePaperZh" @click="aPath(Details.whitePaperZh)">
            <p class="left">
              <img src="~static/images/newIndex/icon_book_ca.png" alt="">
              <span>白皮书中文</span>
            </p>
            <p><i class="icon-ken_right"></i></p>
          </li>
          <li v-if="Details.whitePaperEn" @click="aPath(Details.whitePaperEn)">
            <p class="left">
              <img src="~static/images/newIndex/icon_book_ca.png" alt="">
              <span>白皮书英文</span>
            </p>
            <p><i class="icon-ken_right"></i></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaMulti, getCoinlaSingle} from '~/assets/js/httpAll'
  import axios from '~/plugins/axios'

  export default {
    scrollToTop: true,
    async asyncData({params, query, store}) {
      return getCoinlaSingle(`/currency/${params.id}`, {currencyName: params.id}, store.state.Token).then((res) => {
        return {
          Index: res.data.data
        }
      }).catch((err) => {
        return {
          Index: {}
        }
      })
    },
    head() {
      return {
        title: `${this.Index.currencyShortName} ${this.Index.currencyName} ${this.Index.currencyEnglisgName},全球200交易所${this.Index.currencyName}实时价格对接,${this.Index.currencyName}走势团队等介绍--考拉行情-CoinLa。`,
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: `${this.Index.currencyShortName},${this.Index.currencyName}, ${this.Index.currencyShortName} ${this.Index.currencyName}价格,${this.Index.currencyName} ${this.Index.currencyShortName}行情,${this.Index.currencyName} ${this.Index.currencyShortName}交易网,${this.Index.currencyName} ${this.Index.currencyShortName}交易平台,${this.Index.currencyName} ${this.Index.currencyShortName}官网。`
          },
          {
            hid: 'description',
            name: 'description',
            content: `考拉行情对接全球200多家交易所对${this.Index.currencyName} ${this.Index.currencyShortName}价格查询,及${this.Index.currencyShortName}的发行流通,24小时换手率等数据实时跟踪,包过对${this.Index.currencyShortName}团队最新信息实时跟进。`
          }
        ]
        // ,
        // link: [
        //   { rel: 'icon', type: 'image/*', href: this.Index.pic },
        // ]
      }
    },
    computed: {
      ...mapState(['Token'])
    },
    data() {
      return {
        Details: {},
        mainLoading: false,
        activeName: this.$route.name
      }
    },
    watch: {
      Token: function () {
        this.getIndex()
      }
    },
    beforeMount() {
      this.$ToSeo()
      this.getDetails()
    },
    methods: {
      handleClick(tab, path) {
        if (tab === 'coin-id-index') {
          this.$router.push(`/coin/${path}`)
        } else if (tab === 'coin-id-index-market') {
          this.$router.push(`/coin/${path}/market`)
        } else if (tab === 'coin-id-index-trend') {
          this.$router.push(`/coin/${path}/trend`)
        } else if (tab === 'coin-id-index-history') {
          this.$router.push(`/coin/${path}/history`)
        } else if (tab === 'coin-id-index-intro') {
          this.$router.push(`/coin/${path}/intro`)
        }
      },
      //取消关注
      noFollow(cerId) {
        let params = {cerId: cerId}
        getCoinlaSingle('/exchange/cancelAttention', params, this.Token)
          .then((res) => {
            // debugger
            let code = res.data.code
            if (code === 0) {
              this.Index.attention = 0
              // this.getIndex()
            }
          })
      },
      //关注
      Follow(cerId, attention) {
        if (!attention) {
          let params = {cerId: cerId}
          getCoinlaSingle('/exchange/addAttention', params, this.Token)
            .then((res) => {
              let code = res.data.code
              if (code === 0) {
                // debugger
                this.Index.attention = 1
                // this.getIndex()
              } else if (code === 20) {
                this.$notify({
                  message: '请先登录',
                  type: 'warning'
                })
                this.setLogin(true)
              }
            })
        } else {
          this.$notify({
            message: '您已经关注了',
            type: 'warning'
          })
          return
        }
      },
      //左侧详情
      getIndex() {
        let params = {ccyId: this.$route.params.id}
        getCoinlaSingle('/currency/findCurrencyInfo', params, this.Token).then((res) => {
          this.Index = res.data.data
        }).catch((err) => {
          console.log(err.data)
        })
      },
      //右侧介绍
      getDetails() {
        this.mainLoading = true
        let params = {ccyId: this.Index.ccyId}
        getCoinlaSingle('/currency/findCurrencyIntra', params, this.Token).then((res) => {
          this.Details = res.data.data
          this.mainLoading = false
        })
      },
      //提示弹窗
      openMsg(msg, type) {
        if (type === 0) {
          this.$notify({
            message: msg,
            type: 'success'
          })
        } else {
          this.$notify.error({
            message: msg
          })
        }
      },
      aPath(url) {
        if (url) {
          window.open(url)
        }
      },
      ...mapMutations(['setLogin'])
    }
  }
</script>
<style lang="stylus">
  @import "~assets/stylus/variable.styl"
  .detailWrap {
    .el-tabs__header {
      padding-left: 20px
      height: 60px
      margin: 0
      .el-tabs__item {
        font-size: $font-m
        color: $size-main
        height: 60px
        line-height: 60px
        &.is-active, &:hover {
          color: #DEBD63
        }
      }
      .el-tabs__item:focus.is-active.is-focus:not(:active) {
        -webkit-box-shadow: none
        box-shadow: none;
        border-radius: 0
      }
      .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
        background-color: #e4e7ed;
        z-index: 1;
      }
    }
  }
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .detailWrap {
    &_nav {
      font-size: $font-s
      height: 50px
      align-items: center
      width: 100%
      display: flex
      color: $size-ssmain
      li {
        hover-hand()
        &.active {
          color: $main-color
        }
        &:hover {
          color: $main-color
        }
      }
    }
    .details {
      margin-bottom: 16px
      display: flex
      &_l {
        width: 850px
        margin-right: 16px
        &_top {
          margin-bottom: 12px
          display: flex
          background-color: #fff
          .top_l {
            display: flex
            flex-direction: column
            align-items: center
            width: 220px
            padding-top: 12px
            padding-bottom: 20px
            background-color: #fbfbfb
            .Nos {
              width: 100%
              p {
                display: inline-block
                height: 30px
                background: linear-gradient(#ed4b51, #fb6767)
                text-align: center
                font-size: $font-m
                color: #fff
                line-height: 30px
                font-weight: 700
                padding: 0 15px
                align-items: left
                margin-left: -4px
              }
            }
            .b_logo {
              margin-top: 24px
              margin-bottom: 18px
              img {
                width: 104px
                height: 104px
                /*border-radius: 52px*/
              }
            }
            .b_name {
              p {
                font-size: $font-m
                text-align: center
                &:nth-child(1) {
                  color: $size-main
                }
                &:nth-child(2) {
                  margin-top: 8px
                  color: $size-smain
                  font-size: $font-s
                  margin-bottom: 16px
                }
              }
            }
            .bot {
              font-size: $font-s
              .size {
                color: $size-smain
                margin-right: 8px
              }
            }
          }
          .top_r {
            padding: 20px
            flex: 1
            &_title {
              display: flex
              justify-content: space-between
              height: 18px
              .name {
                span {
                  height: 18px
                  vertical-align: sub
                  &:nth-child(2) {
                    color: $size-smain
                    font-size: $font-s
                    margin-left: 8px
                  }
                }
              }
              .follow {
                color: $size-smain
                font-size: 15px
                vertical-align: sub
                transition: all .2s linear
                hover-hand()
                .icon-ken_star {
                  font-size: 18px
                  margin-right: 8px
                }
              }
            }
            .englishName {
              margin-top: 8px
              display: inline-block
              padding: 2px 6px
              border: 1px solid #dedede
              background-color: #f2f2f2
              color: $size-smain
              font-size: $font-s
            }
            &_info {
              display: flex
              padding: 22px 0 24px 0
              border-bottom: 1px solid $border-color
              &_l {
                width: 322px
                border-right: 1px solid $border-color
                .nav {
                  font-size: 14px
                }
                .price {
                  margin-top: 12px
                  font-size: 28px
                  span {
                    font-size: $font-s
                  }
                  .Rise {
                    margin-left: 10px
                  }
                }
                .rightName {
                  font-size: $font-s
                  color: $size-ssmain
                  margin-top: 12px
                }
              }
              &_r {
                flex: 1
                padding-left: 30px
                li {
                  font-size: $font-s
                  margin-top: 17px
                  vertical-align: middle
                  color: $size-ssmain
                  &:first-child {
                    margin-top: 0
                  }
                }
              }
            }
            &_bot {
              padding-top: 24px
              display: flex
              &_l {
                width: 322px
              }
              &_r {
                flex: 1
                padding-left: 30px
              }
              li {
                margin-top: 16px
                vertical-align: middle
                color: $size-ssmain
                font-size: $font-s
                &:first-child {
                  margin-top: 0
                }
                span {
                  color: $size-main
                }
              }
            }
          }
        }
        &_con {
          background-color: #fff
          &_nav {
            padding-right: 20px
            display: flex
            justify-content: space-between
            align-items: center
            border-bottom: 1px solid $border-color
            height: 60px

            .nav_tab {
              display: flex
              li {
                height: 60px
                line-height: 58px
                padding: 0 20px
                font-size: $font-m
                color: $size-ssmain
                border-bottom: 2px solid transparent
                transition: all .2s linear
                hover-hand()
                &.nuxt-link-exact-active {
                  color: $main-color
                  border-bottom: 2px solid $main-color
                }
              }
            }
            .el-select {
              width: 150px
              margin-right: 20px
              .el-input--suffix {
                .el-input__inner {
                  background-color: #fff
                  border-color: #ccc
                }
              }
              &:nth-child(1) {
                margin-right: 8px
              }
            }
          }
          .child {
            min-height: 40vh
          }
        }
      }
      &_r {
        width: 324px
        .list_nav {
          background-color: #fff
          border-bottom: 1px solid $border-color
          padding: 0 18px
          display: flex
          align-items: center
          justify-content: space-between
          height: 55px
          font-size: $font-s
          color: $size-smain
          &_l {
            display: flex
            align-items: center
            img {
              margin-right: 8px
            }
            p {
              transition: all .6s
              user-select: none
              margin-right: 16px
              height: 16px
              display: flex
              align-items: flex-end
              &.active {
                font-size: $font-m
                color: $size-main
              }
            }
          }

          &_r {
            display: flex
            hover-hand()
            extend-click()
            p {
              width: 4px
              height: 4px
              background: #aeaeae
              border-radius: 2px
              margin: 2px
              transition: all .2s linear
            }
            &:hover {
              p {
                background: $main-color
              }
            }
          }
        }

        &_con {
          background-color: #fff
          li {
            display: flex
            min-height: 44px
            align-items: center
            font-size: $font-s
            padding: 0 20px
            &:nth-child(even) {
              background-color: #f8f8f8
            }
            p {
              color: $size-smain
              span {
                color: $size-main
              }
            }
            &.Mechanism {
              span {
                display: block
              }
            }
          }
          .B_letter {
            padding: 0 20px
            display: flex
            flex-direction: column
            align-items: flex-start
            p {
              font-size: $font-s
              &:nth-child(1) {
                height: 44px
                color: $size-smain
                width: 100%
                line-height: 44px
              }
              &:nth-child(2) {
                max-height: 168px
                color: #454545
                line-height: 28px
                text-hid(6)
              }
            }
            a {
              color: #ff0000
              text-decoration: underline
              height: 44px
              line-height: 44px
              width: 100%
              text-align: right
              hover-hand()
              &:hover {
                color: $main-color
              }
            }
          }
        }
        &_bot {
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
    }
  }

</style>
