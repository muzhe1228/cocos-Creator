<template>
  <div class="lead">
    <img src="/static/images/turntable/lead.jpg" alt="" class="lead_bac">
    <div class="join_lead" @click="downloadPage">
      <img src="/static/images/turntable/join.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "lead",
    methods: {
      downloadPage () {
        this.$router.push({path: '/download'})
      }
    }
  }
</script>

<style scoped lang="stylus">
  .lead{
    position: relative
    font-size:0
    .lead_bac{
      width:100%
    }
    .join_lead{
      width:4.65rem
      position: absolute
      left: 50%
      transform: translate(-50%)
      bottom:0.5rem
      img{
        width:100%
      }
    }
  }
</style>
