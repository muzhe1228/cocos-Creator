<template>
  <div class="Togger">
    <div class="con_nav">
      <p class="con_nav_l">币种成交榜<span>Currency Make List</span></p>
      <div class="con_nav_r">
        <!--<transition name="slide-fade">-->
        <!--<div class="info-search">-->
        <!--<el-input-->
        <!--placeholder="输入币种,英文名或简称"-->
        <!--autofocus-->
        <!--prefix-icon="icon-kensearch">-->
        <!--</el-input>-->
        <!--</div>-->
        <!--</transition>-->
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
        <section v-for="(Item,index) in currentList.items" :key="index">
          <div class="title">
            <p>NO.{{(currentList.pageSize*(currentList.currentPage-1)) + index+1}} {{Item.currencyName}}</p>
            <p><span>总成交量：{{Item.openTurnover|numRest(binValue2)}}</span></p>
          </div>
          <div class="cont" :style="{height:Item.list.length > 5 ? '360px' : ((Item.list.length+1)*60) + 'px'}">
            <ul class="cont_title">
              <li>#</li>
              <li>交易平台</li>
              <li>交易对</li>
              <li>成交额(24H)</li>
              <li>当前价</li>
              <li>成交占比</li>
            </ul>
            <div>
              <ul class="cont_cont" v-for="(item,index) in Item.list" :key="index">
                <li>{{index + 1}}</li>
                <li>
                  <nuxt-link class="aClick" :to="'/exchange/'+ item.exchangeNameEn | toLowerCase"
                             :title="item.exchangeName">
                    <!--<img v-lazy="Item.pic" alt="">-->
                    {{item.exchangeName}}
                  </nuxt-link>
                </li>
                <li>{{item.currencyShortName}}/{{item.currencyRightShortName}}</li>
                <li>{{item.openTurnover|numRest(binValue2)}}</li>
                <li>{{item.openPrice|numRest(binValue2)}}</li>
                <li>{{item.openTurnoverProportion|numRest('%','no')}}</li>
              </ul>
            </div>
          </div>
          <p class="more" v-if="Item.list.length>5" @click="toggle($event,Item.list.length)">查看更多</p>
        </section>
      </div>
      <div class="page" v-if="currentList.totalNumber > 10">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :pager-count="5"
          :page-size="10"
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :total="currentList.totalNumber > 100 ? 100 : currentList.totalNumber">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import notIce from '~/components/notIce/notIce.vue'
  import PicList from '~/components/PicList'
  import DealLang from '~/components/DealLang'
  import {getCurrencyDeal} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    async asyncData({store}) {
      return getCurrencyDeal(store.state.Token, {pageSize: 10})
        .then((res) => {
          return {
            currentList: res.data.data,
            Token: store.state.Token
          }
        })
        .catch((err) => {
          return {
            currentList: {error: err.message}
          }
        })
    },
    head() {
      return {
        title: '加密货币每日成交量排名--考拉行情-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '加密货币成交量'},
          {
            hid: 'description',
            name: 'description',
            content: '每日24小时及每小时全球虚拟货币成交量。'
          }
        ]
      }
    },
    data() {
      return {
        collapse: null,
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
    mounted(){
      this.$ToSeo()
    },
    methods: {
      handleCurrentChange(val) {
        this.getCcryDeal(val)
        this.$ScrollTop()
      },
      selectChange() {
        this.getCcryDeal(1)
      },
      getCcryDeal(page) {
        this.mainLoading = true
        let params = {
          pageSize: 10,
          page: page,
          condition: this.binValue2
        }
        getCurrencyDeal(this.Token, params)
          .then((res) => {
            this.currentList = res.data.data
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
