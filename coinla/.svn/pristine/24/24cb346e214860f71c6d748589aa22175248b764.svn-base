<template>
  <div class="Cost">
    <ul class="Cost_title">
      <li>币种</li>
      <li>对BTC交易费</li>
      <li>对USDT交易费</li>
      <li>对QC交易费</li>
      <li>提现费率</li>
      <li>单笔限额</li>
      <li>单日限额</li>
    </ul>
    <ul class="Cost_cont" v-for="(key,item) in arr" :key="key">
      <li :data="item"><img src="" alt="">BTC-比特币</li>
      <li class="color-red">0.2%</li>
      <li class="color-red">0.2%</li>
      <li class="color-red">0.2%</li>
      <li class="color-red">0.01BTC(可选)</li>
      <li>23.45%</li>
      <li>
        1000BTC
      </li>
    </ul>
    <div class="page">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="20"
        :pager-count="5"
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    scrollToTop: true,
    data() {
      return {
        arr: new Array(15),
        yes: true
      }
    },
    mounted(){
      this.$ToSeo()
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .Cost {
    padding: 21px
    &_title {
      background-color: #f6f6f6
      font-weight: bold
      color: $size-main
      font-size: $font-s
    }
    &_cont {
      hover-hand()
      border-bottom: 1px dashed #efefef
      transition: all .3s
      &:hover {
        border-bottom: 1px solid $main-color
      }
    }
    &_title, &_cont {
      display: flex
      padding: 0
      margin: 0
      height: 50px
      li {
        width: 14%
        display: flex
        align-items: center
        justify-content: center
        font-size: $font-s
        img {
          margin-right: 5px
        }
        &:nth-child(3), &:nth-child(5) {
          width: 15%
        }
      }
    }
  }
</style>
