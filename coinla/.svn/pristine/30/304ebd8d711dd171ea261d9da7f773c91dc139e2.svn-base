<template>
  <div class="invest">
    <div class="cont-top">
      <div class="cont-top_l">
        <div class="top">
          <p class="title">
            <span class="isHover">{{$route.query.name}}总资产<i class="icon-ken_quest"></i></span>
            <a class="title-hover">
              <span>账面总资产</span>&nbsp;：&nbsp;现有购入未卖出的所有币种的总资产。
            </a>
          </p>
          <div class="top_b">
            <p class="total-pric">
              <span>{{hid?'':'≈¥'}}</span>
              {{ccyDetails.presentTotalProperty|hidPic(hid)}}
              <span class="ccyNum">币数量&nbsp;：&nbsp;{{ccyDetails.currencyTotalNumber|hidPic(hid)}}</span>
            </p>
          </div>
        </div>
        <ul class="bot">
          <li>
            <p class="pic">
              <span>{{hid?'':'¥'}}</span>&nbsp;{{ccyDetails.currencyAvgPrice|hidPic(hid)}}
            </p>
            <p class="title">
              <span>币均价</span>
              <!--<a class="title-hover">-->
              <!--<span>币均价</span>&nbsp;：&nbsp;现有购入未卖出的所有币种的总资产。-->
              <!--</a>-->
            </p>
          </li>
          <li>
            <p class="pic" :class="ccyDetails.presentProfit | IsColor">
              <span>{{hid?'':'¥'}}&nbsp;</span>{{ccyDetails.presentProfit|hidPic(hid)}}</p>
            <p class="title">
              <span>账面盈利<i class="icon-kenquestion"></i></span>
              <a class="title-hover">
                <span>账面盈利</span>&nbsp;：&nbsp;现有购入未卖出的所有币种的未套现账面盈利。
              </a>
            </p>
          </li>
          <li>
            <!--<p class="pic" :class="parseFloat(infoData.presentProfitRate)>0 ? 'color-green' : 'color-red'">-->
            <!--{{infoData.presentProfitRate|hidPic(hid)}}&nbsp;<span>{{hid?'':'%'}}</span></p>-->
            <p class="pic" :class="ccyDetails.historyRate | IsColor">
              <span>{{hid?'':'¥'}}&nbsp;</span>{{ccyDetails.historyRate|hidPic(hid)}}</p>
            <p class="title">
              <span>套现盈利<i class="icon-kenquestion"></i></span>
              <a class="title-hover">
                <span>套现盈利</span>&nbsp;：&nbsp;所有买入且已卖出套现成功的币种盈利总和。
              </a>
            </p>
          </li>
          <li>
            <p class="pic" :class="ccyDetails.presentProfitRate | IsColor">
              {{ccyDetails.presentProfitRate|numRest('%')|hidPic(hid)}}</p>
            <p class="title">
              <span>账面盈利率<i class="icon-kenquestion"></i></span>
              <a class="title-hover right">
                <span>账面盈利率</span>&nbsp;：&nbsp;现有购入未卖出的所有币种盈利占总盈利的百分比。
              </a>
            </p>
          </li>
          <li>
            <p class="pic" :class="ccyDetails.todayProfitRate | IsColor">
              {{ccyDetails.todayProfitRate|numRest('%')|hidPic(hid)}}</p>
            <p class="title">
              <span>今日盈利率<i class="icon-kenquestion"></i></span>
              <a class="title-hover right">
                <span>今日盈利率</span>&nbsp;：&nbsp;现有购入未卖出的所有币种当前盈利占当日零点盈利的百分比。
              </a>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="book-wrap">
      <div class="con_nav">
        <p class="con_nav_l">{{$route.query.name}}投资明细</p>
        <div class="con_nav_r">
          <el-select v-model="binValue1" class="selected-medi" @change="selectChangeOne">
            <el-option
              v-for="item in selectOne"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <p class="addCcy" @click="OpenBook"><i class="icon-ken_plus"></i><span>记一笔</span></p>
        </div>
      </div>
      <div class="con_cont">
        <div class="con_cont_table resetLoading"
             element-loading-text="数据加载中，请耐心等待"
             element-loading-background="rgba(0, 0, 0, 0.6)"
             v-loading="mainLoading">
          <ul class="table_title" ref="titleFix">
            <li>时间</li>
            <li>数量</li>
            <li>单价</li>
            <li v-if="$route.query.type === 'bourse'">交易所</li>
            <li v-else>存放场所</li>
            <li>名称</li>
            <li>操作</li>
          </ul>
          <div v-if="Token">
            <div v-for="(Item,i) in ccyDetails.list" :key="i"
                 v-if="Item.storagePlacesType === binValue1||binValue1 === 2">
              <ul class="table_cont" v-for="(item,index) in Item.list" :key="index">
                <li :data="item">{{item.storageTime}}</li>
                <li :class="item.storageNumber | IsColor">
                  {{item.storageNumber|hidPic(hid)}}{{hid?'':'个'}}
                </li>
                <li>{{item.onePrice|numRest|hidPic(hid)}}</li>
                <li>{{item.storagePlacesType?'钱包':'交易所'}}</li>
                <li>{{item.storagePlaces}}</li>
                <li>
                  <p @click="deleteOneBook(item.currencyDetailId,item.storagePlaces)" class="delete">删除</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <add-book></add-book>
  </div>
