<template>
  <div class="template">
    <div class="template_cont container">
      <div class="template_cont-l">
        <div class="con_cont">
          <div class="top">
            <div class="con_nav">
              <div class="con_nav_l">
                <p class="con_nav_l">模板概念<span>Plate Concept</span></p>
              </div>
            </div>
            <div class="allClass">
              <p>所有分类&nbsp;：&nbsp;</p>
              <ul>
                <li @click="tempGet(1,0,'')" :class="{'active':mcId===0}">全部</li>
                <li v-for="(item,key) in moduleList" :key="key" @click="tempGet(1,item.mcId,item.mcName)"
                    :class="{'active':mcId===item.mcId}">{{item.mcName}}
                </li>
              </ul>
            </div>
          </div>
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
              <ul class="table_cont" v-for="(item,index) in moduleDetails.items" :key="index">
                <li>{{(moduleDetails.pageSize*(moduleDetails.currentPage-1)) + index+1}}</li>
                <li>
                  <nuxt-link class="aClick"
                             :to="'/coin/'+ item.currencyEnglisgName | toLowerCase"
                             :title="`${item.currencyName}-${item.currencyShortName}`">
                    <img class="Img" v-lazy="item.pic" :alt="`${item.currencyName}-${item.currencyShortName}`">{{item.currencyName}}
                  </nuxt-link>
                </li>
                <li>{{item.openPrice|numRest(0,',')}}</li>
                <li>{{item.openTurnover|numRest(0)}}</li>
                <li :class="item.openRiseFall | IsColor">{{item.openRiseFall|numRest('%')}}</li>
                <li>{{item.openCirculateTotalValue|numRest(0)}}</li>
                <li>{{item.openCirculateTotal}}</li>
                <li>
                  <svg class="peity" width="80" height="21" v-if="svgList.length">
                    <polyline fill="none"
                              :points="svgList[item.cerId]"
                              :stroke="item.openRiseFall>0?'#26b47a':(item.openRiseFall===0?'#454545':'#ff0000')"
                              stroke-width="1"
                              class="g-rect-fill"
                              stroke-linecap="square"></polyline>
                  </svg>
                </li>
              </ul>
              <div class="page" v-show="moduleDetails.totalNumber>moduleDetails.pageSize">
                <el-pagination
                  background
                  @current-change="handleCurrentChange"
                  :page-size="moduleDetails.pageSize"
                  :pager-count="5"
                  layout="prev, pager, next"
                  prev-text="上一页"
                  next-text="下一页"
                  :total="moduleDetails.totalNumber">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="template_cont-r">
        <a class="goToUrl AppDown" href="/App" target="_blank">
          <img src="~static/images/BeeStore.png" alt="">
        </a>
        <deal-lang class="et-top"></deal-lang>
        <new-current class="et-top"/>
      </div>
    </div>
  </div>
</template>

<script>
  import DealLang from '~/components/DealLang'
  import newCurrent from '~/components/newCurrent'
  import {mapState, mapMutations} from 'vuex'
  import {_initScroll, resetSvg, socketIds} from '~/assets/js/case'
  import {Axios,getCoinlaMulti, getCoinlaSingle} from '~/assets/js/httpAll'
  import axios from '~/plugins/axios'

  export default {
    scrollToTop: true,
    head() {
      return {
        title: `${this.titleSub}区块链领域板块考拉行情分类介绍`,
        meta: [
          {hid: 'keywords', name: 'keywords', content: '加密货币概念,去中心化概念'},
          {
            hid: 'description',
            name: 'description',
            content: '区块链领域板块分类介绍,及个个加密货币分类。'
          }
        ]
      }
    },
    async asyncData({store}) {
      return getCoinlaMulti(
        '/moduleConcept/selectModuleConceptList',
        '/moduleConcept/findListByModuleName',
        {},
        {mcId: store.state.mcId, pageSize: 50},
        store.state.Token)
        .then(Axios.spread((mode, index) => {
          return {
            moduleList: mode.data.data,
            moduleDetails: index.data.data
          }
        }))
      // return getCoinlaSingle('/moduleConcept/selectModuleConceptList', {}).then((res) => {
      //   return {
      //     moduleList: res.data.data
      //   }
      // })
    },
    computed: {
      ...mapState(['mcId', 'Token'])
    },
    data() {
      return {
        titleSub: '',
        svgList: [],
        mainLoading: false
      }
    },
    mounted() {
      this.$ToSeo()
      this.setSSS(this.moduleDetails)
      this.$nextTick(() => {
        _initScroll(this)
      })
    },
    methods: {
      handleCurrentChange(val) {
        this.tempGet(val)
        this.$ScrollTop()
      },
      //svg 数据处理
      setSSS(List) {
        this.svgList = []
        let params = {cerIds: socketIds(List.items).join(',')}
        getCoinlaSingle('/svg/findList', params).then((res) => {
          this.svgList = resetSvg(res.data.data)
        }).catch((err) => {
          console.log(err)
        })
      },
      tempGet(page, id, name) {
        this.titleSub = name
        if (id !== 0 && id === this.mcId) return
        this.mainLoading = true
        if (id || id === 0) {
          this.setMcId(id)
        }
        let params = {
          mcId: this.mcId,
          pageSize: 50,
          page: page || 1
        }
        getCoinlaSingle('/moduleConcept/findListByModuleName', params, this.Token).then((res) => {
          this.moduleDetails = res.data.data
          this.mainLoading = false
          this.setSSS(res.data.data)
        }).catch((err) => {
          this.mainLoading = false
          console.log(err.message)
        })

      },
      ...mapMutations(['setMcId'])
    },
    components: {
      newCurrent,
      DealLang
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .template {
    .template_cont {
      display: flex
      justify-content: space-between
      margin-bottom: 40px
      &-l {
        width: 850px
        background-color: #fff
        margin-top: 16px
        .con_cont {
          .top {
            border-bottom: 1px solid $border-color
            .allClass {
              display: flex
              font-size: $font-s
              padding: 11px 20px
              p {
                color: $size-smain
                width: 100px
                line-height: 44px
              }
              ul {
                flex: 1
                display: flex
                flex-wrap: wrap
                li {
                  width: calc(100% / 6)
                  padding-left: 5px
                  line-height: 44px
                  color: $size-main
                  transition: all .2s linear
                  hover-hand()
                  &:hover, &.active {
                    color: $main-color
                    /*text-decoration: underline*/
                  }
                }
              }
            }
          }
          &_table {
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
                &:nth-child(3), &:nth-child(4), &:nth-child(6), &:nth-child(7) {
                  width: 13.5%
                }
              }
            }
          }
        }
      }
      &-r {
        padding-top: 16px
        .et-top {
          margin-top: 16px
        }
      }
    }
  }
</style>
