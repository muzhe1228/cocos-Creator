<template>
  <div class="bookIndex" v-if="Token">
    <ul class="bookIndex_nav">
      <nuxt-link tag="li" to="/">考拉行情首页&nbsp;&nbsp;>&nbsp;&nbsp;</nuxt-link>
      <nuxt-link tag="li" :class="{active:route.name === 'Book'}" to="/Book">账本首页&nbsp;&nbsp;<span
        v-if="route.name !== 'Book'">></span>&nbsp;&nbsp;
      </nuxt-link>
      <li v-if="route.name === 'Book-invest'" class="active">{{route.query.name}}详情</li>
      <li v-if="route.name === 'Book-anAlyze'" class="active">币种统计</li>
      <li v-if="route.name === 'Book-anAlyze-location'" class="active">存放场所</li>
    </ul>
    <div class="bookIndex_cont">
      <div class="container">
        <div class="cont_right">
          <my-book :infoData="book"></my-book>
        </div>
        <div class="cont_left">
          <nuxt-child :infoData="book"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myBook from '~/components/myBook'
  import {mapState, mapMutations} from 'vuex'
  import {socketIds, socketUpdate} from '~/assets/js/case'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

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
            content: '考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一，专注于为数字货币用户提供数据分析，数据挖掘服务。我们拥有全球1000多个数字货币，150多家交易平台，5千多个交易对的数据资源，提供最专业的数字货币趋势分析，行情分析等多维度，全方位的分析服务'
          }
        ],
        link: [
          {rel: 'index', href: 'http://www.coinla.com'}
        ]
      }
    },
    async asyncData({store}) {
      if (store.state.Token) {
        return getCoinlaSingle('/book/queryFindUserBook', {}, store.state.Token)
          .then((res) => {
            return {
              book: res.data.data
            }
          })
          .catch((err) => {
            return {
              book: {err: err.message}
            }
          })
      } else {
        store.commit('setLogin', true)
      }

    },
    data() {
      return {
        mainLoading: false,
        restaurants: [],
        disabled: true
      }
    },
    computed: {
      route() {
        return this.$route
      },
      ...mapState(['Token', 'userMsg', 'isLine', 'updateBook'])
    },
    watch: {
      Token: function (Token) {
        if (Token) {
          this.getBook()
        }
      },
      // route: function (val) {
      //   console.log(val)
      // },
      updateBook: function (updateBook) {
        if (!updateBook) {
          let _this = this
          setTimeout(function () {
            _this.getBook()
            _this.setUpdateBook(true)
          }, 300)
        }
      }
    },
    mounted(){
      this.$ToSeo()
    },
    methods: {
      //添加币种输入框
      querySearch(queryString, cb) {
        if (!queryString) {
          this.disabled = true
          this.form = {}
          cb([])
        } else {
          this.searchGet(queryString, cb)
        }
      },
      //添加选择后的数据处理
      handleSelect(item) {
        this.form = item
        this.name = item.currencyShortName
        this.pic = item.pic
        this.disabled = false
      },
      //添加币种确认
      submitForm(id) {
        if (id) {
          let params = {
            bookId: this.book.bookList[0].bookId,
            ccyId: id
          }
          getCoinlaSingle('/book/addCurrencyToBook', params, this.Token)
            .then((res) => {
              if (res.data.code === 0) {
                this.dialogAddCcy = false
                this.getBook()
              }
            }).catch((err) => {
            console.log(err.message)
          })
        } else {
          alert('wwww')
        }
      },
      // 关闭币种添加框
      handleClose() {
        this.dialogAddCcy = false
      },
      //获取账本页面所有数据
      getBook() {
        this.mainLoading = true
        getCoinlaSingle('/book/queryFindUserBook', {}, this.Token)
          .then((res) => {
            this.mainLoading = false
            this.book = res.data.data
          })
      },
      handleIconClick(ev) {
      },
      //删除币种
      deleteCcy(id, name) {
        let _this = this
        let params = {
          bookId: this.book.bookList[0].bookId,
          ccyId: id
        }
        this.$confirm(`此操作将删除 【 ${name} 】 币种, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getCoinlaSingle('/book/deleteCurrencyToBook', params, _this.Token)
            .then((res) => {
              if (res.data.code === 0) {
                this.$ScrollTop()
                _this.getBook()
              }
            }).catch((err) => {
            console.log(err.message)
          })
        }).catch(() => {
          return
        })

      },
      // 请求搜索币种接口
      searchGet(keyWorld, cb) {
        let params = {searchName: keyWorld, rows: 50}
        return getCoinlaSingle('/search/currencySearch', params)
          .then((res) => {
            cb(res.data.data.list)
          }).catch((err) => {
            console.log(err.message)
          })
      },
      ...mapMutations(['setUpdateBook'])
    },
    components: {
      myBook
    }
  }
</script>
<style lang="stylus">
  .bookIndex {
    .createCcy {
      padding: 0 10px
      .el-dialog__title {
        font-size: 18px
        font-weight: 700
        letter-spacing: 1px
      }
      .el-dialog__headerbtn {
        font-size: 18px
        .el-dialog__close {
          color: #454545
          &:hover {
            color: #e2bd51
          }
        }
      }
      .el-form {
        .el-input__inner {
          font-size: 16px
          height: 40px
          padding-left: 36px
          outline: none
          line-height: 40px
          background-color: #f0f0f0
          border: none
          color: #454545
        }
        .el-form-item__label {
          font-size: 16px
          color: #454545
        }
        .el-input__prefix {
          display: flex
          align-items: center
          img {
            border-radius: 12px
          }
        }
        .el-form-item {
          margin-bottom: 40px
        }
        .Btn {
          margin-bottom: 0
          .el-form-item__content {
            margin-left: 0 !important
            display: flex
            button {
              border: none
              font-size: 16px
              width: calc((100% -20px) / 2)
              &:nth-child(2) {
                background-color: #f0f0f0
                color: #454545
                &:hover {
                  color: #e2bd51
                }
              }
            }
          }
        }
      }
    }
  }

  .el-autocomplete {
    display: block
  }

  .my-autocomplete {
    li {
      line-height: normal
      padding: 7px
      .name {
        text-overflow: ellipsis
        overflow: hidden
        display: flex
        align-items: center
        img {
          margin-right: 6px
        }
      }
      .addr {
        font-size: 12px
        color: #b4b4b4
      }
      .highlighted .addr {
        color: #ddd
      }
    }
  }
</style>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .bookIndex {
    padding-bottom: 16px
    &_nav {
      width: 1190px
      margin: 0 auto
      font-size: $font-s
      height: 50px
      align-items: center
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
    &_cont {
      .container {
        display: flex
        justify-content: space-between
        .cont_left {
          min-height: 60vh
        }
      }
    }
  }
</style>
