<template>
  <div class="con_cont">
    <div class="con_cont_table resetLoading"
         element-loading-text="数据加载中，请耐心等待"
         element-loading-background="rgba(0, 0, 0, 0.6)"
         v-loading="mainLoading">
      <ul class="table_title" ref="titleFix">
        <li>排名</li>
        <li>币种</li>
        <li>交易对</li>
        <li>价格</li>
        <li>成交额(24H)</li>
        <li>占比</li>
      </ul>
      <div>
        <ul class="table_cont" v-for="(item,index) in details.items" :key="index">
          <li>{{(details.pageSize*(details.currentPage-1)) + index+1}}</li>
          <li>
            <nuxt-link :title="`${item.currencyName}-${item.currencyShortName}`"
                       :to="'/coin/'+ item.currencyEnglisgName | toLowerCase" class="aClick">
              <img v-lazy="item.pic" :alt="`${item.currencyName}-${item.currencyShortName}`">{{item.currencyName}}
            </nuxt-link>
          </li>
          <li>{{item.currencyShortName}}/{{item.currencyRightShortName}}</li>
          <li>{{item.openPrice|numRest(sel)}}</li>
          <li>{{item.openTurnover|numRest(sel)}}</li>
          <li>{{item.openTurnoverProportion|numRest('%','no')}}</li>
        </ul>
        <div class="page" v-if="details.totalNumber>details.pageSize">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size="details.pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="details.totalNumber">
          </el-pagination>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getB_market} from '~/assets/js/httpAll'
  import {_initScroll} from '~/assets/js/case'

  export default {
    scrollToTop: true,
    props: ['sel', 'egeId'],
    // {
    //   sel: {
    //     type: Number,
    //   default: 0
    //   },
    //   egeId:{
    //     type: Number
    //   }
    // }
    // async asyncData({params, store}) {
    //   return getB_market(store.state.Token, {egeId: params.id, pageSize: 20})
    //     .then((res) => {
    //       return {
    //         details: res.data.data
    //       }
    //     }).catch((err) => {
    //       return {
    //         details: {error: err.message}
    //       }
    //     })
    // },
    watch: {
      sel: function (sel) {
        this.bourseGet(this.details.currentPage, sel)
      }
    },
    data() {
      return {
        mainLoading: false,
        details: {}
      }
    },
    mounted() {
      this.$ToSeo()
      this.bourseGet(1, 0)
      this.$nextTick(() => {
        _initScroll(this)
      })
    },
    methods: {
      handleCurrentChange(val) {
        this.$ScrollTop()
        this.bourseGet(val)
      },
      bourseGet(page, num) {
        this.mainLoading = true
        let params = {
          egeId: this.egeId,
          pageSize: 20,
          page: page,
          conditionTwo: num || 0
        }
        getB_market(this.$store.state.Token, params)
          .then((res) => {
            this.mainLoading = false
            this.details = res.data.data
          }).catch((err) => {
          this.mainLoading = false
          console.log(err.message)
        })
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .con_cont {
    &_table {
      .table_cont {
        li {
          &:nth-child(2), &:nth-child(4) {
            color: #0d93ff
            no-wrap()
          }
        }
      }
      .table_title, .table_cont {
        li {
          width: 19%
          display: flex
          align-items: center
          font-size: $font-s
          color: $size-ssmain
          &:nth-child(1) {
            width: 10%
          }
          &:nth-child(2) {
            width: 22%
          }
          &:nth-child(6), &:nth-child(5) {
            width: 15%
            color: $size-main
          }
          &:last-child {
            justify-content: flex-end
            padding-left: 0
            padding-right: 15px
          }
        }
      }
    }
  }
</style>
