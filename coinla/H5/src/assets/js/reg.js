import {getCoinlaSingle} from 'assets/js/httpAll'
// 表单验证规则
let validates = {
  account(val) {//手机号正则
    return /^[1][3,4,5-9][0-9]\d{8}$/.test(val)
  },
  captcha(val) {//验证码正则
    return /^[0-9]{6}$/.test(val)
  },
  passWd(val) {//密码正则
    return /^(\w+){6,16}$/.test(val)
  },
  nick(val) {
    return /^[a-zA-Z\d\_\u2E80-\u9FFF]{3,10}$/.test(val)
  },
  email (val) {
    return /^[a-zA-Z0-9._%+-]+@(?!.*\.\..*)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val)
  }
}
// 表单验证提示
let validateHandles = {
  account(value) {
    if (!value.trim()) {
      return '请输入手机号!'
    } else if (!validates.account(value)) {
      return '手机号格式错误!'
    } else {
      return false
    }
  },
  captcha(value) {
    if (!value.trim()) {
      return '请输入验证码!'
    } else if (!validates.captcha(value)) {
      return '验证码为6位数字!'
    }else {
      return false
    }
  },
  passwd(rule, value, callback) {
    if (!value.trim()) {
      callback(new Error('请输入密码!'))
    } else if (!validates.passWd(value)) {
      callback(new Error('6-16位数字，字母，下划线!'))
    } else {
      callback()
    }
  },
  nick(rule, value, callback) {
    if (!value.trim()) {
      callback(new Error('请输入用户名!'))
    } else if (!validates.nick(value)) {
      callback(new Error('长度在3-10个字符!'))
    } else {
      callback()
    }
  },
  phoneEmail(value) {
    if (!value.trim()) {
      return '请输入手机号或电子邮箱!'
    } else if (!validates.email(value) && !validates.account(value)) {
      return '手机号或电子邮箱格式错误!'
    } else {
      return false
    }
  },
}
export {
  validates,
  validateHandles
}

// 获取验证码
export function valideCode(obj, val, type) {
  const waitTime = 60
  let time = waitTime
  if (obj.isClick) {
    obj.isClick = false
    if (!val.trim()) {
      obj.isClick = true
      obj.$message.error('请输入手机号')
    } else if (!validates.account(val)) {
      obj.isClick = true
      obj.$message.error('手机号格式不正确')
    } else {
      getCoinlaSingle('/captcha/sms', {account: val, type: type})
        .then((res) => {
          let code = res.data.code
          if (code === 0) {
            this.$message({
              message: '验证码发送成功，请注意查收！',
              type: 'success',
              duration: 1000
            })
            obj.captchaSize = time + 'S后重新发送'
            obj.isClick = false
            obj.$refs.send.parentNode.style.backgroundColor = '#ccc'
            obj.$refs.send.parentNode.style.borderColor = '#ccc'
            obj.$refs.send.parentNode.style.cursor = 'not-allowed'
            obj.timer = setInterval(function () {
              obj.captchaSize = (--time) + 'S后重新发送'
              if (time === 0) {
                clearInterval(obj.timer)
                obj.captchaSize = '重新发送'
                obj.$refs.send.parentNode.style.backgroundColor = '#e2bd51'
                obj.$refs.send.parentNode.style.borderColor = '#e2bd51'
                obj.$refs.send.parentNode.style.cursor = 'pointer'
                obj.isClick = true
                time = waitTime
              }
            }, 1000)
          } else {
            obj.isClick = true
            obj.$message({
              message: res.data.message,
              type: 'error',
              duration: 1000
            })
          }
        }).catch((err) => {
        obj.isClick = true
        obj.$message({
          message: err.message,
          type: 'error',
          duration: 1000
        })
      })
    }
  }
}
