<template>
  <div class="Rank">
    <div class="container">
      <div class="Rank_left">
        <nuxt-child/>
      </div>
      <div class="Rank_right">
        <div v-if="'Rank' === $route.name">
          <a  href="/App" class="bot goToUrl AppDown" target="_blank">
            <img src="~static/images/BeeStore.png" alt="考拉行情，数字货币行情">
          </a>
          <deal-lang></deal-lang>
        </div>
        <pic-list :mt="'Rank' === $route.name?true:false"></pic-list>
        <new-current v-if="'Rank' !== $route.name"></new-current>
      </div>
    </div>
  </div>
</template>

<script>
  import PicList from '~/components/PicList'
  import DealLang from '~/components/DealLang'
  import newCurrent from '~/components/newCurrent'

  export default {
    scrollToTop: true,
    computed: {
      topOrFall() {
        return this.$route.params.id
      }
    },
    head() {
      return {
        title: '排行榜--考拉行情-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '数字货币行情, 虚拟币行情, 数字货币数据分析, 数字货币行业大数据, 虚拟币数据分析,区块链'},
          {
            hid: 'description',
            name: 'description',
            content: '考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一,专注于为数字货币用户提供数据分析,数据挖掘服务。我们拥有全球1000多个数字货币,150多家交易平台,5千多个交易对的数据资源,提供最专业的数字货币趋势分析,行情分析等多维度,全方位的分析服务,数字货币账本服务'
          },
        ],
      }
    },
    mounted() {
      this.$ToSeo()
    },
    components: {
      PicList,
      DealLang,
      newCurrent
    }
  }

</script>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  .Rank {
    padding: 16px 0
    .container {
      display: flex
      justify-content: space-between
      .Rank_left {
        width: 850px
        background-color: #fff
      }
      .Rank_right {
        .bot {
          margin-bottom: 16px
        }
      }
    }
  }
</style>
