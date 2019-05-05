<template>
  <div class="search">
    <div class="container">
      <ul class="search_nav">
        <nuxt-link tag="li" to="/">考拉行情首页&nbsp;&nbsp;>&nbsp;&nbsp;</nuxt-link>
        <li class="active">搜索 - {{keyWorld}}&nbsp;</li>
      </ul>
      <div class="search-Wrap">
        <div class="search_left">
          <div class="search-top">
            <div class="searchWrap">
              <el-input placeholder="请输入内容" v-model="keyword" @keyup.native.enter="searchCurrency(keyword)"
                        @focus="changeFocus" @blur="changeBlur">
                <div slot="append" @click="searchCurrency(keyword)">
                  <p class="size">
                    <i class="icon-kensearch"></i>
                    搜索
                  </p>
                </div>
              </el-input>
              <ul class="res" :class="{'showRes':IsShow}">
                <li v-for="item in historyList" :key="item.content" @click="hisSearch(item.content)">
                  <p class="resCont">{{item.content}}</p>
                  <p class="clearHis" @click="closeinp($event)">
                    <i class="el-icon-error"></i>
                  </p>
                </li>
              </ul>
            </div>
            <ul class="Bot">
              <li v-for="item in historyList"
                  @click="searchCurrency(item.content)"
                  :key="item.content"
                  :class="{'active':activeClass(item.content)}"
              >{{item.content}}
              </li>
            </ul>
          </div>
          <div class="con_cont">
            <div class="top-fall_nav con_nav">
              <div class="top-fall_nav_l">
                <nuxt-link tag="p" :to="`/search?world=${keyWorld}`">币种</nuxt-link>
                <nuxt-link tag="p" :to="`/search/exchange?world=${keyWorld}`">交易所</nuxt-link>
              </div>
              <div class="top-fall_nav_r con_nav_r">
                <!--<el-select v-model="binValue2" class="selected-min" @change="selectChangeTwo(types,$event)">-->
                <!--<el-option-->
                <!--v-for="item in selectTwo"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
                <!--</el-option>-->
                <!--</el-select>-->
              </div>
            </div>
            <nuxt-child></nuxt-child>
          </div>
        </div>
        <div class="search_right">
          <a href="/App" class="bot goToUrl AppDown" target="_blank">
            <img src="~static/images/BeeStore.png" alt="">
          </a>
          <deal-lang></deal-lang>
          <new-current></new-current>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import PicList from '~/components/PicList'
  import DealLang from '~/components/DealLang'
  import newCurrent from '~/components/newCurrent'
  import {get_Rise_Fall, getCoinlaSingle} from '~/assets/js/httpAll'
  import {_initScroll} from '~/assets/js/case'
  import {mapState} from 'vuex'

  export default {
    scrollToTop: true,
    head() {
      return {
        title: '考拉行情--聚合全球行情,挖掘数据价值-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '数字货币行情, 虚拟币行情, 数字货币数据分析, 数字货币行业大数据, 虚拟币数据分析,区块链'},
          {
            hid: 'description',
            name: 'description',
            content: '考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一,专注于为数字货币用户提供数据分析,数据挖掘服务。我们拥有全球1000多个数字货币,150多家交易平台,5千多个交易对的数据资源,提供最专业的数字货币趋势分析,行情分析等多维度,全方位的分析服务,数字货币账本服务'
          },
        ],
        link: [
          {rel: 'index', href: 'http://www.coinla.com'}
        ]
      }
    },
    data() {
      return {
        setTimer: null,
        IsShow: false,
        keyword: this.$route.query.world,
        historyList: [],
      }
    },
    computed: {
      keyWorld() {
        return this.$route.query.world
      },
      ...mapState(["Token"])
    },
    mounted() {
      this.$ToSeo()
      this.getSearchHis()
    },
    methods: {
      activeClass(val) {
        if (val.toLowerCase() === this.keyWorld.toLowerCase()) {
          return true
        } else {
          return false
        }
      },
      closeinp(e) {
        e = window.event || e
        if (document.all) {  //只有ie识别
          e.cancelBubble = true
        } else {
          e.stopPropagation()
        }
      },
      hisSearch(val) {
        this.keyword = val
        this.IsShow = false
        this.searchCurrency(val)
      },
      changeFocus() {
        this.IsShow = false
      },
      changeBlur() {
        this.setTimer = setTimeout(() => {
          this.IsShow = false
        }, 300)
      },
      getSearchHis() {
        getCoinlaSingle('/search/selectUserHistoryList', {}, this.Token)
          .then((res) => {
            this.historyList = res.data.data.shList.slice(0, 5)
          })
      },
      searchCurrency(keword) {
        this.keyword = keword
        if (this.$route.name === 'search') {
          this.$router.push(`/search?world=${keword}`)
        } else if (this.$route.name === 'search-exchange') {
          this.$router.push(`/search/exchange?world=${keword}`)
        }

      }
    },
    components: {
      PicList,
      DealLang,
      newCurrent
    }
  }

