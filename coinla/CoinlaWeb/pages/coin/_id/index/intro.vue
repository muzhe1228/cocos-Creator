<template>
  <div class="intro">
    <div class="intro_coin">
      <div class="title">
        <p>币种简介</p>
      </div>
      <div class="ccyIntroduce">
        <pre>{{introduce}}</pre>
      </div>
    </div>
    <div class="intro_team">
      <div class="title">
        <p>团队介绍</p>
      </div>
      <ul class="team-single" v-for="(item,index) in Details" :key="index">
        <li class="avatar"><img v-lazy="item.pic" alt=""></li>
        <li class="introduce">
          <p class="name">{{item.name}}</p>
          <p class="cont">{{item.introduce}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    props: ['introduce', 'ccyId'],
    async asyncData({params, query, store}) {
      return getCoinlaSingle(`/currency/${params.id}`, {currencyName: params.id}, store.state.Token).then((res) => {
        return getCoinlaSingle('/currency/findCurrencyTeam', {ccyId: res.data.data.ccyId}, store.state.Token).then((res1) => {
          return {
            Details: res1.data.data
          }
        })
      }).catch((err) => {
        return {
          Details: {}
        }
      })
    },
    data() {
      return {
        // Details: []
      }
    },
    mounted() {
      // this.getDetails()
    },
    methods: {
      getDetails() {
        getCoinlaSingle('/currency/findCurrencyTeam', {ccyId: this.ccyId})
          .then((res) => {
            this.Details = res.data.data
          })
          .catch((err) => {
            console.log(err.message)
          })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .intro {
    .intro_coin {
      margin-bottom: 40px
    }
    .title {
      border-bottom: 1px solid $border-color
      height: 54px
      line-height: 53px
      font-size: $font-l
      font-weight: 600
      p {
        padding: 0 20px
        position: relative /*&::after {
          content: ' '
          position: absolute
          left: 0
          height: 18px
          width: 4px
          background-color: $main-color
          bottom: 18px
          border-radius: 2px
        }*/
      }
    }
    .team-single {
      padding: 20px
      min-height: 160px
      display: flex
      justify-content: space-between
      align-items: center
      .avatar {
        width: 144px
        height: 144px
        img {
          width: 144px
          height: 144px
          border-radius: 72px
        }
      }
      .introduce {
        width: calc(100% -164px)
        .name {
          font-size: $font-m
          line-height: 32px
          font-weight: 700
        }
        .cont {
          text-indent: 28px
          font-size: $font-s
          line-height: 28px
          color: $size-ssmain

        }
      }
    }

    .ccyIntroduce {
      font-size: $font-s
      color: $size-ssmain
      pre {
        /*text-indent: 30px*/
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif
        white-space: pre-wrap
        word-wrap: break-word
        line-height: 28px
        padding: 20px
        color: $color-b
      }
    }
  }
</style>
