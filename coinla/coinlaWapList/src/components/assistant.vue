<template>
  <div class="assistant_wrap">
    <img class="assistant_bac_banner" src="/static/images/turntable/assistant_bac_banner.jpg" alt="">
    <div class="assistant_page">
      <p class="active_end_days">
        距离活动结束还有<span>{{dayData}}</span>天
      </p>
      <!--轮播中奖信息-->
      <div class="turnTable_active">
        <img src="/static/images/turntable/horn.png" alt="">
        <text-scroll></text-scroll>
      </div>
      <p class="assistant_text">
        为好友助力 可增加好友抽奖机会
      </p>
      <div class="assistant_btn_wrap">
        <div class="draw_btn" @click="leadPage">
          <img src="/static/images/turntable/draw_btn.png" alt="">
        </div>
        <div class="assistant_btn" @click="getAssstantApi" :disabled="isDisabled">
          <img src="/static/images/turntable/assistant_btn.png" alt="">
        </div>
      </div>
      <div class="turntable_record">
        <div class="record_title">
          <div class="record_title_content">
            <img src="/static/images/turntable/title_friends_sel.png" alt="">
          </div>
        </div>
        <div class="record_detail">
          <div class="list_wrap">
            <div class="detail_title">
              <p>时间</p>
              <p>昵称</p>
            </div>
            <ul>
              <li class="list" v-for="(item, index) in recordData">
                <p>{{item.createDate | filterDate}}</p>
                <div class="other"><img :src="item.pic" alt=""><span>{{item.nick}}</span></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <rule-toast></rule-toast>
  </div>
</template>

<script>
  import {shareWeixin, isIos} from 'assets/js/case'
  import {getCoinlaSingle} from 'assets/js/httpAll'
  import TextScroll from './page/textScroll'
  import RuleToast from './page/ruleToast'
  export default {
    name: "assistant",
    components: {
      'text-scroll': TextScroll,
      'rule-toast': RuleToast
    },
    data () {
      return {
        assistantData: '',
        recordData: '',
        uuidData: '',
        ruleData: true,
        isDisabled: true,
        dayData: '',
        codeData: ''
      }
    },
    metaInfo: {
      title: '好友助力'
    },
    filters: {
      filterDate (value) {
        let date = new Date(value)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        if (hour < 10) {
          hour = '0' + hour
        }
        if (minute < 10) {
          minute = '0' + minute
        }
        let val = `${month}-${day} ${hour}:${minute}`
        return val
      }
    },
    mounted () {
      this.getWxCode()
      this.getDays()
      this.shareWX()
    },
    methods: {
      //微信登录授权，获取code
      getWxCode () {
        let _this = this
        let code = this.$route.query.code
        let urlData = window.location.href
        if (code == null) {
          //微信授权接口
          getCoinlaSingle('/wechatOAuthUrl', {url: urlData}).then((res) => {
            window.location.href = res.data
          })
        } else {
          if(code != null || '') {
            _this.codeData = code
          }
          //调用用户微信信息接口
          getCoinlaSingle('/wechatUserInfo', {code: _this.codeData}).then((res) => {
            this.assistantData = res.data
            this.getByInvitationCode(res.data.uuid)
          })
        }
      },
      getByInvitationCode (params) {
        getCoinlaSingle('/user/wechatSelectByInvitationCode', {invitationCode: this.$route.query.invitationCode}).then((res) => {
          this.uuidData = res.data.data.uuid
          if (this.uuidData == params) {
            this.isDisabled = true
          } else {
            this.isDisabled = false
          }
          //好友助力纪录
          this.getAssistantRecord()
        })
      },
      getAssstantApi () {
        let mes = this.assistantData
        if (this.isDisabled == 'true') {
          this.$toast({message: '不能为本人助力', duration: 1500})
        } else {
          this.$nextTick(() => {
            getCoinlaSingle('/turntable/help', {
              activityId: 1,
              code: this.codeData,
              invitationCode: this.$route.query.invitationCode,
              uuid: this.uuidData,
              helpUuid: mes.uuid,
              helpOpenid: mes.openid,
              helpNick: mes.nick,
              helpPic: mes.pic
            }).then((res) => {
              let resData = res.data
              if (resData.code == 0) {
                this.$toast({message: '助力成功', duration: 1500})
              } else {
                this.$toast({message: resData.code < 0 ? '助力失败' : resData.message, duration: 1500})
              }
              //刷新助力记录
              this.getAssistantRecord()
            }).catch((err) => {
              //TODO: 页面后退，this.assistantData被清空，查原因.传参数
              this.$toast({message: '啊呜，助力失败，请检查网络', duration: 1500})
            })
          })
        }
      },
      //好友助力纪录接口
      getAssistantRecord () {
        getCoinlaSingle('/turntable/selectHelpList', {
          activityId: 1,
          invitationCode: this.$route.query.invitationCode,
          uuid: this.uuidData
        }).then((res) => {
          this.recordData = res.data.data.list
        }).catch((err) => {
        })
      },
      leadPage () {
        this.$router.push({path: '/lead', query:{
          invitationCode: this.$route.query.invitationCode,
          bannerId: this.$route.query.bannerId
        }})
      },
      //时间天数
      getDays () {
        getCoinlaSingle('/headline/selectBannerDetail', {bannerId: this.$route.query.bannerId}).then((res) => {
          let endDay = new Date(res.data.data.endDate);
          let now = new Date();
          let days = endDay.getTime() - now.getTime();
          this.dayData = parseInt(days / (1000 * 60 * 60 * 24));
        })
      },
      shareWX() {
        getCoinlaSingle('/share/multi', {type: 6}).then((res) => {
          if (res.data.code === 0) {
            res.data.data.shareUrl = window.location.href
            shareWeixin(window.location.href, res.data.data)            // shareWeixin(res.data.data.shareUrl, res.data.data)
          }
        }).catch((err) => {
          this.$toast({message: '请检查网络', duration: 1500})
        })
      }
    }
  }
