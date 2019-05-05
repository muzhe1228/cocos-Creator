<template>
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
        <li>涨幅跌</li>
        <li>流通市值</li>
        <li>流通数量</li>
        <li>自选状态</li>
      </ul>
      <div>
        <ul class="table_cont" v-for="(item,index) in searchList.items" :key="index">
          
          <li>
            {{(searchList.pageSize*(searchList.currentPage-1)) + index+1}}
          </li>
          <li class="goToUrl">
            <nuxt-link class="aClick" :to="'/coin/'+ item.currencyEnglisgName | toLowerCase"
                       :title="`${item.currencyName}-${item.currencyShortName}`">
              
              <img :src="item.pic" :alt="`${item.currencyName}-${item.currencyShortName}`">{{item.currencyName}}
            </nuxt-link>
          </li>
          <li>
            {{item.openPrice|numRest(0,',')}}
          </li>
          <li>
            {{item.openTurnover|numRest(0)}}
          </li>
          <li :class="item.openRiseFall| IsColor">
            {{item.openRiseFall|numRest('%')}}
          </li>
          <li>
            {{item.openCirculateTotalValue|numRest(0)}}
          </li>
          <li>
            {{item.openCirculateTotal|numRest(0)}}
          </li>
          
          <li>
            <p class="follow" v-if="item.attention" @click="noFollow(item.cerId)"><i
              class="icon-ken_star color-starA"></i>取消自选</p>
            <p class="follow" v-else @click="Follow(item.cerId)"><i class="icon-ken_star color-star"></i>添加自选</p>
          </li>
        </ul>
      </div>
      <div class="page" v-if="searchList.totalNumber>20">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="20"
          :pager-count="5"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :total="searchList.totalNumber">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {mapState} from 'vuex'
  
  export default {
    head() {
      return {
        title: '币种搜索----聚合全球行情,挖掘数据价值-CoinLa',
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
        keyword: this.$route.query.world,
        searchList: [],
        mainLoading: false
      }
    },
    computed: {
      keyWorld() {
        return this.$route.query.world
      },
      ...mapState(["Token"])
    },
    watch: {
      keyWorld: function (val) {
        this.searchCurrency(val)
      }
    },
    mounted() {
      this.$ToSeo()
      this.searchCurrency(this.$route.query.world, 1)
    },
    methods: {
      searchCurrency(keyWord, val) {
        this.mainLoading = true
        getCoinlaSingle('/search/pcButtonCurrencySearch', {
          searchName: keyWord || 'b',
          rows: 20,
          page: val || 1
        }, this.Token)
          .then((res) => {
            this.mainLoading = false
            this.searchList = res.data.data
          })
      },
      handleCurrentChange(val) {
        this.searchCurrency(this.keyWorld, val)
        this.$ScrollTop()
      },
      //取消关注
      noFollow(cerId) {
        let _this = this
        if (_this.Token) {
          getCoinlaSingle('/exchange/cancelAttention', {cerId: cerId}, this.Token)
            .then((res) => {
              let code = res.data.code
              if (code === 0) {
                this.searchCurrency(this.keyword, this.searchList.currentPage)
              }
            })
        } else {
          this.$notify({
            message: '请先登录',
            type: 'warning'
          })
        }
      },
      //关注
      Follow(cerId) {
        let _this = this
        if (_this.Token) {
          getCoinlaSingle('/exchange/addAttention', {cerId: cerId}, this.Token)
            .then((res) => {
              let code = res.data.code
              if (code === 0) {
                // this.openMsg('关注成功', code)
                this.searchCurrency(this.keyword, this.searchList.currentPage)
              }
            })
        } else {
          this.$notify({
            message: '请先登录',
            type: 'warning'
          })
        }
      },
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .con_cont {
    background-color: #fff
    &_table {
      .table_cont {
        li {
          &:nth-child(1) {
            img {
              width: 24px
              height: auto
            }
          }
          &:nth-child(2) {
            color: #0d93ff
            no-wrap()
            hover-hand()
          }
        }
      }
      .table_title, .table_cont {
        li {
          width: 13%
          display: flex
          align-items: center
          font-size: $font-s
          &:nth-child(1) {
            width: 6%
          }
          &:nth-child(2) {
            width: 19%
          }
          &:nth-child(5) {
            width: 10%
          }
          .follow {
            display: flex
            transition: all .2s linear
            align-items: center
            hover-hand()
            .icon-ken_star {
              font-size: 16px
              margin-right: 8px
            }
          }
        }
      }
    }
  }
</style>
