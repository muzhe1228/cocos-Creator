<template>
  <div class="user-index">
    <div class="bg-avatar">
      <div class="left" @click="setPanel(true)">
        <img class="avatar" v-lazy="userMsg.headImg">
        <img class="photo" src="~static/images/newindex/icon_photos.png" alt="">
      </div>
      <ul class="right">
        <li class="name">{{userMsg.nickName}}</li>
        <li class="List">
          <p class="sex" :class="userMsg.sex>0?(userMsg.sex===1?'color-red':'color-gray'):'color-green'">
            {{userMsg.sex>0?(userMsg.sex===1?'女':'未知'):'男'}}</p>
          <p>{{userMsg.country}}</p>
        </li>
        <li>{{userMsg.intra}}</li>
      </ul>
    </div>
    <div class="form-con">
      <el-form
        label-width="70px"
        class="demo-ruleForm">
        <el-form-item
          label="用户名">
          <el-input
            type="text"
            v-model="personalDate.nickName"
            placeholder="请输入您的用户名"
            @change="nameChange($event)"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            type="text"
            v-model="personalDate.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item label="自选数">
          <el-input v-model.number="personalDate.optionalNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别" class="sex">
          <el-radio-group v-model="personalDate.sex" @change="formChange">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
            <!--<el-radio :label="2">未知</el-radio>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="国家">
          <el-select v-model="personalDate.country" @change="getJson">
            <el-option
              v-for="item in countryList"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-cascader
            :options="siteList"
            :separator="separator"
            v-model="City"
            :props="props"
            placeholder="请选择您的城市"
            @change="siteChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" placeholder="这家伙很懒，什么都没有留下" v-model="personalDate.intra"
                    @change="formChange"></el-input>
        </el-form-item>
      </el-form>
      <div class="form-con_btn">
        <el-button @click="handleSave()" :disabled="isEdit">确定保存</el-button>
      </div>
    </div>
    <cropper v-show="panel"></cropper>
  </div>
</template>

