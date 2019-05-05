
// 表单验证提示
var validateHandles = {
    account(rule, value, callback) {
        if (!value.trim()) {
            callback(new Error('请输入手机号!'))
        } else if (!validates.account(value)) {
            callback(new Error('手机号格式错误!'))
        } else {
            callback()
        }
    },

    captcha(rule, value, callback) {
        if (!value.trim()) {
            callback(new Error('请输入手机验证码!'))
        } else if (!validates.captcha(value)) {
            callback(new Error('验证码为6位数字!'))
        } else {
            callback()
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
    }
}

// // 获取验证码
// export function valideCode(obj, val, type) {
//   const waitTime = 60
//   var time = waitTime
//   if (obj.isClick) {
//     obj.isClick = false
//     if (!val.trim()) {
//       obj.isClick = true
//       obj.$message.error('请输入手机号')
//     } else if (!validates.account(val)) {
//       obj.isClick = true
//       obj.$message.error('手机号格式不正确')
//     } else {
//       getCoinlaSingle('/captcha/sms', {account: val, type: type})
//         .then((res) => {
//           var code = res.data.code
//           if (code === 0) {
//             this.$message({
//               message: '验证码发送成功，请注意查收！',
//               type: 'success',
//               duration: 1000
//             })
//             obj.captchaSize = time + 'S后重新发送'
//             obj.isClick = false
//             obj.$refs.send.parentNode.style.backgroundColor = '#ccc'
//             obj.$refs.send.parentNode.style.borderColor = '#ccc'
//             obj.$refs.send.parentNode.style.cursor = 'not-allowed'
//             obj.timer = setInterval(function () {
//               obj.captchaSize = (--time) + 'S后重新发送'
//               if (time === 0) {
//                 clearInterval(obj.timer)
//                 obj.captchaSize = '重新发送'
//                 obj.$refs.send.parentNode.style.backgroundColor = '#e2bd51'
//                 obj.$refs.send.parentNode.style.borderColor = '#e2bd51'
//                 obj.$refs.send.parentNode.style.cursor = 'pointer'
//                 obj.isClick = true
//                 time = waitTime
//               }
//             }, 1000)
//           } else {
//             obj.isClick = true
//             obj.$message({
//               message: res.data.message,
//               type: 'error',
//               duration: 1000
//             })
//           }
//         }).catch((err)=>{
//         obj.isClick = true
//         obj.$message({
//           message: err.message,
//           type: 'error',
//           duration: 1000
//         })
//       })
//     }
//   }
// }
