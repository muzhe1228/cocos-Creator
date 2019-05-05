<template>
  <div class="register" v-if="Register">
    <el-dialog
      width="375px"
      top="200px"
      :close-on-click-modal="false"
      :lock-scroll="true"
      :before-close="handleClose"
      :visible.sync="Register">
      <span class="login-logo"><img src="~static/images/loginRegister/login_logo.png" alt=""></span>
      <span class="login-title">注 册</span>
      <el-form :model="register" ref="register" :rules="rulesR">
        <el-form-item prop="nick">
          <el-input
            placeholder="请输入用户名"
            @input.native="checkEmpty"
            v-model="register.nick">
            <span class="phone" slot="prefix"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
            placeholder="请输入密码"
            type="password"
            @input.native="checkEmpty"
            v-model="register.passwd">
            <span class="pwd" slot="prefix"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="account">
          <el-input
            placeholder="请输入您的手机号"
            @input.native="checkEmpty"
            v-model="register.account">
            <span class="phone1" slot="prefix"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha" class="captcha">
          <el-input
            placeholder="请输入验证码"
            v-model="register.captcha"
            @input.native="checkEmpty"
            class="group">
            <span class="captcha" slot="prefix"></span>
            <div slot="append" ref="send" @click="handleSend">{{captchaSize}}</div>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="!registerStatus" @click="handleRegister('register')">注 册</el-button>
        <p class="toAnto">您已有考拉账号？<span @click="toApp(1)">直接登录</span></p>
        <el-button class="download" @click="toApp(0)">下 载 考 拉 App</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {validates, validateHandles, valideCode} from '~/assets/js/reg'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        registerStatus: false,
        captchaSize: '发送验证码',
        isClick: true,
        timer: null,
        register: {
          nick: '',
          passwd: '',
          account: '',
          captcha: '',
          client: 0,
          userId: 0,
          type: "web"
        },
        rulesR: {
          nick: [
            {validator: validateHandles.nick, trigger: 'blur'}
          ],
          passwd: [
            {validator: validateHandles.passwd, trigger: 'blur'}
          ],
          account: [
            {validator: validateHandles.account, trigger: 'blur'}
          ],
          captcha: [
            {validator: validateHandles.captcha, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapState(['Token', 'Register'])
    },
    methods: {
      // 检查是否验证通过
      checkEmpty() {
        this.registerStatus =
          validates.nick(this.register.nick.trim()) &&
          validates.passWd(this.register.passwd.trim()) &&
          validates.account(this.register.account.trim()) &&
          validates.captcha(this.register.captcha.trim())
      },
      //键盘事件
      onkeydown() {
        let _this = this
        document.onkeydown = function (e) {
          let key = window.event.keyCode
          if (key === 13 && _this.Register && _this.registerStatus) {
            _this.handleRegister('register')
          } else if (key === 13) {
            return false
          }
        }
      },
      //注册操作
      handleRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            getCoinlaSingle('/user/login/register', this.register)
              .then((res) => {
                loading.close()
                if (res.data.code === 0) {
                  this.$message({
                    message: '恭喜你，注册成功，请登录！',
                    type: 'success'
                  });
                  this.handleClose()
                  this.setLogin(true)
                } else {
                  this.$message.error(res.data.message)
                }
              }).catch((err) => {
              loading.close()
              this.$message({
                message: err.message,
                type: 'error',
                duration: 1000
              })
            })
          } else {
            this.$message({
              message: '信息填写有误!',
              type: 'error',
              duration: 1000
            })
          }
        });
      },
      //发送验证码
      handleSend() {
        clearInterval(this.timer)
        valideCode(this, this.register.account, 1)
      },
      //dialog关闭前的回调
      handleClose() {
        this.setRegister(false)
        clearInterval(this.timer)
        this.isClick = true
        this.captchaSize = '发送验证码'
        this.edit = {
          passwd: '',
          account: '',
          captcha: ''
        }
        this.$refs.send.parentNode.style.backgroundColor = '#e2bd51'
        this.$refs.send.parentNode.style.borderColor = '#e2bd51'
        this.$refs.send.parentNode.style.cursor = 'pointer'
      },
      //提示弹窗
      openMsg(msg, type) {
        if (type === 0) {
          this.$notify({
            message: msg,
            type: 'success',
            duration: 1000
          })
        } else {
          this.$notify.error({
            message: msg,
            duration: 1000
          })
        }
      },
      toApp(type) {
        if (type) {
          this.setRegister(false)
          this.setLogin(true)
        } else {
          this.$router.push('/App')
          this.setRegister(false)
        }
      },
      ...mapMutations(['setToken', 'setRegister', 'setLogin'])
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/stylus/login-register"
</style>
