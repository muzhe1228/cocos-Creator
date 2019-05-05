<template>
  <div class="index">
    <div class="index_top">
      <div class="container">
        <div class="top-left">
          <index-top></index-top>
        </div>
        <a href="/App" class="top-right goToUrl" target="_blank">
          <img src="~static/images/BeeStore.png" alt="">
        </a>
      </div>
    </div>
    <div class="index_cont">
      <div class="container">
        <div class="cont_left">
          <div class="con_nav">
            <p class="con_nav_l">我的自选<span>Optional Currency</span></p>
            <div class="con_nav_r">
              <search-inp></search-inp>
              <el-select v-model="binValue1" @change="selectChangeOne">
                <el-option
                  v-for="item in selectOne"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select class="selected-min" v-model="binValue2" @change="selectChangeTwo">
                <el-option
                  v-for="item in selectTwo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="con_cont">
            <div class="con_cont_table resetLoading"
                 element-loading-text="数据加载中，请耐心等待"
                 element-loading-background="rgba(0, 0, 0, 0.6)"
                 v-loading="mainLoading">
              <ul class="table_title" ref="titleFix">
                <li>币种</li>
                <li>交易对</li>
                <li>交易所</li>
                <li>当前价</li>
                <li>成交额(24H)</li>
                <li>涨跌幅</li>
                <li>流通市值</li>
                <li>操作</li>
              </ul>
              <div v-if="Token&&optionList">
                <ul class="table_cont" v-for="(item,index) in optionList.items" :key="index">
                  <li>
                    <nuxt-link class="aClick" :to="'/coin/'+ item.currencyEnglisgName | toLowerCase">
                      <img v-lazy="item.pic" :alt="`${item.currencyName}-${item.currencyShortName}`">{{item.currencyName}}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link class="aClick" :to="'/coin/'+ item.currencyEnglisgName | toLowerCase">
                      {{item.currencyShortName}}/{{item.currencyRightShortName}}
                    </nuxt-link>
                  </li>
                  <li>
                    {{item.exchangeName}}
                  </li>
                  <li>
                    {{item.openPrice|numRest(binValue2,',')}}
                  </li>
                  <li>
                    {{item.openTurnover|numRest(binValue2)}}
                  </li>
                  <li :class="item.openRiseFall| IsColor">
                    {{item.openRiseFall|numRest('%')}}
                  </li>
                  <li>
                    {{item.openCirculateTotalValue|numRest(binValue2)}}
                  </li>
                  <li>
                    <p @click="noFollow(item.cerId,item.currencyName)" class="delete">删除</p>
                  </li>
                </ul>
                <div class="page" v-if="optionList.totalNumber>optionList.pageSize">
                  <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :page-size="optionList.pageSize"
                    :pager-count="5"
                    layout="prev, pager, next"
                    prev-text="上一页"
                    next-text="下一页"
                    :total="optionList.totalNumber">
                  </el-pagination>
                </div>
              </div>
              <div v-else class="not-login">
                <p>登陆后可添加自选</p>
                <p>
                  <button @click="setLogin(true)">立即登录</button>
                  <button @click="setRegister(true)">注册账户</button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="cont_right">
          <new-current></new-current>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import newCurrent from '~/components/newCurrent'
  import indexTop from '~/components/indexTop'
  import searchInp from '~/components/searchInp'
  import {mapState, mapMutations} from 'vuex'
  import {_initScroll, socketIds, socketUpdate} from '~/assets/js/case'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    async asyncData({store}) {
      return getCoinlaSingle('/exchange/userPcOptionalList', {pageSize: 20}, store.state.Token)
        .then((res) => {
          return {
            optionList: res.data.data
          }
        })
        .catch((err) => {
          return {
            optionList: {error: err.message}
          }
        })
    },
    data() {
      return {
        con: 6,
        page: 1,
        binValue1: 0,
        binValue2: 0,
        selectOne: [
          {
            value: 0,
            label: '流通市值降序'
          }, {
            value: 1,
            label: '当前价降序'
          }, {
            value: 2,
            label: '成交额降序'
          }, {
            value: 3,
            label: '涨跌幅降序'
          }
        ],
        selectTwo: [
          {
            value: 0,
            label: 'CNY'
          }, {
            value: 1,
            label: 'USD'
          }
        ],
        ws: null,
        mainLoading: false

      }
    },
    computed: {
      ...mapState(['Token', 'userMsg', 'isLine'])
    },
    watch: {
      Token: function (token) {
        if (token) {
          this.setWebsocket()
          this.optionGet()
        }
      }
    },
    head() {
      return {
        title: '我的自选--考拉行情-CoinLa',
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
    mounted() {
      this.$ToSeo()
      if (this.Token) {
        this.setWebsocket()
        this.$nextTick(() => {
          _initScroll(this)
        })
      }
    },
    destroyed() {
      if (this.Token) {
        this.closeWebsocket()
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val
        this.$ScrollTop()
        this.optionGet(val)
      },
      optionGet(page) {
        this.mainLoading = true
        let _this = this
        let params = {
          pageSize: 20,
          page: page || 1,
          conditionOne: this.binValue1,
          conditionTwo: this.binValue2
        }
        getCoinlaSingle('/exchange/userPcOptionalList', params, _this.Token)
          .then((res) => {
            this.mainLoading = false
            _this.optionList = res.data.data
            this.sendSocket(res.data.data.items)
          }).catch((err) => {
          this.mainLoading = false
          console.log(err.message)
        })
      },
      selectChangeOne() {
        this.optionGet()
      },
      selectChangeTwo() {
        this.optionGet()
      },
      //提示弹窗
      openMsg(msg, type) {
        if (type === 0) {
          this.$notify({
            message: msg,
            type: 'success'
          })
        } else {
          this.$notify.error({
            message: msg
          })
        }
      },
      noFollow(cerId, name) {
        let _this = this
        this.$confirm(`是否取消关注 ${name}?`, '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          getCoinlaSingle('/exchange/cancelAttention', {cerId: cerId}, _this.Token)
            .then((res) => {
              let code = res.data.code
              if (code === 0) {
                _this.optionGet(_this.page)
              }
            }).catch((err) => {
            console.log(err.message)
          })
        })
      },

      // 建立 websocket
      setWebsocket() {
        this.ws = new WebSocket('ws://quotn.coinla.com/wsOptional')
        this.ws.onopen = () => {
          console.log("WebSocket open ...")
          this.sendSocket(this.optionList.items)
        }
        this.ws.onmessage = (evt) => {
          this.optionList = socketUpdate(this.optionList, JSON.parse(evt.data), this.binValue2)
        }
      },
      sendSocket(List) {
        this.ws.send(JSON.stringify({
          ids: socketIds(List),
          token: this.$store.state.Token,
          type: this.binValue2
        }))
      },
      //断开websocket链接
      closeWebsocket() {
        if (this.ws) {
          this.ws.close()//断开websocket链接
          this.ws.onclose = function () {//监听是否断开
            console.log("WebSocket close");
          }
        } else {
          return
        }

      },
      ...mapMutations(['setLogin', 'setRegister'])
    },
    components: {
      newCurrent,
      indexTop,
      searchInp
    }
  }
