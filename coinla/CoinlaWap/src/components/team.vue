<template>
  <div class="team">
    <ul class="team-single border-1px" v-for="(item,index) in teamList" :key="index">
      <li>
        <img :src="item.pic" alt="">
      </li>
      <li>
        <p class="name">{{item.name}}</p>
        <p class="introduce"
           style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;">
          {{item.introduce}}</p>
      </li>
      <li class="dian">
        <p>
          <span></span>
          <span></span>
          <span></span>
        </p>
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        teamList: []
      }
    },
    mounted() {
      this.getTeamList()
    },
    methods: {
      getTeamList() {
        this.$http({
          url: '/currency/findCurrencyTeam',
          method: 'post',
          params: {ccyId: this.$utils.getUrlKey('ccyId')}
        }).then((res) => {
          this.teamList = res.data.data
        })
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin.styl"
  .team {
    min-height: 80vh
    padding: 0 15px
    &-single {
      display: flex
      justify-content: space-between
      padding: 15px 0
      border-1px($border-color)
      li {
        &:nth-child(1) {
          margin-right: 15px
          img {
            width: 1.12rem
            height: 1.12rem
            border-radius: .56rem
          }
        }
        &:nth-child(2) {
          flex: 1
          .name {
            font-size: .28rem
            color: #333
            font-weight: 600
            padding-bottom: .15rem
          }
          .introduce {
            font-size: .24rem
            color: #666
            line-height: .36rem
            letter-spacing: 1px
          }
        }
        &.dian {
          width: .3rem
          display: flex
          align-items: center
          justify-content: flex-end
          p {
            display: flex
            flex-direction: column
            justify-content: center
            span {
              width: .08rem
              height: .08rem
              margin: .04rem
              border-radius: .04rem
              background-color: #dedede
            }

          }
        }
      }
    }
  }
</style>
