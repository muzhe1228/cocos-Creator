<template>
  <div class="not-ice">
    <div class="not-ice_nav">
      <p @click="bourseGet(5)">最新公告</p>
    </div>
    <ul>
      <li v-for="(key,item) in arr" :key="key">
        <p :date="item">数字交易所每周邀请排行榜数字交易所每周邀请排行榜</p>
        <p>2018-03-01</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    name: "price-list",
    async asyncData() {
      let {data} = await axios({
        method: 'post',
        url: '/exchange/findList',
        params: {
          pageSize: 15
        }
      })
      if (data.code === 0) {
        return {bourse: data}
      }
    },
    data() {
      return {
        arr: new Array(10)

      }
    },
    methods: {
      bourseGet(page) {
        axios({
          method: 'post',
          url: '/exchange/findList',
          params: {
            pageSize: 15,
            page: page
          }
        }).then((res) => {
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .not-ice {
    width: 384px
    height: 448px
    padding: 21px
    main-radius()
    &_nav {
      border-bottom: 1px solid #efefef
      p {
        display: inline-block
        font-size: 18px
        color: #debd63
        font-weight: 600
        height: 38px
        letter-spacing: 1px
        after-border(100%)
      }
    }
    ul {
      margin: 0
      padding: 0
      font-size: 14px
      margin-top: 15px
      li {
        display: flex
        justify-content: space-between
        line-height: 36px
        cursor: pointer
        p {
          &:nth-child(1) {
            width: 70%
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            color: #454545
          }
          &:nth-child(2) {
            width: 25%
            color: #999
          }
        }
      }
    }
  }
</style>
