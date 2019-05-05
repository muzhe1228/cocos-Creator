<template>
  <div class="shareApp container">
    <p class="banner">
      <img src="/static/images/share/banner.jpg" alt="">
    </p>
    <div class="code">
      <div class="code-top">
        <p class="code-top-title"><img src="/static/images/share/title_01.png" alt=""></p>
        <p class="code-top-size">每邀请一位即可获得&nbsp;<b>100CLB</b>&nbsp;奖励</p>
      </div>
      <border-img></border-img>
      <div class="code-cont">
        <div v-clipboard="code"
             @success="onCopy"
             @error="onError"
             class="code-cont-info">
          <img class="code-cont-info-bg" src="/static/images/share/img_bg_num.png" alt="">
          <div class="code-cont-info-text">
            <div class="text-wrap">
              <p>你的专属邀请码</p>
              <p>{{code}}</p>
            </div>
          </div>
        </div>
        <p class="code_text" v-clipboard="code"
           @success="onCopy"
           @error="onError">点击复制邀请码</p>
      </div>
      <border-img></border-img>
      <div class="code_share_text">
          <p @click="share">立即邀请好友</p>
      </div>
    </div>
    <div class="code shareAward">
      <div class="code-top">
        <p class="code_top_pic"><img src="/static/images/share/title02.png" alt=""></p>
      </div>
      <div class="share_table_wrap">
        <div class="share_table">
          <div class="list list1">
            <p>邀请级别</p>
            <p>邀请人数</p>
            <p>获得CLB</p>
          </div>
          <div class="list">
            <p>一级好友</p>
            <p>{{p1PeopleNumber}}人</p>
            <p>{{p1Number}}</p>
          </div>
          <div class="list list3">
            <p>二级好友</p>
            <p>{{p2PeopleNumber}}人</p>
            <p>{{p2Number}}</p>
          </div>
        </div>
      </div>
      <border-img></border-img>
      <div class="shareAwardText">
        <p><span>活动期间</span>，成功邀请1个好友，您可获得100CLB </p>
        <p>好友再成功邀请他的好友，您再获得50CLB </p>
        <p><span>举例：</span></p>
        <p>若A邀请B，B邀请C。则B为A的一级好友，C为A的二级好友</p>
      </div>
    </div>
    <div class="rule_detail">
      <div class="rules_title">
        <span class="left"></span>
        <span class="center">活动说明</span>
        <span class="right"></span>
      </div>
      <ul class="detail_text">
        <li>1、<span>好友须在注册时填写邀请码或通过邀请链接进行注册，方能生效；</span></li>
        <li>2、<span>奖励将于被邀请的好友登录APP并绑定微信后发放；</span></li>
        <li>3、<span>仅限手机号注册用户参与，一个设备仅限注册两个考拉行情账号；</span></li>
        <li>4、<span>对于恶意刷奖的用户，考拉行情有权取消其奖励资格；</span></li>
        <li>5、<span>考拉行情保留对此活动的解释权，并有权随时对上述细则进行调整。</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {getCoinlaSingle, getCoinlaToken} from 'assets/js/httpAll'
  import {shareWeixin, isIos} from 'assets/js/case'
  import borderImg from 'base/borderImg'

  export default {
    data() {
      return {
        code: '',
        shareInfo: '',
        p1Number: '',
        p1PeopleNumber: '',
        p2Number: '',
        p2PeopleNumber: ''
      }
    },
    metaInfo: {
      title: '推荐有币'
    },
    mounted () {
      this.getApiParams()
      /*this.getShareInfo()*/
    },
    methods: {
      onCopy: function (e) {
        this.$toast({message: '复制成功', duration: 1500})
      },
      share:function () {
        if (isIos()) {
          window.webkit.messageHandlers.NativeMethod.postMessage("ios_share");
        } else {
          window.coinla.getData(JSON.stringify(this.shareInfo))
        }
      },
      getShareInfo: function () {
        let _this = this
        getCoinlaSingle('/share/multi', {type: 1}).then((res) => {
          if (res.data.code === 0) {
            /*拼接邀请码*/
            let url = res.data.data.shareUrl
            /*存在?*/
            if(url.indexOf("?") != -1 ){
              res.data.data.shareUrl =  url+'&inviteCode='+ _this.code
              /*不存在?*/
            }else{
              res.data.data.shareUrl =  url+'?inviteCode='+ _this.code
            }
            shareWeixin(res.data.data.shareUrl, res.data.data)
            this.shareInfo = res.data.data
            if (isIos()) {
              // window.webkit.messageHandlers.NativeMethod.postMessage("ios_share");
              window.setData = function () {
                return res.data.data
              }
            } else {
              window.sendData = function () {
                window.coinla.getData(JSON.stringify(res.data.data))
              }
              // window.coinla.getData(JSON.stringify(res.data.data))
            }
          }
        }).catch((err) => {})
      },
      onError: function (e) {
        this.$toast({message: '该浏览器不支持复制！', duration: 1500})
      },
      getApiParams() {
        let _this = this
        if (isIos()) {
          //ios
          window.sendCLBRank = function (apiParams) {
            _this.getUserInfo(apiParams)
          }
          //ios
          window.webkit.messageHandlers.NativeMethod.postMessage("getCLBRank");
        } else {
          window.setData = function (apiParams) {
            _this.getUserInfo(apiParams)
          }
          //安卓
          window.coinla.sendCLBRank('coinlaApp')
        }
      },
      /**
       * 获取邀请码 推荐奖励
       */
      getUserInfo(apiParams){
        getCoinlaToken('/MyCurrency/selectCode', {}, apiParams).then((res) => {
          let _this = this
          _this.code = res.data.data.invitationCode
          this.p1Number = res.data.data.p1Number
          this.p1PeopleNumber = res.data.data.p1PeopleNumber
          this.p2Number = res.data.data.p2Number
          this.p2PeopleNumber = res.data.data.p2PeopleNumber
          this.getShareInfo()
        }).catch((error) => {
          this.$toast({message:'111',duration:0})
        })
      }
    },
    components: {
      borderImg
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/stylus/variable"
  .shareApp {
    background: linear-gradient(#f7585d, #f8605d)
    min-height: 100vh
    padding: 0
    .banner {
      img {
        width: 100%;
      }
    }
    .code {
      width: 100%
      margin-bottom:0.32rem
      &-top {
        margin: auto
        height: 1.66rem
        width: 90%
        background-color: #fff
        border-radius: .16rem .16rem 0 0
        &-title {
          padding: .4rem 0 0 .5rem
          img {
            width: 4.54rem
          }
        }
        &-size {
          padding: .1rem 0 0 .53rem
          font-size: .3rem
          color: $size-sColor
          b {
            color: #e56262
          }
        }
      }
      &-cont {
        margin: auto
        width: 90%
        background-color: #fff
        padding-top: .36rem
        &-info {
          width: 5.72rem
          margin: auto
          position: relative
          &-bg {
            width: 100%
          }
          &-text {
            width: 100%
            height: 100%
            position: absolute
            left: 0
            top: 0
            display: flex
            align-items: center
            .text-wrap {
              width: 100%
              p {
                width: 100%
                text-align: center
                color: #de8523
                line-height: 1.5
                font-size: .3rem
                &:nth-child(2) {
                  font-size: .6rem
                }
              }
            }
          }
        }
        .code_text{
          padding: 0.26rem 0
          text-align: center
          font-size:0.28rem
          color: #666
        }
      }
      .code_share_text{
        width: 90%
        margin: 0 auto
        padding: 0.3rem 0 0.52rem
        color: #fff
        text-align: center
        font-size: 0.3rem
        background-color: #fff
        border-radius: 0 0 0.16rem 0.16rem
        p{
          background-color: #f44042
          width: 5.72rem
          margin: 0 auto
          height: 0.82rem
          line-height: 0.82rem
          border-radius: 0.16rem
        }
      }
    }
    .shareAward{
      .code-top{
        height:auto
      }
      .code_top_pic{
        padding:0.4rem 0 0.44rem 0.5rem
        img{
          width:1.64rem
        }
      }
      .share_table_wrap{
        width: 90%
        margin:0 auto
        padding-bottom: 0.4rem
        background-color: #fff
        font-size:0.26rem
        .share_table{
          width: 5.72rem
          margin:0 auto
          .list{
            display: flex
            height: 0.76rem
            justify-content: space-around
            background-color: #fff1da
            color: #b67812
            p{
              display: flex
              width:33.3%
              height:100%
              justify-content: center
              align-items: center
            }
          }
          .list1{
            color: #fff
            background-color: #f44042
            border-radius:0.12rem 0.12rem 0 0
          }
          .list3{
            background-color: #f9e7c9
            border-radius:0 0 0.12rem 0.12rem
          }
        }
      }
      .shareAwardText{
        width: 90%
        padding: 0.30rem
        margin: 0 auto
        background-color: #fff
        color: #e55e5e
        font-size:0.26rem
        line-height:0.48rem
        p{
          width:5.72rem
          margin:0 auto
          span{
            font-weight:600
          }
        }
      }
    }
    .rule_detail{
      padding-top: 0.2rem
      font-size:0.26rem
      color: #fff1da
      width:90%
      margin:0 auto
      .rules_title{
        font-size:0
        text-align: center
        margin:0 0 0.2rem
        span{
          display: inline-block
        }
        .center{
          width: 26%
          font-size: 0.32rem
          vertical-align: middle;
        }
        .left,.right{
          width: 37%;
          height: 1px
          background-color: #fff1da
        }
      }
      .detail_text{
        text-align: justify
        line-height:0.53rem
        padding-bottom:0.4rem
        li{
          display: flex
          span{
            display: block
            -webkit-box-flex: 1;
            -webkit-flex: 1;
            flex: 1;
          }
        }
      }
      .text{
        padding:0.49rem 0 0.4rem
        text-align: center
      }
    }
  }
</style>
