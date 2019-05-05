<template>
  <div class="con_cont">
    <div class="con_cont_table resetLoading"
         element-loading-text="数据加载中，请耐心等待"
         element-loading-background="rgba(0, 0, 0, 0.6)"
         v-loading="mainLoading">
      <ul class="table_title" ref="titleFix">
        <li>#</li>
        <li>名称</li>
        <li>成交额(24H)</li>
        <li>交易对</li>
        <li>国家</li>
        <li>交易类型</li>
        <li>星级</li>
      </ul>
      <div>
        <ul class="table_cont" v-for="(item,index) in exchangeList.items" :key="index">
          <li>{{(exchangeList.pageSize*(exchangeList.currentPage-1)) + index+1}}</li>
          <li>
            <nuxt-link class="aClick" :to="'/exchange/' + item.exchangeNameEn | toLowerCase">
              <img v-lazy="{src: item.pic, error: errImg}" :alt="`${item.exchangeName}-${item.exchangeNameEn}`">{{item.exchangeName}}
            </nuxt-link>
          </li>
          <li>{{item.turnover|numRest(0,',')}}</li>
          <li>{{item.transactionPair}}</li>
          <li>{{item.country}}</li>
          <li>
            <div class="adver">
              <p v-if="!item.futures"><img src="~static/images/newIndex/qihuo.png" alt=""><span>期货</span></p>
              <p v-if="!item.stock"><img src="~static/images/newIndex/xianhuo.png" alt=""><span>现货</span></p>
              <p v-if="!item.legalTender"><img src="~static/images/newIndex/fabi.png" alt=""><span>法币</span></p>
            </div>
          </li>
          <li>
            <el-rate
              v-model="item.level"
              disabled
              :allow-half="true"
              :colors="['#e2bd51','#e2bd51','#e2bd51']"
              disabled-void-color="#b5b5b5">
            </el-rate>
          </li>
        </ul>
      </div>
      <div class="page" v-if="exchangeList.totalNumber>20">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="20"
          :pager-count="5"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :total="exchangeList.totalNumber">
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
        title: '交易所搜索----聚合全球行情,挖掘数据价值-CoinLa',
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
        errImg: require('../../static/images/errorBourse.png'),
        keyword: this.$route.query.world,
        exchangeList: [],
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
        this.searchExchange(val)
      }
    },
    mounted() {
      this.$ToSeo()
      this.searchExchange(this.$route.query.world, 1)
    },
    methods: {
      searchExchange(keyWord, val) {
        this.mainLoading = true
        getCoinlaSingle('/search/pcButtonExchangeSearch', {
          searchName: keyWord || 'b',
          rows: 20,
          page: val || 1
        }, this.Token)
          .then((res) => {
            this.mainLoading = false
            this.exchangeList = res.data.data
          })
      },
      handleCurrentChange(val) {
        this.searchExchange(this.keyWorld, val)
        this.$ScrollTop()
      }
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
          &:nth-child(4) {
            width: 10%
          }
          &:nth-child(6) {
            width: 26%
          }
          .adver {
            flex: 1
            display: flex
            p {
              margin-right: 10px
              font-size: 14px
              color: $size-main
              display: flex
              align-items: center
              &:last-child {
                margin-right: 0
              }
              img {
                margin-right: 5px
              }
            }
          }
          .follow {
            display: flex
            transition: all .2s linear
            align-content: center
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