</script>
<style lang="stylus">
  .search-top {
    .el-input {
      width: 720px
      height: 36px
      border-radius: 0
      .el-input__inner, .el-input-group__append {
        height: 36px
        border-radius: 0
      }
      .el-input-group__append {
        width: 108px
        font-size: 14px
        padding: 0
        background-color: #debd63
        color: #fff
        border-color: #debd63
        user-select: none
        cursor: pointer
        .size {
          display: flex
          justify-content: center
          align-items: center
          i {
            font-size: 18px
            margin-right: 6px
          }
        }

      }
    }
  }
</style>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .search {
    margin-bottom: 16px
    &_nav {
      font-size: $font-s
      height: 50px
      align-items: center
      width: 100%
      display: flex
      color: $size-ssmain
      li {
        hover-hand()
        &.active {
          color: $main-color
        }
        &:hover {
          color: $main-color
        }
      }
    }
    .search-Wrap {
      display: flex
      justify-content: space-between
      .search_left {
        width: 850px
        .search-top {
          padding: 30px 65px 0
          height: 128px
          margin-bottom: 16px
          background-color: #fff
          .searchWrap {
            position: relative
            .res {
              width: 612px
              background-color: #fff
              position: absolute
              top: 100%
              z-index: 10
              border: 1px solid $border-color
              border-top: none
              height: 0
              overflow: hidden
              opacity: 0
              transition: all .5s linear
              &.showRes {
                height: auto
                opacity: 1
              }
              .resCont {
                width: 90%
                extend-click()
              }
              li {
                padding: 0 16px
                height: 32px
                display: flex
                align-items: center
                justify-content: space-between
                font-size: $font-s
                color: $size-ssmain
                transition: all .2s linear
                hover-hand()
                .clearHis {
                  transform: scale(0, 0)
                  transition: all .2s linear
                  extend-click()
                  i {
                    font-size: $font-x
                    color: $size-smain
                  }
                }
                &:hover {
                  background-color: rgba(222, 189, 99, .25) /*.clearHis {
                    transform: scale(1, 1)
                  }*/
                }
              }
            }
          }
          .Bot {
            padding-top: 10px
            display: flex
            flex-wrap: wrap
            li {
              transition: all .2s linear
              cursor: pointer
              padding: 6px 10px
              margin: 0 4px
              background-color: #f6f6f6
              border-radius: 2px
              font-size: $font-s
              &:hover, &.active {
                background-color: #f5ebd0
                color: #e2be6d
              }
              &:first-child {
                margin-left: 0
              }
            }
          }
        }
        .con_cont {
          background-color: #fff
          .top-fall_nav {
            &.con_nav {
              padding-left: 0
            }
            height: 60px
            background-color: #fff
            display: flex
            align-items: center
            justify-content: space-between
            border-bottom: 1px solid $border-color
            &_l {
              display: flex
              p {
                font-size: $font-m
                padding: 0 20px
                line-height: 58px
                border-bottom: 2px solid transparent
                transition: all .2s linear
                user-select: none
                hover-hand()
                &.nuxt-link-exact-active {
                  font-weight: 600
                  background-color: #fff
                  color: $main-color
                  border-color: $main-color
                }
              }
            }
          }
        }
      }
      .search_right {
        .bot {
          margin-bottom: 16px
        }
      }
    }
  }

</style>
