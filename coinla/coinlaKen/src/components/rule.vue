<template>
  <div class="ruleWrap container">
    <div v-show="android">
      <ul class="rule">
        <li>
          <p class="rule-title">1、如何获得CLB？</p>
          <p class="rule-cont">目前可通过注册、创建账本、币价预警、签到、分享、邀请好友、风云榜等方式获取CLB。后续会推出更多获得CLB的途径，敬请期待！</p>
        </li>
        <li>
          <p class="rule-title">2、推荐有币的规则是什么？</p>
          <div class="rule-cont">
            活动期间，每邀请1个一级好友可获得100CLB，邀请1个二级好友可获得50CLB，多邀多得，上不封顶。
          </div>
        </li>
        <li><img ref="downloadApp" src="/static/images/ruleImg.png" alt=""></li>
      </ul>
      <ul class="ruleWrap-info">
        <!--<li class="ruleWrap-info-title">活动说明：</li>-->
        <li>1）好友须在注册时填写邀请码或通过邀请链接进行注册，方能生效；</li>
        <li>2）奖励将于被邀请的好友登录APP，并绑定微信后发放；</li>
        <li>3）仅限手机号注册用户参与，一个设备仅限注册两个考拉行情账号；</li>
      </ul>
      <div class="help">本活动最终解释权归考拉行情所有，如需帮助，请联系考拉行情客服。微信号：KAOLAhq123</div>
    </div>
    <ul class="rule" v-show="ios">
      <li>
        <p class="rule-title">1、 CLB是什么？</p>
        <p class="rule-cont">CLB是考拉行情app的积分，为答谢广大用户长期以来的支持与厚爱而推出的一项用户回馈。用户可通过完成任务，获取CLB积分。</p>
      </li>
      <li>
        <p class="rule-title">2、如何获取CLB积分？</p>
        <div class="rule-cont">
          目前可通过注册、使用账本功能、使用币价提醒功能、签到、分享币种详情等不同类型任务在考拉行情app获取CLB。考拉行情正在不断完善中，未来将推出更多获得CLB的途径。
        </div>
      </li>
      <li>
        <p class="rule-title">3、如何查看CLB积分明细？</p>
        <div class="rule-cont">
          点击明细可查看CLB的收入明细。
        </div>
      </li>
      <li>
        <p class="rule-title">4、如何使用CLB积分？</p>
        <div class="rule-cont">
          <p>（1）考拉行情后续将会开放CLB积分商城，用户可用CLB积分兑换各类话费、优惠券和小礼物。</p>
          <p>（2）CLB积分还可用于参与考拉行情的抽奖等活动。</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {isIos} from 'assets/js/case'
  export default {
    metaInfo: {
      title: 'CLB说明'
    },
    data () {
      return {
        ios: false,
        android: false
      }
    },
    mounted () {
      this.judge()
    },
    methods: {
      judge () {
        if(isIos()){
          this.ios = true
        }else{
          this.android = true
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/stylus/variable"
  .ruleWrap {
    padding: .48rem .32rem
    font-size: .26rem
    color: $size-lColor
    .rule {
      li {
        margin-bottom: .4rem
        img{
          max-width: 100%
        }
      }
      &-title {
        font-size: .3rem
        color: $size-color
        margin-bottom: .24rem
        font-weight: 600
      }
      &-cont {
        line-height: .48rem
        padding-left: .45rem
      }
    }
    &-info{
      li{
        line-height: .42rem
        padding-left: .45rem
        margin-bottom: .24rem
        &.ruleWrap-info-title{
          padding-left: 0
          color: $size-color
          font-size: .3rem
        }
      }
    }
    .help{
      /*text-align: center*/
      margin-top: .48rem
      line-height: 0.5rem
      color: $size-sColor
    }
  }
</style>