</template>

<script>
  import addBook from '~/components/addBook'
  import {mapState, mapMutations} from 'vuex'
  import {_initScroll, socketIds, socketUpdate} from '~/assets/js/case'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    props: {
      infoData: {
        type: Object
      }
    },
    data() {
      return {
        mainLoading: false,
        ccyDetails: {},
        binValue1: 2,
        selectOne: [
          {
            value: 2,
            label: '存放场所'
          }, {
            value: 0,
            label: '交易所'
          }, {
            value: 1,
            label: '钱包'
          }
        ]
      }
    },
    watch: {
      infoData: function () {
        this.getCcyDetails()
      }
    },
    computed: {
      ...mapState(['Token', 'userMsg', 'isLine', 'hid'])
    },
    head() {
      return {
        title: `考拉账本${this.$route.query.name}总资产--考拉行情-CoinLa`,
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
    mounted() {
      this.$ToSeo()
      this.getCcyDetails()
      this.$nextTick(() => {
        _initScroll(this)
      })
    },
// destroyed() {
//   if (this.Token) {
//     this.closeWebsocket()
//   }
// },
    methods: {
      // hidIs() {
      //   if (sessionStorage.getItem('hid')) {
      //     this.setHid(0)
      //     sessionStorage.removeItem('hid')
      //   } else {
      //     this.setHid('*')
      //     sessionStorage.setItem('hid', '*')
      //   }
      //   console.log(this.hid)
      // },
      color(val) {
        if (parseFloat(val) > 0) {
          return 'color-green'
        } else if (parseFloat(val) === 0) {
          return 'color-gray'
        } else {
          return 'color-red'
        }
      },
      OpenBook() {
        this.$('.addBookBtn').fadeIn()
      },
      getCcyDetails() {
        let bookCurrencyId = this.$route.query.bookCurrencyId
        let ccyData = this.infoData.bookList[0].bookCurrencylist
        for (let i = 0; i < ccyData.length; i++) {
          if (ccyData[i].bookCurrencyId == bookCurrencyId) {
            this.ccyDetails = ccyData[i].currencyInfoResultVo
            // let copyArr = this.ccyDetails.list.concat()
            // for (let i = 0; i < copyArr.length; i++) {
            //   let Type = copyArr[i].storagePlacesType
            //   if(Type === type){
            //   }
            // }
            break
          }
        }
      },
      //记一笔
      deleteOneBook(id, name) {
        let _this = this
        let params = {
          currencyDetailIds: id
        }
        this.$confirm(`是否确认删除 ${name}?`, '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          getCoinlaSingle('/book/deleteCurrencyDetail', params, _this.Token)
            .then((res) => {
              if (res.data.code === 0) {
                this.$ScrollTop()
                _this.setUpdateBook(false)
              }
            }).catch((err) => {
            console.log(err.message)
          })
        }).catch(() => {
          return
        })
      },
      selectChangeOne(val) {
        for (let i = 0; i < this.ccyDetails.list.length; i++) {
          let Type = this.ccyDetails.list[i].storagePlacesType
          if (Type === val) {

          }
        }
      },
      ...mapMutations(['setLogin', 'setRegister', 'setUpdateBook', 'setHid'])
    },
    components: {
      addBook
    }
  }
