<template>
  <div class="forgetPwd">
    <el-dialog
      title="重置密码"
      width="375px"
      top="200px"
      :before-close="handleClose"
      :lock-scroll="true"
      :close-on-click-modal="false"
      :visible.sync="forgetPwd">
      <el-form :model="edit" ref="edit" :rules="rulesE">
        <el-form-item prop="account">
          <el-input
            placeholder="请输入您的注册手机号"
            @input.native="checkEmpty"
            v-model="edit.account">
            <span class="phone1" slot="prefix"></span>
          </el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input
            placeholder="请输入验证码"
            v-model="edit.captcha"
            @input.native="checkEmpty"
            class="group">
            <span class="captcha" slot="prefix"></span>
            <div slot="append" ref="send" @click="handleSend">{{captchaSize}}</div>
          </el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input
            placeholder="请输入您的新密码"
            type="password"
            @input.native="checkEmpty"
            v-model="edit.passwd">
            <span class="pwd" slot="prefix"></span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="!forgetStatus" @click="handleEdit('edit')">确 定</el-button>
        <el-button @click="handleClose" class="download">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {validates, validateHandles, valideCode} from '~/assets/js/reg'


  export default {
    data() {
      return {
        forgetStatus: false,
        captchaSize: '发送验证码',
        isClick: true,
        timer: null,
        edit: {
          passwd: '',
          account: '',
          captcha: '',
        },
        rulesE: {
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
      ...mapState(['forgetPwd'])
    },
    methods: {
      // types(val) {
      //   val.target.type = 'password'
      // },
      // 检查是否验证通过
      checkEmpty() {
        this.forgetStatus =
          validates.passWd(this.edit.passwd.trim()) &&
          validates.account(this.edit.account.trim()) &&
          validates.captcha(this.edit.captcha.trim())
      },
      //发送验证码
      handleSend() {
        clearInterval(this.timer)
        valideCode(this, this.edit.account, 2)
      },
      //dialog关闭前的回调
      handleClose() {
        this.setForgetPwd(false)
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
      //修改密码确定操作
      handleEdit(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            getCoinlaSingle('/user/login/reset/pwd', _this.edit)
              .then((res) => {
                let code = res.data.code
                if (code === 0) {
                  this.$message({
                    message: '密码修改成功',
                    type: 'success',
                    duration: 1000
                  });
                  this.handleClose()
                }
                loading.close()
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
      ...mapMutations(['setLogin', 'setForgetPwd'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .forgetPwd {
    .el-dialog__body {
      .login-logo {
        padding-bottom: 10px
      }
      .login-title {
        font-size: $font-l
        color: $size-main
        font-weight: bold
        margin-bottom: 30px
      }
    }

  }
</style>
