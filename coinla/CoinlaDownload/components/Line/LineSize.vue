<template>
  <div class="lineSize">
    <div class="top">
      <p></p>
      <p>{{data[0]}}</p>
    </div>
    <div class="bot">
      <p></p>
      <p>{{data[1]}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .lineSize
    .top
      display: flex
      justify-content: center
      p
        font-family: 'SourceHansansCN [Regular]'
        font-size: $font-m
        color: #999
        &:nth-child(1)
          height: 16px
          width: 4px
          background-color: #debd63
          border-radius: 2px
          margin-right: 5px
    .bot
      position: relative
      height: 40px
      p
        &:nth-child(1)
          height: 1px
          border: none
          width: 100%
          background-color: #999
          position: absolute
          top: 50%
          transform: translateY(50%)
        &:nth-child(2)
          font-family: 'SourceHansansCN [Heavy]'
          color: $size-b
          font-size: $font-l-l
          font-weight: 700
          height: 40px
          padding: 0 40px
          line-height: 40px
          display: inline-block
          position: absolute
          left: 50%
          transform: translateX(-50%)
          background-color: $size-a


</style>
