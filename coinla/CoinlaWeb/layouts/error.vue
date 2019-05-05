<template>
  <div style="background-color: #fff;width: 1200px;margin: auto; height: 400px;">
    <h2 v-if="error.statusCode === 404">{{error.message}} </h2>
    <h2 v-else>{{error.message}}</h2>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    scrollToTop: true
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