</script>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .index {
    padding-bottom: 16px
    &_top {
      height: 114px
      background: #fff
      display: flex
      padding-top: 20px
      padding-bottom: 16px
      align-items: center
      .top-right {
        position: absolute
        right: 0
        top: 0
        img {
          width: 324px
          height: 180px
        }
      }
    }
    &_cont {
      margin-top: 16px
      .container {
        display: flex
        justify-content: space-between
        .cont_left {
          width: 850px
          min-height: 60vh
          background-color: #fff
          .con_cont {
            &_table {
              .table_cont {
                li {
                  &:nth-child(1), &:nth-child(2) {
                    color: #0d93ff
                    hover-hand()
                  }
                }
              }
              .table_title, .table_cont {
                li {
                  width: 12%
                  display: flex
                  align-items: center
                  font-size: 14px
                  &:nth-child(1) {
                    width: 18%
                  }
                  &:nth-child(5) {
                    width: 16%
                  }
                  &:nth-child(6) {
                    width: 10%
                  }
                  &:nth-child(7) {
                    width: 14%
                  }
                  &:nth-child(8) {
                    width: 8%
                  }
                  .delete {
                    text-decoration: underline
                    transition: all .2s linear
                    hover-hand()
                    extend-click()
                    &:hover {
                      color: $main-color
                    }
                  }
                }
              }
              .not-login {
                padding: 100px
                text-align: center
                p {
                  font-size: 14px
                  color: #454545
                  button {
                    width: 112px
                    height: 32px
                    border-radius: 4px
                    margin: 28px 12px
                    border: none
                    outline: none
                    background-color: #d5d5d5
                    cursor: pointer
                    letter-spacing: 1px
                    &:nth-child(1) {
                      background-color: #debe63
                      color: #fff
                    }
                  }
                }
              }
            }
          }
        }
        .cont_right {
          margin-top: 70px
          .top {
            margin-top: 16px
          }
        }
      }
    }
  }
</style>
