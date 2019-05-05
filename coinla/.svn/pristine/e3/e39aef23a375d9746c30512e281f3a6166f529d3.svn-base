<template>
  <div class="container MarketAll">
    <ul class="MarketAll_nav">
      <nuxt-link tag="li" to="/">考拉行情首页&nbsp;&nbsp;>&nbsp;&nbsp;</nuxt-link>
      <nuxt-link tag="li" to="/exchange">交易所&nbsp;&nbsp;>&nbsp;&nbsp;</nuxt-link>
      <li class="active">{{bourseDetails.exchangeName}}</li>
    </ul>
    <div class="Market">
      <div class="Market_l">
        <div class="Market_l_nav noneAfter con_nav">
          <ul class="nav_tab">
            <nuxt-link tag="li" :to="{name:'exchange-id-index'}">行情</nuxt-link>
            <!--<nuxt-link tag="li" :to="{name:'exchange-id-index-cost'}">费用说明</nuxt-link>-->
            <!--<nuxt-link tag="li" :to="{name:'exchange-id-index-msg'}">最新公告</nuxt-link>-->
          </ul>
          <!--v-if="'exchange-id-index'===$route.name"  //显示问题-->
          <div class="con_nav_r">
            <el-select
              v-model="binValue2"
              class="selected-min"
              v-if="'exchange-id-index'===$route.name">
              <el-option
                v-for="item in selectTwo"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <nuxt-child :sel="binValue2" :egeId="bourseDetails.egeId"/>
      </div>
      <div class="Market_r">
        <div class="Market_r_nav">
          <p class="Img">
            <img v-lazy="{src: bourseDetails.pic, error: errImg}" alt="">
          </p>
          <ul class="Size">
            <li>{{bourseDetails.exchangeName}}</li>
            <li>
              <el-rate
                v-model="bourseDetails.level"
                disabled
                disabled-void-color="#b5b5b5"
                :colors="['#e2bd51','#e2bd51','#e2bd51']">
              </el-rate>
            </li>
            <li>
              <p v-if="!bourseDetails.legalTender"><img src="~static/images/newIndex/fabi.png" alt=""><span>法币</span>
              </p>
              <p v-if="!bourseDetails.stock"><img src="~static/images/newIndex/xianhuo.png" alt=""><span>现货</span></p>
              <p v-if="!bourseDetails.futures"><img src="~static/images/newIndex/qihuo.png" alt=""><span>期货</span></p>
            </li>
          </ul>
        </div>
        <ul class="Market_r_con">
          <li>
            <p>交易对&nbsp;：&nbsp;<span>{{bourseDetails.transactionPair}}</span></p>
          </li>
          <li>
            <p>国家&nbsp;：&nbsp;<span>{{bourseDetails.country}}</span></p>
          </li>
          <li>
            <p>成交额(24h)&nbsp;：&nbsp;<span>{{bourseDetails.turnover|numRest(0)}}</span></p>
          </li>
          <li>
            <p>官网&nbsp;：&nbsp;<a class="Href" :href="bourseDetails.link" :title="bourseDetails.exchangeName" target="_blank">{{bourseDetails.link|urlRest}}</a>
            </p>
          </li>
          <li class="B_letter">
            <p>平台简介&nbsp;：&nbsp;</p>
            <p>{{bourseDetails.introduce}}</p>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    async asyncData({params, store}) {
      return getCoinlaSingle(`/exchange/${params.id}`, {exchangeName: params.id}, store.state.Token)
        .then((res) => {
          return {
            bourseDetails: res.data.data
          }
        }).catch((err) => {
          return {
            bourseDetails: {error: err.message}
          }
        })
    },
    data() {
      return {
        errImg: require('../../../static/images/errorBourse.png'),
        binValue2: 0,
        selectTwo: [
          {
            value: 0,
            label: 'CNY'
          },
          {
            value: 1,
            label: 'USD'
          }
        ]
      }
    },
    head() {
      return {
        title: `${this.bourseDetails.exchangeName}交易平台实时行情查询--考拉行情-CoinLa。`,
        meta: [
          {
            hid: 'keywords',
            name: 'keywords',
            content: `${this.bourseDetails.exchangeName}交易平台,${this.bourseDetails.exchangeName}官网,${this.bourseDetails.exchangeName}手续费,${this.bourseDetails.exchangeName}怎么样,${this.bourseDetails.exchangeName}行情,${this.bourseDetails.exchangeName}简介`
          },
          {
            hid: 'description',
            name: 'description',
            content: `考拉行情提供${this.bourseDetails.exchangeName}交易平台价格实时行情查询，对接${this.bourseDetails.exchangeName}所有交易对数据，还包括${this.bourseDetails.exchangeName}官网，${this.bourseDetails.exchangeName}所在国家,${this.bourseDetails.exchangeName}24小时成交量,${this.bourseDetails.exchangeName}历史等数据。`
          }
        ]
      }
    },
    mounted(){
      this.$ToSeo()
    },
    methods: {
      getBourse_details() {
        this.mainLoading = true
        let params = {
          egeId: this.$route.params.id
        }
        getB_Details(this.$store.state.Token, params)
          .then((res) => {
            this.mainLoading = false
            this.bourseDetails = res.data.data
          }).catch((err) => {
          console.log(err.method)
          this.mainLoading = false
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .MarketAll {
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
    .Market {
      margin-bottom: 16px
      display: flex
      &_l {
        width: 850px
        margin-right: 16px
        background-color: #fff
        &_nav {
          &.con_nav {
            padding-left: 0
          }
          display: flex
          justify-content: space-between
          align-items: center
          height: 60px
          background-color: #fff
          .nav_tab {
            display: flex
            li {
              font-size: $font-m
              padding: 0 20px
              line-height: 58px
              border-bottom: 2px solid transparent
              transition: all .2s linear
              user-select: none
              hover-hand()
              &.nuxt-link-exact-active {
                font-weight: 600
                background-color: #fff
                color: $main-color
                border-color: $main-color
              }
            }
          }
        }
      }

      &_r {
        flex: 1
        font-size: $font-s
        &_nav {
          background-color: #fff
          padding: 20px
          display: flex
          border-bottom: 1px solid $border-color
          .Img {
            width: 88px
            height: 88px
            margin-right: 18px
            img {
              width: 100%
              height: 100%
            }
          }
          .Size {
            background-color: #fff
            display: flex
            flex-direction: column
            justify-content: space-between
            li {
              &:nth-child(1) {
                font-size: $font-m
                font-weight: 600
                color: $main-color
              }
              &:nth-child(3) {
                display: flex
                p {
                  font-size: 14px
                  color: #454545
                  display: flex
                  align-items: center
                  margin-left: 10px
                  &:first-child {
                    margin-left: 0
                  }
                  img {
                    margin-right: 5px
                  }
                }
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
                min-height: 140px
                color: #454545
                line-height: 28px
              }
            }
          }
        }
      }
    }
  }

</style>
