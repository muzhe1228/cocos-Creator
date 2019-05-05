<template>
  <div class="analyses container">
    <div v-if="loading">
      <h1 class="analyses-title">{{analysesData.noticeTitle}}</h1>
      <p class="analyses-date">{{analysesData.noticeDate | resetTime}}发布，内容以<span class="link" @click="goLink">原文链接</span>为准</p>
      <div class="analyses-content" ref="content" v-html="analysesData.noticeContent">
      </div>
    </div>
    <van-loading v-else class="analyses-loading" type="spinner" color="#debd63"/>
  </div>
</template>

<script>
  import {getCoinlaSingle} from 'assets/js/httpAll'
  import {shareWeixin, isIos} from 'assets/js/case'

  export default {
    name: "notice",
    data() {
      return {
        analysesData: {},
        loading: false,
        testIos: '',
      }
    },
    metaInfo: {
      title: '公告'
    },
    mounted() {
      this.getData(this.$route.query.noticeId)
    },
    methods: {
      //过滤html标签
      filterHTMLTag (msg) {
        let msg1 = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
        msg1 = msg1.replace(/[|]*\n/g, '') //去除行尾空格
        msg1 = msg1.replace(/[|]*\r/g, '') //去除回车
        msg1 = msg1.replace(/&nbsp;/ig, ''); //去掉npsp
        return msg1;
      },
      init(title, subtitle) {
        let _this = this
        getCoinlaSingle('/share/multi', {type: 7}).then((res) => {
          if (res.data.code === 0) {
            if (title && title.indexOf('【考拉行情】') === -1) {
              title = '【考拉行情】' + title
            }
            if(subtitle && subtitle.length > 30) {
              subtitle= subtitle.substring(0, 30)+ '...';
            }
            res.data.data.title = title || res.data.data.title
            res.data.data.note = subtitle || res.data.data.note
            res.data.data.shareUrl = window.location.href
            shareWeixin(window.location.href, res.data.data)
            if (isIos()) {
              window.setData = function (params) {
                _this.testIos = params
                return res.data.data
              }
            } else {
              window.setData = function (params) {
                _this.testIos = params
                // return res.data.data
              }
              window.sendData = function () {
                window.coinla.getData(JSON.stringify(res.data.data))
              }
            }
          }
        })
      },
      getIos() {
        //安卓
        window.coinla.sendCLBRank('coinlaApp')
        //ios
        // window.webkit.messageHandlers.NativeMethod.postMessage("getCLBRank");
      },
      getData(noticeId) {
        getCoinlaSingle('/headline/selectNoticeDetail', {noticeId: noticeId}).then((res) => {
          this.loading = true
          if (res.data.code === 0) {
            let _this = this
            this.analysesData = res.data.data
            //取noticeContent前30文字内容，如果有图片过滤掉，如果全部是图片使用标题的内容
            let getPrevContent = this.filterHTMLTag(res.data.data.noticeContent)
            if(getPrevContent != ''){
              if(getPrevContent.length > 30) {
                getPrevContent= getPrevContent.substring(0, 30)
              }
            }else{
              getPrevContent = res.data.data.noticeTitle
            }
            this.init(res.data.data.noticeTitle, getPrevContent)
            this.$nextTick(function () {
              if (_this.analysesData.noticeContent) {
                let dom = this.$refs.content
                $(dom).find('lucky').each(function (index, item) {
                  $(item).attr('preview', 1)
                })
              }
              _this.$previewRefresh()
            })
          }
        }).catch((err) => {
          this.loading = true
        })
      },
      goLink () {
        let url = this.analysesData.originalLink
        if (this.openInWebview()) {
          // 在app内打开
          if(isIos()){
            window.webkit.messageHandlers.NativeMethod.postMessage("ios_openSafari")
            window.iosGetSafariURL = function () {
              return url
            }
          }else{
            window.coinla.getClickUrl(url)
          }
        } else {
          // 不是app内打开
          window.location.href = url
        }
      },
      openInWebview () {
        let ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return false
        } else if (ua.match(/QQ/i) == 'qq') {
          return false
        } else if (ua.match(/WeiBo/i) == "weibo") {
          return false
        } else {
          if (ua.match(/Android/i) != null) {
            return ua.match(/browser/i) == null
          } else if (ua.match(/iPhone/i) != null) {
            return ua.match(/safari/i) == null
          } else {
            return (ua.match(/macintosh/i) == null && ua.match(/windows/i) == null)
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~assets/stylus/variable"
  .analyses {
    .link{
      color: #2f72df
      font-size:0.28rem
      border-bottom: 1px solid #2f72df
    }
    &-title {
      font-size: $font-l
      font-weight: 700
      padding-top: .36rem
      text-align: center
      line-height: 1.5
    }
    &-date {
      font-size: $font-s
      color: $size-sColor
      padding: .12rem 0 .36rem 0
      text-align: center
    }
    &-img {
      img {
        max-width: 100%
        margin-bottom: .32rem
      }
    }
    &-content {
      p, h1, h2, h3, h4, h5, h6, div {
        line-height: 2
        padding: .1rem
      }
      p {
        font-size: $font-s
        color: $size-sColor
      }
      div{
        font-size: $font-s
        color: #666
      }
      img {
        display: block
        margin: auto
        max-width: 100% !important
        height: auto !important
        margin-bottom: .4rem !important
      }
    }
    &-loading {
      color: #debd63;
      margin: auto
      margin-top: 20px
    }
  }
</style>
