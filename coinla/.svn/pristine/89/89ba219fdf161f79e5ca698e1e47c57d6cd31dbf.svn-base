<template>
  <div class="market con_cont">
    <div
      v-if="marketList"
      class="con_cont_table resetLoading"
      element-loading-text="数据加载中，请耐心等待"
      element-loading-background="rgba(0, 0, 0, 0.6)"
      v-loading="mainLoading">
      <ul class="table_title">
        <li>排名</li>
        <li>交易平台</li>
        <li>交易对</li>
        <li>成交额(24H)</li>
        <li>当前价</li>
        <li>成交占比</li>
        <li>关注</li>
      </ul>
      <div>
        <ul class="table_cont" v-for="(item,index) in marketList.items" :key="index">
          <li>{{(marketList.pageSize*(marketList.currentPage-1)) + index+1}}</li>
          <li>
            <nuxt-link class="aClick" :to="'/exchange/' + item.exchangeNameEn | toLowerCase" :title="item.exchangeName">
              {{item.exchangeName}}
            </nuxt-link>
          </li>
          <li>{{item.currencyShortName}}/{{item.currencyRightShortName}}</li>
          <li >{{item.openTurnover|numRest}}</li>
          <li>{{item.openPrice|numRest(0,',')}}</li>
          <li >{{item.openTurnoverProportion|numRest('%','no')}}</li>
          <li>
            <p class="follow" v-if="item.attention" @click="noFollow(item.cerId)"><i
              class="icon-ken_star color-starA"></i>已关注</p>
            <p class="follow" v-else @click="Follow(item.cerId)"><i class="icon-ken_star color-star"></i>添加关注</p>
            <!--<img v-if="!item.attention" @click="Follow(item.cerId)" src="~static/images/coin/no.png" alt="">-->
            <!--<img v-else @click="noFollow(item.cerId)" src="~static/images/coin/yes.png" alt="">-->
          </li>
        </ul>
      </div>
      <div class="page" v-if="marketList.totalNumber>marketList.pageSize">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="marketList.pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :total="marketList.totalNumber">
        </el-pagination>
      </div>
    </div>
    <img class="noDataImg" v-else src="~static/images/noData.png" alt="">
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {mapState, mapMutations} from 'vuex'

  export default {
    props: ['ccyId'],
    async asyncData({params, query, store}) {
      return getCoinlaSingle(`/currency/${params.id}`, {currencyName: params.id}, store.state.Token).then((res) => {
        return getCoinlaSingle('/currency/findCurrencyInfoExchangeList', {ccyId: res.data.data.ccyId,pageSize: 30}, store.state.Token).then((res1) => {
          return {
            marketList: res1.data.data
          }
        })
      }).catch((err) => {
        return {
          marketList: {}
        }
      })
    },
    computed: {
      ...mapState(['Token'])
    },
    data() {
      return {
        page: 1,
        mainLoading: false,
      }
    },
    mounted() {
      console.log(this.marketList)
      // this.getMarkList(1)
    },
    methods: {
      //获取登陆后的数据
      getMarkList(page) {
        this.mainLoading = true
        let params = {
          ccyId: this.ccyId,
          pageSize: 30,
          page: page
        }
        getCoinlaSingle('/rank/findCurrencyDealMorePage', params, this.Token)
          .then((res) => {
            this.mainLoading = false
            this.marketList = res.data.data
            // console.log(res.data.data)
          }).catch((err) => {
          this.mainLoading = false
          console.log(err.message)
        })
      },
      //分页函数
      handleCurrentChange(val) {
        this.page = val
        this.$ScrollTop()
        this.getMarkList(val)
      },
      //取消关注
      noFollow(cerId) {
        let _this = this
        if (_this.Token) {
          getCoinlaSingle('/exchange/cancelAttention', {cerId: cerId}, this.Token)
            .then((res) => {
              let code = res.data.code
              if (code === 0) {
                // this.openMsg('取消关注成功', code)
                this.getMarkList(_this.page)
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
                this.getMarkList(_this.page)
              }
            })
        } else {
          this.$notify({
            message: '请先登录',
            type: 'warning'
          })
        }
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
          width: 17%
          &:nth-child(1){
            width: 8%
          }
          &:nth-child(6),&:nth-child(7){
            width: 12%
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
