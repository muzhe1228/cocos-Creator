<template>
  <div class="con_cont">
    <div class="top-fall_nav con_nav">
      <!--<div class="top-fall_nav_l">-->
      <!--<p @click="handleType('top',1)" :class="{'active':types==='top'}">涨幅币种TOP50</p>-->
      <!--<p @click="handleType('fall',1)" :class="{'active':types==='fall'}">跌幅币种TOP50</p>-->
      <!--</div>-->
      <el-tabs class="top-fall_nav_l" v-model="types" @tab-click="handleType(types)">
        <el-tab-pane label="涨幅币种TOP50" name="rise"></el-tab-pane>
        <el-tab-pane label="跌幅币种TOP50" name="fall"></el-tab-pane>
      </el-tabs>
      <div class="top-fall_nav_r con_nav_r">
        <el-select v-model="binValue2" class="selected-min" @change="selectChangeTwo(types,$event)">
          <el-option
            v-for="item in selectTwo"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
        <li>成交额({{name(binValue2)}})</li>
        <li>涨幅</li>
        <li>流通市值</li>
      </ul>
      <div>
        <ul class="table_cont" v-for="(item,index) in Rank.items" :key="index">
          <li :class="index<3?'color-red':''">{{index+1}}</li>
          <li>
            <nuxt-link :to="'/coin/'+ item.currencyEnglisgName | toLowerCase" class="aClick" :title="item.currencyShortName">
              <img v-lazy="item.pic" :alt="`${item.currencyShortName}`">{{item.currencyShortName}}
            </nuxt-link>
          </li>
          <li>{{item.openPrice|numRest}}</li>
          <li>{{item.openTurnover|numRest}}</li>
          <li :class="item.openRiseFall | IsColor">{{item.openRiseFall|numRest("%")}}</li>
          <li>{{item.openCirculateTotalValue|numRest}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import notIce from '~/components/notIce/notIce.vue'
  import PicList from '~/components/PicList'
  import DealLang from '~/components/DealLang'
  import {get_Rise_Fall} from '~/assets/js/httpAll'
  import {_initScroll} from '~/assets/js/case'
  import {mapState} from 'vuex'

  export default {
    scrollToTop: true,
    async asyncData({store}) {
      return get_Rise_Fall("/rank/findRisePage", store.state.Token, {type: 1, page: 1, pageSize: 50,})
        .then((res) => {
          return {
            Rank: res.data.data
          }
        }).catch((err) => {
          return {
            Rank: {error: err.message}
          }
        })
    },
    data() {
      return {
        types: 'rise',
        isClick: true,
        mainLoading: false,
        binValue2: 1,
        selectTwo: [
          {
            value: 0,
            label: '1小时'
          }, {
            value: 1,
            label: '24小时'
          }, {
            value: 3,
            label: '一周'
          }
        ],
      }
    },
    head() {
      return {
        title: '虚拟币每日涨跌幅排行--考拉行情-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '虚拟币涨跌幅'},
          {
            hid: 'description',
            name: 'description',
            content: '每日24小时及每小时全球虚拟货币涨跌幅排名。'
          }
        ]
      }
    },
    computed: {
      ...mapState(["Token"])
    },
    mounted() {
      this.$ToSeo()
      this.$nextTick(() => {
        _initScroll(this)
      })
    },
    methods: {
      name(val){
        if(parseFloat(val)===0){
          return '1小时'
        }else if(parseFloat(val)===1){
          return '24小时'
        }if(parseFloat(val)===3){
          return '1周'
        }
      },
      selectChangeTwo(type, val) {
        this.handleType(type, val)
      },
      handleCurrentChange(val) {
        this.$ScrollTop()
      },
      handleType(type, num) {
        let params = {
          type: num || 1,
          page: 1,
          pageSize: 50,
        }
        if (num || num === 0) {
          this.binValue2 = num
          params.type = num
        } else {
          this.binValue2 = 1
          params.type = 1
        }
        if (type === 'fall') {
          if (this.isClick || num || num === 0) {
            this.mainLoading = true
            get_Rise_Fall("/rank/findFallPage", this.Token, params)
              .then((res) => {
                this.Rank = res.data.data
                this.mainLoading = false
                this.isClick = false
              }).catch((err) => {
              this.$message(err.message)
              this.mainLoading = false
            })
          }
        } else if (type === 'rise') {
          if (!this.isClick || num || num === 0) {
            this.mainLoading = true
            get_Rise_Fall("/rank/findRisePage", this.Token, params)
              .then((res) => {
                this.Rank = res.data.data
                this.mainLoading = false
                this.isClick = true
              }).catch((err) => {
              this.$message(err.message)
              this.mainLoading = false
            })
          }

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
<style lang="stylus">
  @import "~assets/stylus/variable.styl"
  .top-fall_nav_l {
    .el-tabs__header {
      padding-left: 20px
      height: 60px
      margin: 0
      .el-tabs__item {
        font-size: $font-m
        color: $size-main
        height: 60px
        line-height: 60px
        &.is-active, &:hover {
          color: #DEBD63
        }
      }
      .el-tabs__item:focus.is-active.is-focus:not(:active) {
        -webkit-box-shadow: none
        box-shadow: none;
        border-radius: 0
      }
      .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0;
        background-color: #e4e7ed;
        z-index: 1;
      }
    }
  }
</style>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .con_cont {
    .top-fall_nav {
      &.con_nav {
        padding-left: 0
      }
      height: 60px
      background-color: #fff
      display: flex
      align-items: center
      justify-content: space-between
      border-bottom: 1px solid $border-color
      &_l {
        display: flex
        p {
          font-size: $font-m
          padding: 0 20px
          line-height: 58px
          border-bottom: 2px solid transparent
          transition: all .2s linear
          user-select: none
          hover-hand()
          &.active {
            background-color: #fff
            color: $main-color
            border-color: $main-color
          }
        }
      }
    }
    &_table {
      .table_cont {
        li {
          border-bottom: 1px solid #efefef
          &:nth-child(1) {
            img {
              width: 24px
              height: auto
            }
          }
          &:nth-child(2){
            color: #0d93ff
            no-wrap()
            hover-hand()
          }
        }
      }
      .table_title, .table_cont {
        li {
          width: 20%
          display: flex
          align-items: center
          font-size: 14px
          &:nth-child(1) {
            width: 6%
          }
          &:nth-child(5) {
            width: 14%
          }
        }
      }
    }
  }
</style>
