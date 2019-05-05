<template>
  <div class="about">
    <img class="banner-about" src="~static/images/icon/banner_aboutus.png" alt="">
    <div class="about-cont container ">
      <line-size :data="title"></line-size>
      <p class="cont-size">
        <b>考拉（CoinLa）</b>
        采集了全球1000多个数字货币，200多家交易所的大量数据对接源，专注于为投资者提供数字货币的数据挖掘、数据分析。同时考拉行情社区对每个数字货币采集其全面的信息，诸如项目介绍、货币发行数据、团队介绍等，并实施更新项目进度等，为投资者提供一个关于该数字货币的专业讨论平台。
      </p>
      <p class="contact">联系我们</p>
      <ul>
        <li>广告服务 business@coinla.com</li>
        <li>商务合作 advertise@coinla.com</li>
        <li>客服帮助 support@coinla.com</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import LineSize from '~/components/Line/LineSize.vue'

  export default {
    data() {
      return {
        title: ['ABOUT COINLA', '关于考拉行情']
      }
    },
    head() {
      return {
        title: '关于我们--考拉行情-CoinLa',
        meta: [
          {hid: 'keyWords', name: 'keyWords', content: '数字货币行情app 虚拟币行情APP'},
          {
            hid: 'description',
            name: 'description',
            content: '考拉行情（CoinLa）致力创建并维护成一个集数字资产行情工具+智能内容社区推送以及社区讨论+只能理财与一体的全球区块链投融资数据综合生态平台。'
          }
        ],
        link: [
          {rel: 'index', href: 'http://www.coinla.com'}
        ]
      }
    },
    components: {
      LineSize
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .about
    background-color: $size-a
    min-width: 1040px
    .banner-about
      width: 100%
      min-width: 1040px
    .about-cont
      height: 356px
      padding: 48px 0
      .cont-size
        font-size: 15px
        line-height: 36px
        text-indent: 36px
        padding-top: 32px
        color: $size-b
        b
          font-size: $font-l
          color: $color-main
      .contact
        font-size: 20px
        color: $size-b
        padding: 32px 0 28px 0
        font-weight: bold
      ul
        display: flex
        justify-content: space-between
        li
          font-size: $font-m-x
          color: $size-b

  @media screen and (max-width: 1400px)
    .about
      min-width: 1040px
      .about-cont
        padding: 48px 15px

</style>
