<template>
    <div class="wallet">
     <div class="wallet_content">
        <div class="wallert_eth">
          <div class="eth_title">
            <img src="/static/images/turntable/eth_wallet.png" alt="">
            <span>ETH</span>
          </div>
          <div class="eth_address">
            <input type="text" placeholder="请输入ETH钱包地址" v-model="address.eth">
          </div>
        </div>
        <div class="wallert_eos">
          <div class="eos_title">
            <img src="/static/images/turntable/eos_wallet.png" alt="">
            <span>EOS</span>
          </div>
          <div class="eos_address">
            <input type="text" placeholder="请输入EOS钱包地址" v-model="address.eos">
          </div>
        </div>
        <div class="wallert_czr">
          <div class="czr_title">
            <img src="/static/images/turntable/czr_wallet.png" alt="">
            <span>CZR</span>
          </div>
          <div class="czr_address">
            <input type="text" placeholder="请输入CZR钱包地址" v-model="address.czr">
          </div>
        </div>
       <div class="save_wallet_wrap">
         <img @click="goBackPage" src="/static/images/turntable/goback.png" class="goback">
         <img @click="saveWallet" src="/static/images/turntable/save_wallet.png"  class="save_wallet">
       </div>
       <div class="notice">
         <p>温馨提醒 :</p>
         <p>请于活动结束前填写正确的钱包地址</p>
         <p>否则视为自动放弃奖品</p>
       </div>
     </div>
    </div>
</template>

<script>
  import {validates, validateHandles} from 'assets/js/reg'
  import {getCoinlaSingle} from "../assets/js/httpAll";
  export default {
    name: "wallet",
    data () {
      return {
        address: {
          eth: '',
          eos: '',
          czr: ''
        }
      }
    },
    metaInfo:{
      title: '钱包地址'
    },
    mounted () {
      this.getWalletAddress()
    },
    methods: {
      //获取钱包地址
      getWalletAddress () {
        getCoinlaSingle('/turntable/selectAddress', {activityId: 1, invitationCode: this.$route.params.invitationCode, uuid:this.$route.params.uuid}).then((res) => {
          let resData = res.data.data
          this.address.eth = resData[0].address
          this.address.eos = resData[1].address
          this.address.czr = resData[2].address
        })
      },
      //修改钱包地址
      //保存地址
      saveWallet () {
        getCoinlaSingle('/turntable/updateAddress', {activityId: 1, invitationCode: this.$route.params.invitationCode, uuid:this.$route.params.uuid, ethAddress: this.address.eth, eosAddress: this.address.eos, czrAddress: this.address.czr}).then((res) => {
          let resData = res.data.data
          if(resData){
            /*this.$toast({message: '保存成功', duration: 1500})*/
            this.goBackPage()
          }else{
            this.$toast({message: '保存失败', duration: 0})
            this.goBackPage()
          }
        })
      },
      //返回按钮
      goBackPage () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .wallet{
    .wallet_content{
      background: url("/static/images/turntable/wallet_bac.jpg") no-repeat
      background-size:cover
      min-height: 100vh
      padding:1rem 0.81rem 1rem 0.72rem
      .eth_title,.eos_title,.czr_title{
        height:0.7rem
        line-height:0.7rem
        margin-bottom:0.36rem
        img{
          width:0.7rem
          height:0.7rem
          margin-right:0.25rem
          vertical-align: middle
          font-weight:600
        }
        span{
          font-size:0.36rem
          color: #fff
        }
      }
      .eth_address,.eos_address,.czr_address{
        background-color: #fff
        margin-bottom:0.4rem
        height:0.78rem
        line-height:0.78rem
        padding-left:0.4rem
        border-radius:0.4rem
        font-size:0.3rem
        margin-left:0.08rem
        input{
          font-weight:600
          line-height:normal
          border:none
          color: #aba8a9
        }
      }
      .save_wallet_wrap{
        float: left
        width: 100%
        margin:0.7rem auto
        overflow: hidden
        img{
          width: 2.18rem
        }
        .save_wallet{
          float: right
        }
      }
      .notice{
        margin-top:1rem
        p{
          font-size:0.278rem
          text-align: center
          color: #fff
          line-height:0.48rem
        }
      }
    }
  }
</style>
