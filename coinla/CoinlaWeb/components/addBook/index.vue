<template>
  <div class="addBook addBookBtn" ref="addBook">
    <div class="modeBook">
      <div class="addBook-info">
        <div class="title">
          <p class="size">记一笔</p>
          <p class="close" @click="closeSelect(0)"><i class="el-icon-close"></i></p>
        </div>
        <div class="wrap">
          <el-form :model="ruleForm" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <el-form-item label="时间">
              <el-date-picker
                v-model="ruleForm.storageTime"
                align="right"
                type="date"
                value-format="yyyy-MM-dd"
                popper-class="dataClass"
                placeholder="选择日期"
                @change="dateHandle"
                :picker-options="pickerOptions1">
              </el-date-picker>
              <!--<el-input v-model="ruleForm.name"></el-input>-->
            </el-form-item>
            <el-form-item label="方式">
              <el-radio-group v-model="ruleForm.storageWay">
                <el-radio :label="0">买入</el-radio>
                <el-radio :label="1">卖出</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="币总价">
              <el-input v-model="ruleForm.totalPrice"></el-input>
            </el-form-item>
            <el-form-item label="币数量">
              <el-input v-model="ruleForm.storageNumber"></el-input>
            </el-form-item>
            <el-form-item label="币单价">
              <p v-if="ruleForm.onePrice">{{ruleForm.onePrice|numRest}}</p>
            </el-form-item>
            <el-form-item label="存放场所">
              <el-radio-group v-model="ruleForm.storagePlacesType" @change="dateHandle">
                <el-radio :label="0">交易所</el-radio>
                <el-radio :label="1">钱包</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="">
              <el-input v-show="Storage" v-model="ruleForm.storagePlaces" @focus="changeStorage"
                        :placeholder="'请选择'+Storage"></el-input>
              <p v-show="!Storage" style="height: 40px;"></p>
            </el-form-item>
            <el-form-item class="form_btn">
              <el-button type="primary" @click="saveBook">保存</el-button>
              <el-button @click="closeSelect(0)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="select-info" ref="selectInfo">
        <div class="title">
          <p class="size">选择{{Storage}}</p>
          <p class="close" @click="closeSelect(1)"><i class="el-icon-close"></i></p>
        </div>
        <div class="wrap">
          <div class="bookSearch">
            <p class="bookInp">
              <el-input :placeholder="'请输'+Storage+'名称'" autofocus v-model="keyWorld"></el-input>
            </p>
            <!--<p class="topSrarch" v-show="ruleForm.storagePlacesType === 1">添加</p>-->
          </div>
          <p class="tishi">{{tiShi}}</p>
          <div class="search-info custom-scroll-1" :class="{active:ruleForm.storagePlacesType === 1}">
            <p v-if="ruleForm.storagePlacesType === 1" v-for="item in searchList" :key="item.walletId"
               @click="selectEx(item.walletName)"
               :class="{active:selectName === item.walletName}">{{item.walletName}}</p>
            <p v-if="ruleForm.storagePlacesType === 0" v-for="item in searchList" :key="item.egeId"
               @click="selectEx(item.exchangeName)"
               :class="{active:selectName === item.exchangeName}">
              {{item.exchangeName}}</p>
            <p v-if="searchList">暂无数据</p>
          </div>
          <div class="form_btn select-btn" v-if="ruleForm.storagePlacesType">
            <el-button type="primary" @click="addWallet()" :disabled="keyWorld === ''">添加钱包</el-button>
          </div>
          <!--<div class="form_btn select-btn">-->
          <!--<el-button type="primary" @click="saveBook(1)">添加钱包</el-button>-->
          <!--&lt;!&ndash;<el-button @click="closeSelect(1)">取消</el-button>&ndash;&gt;-->
          <!--</div>-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {scrollbot} from '~/assets/js/case'

  export default {
    data() {
      return {
        innerVisible: false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
        tiShi: '',
        Storage: '',
        timer: null,
        selectName: '',
        keyWorld: '',
        searchList: [],
        ruleForm: {
          bookCcyId: '',//账本中币种ID
          storageTime: '',//时间(yyyy-MM-dd)
          storageWay: 0,//方式(0-买入,1-卖出)
          totalPrice: '',//币总价
          storageNumber: '',//币数量
          onePrice: 0,//币单价
          storagePlaces: '',//存放场所
          storagePlacesType: '',//存放场所类型(0-交易所,1-钱包)
          version: ''//时间戳(防止表单重复提交)
        },
      };
    },
    computed: {
      ...mapState(['Token', 'OneBook'])
    },
    watch: {
      keyWorld: function (val) {
        if (this.ruleForm.storagePlacesType === 0) {
          if (val || val === 0) {
            let _this = this
            clearTimeout(_this.timer)
            this.timer = setTimeout(() => {
              _this.getBourseWallet(val)
            }, 300)
          } else {
            this.getHotBourse()
          }
        }
      },
      'ruleForm.totalPrice': function (val) {
        console.log(val)
        this.calc()
      },
      'ruleForm.storageNumber': function (val) {
        console.log(val)
        this.calc()
      }
    },
    mounted() {
      this.onkeydown()
    },
    methods: {
      changeStorage() {
        this.$(this.$refs.selectInfo).slideDown()
        if (this.ruleForm.storagePlacesType === 1) {
          getCoinlaSingle("/userWallet/findWalletList", {}, this.Token)
            .then((res) => {
              this.searchList = res.data.data
              console.log('钱包', res.data.data)
            })
        } else {
         this.getHotBourse()
          this.tiShi = '热门交易所'
        }
      },
      //计算单价
      calc() {
        if (this.ruleForm.totalPrice > 0 && this.ruleForm.storageNumber > 0) {
          this.ruleForm.onePrice = parseFloat((this.ruleForm.totalPrice / this.ruleForm.storageNumber).toFixed(6))
        } else {
          this.ruleForm.onePrice = 0
        }
      },
      selectEx(name) {
        this.$(this.$refs.selectInfo).slideUp()
        this.ruleForm.storagePlaces = name
      },
      //选择存放场所的监听
      dateHandle(val) {
        this.keyWorld = ''
        this.searchList = []
        this.ruleForm.storagePlaces = ''
        if (val === 0) {
          this.Storage = '交易所'
          this.tiShi = '热门交易所'
          this.getHotBourse()
        } else if (val === 1) {
          this.Storage = '钱包'
          this.tiShi = '已有钱包'
          getCoinlaSingle("/userWallet/findWalletList", {}, this.Token)
            .then((res) => {
              this.searchList = res.data.data
              console.log('钱包', res.data.data)
            })
        }
      },
      //添加钱包
      addWallet() {
        let params = {
          walletName: this.keyWorld,
        }
        getCoinlaSingle("/userWallet/addWallet", params, this.Token)
          .then((res) => {
            // this.searchList = res.data.data
            if (res.data.code === 0) {
              this.ruleForm.storagePlaces = this.keyWorld
              this.closeSelect(1)
            } else {
              this.$message({
                message: res.data.message,
                type: 'warning'
              })
            }
          })
      },
      //搜索交易所
      getBourseWallet(val) {
        if (this.ruleForm.storagePlacesType) {
          console.log('钱包')
        } else {
          let params = {
            searchName: val,
            rows: 100
          }
          getCoinlaSingle("/search/exchangeSearch", params)
            .then((res) => {
              if(res.data.code === 0){
                this.tiShi = '搜索交易所'
                this.searchList = res.data.data.items
              }else {
                console.log(res.data)
                this.searchList = []
              }
            })
        }


      },
      //热门交易所
      getHotBourse(){
        getCoinlaSingle("/exchange/findExchangeList", {pageSize: 50})
          .then((res) => {
            this.searchList = res.data.data.items
          })
      },
      //键盘事件
      onkeydown() {
        let _this = this
        document.onkeydown = function (e) {
          let key = window.event.keyCode
          if (key === 13 && _this.OneBook) {
            _this.saveBook()
          } else if (key === 13) {
            return false
          }
        }
      },
      saveSelect() {
        this.$(this.$refs.selectInfo).slideUp()
        this.ruleForm.storagePlaces = this.selectName
      },
      closeSelect(type) {
        if (type) {
          this.$(this.$refs.selectInfo).slideUp()
        } else {
          this.$(this.$refs.selectInfo).slideUp()
          this.$(this.$refs.addBook).fadeOut()
          this.keyWorld = ''
          this.Storage = ''
          this.ruleForm = {
            bookCcyId: '',//账本中币种ID
            storageTime: '',//时间(yyyy-MM-dd)
            storageWay: 0,//方式(0-买入,1-卖出)
            totalPrice: '',//币总价
            storageNumber: '',//币数量
            onePrice: 0,//币单价
            storagePlaces: '',//存放场所
            storagePlacesType: '',//存放场所类型(0-交易所,1-钱包)
            version: ''//时间戳(防止表单重复提交)
          }
        }
      },
      //保存记一笔&保存选择的交易所
      saveBook(type) {
        // if (type) {
        //   this.$(this.$refs.selectInfo).slideUp()
        //   this.ruleForm.storagePlaces = this.selectName
        // } else {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.ruleForm.version = (new Date()).valueOf()
        this.ruleForm.bookCcyId = this.$route.query.bookCurrencyId
        getCoinlaSingle("/book/addCurrencyDetail", this.ruleForm, this.Token)
          .then((res) => {
            loading.close()
            if (res.data.code === 0) {
              this.$(this.$refs.addBook).fadeOut()
              this.setUpdateBook(false)
            }
          })
        // }
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
      ...mapMutations(['setToken', 'setOneBook', 'setUpdateBook'])
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  .addBook {
    left: 0
    top: 0
    position: fixed
    width: 100%
    height: 100vh
    background-color: rgba(0, 0, 0, .4)
    z-index: 9999
    color: $size-main
    display: none
    .modeBook {
      position: relative
      min-width: 425px
      left: 50%
      top: 50%
      transform: translate(-50%, -50%)
      display: flex
      justify-content: center
    }
    &-info, .select-info {
      width: 425px
      /*height: 555px*/
      background-color: #fff
      border-radius: 6px
      padding: 20px 35px 30px
      .title {
        font-size: 18px
        display: flex
        justify-content: space-between
        height: 40px
        align-items: center
        .size {
          font-weight: 700
        }
        .close {
          cursor: pointer
          transition: all .4s
          &:hover {
            color: $main-color
          }
        }
      }
    }
    .select-info {
      display: none
      margin-left: 20px
      .bookSearch {
        display: flex
        align-items: center
        margin-bottom: 10px
        .bookInp {
          flex: 1
        }
      }
      .tishi {
        padding-left: 10px
        height: 20px
        background-color: $main-color
        line-height: 20px
        color: #fff
        margin-bottom: 10px
        font-size: $font-s
        border-radius: 4px
      }
      .search-info {
        width: 100%
        height: 340px
        overflow: auto
        &.active {
          height: 300px
          margin-bottom: 5px
        }
        p {
          border-bottom: 1px solid #f0f0f0
          line-height: 36px
          padding-left: 10px
          font-size: $font-s
          cursor: pointer
          &:hover, &.active {
            color: $main-color
          }
        }
      }
    }
  }

  .wrap {
    padding-top: 20px
    .demo-ruleForm {
      height: 428px
    }
    .el-form-item {
      margin-bottom: 15px
    }
    .el-form-item__label {
      text-align: left
    }
    .el-cascader__label,
    .el-radio__label,
    .el-cascader__label,
    .el-form-item__label,
    .el-input__inner,
    .el-input.is-disabled .el-input__inner {
      color: #454545
      font-size: 14px
    }
    .el-input__inner {
      height: 40px
      background-color: #f0f0f0
      border-color: #f0f0f0
    }
    .el-date-editor {
      width: 100%
    }
    .el-input__inner:focus {
      border-color: #e2bd51
      background-color: #fff
    }
    .el-radio__inner {
      width: 18px
      height: 18px
      border-color: $border-color
    }
    .el-radio__inner::after {
      width: 8px
      height: 8px
    }
    .form_btn {
      margin-bottom: 0
      .el-form-item__content {
        margin-left: 0 !important
      }

      button {
        width: calc((100% - 10px) / 2)
        height: 42px
        font-size: $font-s
      }
      &.select-btn {
        button {
          width: 100%
        }
      }
    }
  }

  .dataClass {
    width: 300px !important
    z-index: 100000 !important
    .el-picker-panel__sidebar {
      width: 60px
    }
    .el-picker-panel__body {
      margin-left: 60px
      .el-picker-panel__content {
        width: 210px
      }
    }
  }
</style>
