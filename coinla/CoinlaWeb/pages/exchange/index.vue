<template>
  <div class="bourse">
    <div class="container">
      <div class="bourse_left">
        <div class="con_nav">
          <p class="con_nav_l">交易所<span>Exchange</span></p>
          <div class="con_nav_r" v-show="false">
            <el-select v-model="binValue" @change="selectChange">
              <el-option
                v-for="item in select"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="binValue1" @change="selectChangeOne">
              <el-option
                v-for="item in selectOne"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="binValue2" @change="selectChangeTwo">
              <el-option
                v-for="item in selectTwo"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="con_nav_r">
            <el-select v-model="binValue" @change="selectChange">
              <el-option
                v-for="item in select"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select class="selected-min" v-model="binValue1" @change="selectChangeOne">
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
        <div class="con_cont resetLoading"
             element-loading-text="数据加载中，请耐心等待"
             element-loading-background="rgba(0, 0, 0, 0.6)"
             v-loading="mainLoading">
          <div class="con_cont_all">
            <div class="con_cont_slider" v-for="(item,key) in bourseList.items" :key="key">
              <div class="cont-l" >
                <nuxt-link :to="'/exchange/'+ item.exchangeNameEn | toLowerCase">
                  <img v-lazy="{src: item.pic, error: errImg}" :alt="`${item.exchangeName}-${item.exchangeNameEn}`">
                </nuxt-link>
              </div>
              <div class="cont-r">
                <ul>
                  <li>
                    <nuxt-link :to="'/exchange/'+ item.exchangeNameEn | toLowerCase" :title="`${item.exchangeName}-${item.exchangeNameEn}`">{{item.exchangeName}}<span>{{item.country}}</span>
                    </nuxt-link>
                  </li>
                  <li>
                    <el-rate
                      v-model="item.level"
                      disabled
                      :allow-half="true"
                      :colors="['#e2bd51','#e2bd51','#e2bd51']"
                      disabled-void-color="#b5b5b5">
                    </el-rate>
                  </li>
                </ul>
                <p class="size" :title="item.introduce">{{item.introduce?item.introduce:"简介暂无"}}</p>
                <div class="size-msg">
                  <div class="kind">
                    <p>交易对&nbsp;：&nbsp;{{item.transactionPair}}</p>
                    <p>成交额(24h)&nbsp;：&nbsp;<span class="color-red">{{item.turnover | numRest}}</span></p>
                  </div>
                  <div class="adver">
                    <p v-if="!item.futures"><img src="~static/images/newIndex/qihuo.png" alt=""><span>期货</span></p>
                    <p v-if="!item.stock"><img src="~static/images/newIndex/xianhuo.png" alt=""><span>现货</span></p>
                    <p v-if="!item.legalTender"><img src="~static/images/newIndex/fabi.png" alt=""><span>法币</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="page" v-if="bourseList.totalNumber>bourseList.pageSize">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size="bourseList.pageSize"
            :pager-count="5"
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="bourseList.totalNumber">
          </el-pagination>
        </div>
      </div>
      <div class="bourse_right">
        <a href="/App" class="goToUrl AppDown" target="_blank">
          <img src="~static/images/BeeStore.png" alt="">
        </a>
        <pic-list class="top"></pic-list>
        <deal-lang class="top"></deal-lang>
      </div>
    </div>
  </div>
</template>

<script>
  import PicList from '~/components/PicList'
  import DealLang from '~/components/DealLang'
  import {mapState} from 'vuex'
  import {getBourse} from '~/assets/js/httpAll'
  import axios from '~/plugins/axios'

  export default {
    scrollToTop: true,
    async asyncData({store}) {
      return getBourse(store.state.Token, {pageSize: 50})
        .then((res) => {
          return {
            bourseList: res.data.data
          }
        })
        .catch((err) => {
          return {
            bourseList: {error: err.message}
          }
        })
    },
    data() {
      return {
        errImg: require('../../static/images/errorBourse.png'),
        binValue: 0,
        binValue1: 0,
        binValue2: 0,
        select: [
          {
            value: 0,
            label: '成交额降序'
          },
          {
            value: 1,
            label: '成交额升序'
          }
          // , {
          //   value: 1,
          //   label: '星级降序'
          // }, {
          //   value: 2,
          //   label: '交易对数量'
          // }
        ],
        selectOne: [
          {
            value: 0,
            label: '全部'
          }, {
            value: 1,
            label: '现货'
          }, {
            value: 2,
            label: '期货'
          }, {
            value: 3,
            label: '法币'
          }
        ],
        selectTwo: [
          {
            value: 0,
            label: '全部'
          }, {
            value: 1,
            label: '美国'
          }, {
            value: 2,
            label: '香港'
          }, {
            value: 3,
            label: '日本'
          }, {
            value: 4,
            label: '韩国'
          }, {
            value: 5,
            label: '英国'
          }, {
            value: 6,
            label: '新加坡'
          }, {
            value: 7,
            label: '其他'
          }
        ],
        mainLoading: false,
      }
    },
    head() {
      return {
        title: '虚拟币数字货币交易所.全球数字货币交易所大全--考拉行情-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '虚拟币交易所·数字货币交易所'},
          {
            hid: 'description',
            name: 'description',
            content: '全球虚拟数字货币交易所介绍大全·考拉数据实时跟新。'
          }
        ]
      }
    },
    computed: {
      ...mapState(['Token'])
    },
    mounted(){
      this.$ToSeo()
    },
    methods: {
      handleCurrentChange(val) {
        this.$ScrollTop()
        this.bourseGet(val)
      },
      bourseGet(page) {
        this.mainLoading = true
        let params = {
          pageSize: 50,
          page: page || 1,
          conditionOne: this.binValue,
          conditionTwo: this.binValue1,
          conditionThree: this.binValue2
        }
        getBourse(this.Token, params)
          .then((res) => {
            this.mainLoading = false
            this.bourseList = res.data.data
          }).catch((err) => {
          console.log(err)
          this.mainLoading = false
        })
      },
      selectChange() {
        this.bourseGet()
      },
      selectChangeOne() {
        this.bourseGet()
      },
      selectChangeTwo() {
        this.bourseGet()
      }
    },
    components: {
      PicList,
      DealLang
    }
  }

</script>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"
  .bourse {
    padding: 16px 0
    .container {
      display: flex
      justify-content: space-between
      .bourse_left {
        width: 850px
        background-color: #fff
      }
      .bourse_right {
        .top {
          margin-top: 16px
        }
      }
    }
  }
</style>
