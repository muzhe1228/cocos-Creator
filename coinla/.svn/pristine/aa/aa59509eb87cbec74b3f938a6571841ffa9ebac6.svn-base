<template>
  <div>
    <header class="container v-head" ref="header">
      <router-link to="/" class="logo"><img src="~static/images/icon/logo.png"></router-link>
      <div class="v-head__menu">
        <div class="kenMenu">
          <nuxt-link to="/" class="item">首页</nuxt-link>
          <nuxt-link to="/Optional" class="item">自选</nuxt-link>
          <div class="kenSubMenu item" @mouseover="showMenu('isMenu')" @mouseout="handleMenu('isMenu')"
               :class="{'active': IsTabClass === 1}">
            <p>排行<span></span></p>
            <div class="subMenuInfo" ref="isMenu" @click="handleMenu('isMenu')">
              <nuxt-link to="/Rank">涨跌幅榜</nuxt-link>
              <nuxt-link to="/Rank/currency">币种成交榜</nuxt-link>
              <nuxt-link to="/Rank/bourse">交易所成交榜</nuxt-link>
              <nuxt-link to="/Rank/trend">市值趋势</nuxt-link>
            </div>
          </div>
          <nuxt-link to="/exchange" class="item">交易所</nuxt-link>
          <nuxt-link to="/template" class="item">模块概念</nuxt-link>
          <a class="item" :class="{'active': IsTabClass === 2}" @click="IsTo()">账本</a>
          <nuxt-link class="item" to="/App" target="_blank">App</nuxt-link>
        </div>
        <div>
          <p class="login" v-show="!isLine">
            <span @click="setRegister(true)">注册</span> / <span @click="setLogin(true)">登录</span>
          </p>
          <div class="onLine" v-show="isLine">
            <el-dropdown class="userMsg" @command="handleCommand" placement="bottom">
          <span class="el-dropdown-link" style="display: flex;align-items: center">
          <div class="userKen">
          <div class="userKen-Img">
          <img v-lazy="userMsg.headImg">
          <span v-if="userMsg.messageNumber">{{userMsg.messageNumber}}</span>
          </div>
          <p>个人中心</p>
          </div>
          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="/user">{{userMsg.nickName}}</el-dropdown-item>
                <el-dropdown-item command="/user/action">账号设置</el-dropdown-item>
                <el-dropdown-item command="/user/msg">消息中心</el-dropdown-item>
                <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </header>
    <div class="hover-hand" ref="nav" :class="{'hover-hand-fixed':showNav}">
      <div class="hover-hand-wrap">
        <div class="hover-hand-logo"></div>
        <div class="hover-hand__menu">
          <div class="kenMenu">
            <nuxt-link to="/" class="item">首页</nuxt-link>
            <nuxt-link to="/Optional" class="item">自选</nuxt-link>
            <div :class="{'active': IsTabClass === 1}" class="kenSubMenu item" @mouseover="showMenu('isMenuMine')"
                 @mouseout="handleMenu('isMenuMine')">
              <p>排行<span></span></p>
              <div class="subMenuInfo" ref="isMenuMine" @click="handleMenu('isMenuMine')">
                <nuxt-link to="/Rank">涨跌幅榜</nuxt-link>
                <nuxt-link to="/Rank/currency">币种成交榜</nuxt-link>
                <nuxt-link to="/Rank/bourse">交易所成交榜</nuxt-link>
                <nuxt-link to="/Rank/trend">市值趋势</nuxt-link>
              </div>
            </div>
            <nuxt-link to="/exchange" class="item">交易所</nuxt-link>
            <nuxt-link to="/template" class="item">模块概念</nuxt-link>
            <a class="item" :class="{'active': IsTabClass === 2}" @click="IsTo()">账本</a>
            <nuxt-link class="item" to="/App" target="_blank">App</nuxt-link>
          </div>
          <div>
            <p class="login" v-show="!isLine">
              <span @click="setRegister(true)">注册</span> / <span @click="setLogin(true)">登录</span>
            </p>
            <div class="onLine" v-show="isLine">
              <el-dropdown class="userMsg" @command="handleCommand" placement="bottom">
            <span class="el-dropdown-link" style="display: flex;align-items: center">
            <div class="userKen">
            <div class="userKen-Img">
            <img v-lazy="userMsg.headImg">
            <span v-if="userMsg.messageNumber">{{userMsg.messageNumber}}</span>
            </div>
            <p>个人中心</p>
            </div>
            </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="/user">{{userMsg.nickName}}</el-dropdown-item>
                  <el-dropdown-item command="/user/action">账号设置</el-dropdown-item>
                  <el-dropdown-item command="/user/msg">消息中心</el-dropdown-item>
                  <el-dropdown-item command="signOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login></login>
    <register></register>
    <forget-pwd></forget-pwd>
  </div>
