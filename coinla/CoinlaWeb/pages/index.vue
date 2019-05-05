<template>
  <div class="index">
    <div class="index_top">
      <div class="container">
        <div class="top-left">
          <index-top></index-top>
        </div>
        <a href="/App" class="top-right goToUrl" target="_blank">
          <img src="~static/images/BeeStore.png" alt="">
        </a>
      </div>
    </div>
    <div class="index_cont">
      <div class="container">
        <div class="cont_left">
          <div class="con_nav">
            <p class="con_nav_l">所有货币<span>All Digital Currency</span></p>
            <div class="con_nav_r">
              <search-inp></search-inp>
              <el-select v-model="binValue1" @change="selectChangeOne">
                <el-option
                  v-for="item in selectOne"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="binValue2" class="selected-min" @change="selectChangeTwo">
                <el-option
                  v-for="item in selectTwo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="con_cont">
            <div class="con_cont_table resetLoading"
                 element-loading-text="数据加载中，请耐心等待"
                 element-loading-background="rgba(0, 0, 0, 0.6)"
                 v-loading="mainLoading">
              <ul class="table_title" ref="titleFix">
                <li>#</li>
                <li>币种</li>
                <li>当前价</li>
                <li>成交额(24H)</li>
                <li>涨跌幅</li>
                <li>流通市值</li>
                <li>流通数量</li>
                <li>趋势图</li>
              </ul>
              <div>
                <ul class="table_cont" v-for="(item,index) in indexList.items" :key="index" :id="'row'+item.cerId">
                  <li>{{(indexList.pageSize*(indexList.currentPage-1)) + index+1}}</li>
                  <li>
                    <nuxt-link class="aClick"
                               :to="'/coin/'+ item.currencyEnglisgName | toLowerCase"
                               :title="`${item.currencyName}-${item.currencyShortName}`">
                      <img class="Img" v-lazy="item.pic" :alt="`${item.currencyName}-${item.currencyShortName}`">{{item.currencyName}}
                    </nuxt-link>
                  </li>
                  <li class="priceSoc">{{item.openPrice|numRest(binValue2)}}</li>
                  <li class="turnoverSoc">{{item.openTurnover|numRest(binValue2)}}</li>
                  <li :class="item.openRiseFall | IsColor" class="riseSoc">
                    {{item.openRiseFall|numRest("%")}}
                  </li>
                  <li class="totalSoc">{{item.openCirculateTotalValue|numRest(binValue2)}}</li>
                  <li>{{item.openCirculateTotal}}</li>
                  <li>
                    <svg class="peity" width="80" height="21" v-if="svgList.length">
                      <polyline fill="none"
                                :points="svgList[item.cerId]"
                                :stroke="item.openRiseFall>0?'#26b47a':(item.openRiseFall===0?'#454545':'#ff0000')"
                                stroke-width="1"
                                class="g-rect-fill svgColor"
                                stroke-linecap="square"></polyline>
                    </svg>
                  </li>
                </ul>
              </div>
              <div class="newPage">
                <nuxt-link class="aDisabled" to="/">上一页</nuxt-link>
                <nuxt-link
                  :to="`/${setPage(pageNumRest(item , $route.params.id))}`"
                  :class="{'active':item==1}"
                  v-for="item in pageList"
                  :key="item">{{item === 'next'? '···':item}}
                </nuxt-link>
                <nuxt-link :to="`/${setPage(nextPage($route.params.id,indexList.totalPage))}`">下一页</nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="cont_right">
          <pic-list></pic-list>
          <deal-lang></deal-lang>
          <new-current></new-current>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PicList from '~/components/PicList'
  import DealLang from '~/components/DealLang'
  import newCurrent from '~/components/newCurrent'
  import searchInp from '~/components/searchInp'
  import indexTop from '~/components/indexTop'
  import {
    _initScroll,
    numRestccy,
    pageListRest,
    pageNumRest,
    prevPage,
    nextPage,
    setPage,
    resetSvg,
    socketIds,
    socketUpdate,
    compare
  } from '~/assets/js/case'
  import {getIndex, getCoinlaSingle} from '~/assets/js/httpAll'
  
  export default {
    scrollToTop: true,
    async asyncData({store, params}) {
      return getIndex(store.state.Token, {pageSize: 50, page: 1, conditionOne: 3})
        .then((res) => {
          return {
            indexList: res.data.data,
            pageList: pageListRest(res.data.data.totalPage, params.id)
          }
        }).catch((err) => {
          return {
            indexList: {error: err.message}
          }
        })
    },
    data() {
      return {
        pageNumRest: pageNumRest,
        prevPage: prevPage,
        nextPage: nextPage,
        setPage: setPage,
        show: false,
        svgList: [],
        mainLoading: false,
        binValue1: 3,
        binValue2: 0,
        selectOne: [
          {
            value: 0,
            label: '当前价降序'
          }, {
            value: 1,
            label: '成交额降序'
          }, {
            value: 2,
            label: '涨跌幅降序'
          }, {
            value: 3,
            label: '流通市值降序'
          }, {
            value: 4,
            label: '流通数量降序'
          }
        ],
        selectTwo: [
          {
            value: 0,
            label: 'CNY'
          }, {
            value: 1,
            label: 'USD'
          }
        ],
        ws: null
      }
    },
    head() {
      return {
        title: '考拉行情--聚合全球行情,挖掘数据价值-CoinLa',
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
    components: {
      PicList,
      DealLang,
      newCurrent,
      indexTop,
      searchInp,
    },
    mounted() {
      this.$ToSeo()
      this.setSSS(this.indexList)
      if (this.indexList.items) {
        this.setWebsocket()
      }
      this.$nextTick(() => {
        _initScroll(this)
      })
    },
    destroyed() {
      this.closeWebsocket()
    },
    methods: {
      handleCurrentChange(val) {
        this.indexGet(val)
        this.$ScrollTop()
      },
      //svg数据处理
      setSSS(List) {
        this.svgList = []
        let params = {cerIds: socketIds(List.items).join(',')}
        getCoinlaSingle('/svg/findList', params).then((res) => {
          this.svgList = resetSvg(res.data.data)
        }).catch((err) => {
          console.log(err)
        })
      },
      indexGet(page) {
        this.mainLoading = true
        let params = {
          pageSize: 50,
          page: page || 1,
          conditionOne: 3,
          conditionTwo: this.binValue2
        }
        getIndex(this.$store.state.Token, params).then((res) => {
          this.mainLoading = false
          this.indexList = res.data.data
          this.sendSocket(res.data.data.items)
          this.setSSS(res.data.data)
        }).catch((err) => {
          this.mainLoading = false
          console.log(err.message)
        })
      },
      selectChangeOne(val) {
        console.log(val)
        if (val === 0) {
          this.indexList.items = this.indexList.items.sort(compare("openPrice"))
        } else if (val === 1) {
          this.indexList.items = this.indexList.items.sort(compare("openTurnoverSort"))
        } else if (val === 2) {
          this.indexList.items = this.indexList.items.sort(compare("openRiseFall"))
        } else if (val === 3) {
          this.indexList.items = this.indexList.items.sort(compare("openCirculateTotalValueSort"))
        } else if (val === 4) {
          this.indexList.items = this.indexList.items.sort(compare("openCirculateTotalSort"))
        }
      },
      selectChangeTwo() {
        this.indexGet()
      },
      // 建立 websocket
      setWebsocket() {
        this.ws = new WebSocket('ws://quotn.coinla.com/wsOptional')
        this.ws.onopen = () => {
          console.log("WebSocket open ...")
          this.sendSocket(this.indexList.items)
        }
        this.ws.onmessage = (evt) => {
          this.indexList = socketUpdate(this.indexList, JSON.parse(evt.data))
          // this.indexList.items[0].currencyName = 'coinla'
          // console.log(this.indexList)
          // let allData = JSON.parse(evt.data)
          // // console.log(allData)
          // this.$('#row' + allData.cerId).find('.priceSoc').html(numRestccy(allData.openPrice, this.binValue2))
          // this.$('#row' + allData.cerId).find('.turnoverSoc').html(numRestccy(allData.openTurnover, this.binValue2))
          // this.$('#row' + allData.cerId).find('.riseSoc').html(numRestccy(allData.openRiseFall, "%"))
          // let colorClass ='riseSoc '
          // if (allData.openRiseFall > 0) {
          //   colorClass = 'riseSoc color-green'
          //   this.$('#row' + allData.cerId).find('.svgColor').attr('stroke','#26b47a')
          // }else if(allData.openRiseFall < 0){
          //   colorClass = 'riseSoc color-red'
          //   this.$('#row' + allData.cerId).find('.svgColor').attr('stroke','#ff0000')
          // }else if(allData.openRiseFall == 0){
          //   colorClass = 'riseSoc color-gray'
          //   this.$('#row' + allData.cerId).find('.svgColor').attr('stroke','#454545')
          // }
          // this.$('#row' + allData.cerId).find('.riseSoc').attr('class',colorClass)
          // console.log(numRestccy(allData.openPrice, this.binValue2))
          // // this.indexList = socketUpdate(this.indexList, JSON.parse(evt.data))
        }
      },
      sendSocket(List) {
        this.ws.send(JSON.stringify({
          ids: socketIds(List),
          token: this.$store.state.Token,
          type: this.binValue2
        }))
      },
      //断开websocket链接
      closeWebsocket() {
        this.ws.close()//断开websocket链接
        this.ws.onclose = function () {//监听是否断开
          console.log("WebSocket close");
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .index {
    padding-bottom: 16px
    &_top {
      height: 114px
      background: #fff
      display: flex
      padding-top: 20px
      padding-bottom: 16px
      align-items: center
      .top-right {
        position: absolute
        right: 0
        top: 0
        img {
          width: 324px
          height: 180px
        }
      }
    }
    &_cont {
      margin-top: 16px
      .container {
        display: flex
        justify-content: space-between
        .cont_left {
          width: 850px
          .con_cont {
            background-color: #fff
            .con_cont_table {
              .table_cont {
                li {
                  &:nth-child(2) {
                    color: #0d93ff
                  }
                }
              }
              .table_title, .table_cont {
                li {
                  width: 10.5%
                  &:nth-child(1) {
                    width: 6%
                  }
                  &:nth-child(2) {
                    width: 19%
                  }
                  &:nth-child(4), &:nth-child(7) {
                    width: 13.5%
                  }
                  &:nth-child(3) {
                    width: 12%
                  }
                  &:nth-child(6) {
                    width: 15%
                  }
                }
              }
            }
          }
        }
        .cont_right {
          padding-top: 70px
        }
      }
    }
  }
</style>
