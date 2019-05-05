<template>
  <div class="Index">
    <v-line :ccyId="ccyId"></v-line>
  </div>
</template>

<script>
  import vLine from '~/components/Line/vLine.vue'

  export default {
    props: ['ccyId'],
    components: {
      vLine
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
