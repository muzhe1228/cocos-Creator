<template>
  <div class="login" v-if="Login">
    <el-dialog
      width="375px"
      top="200px"
      :close-on-click-modal="false"
      :lock-scroll="true"
      :before-close="handleClose"
      :visible.sync="Login">
      <span class="login-logo"><img src="~static/images/loginRegister/login_logo.png" alt=""></span>
      <span class="login-title">登 录</span>
      <el-form :model="login" :rules="rulesL" ref="login">
        <el-form-item prop="account">
          <el-input
            placeholder="请输入手机号"
            auto-complete="off"
            @input.native="checkEmpty"
            v-model="login.account">
            <span class="phone" slot="prefix"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
            placeholder="请输入密码"
            type="password"
            auto-complete="off"
            @input.native="checkEmpty"
            v-model="login.passwd">
            <span class="pwd" slot="prefix"></span>
          </el-input>
          <span class="forgetPwd" @click="toForget()">忘记密码 ?</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleLogin('login')" :disabled="!loginStatus">登 录</el-button>
        <p class="toAnto">您还没有考拉账号？<span @click="toApp(1)">请先注册</span></p>
        <el-button class="download" @click="toApp(0)">下 载 考 拉 App</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {validates, validateHandles} from '~/assets/js/reg'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        loginStatus: false,
        login: {
          account: '',
          passwd: '',
          type: 'web'
        },
        rulesL: {
          account: [
            {validator: validateHandles.account, trigger: 'blur'},
          ],
          passwd: [
            {validator: validateHandles.passwd, trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      ...mapState(['Token', 'userMsg', 'isLine', 'Login'])
    },
    mounted() {
      this.onkeydown()
    },
    methods: {
      // 检查是否验证通过
      checkEmpty() {
        this.loginStatus =
          validates.account(this.login.account.trim()) &&
          validates.passWd(this.login.passwd.trim())
      },
      //键盘事件
      onkeydown() {
        let _this = this
        document.onkeydown = function (e) {
          let key = window.event.keyCode
          if (key === 13 && _this.Login && _this.loginStatus) {
            _this.handleLogin('login')
          } else if (key === 13) {
            return false
          }
        }
      },
      //登录操作
      handleLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            getCoinlaSingle('/user/login/password', this.login)
              .then((res) => {
                loading.close()
                let code = res.data.code
                if (code === 0) {
                  this.setToken(res.data.data.token)
                  this.setUserMsg(res.data.data)
                  this.setLogin(false)
                  this.setLine(true)
                  Cookies.set("token", res.data.data.token, {expires: 7})
                  Cookies.set("userMsg", res.data.data, {expires: 7})
                  if (this.$route.query.To === 'toBook') {
                    console.log(1)
                    window.open('/Book', '_blank')
                  }
                } else {
                  this.$message({
                    message: res.data.message,
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
          }
        })
      },
      //dialog关闭前的回调
      handleClose() {
        this.setLogin(false)
      },
      toForget() {
        this.setLogin(false)
        this.setForgetPwd(true)
      },
      toApp(type) {
        if (type) {
          this.setLogin(false)
          this.setRegister(true)
        } else {
          this.$router.push('/App')
          this.setLogin(false)
        }
      },
      ...mapMutations(['setToken', 'setUserMsg', 'setLine', 'setLogin', 'setRegister', 'setForgetPwd'])
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/stylus/login-register"
</style>