<script>
  import cropper from '~/components/userCropper'
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {Url} from '~/assets/js/case'
  import axios from 'axios'
  import Cookies from 'js-cookie'

  export default {
    scrollToTop: true,
    head() {
      return {
        title: '个人中心----聚合全球行情,挖掘数据价值-CoinLa',
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
    async asyncData({store}) {
      return getCoinlaSingle('/user/mine/my', {}, store.state.Token)
        .then((res) => {
          let code = res.data.code
          if (code === 0) {
            return {
              personalDate: res.data.data,
              City: res.data.data.location.split(' ')
            }
          } else if (code === 20) {
            store.commit('setLogin', true)
            return {
              personalDate: {},
              City: []
            }
          }
        })
        .catch((err) => {
          return {
            personalDate: {error: err.message}
          }
        })
    },
    computed: {
      ...mapState(['panel', 'userMsg', 'Token'])
    },
    data() {
      return {
        isEdit: true,
        separator: ' ',
        countryList: [
          {
            label: '中国'
          }, {
            label: '日本'
          }, {
            label: '美国'
          }, {
            label: '韩国'
          }, {
            label: '其他'
          }],
        siteList: [],
        props: {
          value: 'name',
          label: 'name'
        }
      };
    },
    // watch: {
    //   Token: function () {
    //     this.getPersonalDate()
    //   }
    // },
    mounted() {
      this.$ToSeo()
      this.getJson(this.personalDate.country)
    },
    methods: {
      getJson(value) {
        this.isEdit = false
        let Path = Url().Paht
        let getUrl = ['/json/china_city_data.json', '/json/jp_city_data.json', '/json/us_city_data.json', '/json/kr_city_data.json']
        if (value === '日本') {
          axios.get(Path + getUrl[1]).then((res) => {
            this.siteList = res.data
          })
        } else if (value === '美国') {
          axios.get(Path + getUrl[2]).then((res) => {
            this.siteList = res.data
          })
        } else if (value === '韩国') {
          axios.get(Path + getUrl[3]).then((res) => {
            this.siteList = res.data
          })
        } else {
          axios.get(Path + getUrl[0]).then((res) => {
            this.siteList = res.data
          })
        }
      },
      handleSave() {
        this.editPersonalDate(this.Token)
      },
      getPersonalDate() {
        getCoinlaSingle('/user/mine/my', {}, this.Token)
          .then((res) => {
            let code = res.data.code
            if (code === 0) {
              this.personalDate = res.data.data
              this.City = res.data.data.location.split(' ')
              let token = {token: this.Token}
              this.$store.dispatch('SET_userMsg', token)
            } else if (code === 20) {
              this.personalDate = {}
              this.setLogin(true)
            }
          }).catch((err) => {
          console.log(err)
        })
      },
      editPersonalDate(Token, type) {
        let params;
        if (type) {
          params = {nick: type}
        } else {
          params = {
            country: this.personalDate.country,
            location: this.personalDate.location,
            sex: this.personalDate.sex,
            intra: this.personalDate.intra
          }
        }
        if (Token) {
          getCoinlaSingle('/user/mine/personalDate/save', params, Token).then((res) => {
            let code = res.data.code
            if (code === 0) {
              this.isEdit = true
              this.getPersonalDate()
              this.$message({
                message: type ? '用户名修改成功' : '个人资料修改成功',
                type: 'success',
                duration: 1000
              })
            } else {
              this.$message({
                message: res.data.data,
                type: 'error',
                duration: 1000
              })
            }
          }).catch((err) => {
            this.$message({
              message: err.message,
              type: 'error',
              duration: 1000
            })
          })
        } else {
          this.$route.push('/')
        }
      },
      formChange(value) {
        this.isEdit = false
      },
      siteChange(value) {
        this.isEdit = false
        let data = value.join(' ')
        this.personalDate.location = data.slice()
      },
      nameChange(value) {
        console.log(value)
        if (value) {
          this.editPersonalDate(this.Token, value)
        } else {
          this.$message({
            message: '用户名不能为空',
            type: 'error',
            duration: 1000
          })
        }
      },
      Loading(blo) {
        let loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        if (blo) {
          loading.close()
        }
      },
      ...mapMutations(['setPanel', 'setUserMsg', 'setLogin'])
    },
    components: {
      cropper
    }
  }
</script>
<style lang="stylus">
  .form-con {
    padding-top: 20px
    .el-cascader, .el-select {
      width: 330px
    }
    .el-input__inner {
      height: 36px
      line-height: 36px
      width: 330px
      padding: 0 12px
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
    .el-input.is-disabled .el-input__inner {
      background-color: #eaeaea
      border-color: #eaeaea
      cursor: not-allowed
    }
    .el-textarea__inner {
      height: 80px
      width: 700px
    }
    .el-form-item__label {
      text-align: left
      padding-right: 22px
    }
    .sex {
      .el-form-item__content {
        text-align: left
      }
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
    }
  }
</style>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .user-index {
    background-color: #fff
    padding-bottom: 34px
    .bg-avatar {
      height: 163px
      padding-top: 34px
      padding-left: 45px
      border-bottom: 1px solid $border-color
      display: flex
      align-items: center
      .left {
        position: relative
        border-radius: 48px
        width: 96px
        height: 96px
        hover-hand()
        .avatar {
          width: 100%
          height: 100%
          border-radius: 48px
        }
        .photo {
          position: absolute
          bottom: 0
          right: 0
          width: 28px
          height: 28px
        }
      }
      .right {
        margin-left: 22px
        font-size: $font-s
        color: $size-smain
        .name {
          font-size: $font-m
          color: $size-main
          font-weight: 600
        }
        .List {
          margin-top: 12px
          margin-bottom: 18px
          display: flex
          .sex {
            margin-right: 12px
          }
        }
      }
    }
    .form-con {
      width: 100%
      padding-left: 45px
      &_btn {
        margin-top: 48px
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
</style>
