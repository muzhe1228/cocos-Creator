<template>
  <div class="vi-lottery shanDeng" id="deng">
    <ul>
      <li class="row">
        <div :class="['col-4' , {active : activeClass[prize.awardsId]}]" v-for="(prize, index) in lis1" ><img :src="prize.pic"></div>
      </li>
      <li class="row">
        <div :class="['col-4' , {active : activeClass[prizesList[7].awardsId]}]"><img :src="prizesList[7].pic"></div>
        <div class="col-4 lotteryBtn" @click="startLottery">
          <img :src="lotteryBtn.img1" v-show="lotteryBtn.status">
          <img :src="lotteryBtn.img2" v-show="!lotteryBtn.status">
        </div>
        <div :class="['col-4' , {active : activeClass[prizesList[3].awardsId]}]"><img :src="prizesList[3].pic"></div>
      </li>
      <li class="row">
        <div :class="['col-4' , {active : activeClass[prize.awardsId]}]" v-for="(prize, index) in lis2"><img :src="prize.pic"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getCoinlaSingle} from 'assets/js/httpAll'
  export default {
    data(){
      return {
        activeClass:[false,false,false,false,false,false,false,false],
        index:0,
        count:8,
        timer:null,
        times:0,
        speedData:100,
        lock :false,
        afterLotteryHandler:null
      }
    },
    props:{
      uuidData: {
        type: String
      },
      invitationCode: {
        type: String
      },
      prizesList :{
        type: Array,
        default(){
          return []
        }
      },
      lotteryBtn:{
        type : Object,
        default(){
          return {
            img : ""
          };
        }
      },
      beforeLottery:{
        type : Function,
        default(){throw new Error("you must define beforeLottery before draw a lotteryPage ")}
      },
      afterLottery:{
        type : Function,
        default(){console.warn("you can use afterLottery after rolling")}
      },
      /*抽到哪里*/
      prize:{
        type : Number,
        default :0
      },
      speed:{
        type : Number,
        default :100
      },
      cycle:{
        type : Number,
        default : 20
      }
    },
    computed: {
      lis1(){
        return this.prizesList.slice(0,3);
      },
      lis2(){
        return this.prizesList.slice(4,7).reverse()
      }
    },
    created(){
      this.speedData = this.speed;
      this.afterLotteryHandler = this.afterLottery
      this.deng()
    },
    beforeDestroy(){
      this.afterLotteryHandler = ()=>{}
    },
    methods:{
      startLottery(){
        getCoinlaSingle('/turntable/draw', {activityId: 1, invitationCode: this.invitationCode, uuid: this.uuidData}).then((res) => {
          let resData = res.data.data
          if (!this.lock) {
            let promise = ()=>{
              return new Promise((resolve , reject)=>{
                this.lock = true;
                this.beforeLottery(resolve,reject,resData);
              })
            }
            let start = async ()=> {
              try {
                await promise();
                this.roll();
              } catch(e) {
                e()
              }
            };
            start();
          }
        }).catch((err) => {})
      },
      _rollHandler(){
        var index = this.index;
        var count = this.count;
        for(let i=1, len=this.activeClass.length+1; i<len ; i++){
          this.activeClass[i] = false;
        }
        index += 1;
        if (index>count) {
          index = 1;
        }
        this.activeClass[index] = true;
        this.index=index;
        return false;
      },
      roll(){
        this.activeClass = this.activeClass.map(item=>{
          item = false;
        })
        this.times += 1;
        this._rollHandler();
        //控制停到哪里
        if (this.times > this.cycle+10 && this.prize==this.index) {
          clearTimeout(this.timer);
          setTimeout(() => {this._showResult()}
            ,1000)
          this.lock=false;
          this.index=0;
          this.count=8;
          this.timer=null;
          this.speedData=this.speed;
          this.times=0;
        }else{
          if (this.times<this.cycle) {
            this.speedData -= 2;
          }else{
            if (this.times > this.cycle+10 && ((this.prize==1 && this.index==8) || this.prize==this.index+1)) {
              this.speedData += 110;
            }else{
              this.speedData += 20;
            }
          }
          if (this.speedData<40) {
            this.speedData=40;
          };
          this.timer = setTimeout(
            ()=>{this.roll();}
            ,this.speedData);
        }
        return false;
      },
      _showResult(){
        this.afterLotteryHandler();
      },
      deng () {
        //闪灯效果{
        this.$nextTick(() => {
          let num = 0;
          setInterval(function(){
            num++;
            if(num % 2 == 0){
              $('#deng').addClass("shanDeng2");
            }else{
              $('#deng').addClass("shanDeng");
              $('#deng').removeClass('shanDeng2');
            }
          },500)
        })
      }
    }
  };
</script>

<style lang="stylus">
  .vi-lottery {
    width: 100%;
    min-height: 3.205rem
    padding: 0.42rem;
    padding-bottom: 0.44rem;
   /* background: url(/static/images/lottery/lotteryBorder.png) no-repeat;
    background-size: 100% 100%;
    background-image: url(/static/images/lottery/lotteryBorder.png);
    background-repeat: no-repeat;
    background-size: 100%;*/
  }
  .invitation-wrapper {
    position: absolute;
    top: 11.09333rem;
    width: 100%; }
  .vi-lottery ul {
    padding: 0.08rem
    padding-bottom: 0
    margin: 0 auto;
    box-sizing: border-box;
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
  }
  .vi-lottery ul li {
    overflow:hidden;
    position: relative;
    display: flex
    margin-bottom: 0.07rem
    justify-content: space-between
  }
  .vi-lottery ul li div {
    position: relative;
  }
  .vi-lottery ul li div img{
    width: 1.86rem;
    height: 1.76rem
    display: block
    background-color: #fff
    border-radius:0.32rem
    /*vertical-align: middle;*/
  }
  .vi-lottery ul li div.active img {
    background: #ffde7d
  }
  .row .col-4 {
    width: 1.86rem;
    height: 1.76rem
    float: left;
    box-sizing: border-box;
  }
  .shanDeng,.shanDeng2{
    width: 100%
    height: 100%
    background-size: 100%;
    background-repeat: no-repeat;
    margin: 0 auto 0 auto;
  }

  .shanDeng{
    background-image: url(/static/images/lottery/shandeng1.png);
  }
  .shanDeng2{
    background-image: url(/static/images/lottery/shandeng2.png);
  }
</style>
