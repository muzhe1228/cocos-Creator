<template>
  <div class="test">
    <button @click="clickHandle">获取数据</button>
    <h1>{{testData}}</h1>
    <h2>{{callData}}</h2>
  </div>
</template>

<script>
  import {shareWeixin, isIos} from 'assets/js/case'
  export default {
    data() {
      return {
        testData: '',
        callData: ''
      }
    },
    mounted() {
      /*this.callHandle()*/
    },
    methods: {
      /*点击调用iOS方法*/
      clickHandle() {
        let _this = this
        this.testData = '点击成功'
        window.webkit.messageHandlers.NativeMethod.postMessage("getWeChatUserData");
        window.sendWeChatUserData = function (json) {
          _this.callData = json
         /* return res.data.data*/
        }
      },
      /*给ios创建一个方法*/

    }

  }
</script>

<style scoped>
  .test {
    padding: 50px;
    text-align: center;
  }
</style>