</template>

<script>
  import Login from '~/components/login'
  import Register from '~/components/register'
  import forgetPwd from '~/components/forgetPwd'
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        isMenu: false,
        showNav: false,
        // this.$route.name.indexOf('Rank') > -1 ? 1 : (this.$route.name.indexOf('Book') > -1 ? 2 : 0)
        IsTabClass: 0,//0是没有，1是Rank，2是Book
        subMenuTimer: null,
      }
    },
    computed: {
      activeStr() {
        return this.$route.name
      },
      ...mapState(['Token', 'userMsg', 'isLine'])
    },
    watch: {
      activeStr: function (val) {
        // console.log('path', val)
        this.isActiveTab()
      }
    },
    beforeMount() {
      this.verifyToken(this.Token)
    },
    mounted() {
      this.$nextTick(() => {
        this.initScroll();
      })
      this.isActiveTab()
    },
    methods: {
      initScroll() {
        let h = this.$refs.header.clientHeight
        document.addEventListener('scroll', function () {
          if (document.documentElement.scrollTop > h || document.body.scrollTop > h) {
            this.showNav = true
          } else {
            this.showNav = false
          }
        }.bind(this), false)
      },
      handleMenu(ref) {
        let _this = this
        clearTimeout(this.subMenuTimer)
        this.subMenuTimer = setTimeout(() => {
          _this.$refs[ref].style.height = 0
        }, 200)

      },
      showMenu(ref) {
        let _this = this
        clearTimeout(this.subMenuTimer)
        this.subMenuTimer = setTimeout(() => {
          this.$refs[ref].style.height = '144px'
        }, 200)
      },
      IsTo() {
        if (this.Token) {
          window.open('/Book', '_blank')
        } else {
          this.$route.query.To = 'toBook'
          this.setLogin(true)
        }
      },
      //Menu的初始显示选中Menu
      isActiveTab() {
        if (this.$route.name.indexOf('Rank') > -1) {
          this.IsTabClass = 1
        } else if (this.$route.name.indexOf('Book') > -1) {
          this.IsTabClass = 2
        } else {
          this.IsTabClass = 0
        }
      },
      //监听menu点击事件
      handleSelect(key, keyPath) {
        // console.log(key, keyPath)
      },
      //验证token
      verifyToken(Token) {
        let Name = this.$route.name
        let _this = this
        if (Token) {
          getCoinlaSingle('/user/mine/verifyToken', {}, Token)
            .then((res) => {
              let code = res.data.code
              if (code === 0) {
                _this.setLine(true)
              } else {
                this.setToken()
                this.setUserMsg()
                Cookies.remove('token')
                Cookies.remove('userMsg')
                _this.setLine(false)
              }
            })
        } else {
          this.setToken()
          this.setUserMsg()
          Cookies.remove('token')
          Cookies.remove('userMsg')
          _this.setLine(false)
          if (Name.indexOf('Book') > -1 || Name.indexOf('user') > -1) {
            this.$router.push('/')
          }
        }
      },
      handleCommand(command) {
        if (command === 'signOut') {
          this.signOut()
        } else {
          this.goUserCenter(command)
        }
      },
      // //跳转到个人中心
      goUserCenter(url) {
        this.$router.push(url)
      },
      //退出登录
      signOut() {
        let Name = this.$route.name
        getCoinlaSingle('/user/logout', {}, this.Token)
          .then((res) => {
            console.log(res.data)
            this.setToken()
            this.setUserMsg()
            this.setLine(false)
            Cookies.remove('token')
            Cookies.remove('userMsg')
            if (Name.indexOf('Book') > -1 || Name.indexOf('user') > -1) {
              this.$router.push('/')
            }
          }).catch((err) => {
          this.$message.error(err.message)
        })
      },
      ...mapMutations(['setToken', 'setUserMsg', 'setLine', 'setLogin', 'setRegister'])
    },
    components: {
      Login,
      Register,
      forgetPwd
    }
  }
