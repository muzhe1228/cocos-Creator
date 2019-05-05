import Vue from 'vue'
import $ from 'jquery'
// 判断是否处于登录状态
Vue.prototype.$islogin = function (url) {
  console.log(this.$store.state.mcId)
  // if(!this.$store.getters.userName){
  //   this.$router.push({path: '/login',query:{from:url}})
  //   return false
  // }else{
  //   return true
  // }
}

Vue.prototype.$ToSeo = function () {
  console.log('1')
}

Vue.prototype.$ScrollTop = function () {
  let scrollToptimer = setInterval(function () {
    let top = document.body.scrollTop || document.documentElement.scrollTop;
    let speed = top / 4;
    if (document.body.scrollTop !== 0) {
      document.body.scrollTop -= speed;
    } else {
      document.documentElement.scrollTop -= speed;
    }
    if (top === 0) {
      clearInterval(scrollToptimer);
    }
  }, 30);
}

Vue.prototype.$ = $//添加jq的使用
