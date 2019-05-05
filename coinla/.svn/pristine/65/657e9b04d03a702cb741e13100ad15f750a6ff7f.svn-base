<template>
  <div class="wrap">
    <div class="bou">
      <el-button @click="setSearchMode(true)" type="primary">主要按钮</el-button>
      <p>{{msgId}}</p>
    </div>
    <search-mode @changBtn="change"></search-mode>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import searchMode from '~/components/searchMode'

  export default {
    scrollToTop: true,
    data() {
      return {
        msgId: ''
      }
    },
    methods: {
      change(msg) {
        this.msgId = msg
      },
      ...mapMutations(['setSearchMode'])
    },
    components: {
      searchMode
    }
  }
</script>
<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  .wrap {
    .bou {
      height: 80vh
      text-align center
      padding: 50px
    }
  }

</style>
