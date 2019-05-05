<template>
  <div class="bookHome" v-if="infoData">
    <div class="cont-top" v-if="0">
      <div class="cont-top_l">
        <div class="top">
          <p class="title">
            <span>总资产<i class="icon-ken_quest"></i></span>
          </p>
          <p class="total-pric"><span>{{hid?'':'≈¥'}}</span>&nbsp;{{infoData.presentTotalProperty|hidPic(hid)}}</p>
        </div>
        <ul class="bot">
          <li>

            <p class="pic" :class="infoData.presentProfit | IsColor">
              <span>{{hid?'':'¥'}}</span>&nbsp;{{infoData.presentProfit|hidPic(hid)}}
            </p>
            <p class="title">账面盈利</p>
          </li>
          <li>
            <p class="pic" :class="infoData.historyRate | IsColor">
              <span>{{hid?'':'¥'}}&nbsp;</span>{{infoData.historyRate|hidPic(hid)}}</p>
            <p class="title">套现盈利</p>
          </li>
          <li>
            <!--<p class="pic" :class="parseFloat(infoData.presentProfitRate)>0 ? 'color-green' : 'color-red'">-->
            <!--{{infoData.presentProfitRate|hidPic(hid)}}&nbsp;<span>{{hid?'':'%'}}</span></p>-->
            <p class="pic" :class="infoData.presentProfitRate | IsColor">
              {{infoData.presentProfitRate|numRest('%')|hidPic(hid)}}</p>
            <p class="title">账面盈利率</p>
          </li>
          <li>
            <p class="pic" :class="infoData.todayProfitRate | IsColor">
              {{infoData.todayProfitRate|numRest('%')|hidPic(hid)}}</p>
            <p class="title">今日盈利率</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="book-wrap">
      <div class="con_nav">
        <p class="con_nav_l">币种投资</p>
        <div class="con_nav_r">
          <p class="addCcy" @click="add"><i class="icon-ken_plus"></i><span>新增币种</span></p>
        </div>
      </div>
      <div class="con_cont">
        <div class="con_cont_table">
          <ul class="table_title" ref="titleFix">
            <li>币种名称</li>
            <li>简称</li>
            <li>数量</li>
            <li>资产价值</li>
            <li>当前盈利</li>
            <li>操作</li>
          </ul>
          <div>
            <ul class="table_cont" v-for="(item,index) in infoData.bookList[0].bookCurrencylist" :key="index">
              <nuxt-link tag="li"
                         :to="`/Book/invest/?bookCurrencyId=${item.bookCurrencyId}&name=${item.currencyShortName}`">
                <img :src="item.pic" alt="">{{item.currencyShortName}}
              </nuxt-link>
              <nuxt-link tag="li"
                         :to="`/Book/invest/?bookCurrencyId=${item.bookCurrencyId}&name=${item.currencyShortName}`">
                {{item.currencyShortName}}
              </nuxt-link>
              <nuxt-link tag="li"
                         :to="`/Book/invest/?bookCurrencyId=${item.bookCurrencyId}&name=${item.currencyShortName}`">
                {{item.currencyNumber|hidPic(hid)}}
                <span v-show="parseFloat(item.currencyNumber) !== 0"> {{hid?'':'个'}}</span></nuxt-link>
              <nuxt-link tag="li"
                         :to="`/Book/invest/?bookCurrencyId=${item.bookCurrencyId}&name=${item.currencyShortName}`">
                {{item.currencyProperty|numRest|hidPic(hid)}}
              </nuxt-link>
              <nuxt-link tag="li"
                         :to="`/Book/invest/?bookCurrencyId=${item.bookCurrencyId}&name=${item.currencyShortName}`"
                         :class="item.currencyPresentProfitRate | IsColor">
                {{item.currencyPresentProfitRate|numRest('%')|hidPic(hid)}}
              </nuxt-link>
              <li>
                <p @click="deleteCcy(item.bookCurrencyId,item.currencyShortName)" class="delete">删除</p>
              </li>
            </ul>
            <!--<div class="page" v-if="book.total>book.pageSize">-->
            <!--<el-pagination-->
            <!--background-->
            <!--@current-change="handleCurrentChange"-->
            <!--:page-size="book.pageSize"-->
            <!--layout="prev, pager, next"-->
            <!--:total="book.total">-->
            <!--</el-pagination>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="创建币种"
               width="425px"
               top="200px"
               custom-class="createCcy"
               :before-close="handleClose"
               :visible.sync="dialogAddCcy">
      <el-form label-width="50px" class="demo-ruleForm">
        <el-form-item
          label="简称">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="form.currencyShortName"
            :fetch-suggestions="querySearch"
            placeholder="请输入币种名称或简称"
            @select="handleSelect"
            clearable>
            <img v-if="!form.pic" slot="prefix" src="~static/images/book/icon_mb.png" width="24" height="24" alt="">
            <img v-else slot="prefix" v-lazy="form.pic"
                 width="24" height="24"
                 alt="">
            <template slot-scope="{ item }">
              <div class="name"><img width="20" height="20" v-lazy="item.pic" alt="">{{item.currencyEnglishName }}</div>
              <span class="addr">{{ item.currencyShortName }}</span>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="Btn">
          <el-button type="primary" @click="submitForm(form.ccyId)" :disabled="disabled">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {_initScroll} from '~/assets/js/case'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    props: {
      infoData: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        dialogAddCcy: false,
        form: {},
        restaurants: [],
        disabled: true
      }
    },
    computed: {
      ...mapState(['Token', 'updateBook', 'hid'])
    },
    head() {
      return {
        title: '考拉账本--考拉行情-CoinLa',
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
      this.$nextTick(() => {
        _initScroll(this)
      })
    },
    methods: {
      // hidIs() {
      //   if (sessionStorage.getItem('hid')) {
      //     this.setHid(0)
      //     sessionStorage.removeItem('hid')
      //   } else {
      //     this.setHid('*')
      //     sessionStorage.setItem('hid', '*')
      //   }
      //   console.log(this.hid)
      // },
      //点击添加币种按钮
      add() {
        this.form = {}
        this.dialogAddCcy = true
      },
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
        console.log(item);
        this.form = item
        this.name = item.currencyShortName
        this.pic = item.pic
        this.disabled = false
      },
      //添加币种确认
      submitForm(id) {
        if (id) {
          let params = {
            bookId: this.infoData.bookList[0].bookId,
            ccyId: id
          }
          getCoinlaSingle('/book/addCurrencyToBook', params, this.Token)
            .then((res) => {
              if (res.data.code === 0) {
                this.dialogAddCcy = false
                this.setUpdateBook(false)
              } else {
                this.$message(res.data.message)
                this.dialogAddCcy = false
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
      handleIconClick(ev) {
        console.log(ev);
      },
      //删除币种
      deleteCcy(id, name) {
        let _this = this
        let params = {
          bookId: this.infoData.bookList[0].bookId,
          ccyId: id
        }
        this.$confirm(`是否确认删除 ${name}?`, '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          getCoinlaSingle('/book/deleteCurrencyToBook', params, _this.Token)
            .then((res) => {
              if (res.data.code === 0) {
                this.$ScrollTop()
                _this.setUpdateBook(false)
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 1000
                })
              } else {
                this.$message(res.data.message)
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
      ...mapMutations(['setUpdateBook', 'setHid'])
    }
  }
</script>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  @import "~assets/stylus/pageCmn.styl"

  .bookHome {
    /*width: 888px*/
    min-height: 60vh
    .cont-top {
      margin-bottom: 16px
      display: flex
      justify-content: space-between
      &_l {
        width: 850px
        background-color: #fff
        height: 226px
        .top {
          padding: 22px 20px
          height: 120px
          border-bottom: 1px solid $border-color
          .title {
            font-size: $font-m
            padding-bottom: 24px
            color: #333
            position: relative
            cursor: pointer
            i {
              margin-left: 6px
              color: $main-color
            }
          }
          .total-pric {
            font-size: 36px
            display: flex
            align-items: flex-end
            span {
              font-size: 14px
              margin-left: 0
            }
          }
        }

        .bot {
          display: flex
          padding: 28px 20px 0
          li {
            width: calc(100% / 4)
            font-size: $font-m
            text-align: center
            .pic {
              font-size: 24px
              margin-bottom: 16px
              span {
                font-size: $font-s
              }
            }
            .title {
              font-size: $font-s
              color: $size-ssmain
            }
          }
        }
      }
    }
    .book-wrap {
      width: 850px
      background-color: #fff
      .addCcy {
        width: 96px
        height: 28px
        border-radius: 4px
        border: 1px solid $main-color
        margin-left: 20px
        color: $main-color
        font-size: $font-s
        display: flex
        align-items: center
        justify-content: center
        transition: all .2s linear
        hover-hand()
        i {
          margin-right: 4px
        }
        &:hover {
          border-color: #cfad50
          color: #cfad50
        }
      }
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
          .table_title {
            width: 100%
            &.active {
              width: 850px
              transform: translateX(calc(-50% + 170px))
            }
          }
          .table_title, .table_cont {
            li {
              width: 18%
              display: flex
              align-items: center
              font-size: 14px
              padding: 0 5px
              &:nth-child(1) {
                width: 20%
              }
              &:nth-child(4) {
                width: 16%
              }
              &:nth-child(6) {
                width: 10%
                .delete {
                  text-decoration: underline
                  transition: all .2s linear
                  extend-click()
                  &:hover {
                    color: $main-color
                  }
                }
              }
            }
          }
        }
      }
    }

  }
</style>
