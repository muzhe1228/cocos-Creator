<template>
  <canvas :id="options.id" width="96" height="96"></canvas>
</template>

<script>
  import canvasRound from '~/assets/js/canvasRound'

  export default {
    props: {
      options: {
        type: Object,
        default: function () {
          return {
            id: 'can',
            angle: .45,
            color: ['#6c2fd7', '#2978d8',],
            lineCap: 'round',
            text: 172
          }
        }
      }
    },
    mounted() {
      canvasRound(this.options);
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
