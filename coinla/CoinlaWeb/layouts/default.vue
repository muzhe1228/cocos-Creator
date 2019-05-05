<template>
  <el-container>
    <el-header height="88" class="header">
      <v-header></v-header>
    </el-header>
    <el-main class="thisBody">
      <nuxt/>
    </el-main>
    <el-footer height="auto" class="footer">
      <v-footer></v-footer>
    </el-footer>
  </el-container>
</template>

<script>
  import VHeader from '~/components/Header/Header.vue'
  import VFooter from '~/components/Footer/Footer.vue'

  export default {
    scrollToTop: true,
    components: {
      VHeader,
      VFooter
    }
  }
</script>

<style scoped lang="stylus">
 .header {
    background-color: #000
  }

  .thisBody {
    padding: 0
  }

  .footer {
    background-color: #000
  }
</style>
