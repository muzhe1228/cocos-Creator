<template>
  <div class="info-search">
    <el-input
      v-model="keyworld"
      placeholder="输入币种 / 交易所名称"
      @input.native="changeInp(keyworld)"
      @focus="changeFocus"
      @blur="changeBlur"
      @keyup.native.enter="handleIconClick(keyworld)">
      <i class="icon-kensearch" slot="suffix" @click="handleIconClick(keyworld)"></i>
    </el-input>
    <div class="searchList" :class="{'showRes':IsShow}">
      <ul class="currencyList">
        <li class="title">币种</li>
        <nuxt-link tag="li" v-for="item in searchList.currencyList" :key="item.ccyId"
                   :to="'/coin/' + item.english | toLowerCase">
          <img v-lazy="item.pic" alt="">
          <p>{{item.currencyName}}({{item.shortName}})</p>
        </nuxt-link>
        <li v-if="!searchList.currencyList">暂无数据</li>
      </ul>
      <ul class="exchangeList">
        <li class="title">交易所</li>
        <nuxt-link tag="li" v-for="item in searchList.exchangeList" :key="item.egeId" :to="'/exchange/'+item.exchangeNameEn | toLowerCase">
          <img v-lazy="item.pic" alt="">
          <p>{{item.exchangeName}}</p>
        </nuxt-link>
        <li v-if="!searchList.exchangeList">暂无数据</li>
      </ul>
    </div>

  </div>
</template>

<script>
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    data() {
      return {
        IsShow: false,
        keyworld: '',
        searchList: {},
        timer: null
      }
    },
    methods: {
      handleIconClick(keyworld) {
        if (keyworld.trim()) {
          this.$router.push(`/search?world=${keyworld}`)
        } else {
          this.$message({
            message: '请输入关键词',
            type: 'warning',
            duration: 1000
          })
        }
      },
      changeInp(val) {
        let _this = this
        clearTimeout(_this.timer)
        this.timer = setTimeout(() => {
          // console.log(val)
          if (val.trim()) {
            getCoinlaSingle('/search/pcExchangeOrCurrencySearch', {searchName: val}, _this.Token)
              .then((res) => {
                _this.IsShow = true
                _this.searchList = res.data.data
              })
          } else {
            _this.IsShow = false
          }
        }, 300)
      },
      changeFocus() {
        if (this.keyworld.trim()) {
          this.IsShow = true
        }
      },
      changeBlur() {
        setTimeout(() => {
          this.IsShow = false
        }, 300)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/stylus/variable.styl"
  .info-search {
    width: 270px
    height: 32px
    position: relative
    .searchList {
      position: absolute
      left: 0
      top: 100%
      z-index: 10
      background-color: #fff
      width: 270px
      border: 1px solid $border-color
      box-shadow: 0 0 9px rgba(0, 0, 0, .1)
      border-top: none
      height: 0
      overflow: hidden
      opacity: 0
      transition: all .5s linear
      &.showRes {
        height: auto
        opacity: 1
      }

      ul {
        li {
          cursor: pointer
          font-size: $font-s
          padding: 0 14px
          height: 40px
          display: flex
          align-items: center
          &:hover {
            background-color: $main-color
            color: #fff
          }
          &.title {
            height: 32px
            background-color: #f8f8f8
            &:hover {
              background-color: #f8f8f8
              color: $size-main
            }
          }
          img {
            margin-right: 8px
            width: 16px
            height: 16px
            border-radius: 8px
          }
        }
      }
    }
  }
</style>
