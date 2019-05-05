<template>
  <div>
    <div class="info-single" v-for="(item,index) in data" :key="index">
      <p class="name"><span>{{item.name}}</span><span :style="{color:item.bg}">{{item.num}}</span></p>
      <p class="gress"><span :style="{width:item.w+'%',backgroundColor:item.bg}"
                             class="gressBar"></span></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => [
          {name: '上架交易所', num: '123', w: 80, bg: '#fda22e'},
          {name: '当前流通率', num: '80.57%', w: 85, bg: '#52c3e2'},
          {name: '转手率(24h)', num: '5.91%', w: 20, bg: '#72cbcd'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .info-single {
    margin-top: 20px
    display: flex
    justify-content: space-between
    align-items: center
    .name {
      width: calc(45% - 20px)
      display: flex
      span {
        display: inline-block
        &:nth-child(1) {
          width: 65%
        }
        &:nth-child(2) {
          width: 35%
          font-weight: 600
        }
      }
    }
    .gress {
      width: 55%
      height: 8px
      background-color: #d8d8d8
      border-radius: 4px
      position: relative
      &Bar {
        position: absolute
        top: 0
        left: 0
        height: 8px
        border-radius: 4px
        width: 80%
      }
    }
  }
</style>
