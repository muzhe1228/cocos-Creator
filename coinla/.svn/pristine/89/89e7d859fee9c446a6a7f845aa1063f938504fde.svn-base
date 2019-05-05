<template>
  <img v-lazy="userMsg.head" alt="">
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState(['userMsg'])
    },
    beforeMount(){
      console.log(userMsg)
    }
  }
</script>

<style scoped lang="stylus">

</style>