</script>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .invest {
    width: 850px
    min-height: 60vh
    .cont-top {
      margin-bottom: 16px
      display: flex
      justify-content: space-between
      &_l {
        width: 850px
        height: 226px
        background-color: #fff
        .top {
          padding: 22px 20px
          height: 120px
          border-bottom: 1px solid $border-color
          .title {
            font-size: $font-m
            padding-bottom: 24px
            color: #333
            position: relative
            display: flex
            align-items: flex-end
            hover-hand()
            &-hover {
              font-size: $font-s
              position: absolute
              top: 70%
              left: 80px
              width: 400px
              min-height: 48px
              padding: 10px 20px
              box-shadow: 0 0 15px rgba(0, 0, 0, .2)
              z-index: 2
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
            .isHover{
              display: flex
              i {
                font-size: $font-m
                margin-left: 6px
                color: $main-color
              }
            }
            &:hover {
              .title-hover {
                transform: scale(1, 1)
                z-index: 10
              }
            }
          }
          .total-pric {
            font-size: 36px
            display: flex
            align-items: flex-end
            span {
              font-size: 14px
              margin-left: 0
              &.ccyNum {
                font-size: $font-m
                margin-left: 25px
                color: $size-ssmain
              }
            }
          }
        }

        .bot {
          display: flex
          padding: 28px 20px 0
          li {
            width: calc(100% / 5)
            font-size: $font-m
            text-align: center
            .pic {
              font-size: 24px
              margin-bottom: 16px
              span {
                font-size: $font-s
              }
            }
            .title {
              font-size: $font-s
              color: $size-ssmain
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
                padding: 10px 20px
                box-shadow: 0 0 15px rgba(0, 0, 0, .2)
                z-index: 2
                line-height: 28px
                background-color: #fff
                color: $size-smain
                transform: scale(1, 0)
                transition: all .2s linear
                span {
                  color: $size-main
                }
                &.right {
                  transform: translateX(-100%) scale(1, 0)
                }
              }
              &:hover {
                .title-hover {
                  transform: scale(1, 1)
                  z-index: 10
                  &.right {
                    transform: translateX(-100%) scale(1, 1)
                  }
                }
              }
            }
          }
        }
      }
    }
    .book-wrap {
      background-color: #fff
      .addCcy {
        width: 82px
        height: 28px
        border-radius: 4px
        border: 1px solid $main-color
        margin-left: 20px
        color: $main-color
        font-size: $font-s
        display: flex
        align-items: center
        justify-content: center
        transition: all .2s linear
        hover-hand()
        i {
          margin-right: 4px
        }
        &:hover {
          border-color: #cfad50
          color: #cfad50
        }
      }
      .con_cont {
        &_table {
          .table_cont {
            li {
              &:nth-child(1), &:nth-child(2) {
                color: #0d93ff
                hover-hand()
              }
            }
          }
          .table_title {
            width: 100%
            &.active {
              width: 850px
              transform: translateX(calc(-50% + 170px))
            }
          }
          .table_title, .table_cont {
            li {
              width: 18%
              display: flex
              align-items: center
              font-size: 14px
              padding: 0 5px
              &:nth-child(1) {
                width: 20%
              }
              &:nth-child(4) {
                width: 16%
              }
              &:nth-child(6) {
                width: 10%
                .delete {
                  text-decoration: underline
                  transition: all .2s linear
                  extend-click()
                  &:hover {
                    color: $main-color
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
