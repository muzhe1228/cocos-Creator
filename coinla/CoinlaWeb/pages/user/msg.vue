<template>
  <div class="user-msg">
    <div class="msg-nav">
      <p>消息中心 <span v-show="!singleMsg"> > 消息详情</span></p>
      <p v-if="singleMsg">
        <el-button class="emptyMsg" @click="emptyMsg" size="small" v-if="msgList.total">清空消息</el-button>
        <el-button class="allRead" @click="updateMsg(0)" size="small" v-if="msgList.total">全部已读</el-button>
      </p>
      <p v-else @click="singleMsg = true" class="return">返回当前列表</p>
    </div>
    <div class="msg-cont resetLoading"
         element-loading-text="数据加载中，请耐心等待"
         element-loading-background="rgba(0, 0, 0, 0.6)"
         v-loading="mainLoading">
      <div v-show="singleMsg">
        <div v-if="msgList.total" class="list">
          <ul v-for="(item,index) in msgList.list" :key="index" :class="{active: !item.isRead}">
            <li class="msg-cont_l" :data="item" @click="clickMsg(item.cerId,item.currencyId,item.mcrId,item.isRead)">
              <p>{{item.title}}</p>
              <p>{{item.content}}</p>
            </li>
            <li class="msg-cont_r">
              <p>{{item.createDate | resetTime(1)}}</p>
              <p @click="deleteMsg(item.mcrId)">删除</p>
              <p class="more" @click="msgDetails(item)">消息详情</p>
            </li>
          </ul>
          <div class="page" v-if="msgList.total>msgList.pageSize">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :page-size="msgList.pageSize"
              :pager-count="5"
              layout="prev, pager, next"
              prev-text="上一页"
              next-text="下一页"
              :total="msgList.total">
            </el-pagination>
          </div>
        </div>
        <img class="noDataImg" v-else src="~static/images/noData.png" alt="">
      </div>
      <div v-show="!singleMsg">
        <ul v-if="singleData" class="oneList">
          <li class="title">{{singleData.title}}</li>
          <li class="time">{{singleData.createDate | resetTime(1)}}</li>
          <li class="content">{{singleData.content}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import {mapState} from 'vuex'

  export default {
    scrollToTop: true,
    head() {
      return {
        title: '消息中心----聚合全球行情,挖掘数据价值-CoinLa',
        meta: [
          {hid: 'keywords', name: 'keywords', content: '数字货币行情, 虚拟币行情, 数字货币数据分析, 数字货币行业大数据, 虚拟币数据分析,区块链'},
          {
            hid: 'description',
            name: 'description',
            content: '考拉行情(www.coinla.com) 是最专业的数字货币行业大数据平台之一,专注于为数字货币用户提供数据分析,数据挖掘服务。我们拥有全球1000多个数字货币,150多家交易平台,5千多个交易对的数据资源,提供最专业的数字货币趋势分析,行情分析等多维度,全方位的分析服务,数字货币账本服务'
          },
        ],
        link: [
          {rel: 'index', href: 'http://www.coinla.com'}
        ]
      }
    },
    async asyncData({store, error}) {
      return getCoinlaSingle('/message/findList', {pageSize: 10}, store.state.Token)
        .then((res) => {
          let code = res.data.code
          if (code === 0) {
            return {
              msgList: res.data.data
            }
          } else if (code === 20) {
            store.commit('setLogin', true)
            return {
              msgList: {}
            }
          }
        })
        .catch((err) => {
          error({statusCode: 505, message: err.message})
        })
    },
    computed: {
      ...mapState(['userMsg', 'Token'])
    },
    data() {
      return {
        mainLoading: false,
        singleMsg: true,
        singleData: {}
      }
    },
    mounted(){
      this.$ToSeo()
    },
    methods: {
      getMsg(page) {
        this.mainLoading = true
        getCoinlaSingle('/message/findList', {page: page}, this.Token)
          .then((res) => {
            this.mainLoading = false
            let code = res.data.code
            if (code === 0) {
              this.msgList = res.data.data
            } else if (code === 20) {
              this.$store.commit('setLogin', true)
              this.msgList = {}
            }
          }).catch((err) => {
          this.mainLoading = false
        })
      },
      handleCurrentChange(page) {
        this.getMsg(page)
        this.$ScrollTop()
      },
      msgDetails(data) {
        this.singleData = data
        this.singleMsg = false
        this.$ScrollTop()
      },
      //删除单条消息
      deleteMsg(mcrId) {
        this.mainLoading = true
        getCoinlaSingle('/message/deleteMessage', {mcrId: mcrId}, this.Token)
          .then((res) => {
            this.mainLoading = false
            let code = res.data.code
            if (code === 0) {
              let page = this.msgList.pageNum
              if ((this.msgList.pageNum * this.msgList.pageSize + 1) === this.msgList.total) {
                page = page - 1
              }
              this.getMsg(page)
              let token = {token: this.Token}
              this.$store.dispatch('SET_userMsg', token)
            } else if (code === 20) {
              this.$store.commit('setLogin', true)
              this.msgList = {}
            }
          }).catch((err) => {
          this.mainLoading = false
        })
      },
      //清空消息/message/deleteUserMessage
      emptyMsg() {
        this.mainLoading = true
        getCoinlaSingle('/message/deleteUserMessage', {}, this.Token)
          .then((res) => {
            this.mainLoading = false
            let code = res.data.code
            if (code === 0) {
              this.getMsg(1)
              let token = {token: this.Token}
              this.$store.dispatch('SET_userMsg', token)
            } else if (code === 20) {
              this.$store.commit('setLogin', true)
              this.msgList = {}
            }
          }).catch((err) => {
          this.mainLoading = false
        })
      },
      //修改消息状态
      updateMsg(mcrId) {
        getCoinlaSingle('/message/updateUserMessage', {mcrIds: mcrId}, this.Token)
          .then((res) => {
            let code = res.data.code
            if (code === 0) {
              this.getMsg(1)
              let token = {token: this.Token}
              this.$store.dispatch('SET_userMsg', token)
            } else if (code === 20) {
              this.$store.commit('setLogin', true)
              this.msgList = {}
            }
          })
      },
      //点击单条消息跳转并且设置为已读/message/updateUserMessage
      clickMsg(cerId, ccyId, mcrId, isRead) {
        if (!isRead) {
          this.updateMsg(mcrId)
        }
        this.$router.push(`/Optional/${ccyId}/?cerId=${cerId}`)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable.styl"
  .user-msg {
    background-color: #fff
    min-height: 80vh
    .msg-nav {
      font-size: 16px
      height: 60px
      border-bottom: 1px solid $border-color
      display: flex
      justify-content: space-between
      align-items: center
      padding: 0 45px
      position: relative
      &:after{
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background-color: #debd63;
      }
      .allRead {
        margin-left: 20px
      }
      .return {
        font-size: $font-s
        color: $size-ssmain
        hover-hand()
      }
    }
    .msg-cont {
      .list {
        ul {
          height: 120px
          padding: 24px 45px
          display: flex
          justify-content: space-between
          border-bottom: 1px solid $border-color
          position: relative
          &:last-child {
            border-color: transparent
          }
          &.active {
            &:after {
              content: ' '
              position: absolute
              width: 8px
              height: 8px
              border-radius: 4px
              background-color: #ff0000
              left: 25px
              top: 37px
            }
          }
          /*&:nth-child(even) {
            background-color: #f8f8f8
          }*/
          .msg-cont_l {
            width: 520px
            margin-right: 98px
            cursor: pointer
            p {
              &:nth-child(1) {
                margin-bottom: 20px
                color: $size-main
              }
              &:nth-child(2) {
                font-size: $font-s
                line-height: 26px
                color: $size-smain
              }
            }
          }
          .msg-cont_r {
            flex: 1
            display: flex
            flex-direction: column
            justify-content: space-between
            p {
              text-align: right
              font-size: $font-s
              &:nth-child(1) {
                color: $size-smain
              }
              &:nth-child(2) {
                color: #3695ff
                text-decoration: underline
                hover-hand()
              }
              &:nth-child(3) {
                color: $size-ssmain
                transition: all .2s linear
                hover-hand()
                &:hover{
                  color: $main-color
                }
              }
            }
          }
        }

      }
      .oneList {
        padding: 0 45px
        text-align: center
        font-size: $font-s
        .title {
          margin-top: 34px
          font-size: $font-m
        }
        .time {
          margin-top: 16px
          color: $size-smain
        }
        .content {
          margin-top: 27px
          color: $size-ssmain
          line-height: 32px
        }
      }
    }
  }
</style>
