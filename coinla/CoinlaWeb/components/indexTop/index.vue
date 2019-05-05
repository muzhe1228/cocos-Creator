<template>
  <!---->
  <div class="top" v-loading="loading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.3)">
    <section v-for="(item,index) in list" :key="index">
      <!--<nuxt-link class="topAhref" :to="'/coin/'+ item.currencyEnglisgName | toLowerCase">-->
        <p class="name">{{item.currencyName}} / OTC</p>
        <p class="location" :class="item.openRiseFall | IsColor">
          <span class="price">¥</span>{{item.openNationalLowPrice|toThousands}}<i
          :class="item.openRiseFall>0?'icon-ken_up':(item.openRiseFall===0?'':'icon-ken_down')"></i>
        </p>
        <div class="chart">
          <svg v-if="svgList.length">
            <defs>
              <linearGradient id="linear" x1="0%" y1="0%" x2="0" y2="100%">
                <stop offset="0%" stop-color="#dedede"/>
                <stop offset="100%" stop-color="#ffffff"/>
              </linearGradient>
            </defs>
            <polyline fill="url(#linear)" :points="'0 22'+svgList[item.cerId]+' '+'92 22'">
            </polyline>
            <polyline :points="svgList[item.cerId]"
                      stroke="#666" stroke-width="1" stroke-linecap="round"
                      class="g-rect-fill"></polyline>
          </svg>
        </div>
      <!--</nuxt-link>-->
    </section>
  </div>
</template>

<script>
  import {resetSvgTop} from '~/assets/js/case'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    data() {
      return {
        list: {},
        svgList: [],
        loading: true,
        timer: null
      }
    },
    mounted() {
      this.getData()
      let _this = this
      let a = 0
      this.timer = setInterval(() => {
        getCoinlaSingle('/index/findCN', {cerIds: '1,6,21,15'})
          .then((res) => {
            if (res.data.code === 0) {
              this.list = res.data.data
            }
          }).catch((err) => {
          console.log(err)
        })
      }, 10000)
    },
    destroyed() {
      clearInterval(this.timer)
    },
    methods: {
      getData() {
        getCoinlaSingle('/index/findCN', {cerIds: '1,6,21,15'})
          .then((res) => {
            if (res.data.code === 0) {
              this.list = res.data.data
              this.setSVG(res.data.data)
              this.loading = false
            }
            this.loading = false
          }).catch((err) => {
          console.log(err)
          this.loading = false
        })
      },
      //svg数据处理
      setSVG(List) {
        this.svgList = []
        let arr = []
        for (let i = 0; i < List.length; i++) {
          arr.push(List[i].cerId)
        }
        let params = {cerIds: arr.join(',')}
        getCoinlaSingle('/svg/findList', params).then((res) => {
          this.svgList = resetSvgTop(res.data.data)
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~assets/stylus/variable"
  .top {
    width: 850px
    height: 78px
    display: flex
    justify-content: center
    section {
      position: relative
      width: calc(100% / 4)
      height: 78px
      text-align: center
      border-right: 1px solid #EAEAEA
      .name {
        font-size: 13px;
        color: $size-smain
        margin-bottom: 12px
      }
      .location {
        font-size: 22px
        color: #de2617
        font-family: 'Helvetica'
        margin-bottom: 10px
        .price {
          font-size: $font-s
        }
        i {
          font-size: $font-m
        }
      }
      .chart {
        width: 92px
        height: 22px
        margin: 0 auto
        svg {
          width: 100%
          height: 100%
          .g-rect-fill {
            fill: none
            stroke-width: 1
            stroke-linejoin: round
            stroke-linecap: round
            stroke-dasharray: 1000, 1000
            animation: SvgAm 3s linear
          }
        }

      }
      &:last-child {
        border-right: none
      }
      &:nth-of-type(2) {
        p {
          &:nth-child(2) {
            color: #26b47a
          }
        }
      }
      &:nth-of-type(3) {
        p {
          &:nth-child(2) {
            color: #454545
          }
        }
      }
    }
  }

</style>