</script>

<style lang="stylus">
  .assistant_wrap {
    position: relative
    background: #f1481c
    min-height: 100vh
    .assistant_bac_banner {
      width: 100%
      display: block
    }
    .assistant_page {
      padding: 0 0.38rem 0.5rem
      margin: 0 auto
      background: url(/static/images/turntable/assistant_bac.jpg) no-repeat
      background-size: cover
      .active_end_days {
        text-align: center
        font-size: 0.3rem
        color: #fff
        font-weight: 600
      }
      .turnTable_active {
        width: 5rem
        height: 0.41rem
        margin: 0.32rem auto 0.22rem
        background-color: #FAF0EE
        border-radius: 0.3rem
        display: flex
        align-items: center
        img {
          width: 0.32rem
          margin: 0 0.3rem 0 0.22rem
        }
      }
      .assistant_text {
        font-size: 0.4rem
        color: #fff
        font-weight: 600
        text-align: center
        margin: 0.54rem auto 0.6rem
      }
      .assistant_btn_wrap {
        overflow: hidden
        width: 5.72rem
        margin: 0 auto
        margin-bottom: 0.56rem
        .draw_btn, .assistant_btn {
          width: 2.57rem
          float: left
          img{
            width:100%
          }
        }
        .assistant_btn {
          float: right
        }
      }
      .turntable_record {
        position: relative
        border-radius: 0.22rem;
        font-size: 0.26rem
        background-color: #ffde7d
        padding: 0 0 0.12rem 0
        .record_title {
          overflow: hidden
          height: 0.88rem
          display: flex
          .record_title_content {
            width: 100%
            display: flex
            justify-content: center
            align-items: center
            img {
              width: 1.78rem
              height: 0.29rem
            }
          }
        }
        .record_detail {
          width: 6.5rem
          margin: 0 auto
          overflow: hidden
          border-bottom-left-radius: 0.16rem
          border-bottom-right-radius: 0.16rem
          .detail_title {
            display: flex
            align-items: center
            height: 0.64rem
            line-height: 0.64rem
            background-color: #ffedba
            color: #b17201
            p {
              width: 50%
              text-align: center
            }
          }
          .list {
            display: flex
            align-items: center
            height: 0.64rem
            line-height: 0.64rem
            color: #b47913
            background-color: #f8f4db
            p {
              width: 50%
              padding-left: 0.85rem
            }
            .left {
              padding-left: 0.9rem
            }
          }
        }
        .other {
          width: 50%
          text-align: left
          padding-left: 0.5rem
          padding-right: 0.5rem
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          img {
            width: 0.3rem
            border-radius: 50%
            margin-right: 0.1rem
            vertical-align: middle
          }
          span {
            font-weight: bold
          }
        }
      }
    }
    .ruleToast .active_rule {
      top: 3.8rem
    }
  }
</style>
