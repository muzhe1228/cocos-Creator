<template>
  <footer class="container">
    <div class="cont">
      <ul>
        <li>
          <p>关于我们</p>
          <nuxt-link :to="{name:'About'}">关于考拉</nuxt-link>
          <nuxt-link :to="{name: 'Join'}">加入我们</nuxt-link>
        </li>
        <li>
          <p>关注我们</p>
          <a href="https://t.me/joinchat/FwW6lwrZ8CIDqxGIp1L1oA">Telegram</a>
          <a href="https://www.facebook.com/coin.la.98">Facebook</a>
          <a href="https://twitter.com/mpOSxKrPDcVzXr2">Twitter</a>
        </li>
      </ul>
      <div class="guanZhu">
        <img src="~static/images/icon/QRcode.png" alt="">
        <p>关注考拉公众号</p>
      </div>
    </div>
    <v-line></v-line>
    <p class="Copyright">Copyright © 2018 - CoinLa.com All Rights Reserved</p>
  </footer>
</template>

<script>
  import VLine from '~/components/Line/Line.vue'
  import NuxtError from "../../.nuxt/components/nuxt-error";

  export default {
    components: {
      NuxtError,
      VLine
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  footer
    padding: 42px 20px 0 20px
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
            font-size: $font-l
            color: $size-a
            margin-bottom: 19px
          a
            line-height: 28px
            font-size: $font-m
            color: #b5b5b5
            transition: .4s
            &:hover
              color: $size-a

      .guanZhu
        text-align center
        cursor: pointer
        p
          font-size: $font-m
          color: $size-a
          padding: 14px 0 32px 0
    .Copyright
      font-size: $font-m
      color: #999
      text-align: center
      padding: 40px 0
      transition: .4s
      cursor: pointer
      &:hover
        color: $size-a

</style>
