<template>
  <div class="msg">
    <ul class="msg_slider" v-for="(key,item) in arr" :key="key">
      <li :data="item"><b>【EXX】</b>李启元谈比特币分叉引起巨大的争议</li>
      <li>BitcoinPay（BTP）已经于区块高度499345（北京时间12月15日08:15）完成分叉，EXX将按照快照以1:10的比例发放BTP到用户账户中，并计划开启BTP交易市场。</li>
      <li>
        <p>101人阅读</p>
        <p>10分钟前</p>
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
    data(){
      return{
        arr: new Array(15)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .msg {
    &_slider {
      height: 168px
      border-bottom: 1px dashed $border-color
      &:nth-child(1) {
        height: 144px
        li {
          &:nth-child(1) {
            padding-top: 8px
          }
        }
      }
      li {
        font-size: $font-s
        &:nth-child(1) {
          font-size: $font-m
          color: $size-main
          padding-bottom: 20px
          padding-top: 30px
          b {
            color: $main-color
            margin-right: 5px
          }
        }
        &:nth-child(2) {
          font-size: $font-s
          color: $size-ssmain
          text-indent: 30px
          line-height: 26px
          margin-bottom: 10px
        }
        &:nth-child(3) {
          font-size: $font-s
          color: $size-smain
          display: flex
          justify-content: space-between
        }
      }
    }
  }
</style>
