<template>
  <div class="text_scroll">
    <transition class="inner-container2" name="slide" mode="out-in">
      <div class="text_scroll_content" :key="text.id" v-if="text.val">
        <p>恭喜</p>
        <p class="userName">{{text.val.userName | filterStr}}</p>
        <p>获得</p>
        <p class="number_color">{{text.val.awardsName}}</p>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getCoinlaSingle} from 'assets/js/httpAll'
  const totalDuration = 20000;
  export default {
    name: 'textScroll',
    props: [],
    data() {
      return {
        arr: [],
        number: 0,
      }
    },
    computed: {
      text () {
        return {
          id: this.number,
          val: this.arr[this.number]
        }
      }
    },
    filters: {
      filterStr: function (value) {
        if(value && value.length > 16) {
          value= value.substring(0, 16)+ '...';
        }
        return value;
      }
    },
    mounted() {
      this.startMove()
    },
    methods: {
      startMove() {
        getCoinlaSingle('/turntable/selectBroadcastList', {activityId: 1}).then((res) => {
          let arrData = res.data.data
          let len = arrData.length
          this.arr = arrData
          let timer = setTimeout(() => {
            /*轮播的个数*/
            if (this.number === len-1) {
              this.number = 0;
            } else {
              this.number += 1;
            }
            this.startMove();
          }, totalDuration)
        }).catch((error) => {})
      },

    }
  }
</script>

<style lang = "stylus">
  .text_scroll{
    height: 0.5rem
    line-height: 0.5rem
    overflow: hidden;
    font-size:0.24rem
    color: #b0730b
    &_content{
      height:0.5rem
      line-height: 0.5rem
      p{
        display: inline-block
        overflow: hidden
      }
      .userName{
        text-overflow:ellipsis;
        white-space: nowrap;
        max-width:2rem
      }
      .number_color{
        color: #f40
      }
    }
    /*文字无缝滚动*/
    .slide-enter-active, .slide-leave-active {
      transition: all 0.2s linear;
    }
    .slide-leave-to {
      transform: translateY(-20px);
    }
    .slide-enter{
      transform: translateY(20px);
    }
  }

</style>
