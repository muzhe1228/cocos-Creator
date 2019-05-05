<template>
  <div class="Togger">
    <div class="con_nav">
      <p class="con_nav_l">交易所成交榜<span>Exchange Make List</span></p>
      <div class="con_nav_r">
        <el-select v-model="binValue2" class="selected-min" @change="selectChange">
          <el-option
            v-for="item in selectTwo"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="con-cont">
      <div class="con-cont_all resetLoading"
           element-loading-text="数据加载中，请耐心等待"
           element-loading-background="rgba(0, 0, 0, 0.6)"
           v-loading="mainLoading">
        <section v-for="(Item,index) in BourseList.items" :key="index">
          <div class="title">
            <p>NO.{{(BourseList.pageSize*(BourseList.currentPage-1)) + index+1}} {{Item.exchangeName}}</p>
            <p>总成交额：{{Item.openTurnover|numRest(binValue2)}}</p>
          </div>
          <div class="cont" :style="{height:Item.list.length>5?'360px':((Item.list.length+1)*60)+'px'}">
            <ul class="cont_title">
              <li>#</li>
              <li>币种</li>
              <li>交易对</li>
              <li>成交额(24H)</li>
              <li>当前价</li>
              <li>成交占比</li>
            </ul>
            <div>
              <ul class="cont_cont" v-for="(item,index) in Item.list" :key="index">
                <li>{{index + 1}}</li>
                <li>
                  <nuxt-link class="aClick" :to="'/coin/'+ item.currencyEnglisgName | toLowerCase">
                    <img :src="item.pic" :alt="`${item.currencyName}-${item.currencyShortName}`">
                    {{item.currencyName}}
                  </nuxt-link>
                </li>
                <li>{{item.currencyShortName}}/{{item.currencyRightShortName}}</li>
                <li>{{item.openTurnover|numRest(binValue2)}}</li>
                <li>{{item.openPrice|numRest(binValue2)}}</li>
                <li>{{item.openTurnoverProportion|numRest("%",'no')}}</li>
              </ul>
            </div>
          </div>
          <p class="more" v-if="Item.list.length>5" @click="toggle($event,Item.list.length)">查看更多</p>
        </section>
      </div>
      <div class="page" v-if="BourseList.totalNumber>10">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="10"
          :pager-count="5"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :total="BourseList.totalNumber > 100 ? 100 : BourseList.totalNumber">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import notIce from '~/components/notIce/notIce.vue'
  import PicList from '~/components/PicList'
  import DealLang from '~/components/DealLang'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    async asyncData({store}) {
      return getCoinlaSingle('/rank/findExchangeDealPage', {pageSize: 10}, store.state.Token)
        .then((res) => {
          return {
            BourseList: res.data.data,
            Token: store.state.Token
          }
        })
        .catch((err) => {
          return {
            BourseList: {error: err.message}
          }
        })
    },
    data() {
      return {
        starSize: 4.3,
        binValue2: 0,
        selectTwo: [{
          value: 0,
          label: 'CNY'
        }, {
          value: 1,
          label: 'USD'
        }],
        mainLoading: false
      }
    },
    head() {
      return {
        title: '全球交易所24小时成交量排名--考拉行情-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '虚拟货币交易所成交量'},
          {
            hid: 'description',
            name: 'description',
            content: '每日24小时及每小时全球虚拟货币交易所成交量。'
          }
        ]
      }
    },
    mounted() {
      this.$ToSeo()
    },
    methods: {
      handleCurrentChange(val) {
        this.getBourseDeal(val)
        this.$ScrollTop()
      },
      selectChange() {
        this.getBourseDeal(1)
      },
      getBourseDeal(page) {
        this.mainLoading = true
        let params = {
          pageSize: 10,
          page: page,
          condition: this.binValue2
        }
        getCoinlaSingle('/rank/findExchangeDealPage', params, this.Token)
          .then((res) => {
            this.BourseList = res.data.data
            this.mainLoading = false
          })
      },
      toggle(e, num) {
        let text = e.currentTarget.innerText
        let _this = e.currentTarget.previousElementSibling
        if (text === '查看更多') {
          let H = ((num + 1) * 60) + 'px'
          _this.style.height = H
          e.currentTarget.innerText = '收起'
        } else {
          _this.style.height = '360px'
          e.currentTarget.innerText = '查看更多'
        }
      }
    },
    components: {
      notIce,
      PicList,
      DealLang
    }
  }

</script>
<style scoped lang="stylus">
  @import "~assets/stylus/pageCmn.styl"
  @import "~assets/stylus/ccy_bous.styl"

</style>