</script>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  .v-head, .hover-hand {
    &__menu {
      flex: 1
      display: flex
      border-bottom: 0
      align-items: center
      justify-content: space-between
      .kenMenu {
        font-size: 14px
        display: flex
        color: #fff
        font-weight: 500
        .item {
          color: #fff
          padding: 0 13px
          cursor: pointer
          &:hover {
            color: $main-color
            after-border(20px)
          }
        }
        a {
          &.nuxt-link-exact-active, &.active {
            color: $main-color
          }
        }
        .kenSubMenu {
          position: relative
          p {
            padding-right: 8px
            position: relative
            transition: all .2s linear
            span {
              transition: all .2s linear
              position: absolute
              display: inline-block
              width: 0
              height: 0
              border: 2.3px solid transparent
              border-right-color: #fff
              border-bottom-color: #fff
              right: 0
            }
          }
          &:hover, &.active {
            p {
              color: $main-color
              span {
                border-right-color: $main-color
                border-bottom-color: $main-color
              }
            }
          }
          .subMenuInfo {
            color: #fff
            height: 0
            overflow: hidden
            position: absolute
            width: 110px
            left: 0
            background-color: #000
            z-index: 9999
            transition: all .2s linear
            a {
              color: #fff
              display: block
              padding-left: 13px
              &.nuxt-link-exact-active {
                color: $main-color
              }
              &:hover {
                color: #000
                background-color: $main-color
              }
            }
          }
        }
      }

      .login {
        color: #fff;
        font-size: $font-s
        span {
          display: inline-block
          padding: 0 10px
          cursor: pointer
        }
      }
      .onLine {
        display: flex
        justify-content: space-between
        align-items: center
        max-width: 200px
        .userMsg {
          display: flex
          align-items: center
          color: #fff
          font-size: $font-x
          hover-hand()
          span {
            outline: none
          }
          img {
            margin-right: 10px
            width: 24px
            height: 24px
            border-radius: 12px
            background-color: $main-color
            font-size: 12px
          }
        }
        .userKen {
          display: flex
          align-items: center
          hover-hand()
          &-Img {
            position: relative
            height: 24px
            img {
              width: 24px
              height: 24px
              border-radius: 12px
            }
            span {
              position: absolute
              min-width: 16px
              height: 12px
              background-color: #e50011
              border-radius: 7px
              color: #fff
              right: 0
              text-align: center
              font-size: 12px
              padding: 0 2px
            }
          }
          p {
            margin-left: 8px
            color: #fff
            font-size: $font-s
          }
        }
      }
    }
  }

  .v-head {
    font-weight: 500
    height: 72px
    display: flex
    align-items: center
    .logo {
      img {
        width: 433px
      }
      margin-right: 150px
    }
    &__menu {
      .kenMenu {
        .item {
          height: 72px
          line-height: 72px
        }
        .kenSubMenu {
          p {
            span {
              top: 38px
            }
          }
          .subMenuInfo {
            top: 73px
            line-height: 36px
          }
          &:hover {
            .subMenuInfo {
              height: 144px
            }
          }
        }
      }
      .login {
        span {
          height: 40px
          line-height: 40px
        }
      }
      .onLine {
        .userKen-Img {
          span {
            top: -7px
          }
        }
      }
    }
  }

  .hover-hand {
    font-weight: 500
    background-color: #000
    height: 37px
    position: fixed
    top: 0
    left: 0
    z-index: 9999
    width: 100%
    border-bottom: 1px solid #000
    transform: translateY(-41px)
    transition: all .2s linear
    &.hover-hand-fixed {
      transform: translateY(0)
    }
    &-wrap {
      width: 1190px
      display: flex
      align-items: center
      margin: 0 auto
    }
    &-logo {
      width: 583px
    }
    &__menu {
      .kenMenu {
        .item {
          height: 36px
          line-height: 36px
        }
        .kenSubMenu {
          p {
            span {
              top: 21px
            }
          }
          .subMenuInfo {
            top: 38px
            line-height: 36px
          }
          &:hover {
            .subMenuInfo {
              height: 144px
            }
          }
        }
      }
      .login {
        span {
          height: 36px
          line-height: 36px
        }
      }
      .onLine {
        .userKen-Img {
          span {
            top: -2px
          }
        }
      }
    }
  }
</style>
