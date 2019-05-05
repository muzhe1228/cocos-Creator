<template>
  <header class="container">
    <router-link to="/" class="logo"><img src="~static/images/icon/logo_s.png" alt="logo"></router-link>
    <router-link class="header-btn" to="/">返回首页</router-link>
  </header>
</template>

<script>
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  header
    height: 88px
    background-color: #000
    display: flex
    align-items: center
    justify-content: space-between
    .header-btn
      width: 106px
      height: 30px
      border-radius: 15px
      border: 1px solid #fff
      text-align: center
      line-height: 30px
      font-size: 14px
      color: #fff
      letter-spacing: 1px
</style>
