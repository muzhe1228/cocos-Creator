<template>
  <div>
    <div class="yesMode" >
      <img id="yesImg" src="" alt="">
      <p>长按发送给好友</p>
    </div>
    <div ref="downloadApp" class="jietu">
      <Flaunt></Flaunt>
    </div>
  </div>
</template>

<script>
  import Flaunt from './flaunt'
  import html2canvas from 'html2canvas';

  export default {
    created() {
      this.$nextTick(() => {
        console.log($(".hello"))
        console.log(this.$refs.downloadApp.style.display)
        let _this = this
        html2canvas(_this.$refs.downloadApp).then(function (canvas) {
          var image = document.getElementById("yesImg");
          image.src = canvas.toDataURL("image/png");
          _this.$refs.downloadApp.style.display = 'none'
        });
      })
    },
    components: {
      Flaunt
    },
    methods: {
      canvasHandle() {
        html2canvas(document.body).then(function (canvas) {
          document.body.appendChild(canvas);
        });
      }
    }
  }
</script>

<style scoped>
#yesImg{
  width: 100%;
}
</style>
