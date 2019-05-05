<template>
  <div class="con_cont">
    <div v-if="historyList" class="con_cont_table  resetLoading"
         element-loading-text="数据加载中，请耐心等待"
         element-loading-background="rgba(0, 0, 0, 0.6)"
         v-loading="mainLoading">
      <ul class="table_title">
        <li>日期</li>
        <li>最高价</li>
        <li>最低价</li>
        <li>交易额(24h)</li>
        <li>流通市值</li>
      </ul>
      <div>
        <ul class="table_cont" v-for="(item,index) in historyList.items" :key="index">
          <li>{{item.createTime}}</li>
          <li>{{item.highPrice | priceRest('¥')}}</li>
          <li>{{item.lastPrice | priceRest('¥')}}</li>
          <li>{{item.turnover | priceRest('¥')}}</li>
          <li>{{item.circulateTotalValue | priceRest('¥')}}</li>
        </ul>
      </div>
      <div class="page" v-if="historyList.totalNumber>20">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="historyList.pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :total="historyList.totalNumber">
        </el-pagination>
      </div>
    </div>
    <img class="noDataImg" v-else src="~static/images/noData.png" alt="">
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    props: ['ccyId'],
    async asyncData({params, query, store}) {
      return getCoinlaSingle(`/currency/${params.id}`, {currencyName: params.id}, store.state.Token).then((res) => {
        return getCoinlaSingle('/currency/findCurrencyInfoHistoryList', {ccyId: res.data.data.ccyId,pageSize: 30}, store.state.Token).then((res1) => {
          return {
            historyList: res1.data.data
          }
        })
      }).catch((err) => {
        return {
          historyList: {}
        }
      })
    },
    data() {
      return {
        historyList: [],
        mainLoading: false
      }
    },
    mounted() {
      // this.getHistory()
    },
    methods: {
      handleCurrentChange(val) {
        this.$ScrollTop()
        this.getHistory(val)
      },
      getHistory(page) {
        this.mainLoading = true
        let params = {
          ccyId: this.ccyId,
          page: page || 1,
          pageSize: 20
        }
        getCoinlaSingle('/currency/findCurrencyInfoHistoryList', params, this.$store.state.Token)
          .then((res) => {
            this.mainLoading = false
            this.historyList = res.data.data
          })
          .catch((err) => {
            this.mainLoading = false
            console.log(err.message)
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .con_cont {
    .con_cont_table {
      /*.table_cont {
        li {
          &:nth-child(2), &:nth-child(3) {
            color: #0d93ff
          }
        }
      }*/
      .table_title, .table_cont {
        li {
          width: 18%
          &:first-child {
            width: 30%
          }
        }
      }
    }
  }
</style>
