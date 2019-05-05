<template>
  <div class="intod">
    <ul class="intod-info">
      <li class="single border-1px">
        <p><img :src="intodList.pic" alt=""></p>
        <p class="Logo-r">
          <span>{{intodList.currencyName}}</span>
          <span>{{intodList.english}}({{intodList.shortName}})</span>
        </p>
      </li>
      <li class="single border-1px">
        <p>发布时间</p>
        <p>{{intodList.initiateCreateDate}}</p>
      </li>
      <li class="single border-1px">
        <p>发行总量</p>
        <p>{{intodList.total}}</p>
      </li>
      <li class="single border-1px">
        <p>官网</p>
        <p>{{intodList.guanw|urlRest}}</p>
      </li>
      <li class="single border-1px">
        <p>是否可挖矿</p>
        <p>{{intodList.ismining?'是':'否'}}</p>
      </li>
      <li class="single border-1px">
        <p>共识机制</p>
        <p>{{intodList.consensusMechanism}}</p>
      </li>
      <li class="single border-1px">
        <p>币种介绍</p>
        <pre>{{intodList.introduce}}</pre>
      </li>
      <li class="single border-1px">
        <p>当前应用</p>
        <p>{{intodList.appIntroduce}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props:['intodList']
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  .intod {
    &-info {
      li {
        padding: 0 15px
        font-size: .26rem
      }
      .single {
        min-height: .88rem
        padding: .3rem 15px
        border-1px($border-color)
        display: flex
        align-items: flex-start
        p {
          &:nth-child(1) {
            color: $size-color
            width: 1.8rem
            img {
              width: 1.12rem
              height: 1.12rem
            }
          }
          &:nth-child(2) {
            flex: 1
            font-size: .28rem
            color: $color-b
          }
          &.Logo-r {
            display: flex
            flex-direction: column
            justify-content: center
            span {
              font-size: $sl-size
              padding: .12rem 0
              &:nth-child(1) {
                color: $main-color
              }
            }
          }
        }
        pre {
          flex: 1
          white-space: pre-wrap
          word-wrap: break-word
          line-height: .36rem
          font-size: .26rem
          color: $color-b
        }
      }
    }
  }
</style>
