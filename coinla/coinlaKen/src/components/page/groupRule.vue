<template>
  <div class="group_rule">
    <img src="/static/images/group/group_rule_title.png" alt="" class="group_rule_title">
    <div class="rule">
      <div class="rule_time">
        <div class="right">
          1、<span class="wide">活动时间：</span>
          <span class="colour">2018年9月10日-9月20日</span>
        </div>
      </div>
      <div class="rule_content">
        2、
        <div class="right">
          <p class="wide">活动内容：</p>
          <p class="colour">活动期间，用户可发起组团并邀请好友参团，12小时内团队集齐4人即组团成功。每个团员均可瓜分奖励，最高可瓜分5888CLB。</p>
        </div>
      </div>
      <div class="rule_notice">
        3、
        <div class="right">
          <p class="wide">活动说明：</p>
          <ul class="list">
            <li>1）用户只有10次发起组团成功机会，且需在发起的团结束后才可发新团，组团失败不占发团次数。</li>
            <li>2）用户可同时参与多个团，但活动期间，同一好友的发起的团仅可参团一次。若该团组团失败，则仍可参与此好友发起的新团。</li>
            <li>3）活动所得CLB为系统自动发放，可在考拉行情APP中查看。</li>
            <li>4）若发现作弊行为，考拉行情有权取消用户参与资格。</li>
            <li>5）如需帮助，请联系考拉行情客服。微信号：KAOLAhq123</li>
          </ul>
        </div>
      </div>
      <p class="bottom">本活动最终解释权内归考拉行情所有</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'groupRule'
  }
</script>

<style scoped lang="stylus">
  .group_rule{
    position: relative
    background: url(/static/images/group/group_rule_bac.png) no-repeat
    background-size: 100% 100%
    color: #fff
    font-size: 0.24rem
    max-width: 7.5rem
    line-height: 0.42rem
    padding: 0.52rem 0.48rem 0.48rem
    text-align: justify
    margin: 0 auto
    .group_rule_title{
      width: 2.6rem
      position: absolute
      top: 0
      left: 50%
      transform: translate(-50%, -50%)
    }
    .rule_time, .rule_content, .rule_notice{
      display: flex
      margin-bottom: 0.17rem
      .right{
        display: block
        flex: 1
        -webkit-box-flex: 1
        -webkit-flex: 1
      }
    }
    .colour{
      color: #f8e227
    }
    .wide{
      font-weight: 600
    }
    .list{
      color: #cbe3f5
    }
    .bottom{
      text-align: center
      padding-top: 0.1rem
    }
  }
</style>
