<template>
  <footer class="container">
    <links></links>
    <div class="cont">
      <ul>
        <li>
          <p>关于我们</p>
          <router-link to="/About" target="_blank">关于考拉</router-link>
          <router-link to="/Join" target="_blank">加入我们</router-link>
        </li>
        <li>
          <p>关注我们</p>
          <a href="https://t.me/joinchat/FwW6lwrZ8CIDqxGIp1L1oA" target="_blank">Telegram</a>
          <a href="https://www.facebook.com/coin.la.98" target="_blank">Facebook</a>
          <a href="https://twitter.com/mpOSxKrPDcVzXr2" target="_blank">Twitter</a>
        </li>
      </ul>
      <div class="guanZhu">
        <img src="~static/images/icon/weiXin.jpg" alt="">
        <p>关注考拉公众号</p>
      </div>
    </div>
    <v-line></v-line>
    <p class="Copyright">Copyright © 2018 - CoinLa.com All Rights Reserved <a target="_blank"
                                                                              href="http://www.coinla.com/">备案号：</a><a
      target="_blank" href="https://www.miibeian.gov.cn/">浙ICP备18008896号-1</a></p>
  </footer>
</template>

<script>
  import VLine from '~/components/Line/Line.vue'
  import links from '~/components/links'

  export default {
    components: {
      VLine,
      links
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  footer
    padding: 0 20px
    .cont
      display: flex
      justify-content: space-between
      ul
        display: flex
        li
          display: flex
          flex-direction: column
          &:nth-child(1)
            margin-right: 80px
          p
            font-size: $font-m
            color: $size-a
            margin-bottom: 19px
          a
            line-height: 28px
            font-size: $font-s
            color: #b5b5b5
            transition: .4s
            &:hover
              color: $size-a

      .guanZhu
        text-align center
        cursor: pointer
        img
          width: 130px
          height: 130px
        p
          font-size: $font-s
          color: $size-a
          padding: 14px 0 32px 0
    .Copyright
      font-size: $font-s
      color: #999
      text-align: center
      padding: 40px 0
      transition: .4s
      a
        cursor: pointer
        color: #999
        margin-left: 10px
        &:hover
          color: $size-a

</style>
