<template>
  <div class="user-action">
    <div class="action-nav">
      <p>账号设置</p>
    </div>
    <div class="action-edit">
      <ul class="phone">
        <li>
          <p class="top">绑定手机</p>
          <p>账号更安全&nbsp;&nbsp;及时获取币价变动通知</p>
        </li>
        <li><span>{{resetSetting.mobile}}</span></li>
        <li class="color-gray">无</li>
      </ul>
      <ul class="pwd">
        <li>
          <p class="top">重置密码</p>
          <p>忘记密码时请及时修改设定</p>
        </li>
        <li></li>
        <li>
          <p class="handle" @click="setForgetPwd(true)">重置</p>
        </li>
      </ul>
    </div>
    <div class="action-else">
      <div class="action-nav"><p>其他设置</p></div>
      <div class="else-form">
        <el-form ref="resetSetting" :model="resetSetting" label-width="86px">
          <div class="else-form-cont">
            <!--<el-form-item label="计价货币">-->
            <!--<el-select v-model="resetSetting.moneyType" @change="chang" placeholder="请选择活动区域">-->
            <!--<el-option label="CNY" :value="0"></el-option>-->
            <!--<el-option label="USD" :value="1"></el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="涨跌颜色">
              <el-radio-group v-model="resetSetting.colorType" @change="chang">
                <el-radio :label="0">绿涨红跌</el-radio>
                <el-radio :label="1">红涨绿跌</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="涨跌计算">
              <el-radio-group v-model="resetSetting.countType" @change="chang">
                <el-radio :label="0">24小时制</el-radio>
                <el-radio :label="1">当日制</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-show="false" label="消息提醒">
              <el-radio-group v-model="resetSetting.messageType" @change="chang">
                <el-radio :label="0">开启</el-radio>
                <el-radio :label="1">关闭</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
        <div class="else-form_btn">
          <el-button @click="setSetting" :disabled="isEdit">确定保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    head() {
      return {
        title: '用户设置----聚合全球行情,挖掘数据价值-CoinLa',
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
    async asyncData({store, error}) {
      return getCoinlaSingle('/setting/select', {}, store.state.Token)
        .then((res) => {
          let code = res.data.code
          if (code === 0) {
            return {
              resetSetting: res.data.data
            }
          } else if (code === 20) {
            store.commit('setLogin', true)
            return {
              resetSetting: {}
            }
          }
        })
        .catch((err) => {
          error({statusCode: 505, message: err.message})
        })
    },
    data() {
      return {
        isEdit: true,
      }
    },
    computed: {
      ...mapState(['Token'])
    },
    mounted() {
      this.$ToSeo()
    },
    methods: {
      //获取账号设置
      getSetting() {
        getCoinlaSingle('/setting/select', {}, this.Token)
          .then((res) => {
            let code = res.data.code
            if (code === 0) {
              this.resetSetting = res.data.data
            } else if (code === 20) {
              this.resetSetting = {}
              this.$notify({
                message: res.data.message,
                type: 'warning'
              })
              this.setLogin(true)
            }
          })
      },
      //提交修改的账号设置
      setSetting() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        getCoinlaSingle('/setting/save', this.resetSetting, this.Token)
          .then((res) => {
            let code = res.data.code
            if (code === 0) {
              this.isEdit = true
              this.getSetting()
            } else if (code === 20) {
              this.resetSetting = {}
              this.$notify({
                message: res.data.message,
                type: 'warning'
              })
              this.setLogin(true)
            }
            loading.close()
          }).catch((err) => {
          console.log(err)
        })
      },
      chang(val) {
        this.isEdit = false
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
      ...mapMutations(['setLogin', 'setForgetPwd'])
    }
  }
</script>
<style lang="stylus">
  .else-form {
    padding: 20px 45px
    &-cont {
      .el-cascader__label,
      .el-radio__label,
      .el-cascader__label,
      .el-form-item__label,
      .el-input__inner,
      .el-input.is-disabled .el-input__inner {
        color: #454545
        font-size: 14px
      }
      .el-form-item__label {
        text-align: left
        padding-right: 22px
      }
      .el-radio__inner {
        width: 18px
        height: 18px
      }
      .el-radio__inner::after {
        width: 8px
        height: 8px
      }
      .el-form-item {
        margin-bottom: 20px
        .el-form-item__content {
          .el-radio + .el-radio {
            margin-left: 70px
          }
        }
      }
    }
  }
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .user-action {
    .action-nav {
      font-size: 16px
      height: 60px
      border-bottom: 1px solid $border-color
      padding-left: 45px
      line-height: 60px
      background-color: #fff
      position: relative
      &:after{
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background-color: #debd63;
      }
    }
    .action-edit {
      padding: 0 45px
      background-color: #fff
      ul {
        height: 88px
        display: flex
        align-items: center
        justify-content: space-between
        border-bottom: 1px solid #dedede
        font-size: $font-s
        color: $size-smain
        &:last-child {
          border-color: transparent
        }
        li {
          .top {
            margin-bottom: 12px
            color: $size-main
            font-size: $font-m
          }
          .handle {
            color: #336bae
            hover-hand()
          }
        }
      }
    }
    .action-else {
      background-color: #fff
      margin-top: 16px
      .else-form {
        &_btn {
          margin-top: 40px
          display: flex
          justify-content: center
          .el-button {
            width: 300px
            height: 40px
            margin: auto
            background-color: $main-color
            border: none
            color: #fff
            font-size: $font-m
            cursor: pointer
            outline: none
            &.is-disabled {
              opacity: .6
              cursor: not-allowed
            }
            &:hover, &:focus {
              background-color: #cfad50
            }
          }
        }
      }
    }
  }
</style>
