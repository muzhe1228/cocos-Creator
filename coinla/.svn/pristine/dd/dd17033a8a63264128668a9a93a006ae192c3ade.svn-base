<template>
  <div class="sub_nav">
    <div class="sub_nav_l">
      <img :src="title[0]" alt="">
      <p>{{title[1]}}</p>
    </div>
    <div class="sub_nav_r">
      <el-input
        :placeholder="title[2]"
        suffix-icon="el-icon-search">
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: Array,
        default: () => ['~static/images/index/icon_title.png', '所有货币', '输入币种中文名、英文名或简称']
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .con_nav {
    display: flex
    height: 72px
    border-bottom: 1px solid #ccc
    align-items: center
    justify-content: space-between
    &_l {
      display: flex
      height: 72px
      align-items: center
      img {
        width: 26px
        height: 26px
      }
      p {
        font-size: 20px
        font-weight: bold
        color: #333
        margin-left: 10px
      }
    }
    &_r {
      .el-input--suffix {
        width: 292px
        .el-input__inner {
          background-color: #efefef
          font-size: 14px
          color: #333
          border-color: #f6f6f6
          &:focus, &::hover {
            border-color: #f1efef
          }
          .el-input__suffix {
            right: 10px;
          }
        }
      }

    }
  }
</style>
