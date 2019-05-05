<template>
  <div class="searchCcy">
    <el-dialog title="创建币种"
               width="425px"
               top="200px"
               custom-class="createCcy"
               :before-close="handleClose"
               :visible.sync="searchMode">
      <el-form label-width="50px" class="demo-ruleForm">
        <el-form-item
          label="简称">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="form.currencyShortName"
            :fetch-suggestions="querySearch"
            placeholder="请输入币种名称或简称"
            @select="handleSelect"
            clearable>
            <img v-if="!form.pic" slot="prefix" src="~static/images/book/icon_mb.png" width="24" height="24" alt="">
            <img v-else slot="prefix" v-lazy="form.pic"
                 width="24" height="24"
                 alt="">
            <div slot-scope="{ item }">
              <a v-for="detail in item" :key="detail.ccyId">
                <div class="name"><img width="20" height="20" v-lazy="detail.pic" alt="">{{detail.currencyName }}</div>
                <span class="addr">{{ detail.shortName }}</span>
              </a>
            </div>
          </el-autocomplete>
        </el-form-item>
        <el-form-item class="Btn">
          <el-button type="primary" @click="submitForm(form.ccyId)" :disabled="disabled">确定</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'

  export default {
    scrollToTop: true,
    data() {
      return {
        dialogAddCcy: false,
        form: {},
        restaurants: [],
        disabled: true
      }
    },
    computed: {
      ...mapState(['searchMode'])
    },
    methods: {
      hidIs() {
        if (sessionStorage.getItem('hid')) {
          this.setHid(0)
          sessionStorage.removeItem('hid')
        } else {
          this.setHid('*')
          sessionStorage.setItem('hid', '*')
        }
        console.log(this.hid)
      },
      //点击添加币种按钮
      add() {
        this.form = {}
        this.dialogAddCcy = true
      },
      //添加币种输入框
      querySearch(queryString, cb) {
        if (!queryString) {
          this.disabled = true
          this.form = {}
          cb([])
        } else {
          this.searchGet(queryString, cb)
        }
      },
      //添加选择后的数据处理
      handleSelect(item) {
        this.form = item
        this.name = item.currencyShortName
        this.pic = item.pic
        this.disabled = false
      },
      //添加币种确认
      submitForm(id) {
        this.$emit('changBtn', id)
        this.handleClose()
        // if (id) {
        //   let params = {
        //     bookId: this.infoData.bookList[0].bookId,
        //     ccyId: id
        //   }
        //   getCoinlaSingle('/book/addCurrencyToBook', params, this.Token)
        //     .then((res) => {
        //       console.log(res.data)
        //       if (res.data.code === 0) {
        //         this.dialogAddCcy = false
        //         this.setUpdateBook(false)
        //       } else {
        //         this.$message(res.data.message)
        //         this.dialogAddCcy = false
        //       }
        //     }).catch((err) => {
        //     console.log(err.message)
        //   })
        // } else {
        //   alert('wwww')
        // }
      },
      // 关闭币种添加框
      handleClose() {
        this.setSearchMode(false)
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      // //删除币种
      // deleteCcy(id, name) {
      //   let _this = this
      //   let params = {
      //     bookId: this.infoData.bookList[0].bookId,
      //     ccyId: id
      //   }
      //   this.$confirm(`是否确认删除 ${name}?`, '提示', {
      //     confirmButtonText: '是',
      //     cancelButtonText: '否',
      //     type: 'warning'
      //   }).then(() => {
      //     getCoinlaSingle('/book/deleteCurrencyToBook', params, _this.Token)
      //       .then((res) => {
      //         if (res.data.code === 0) {
      //           this.$ScrollTop()
      //           _this.setUpdateBook(false)
      //           this.$message({
      //             message: '删除成功',
      //             type: 'success'
      //           })
      //         } else {
      //           this.$message(res.data.message)
      //         }
      //       }).catch((err) => {
      //       console.log(err.message)
      //     })
      //   }).catch(() => {
      //     return
      //   })
      // },
      // 请求搜索币种接口
      searchGet(keyWorld, cb) {
        let params = {searchName: keyWorld}
        return getCoinlaSingle('/search/pcExchangeOrCurrencySearch', params)
          .then((res) => {
            let arr = []
            arr[0] = res.data.data.currencyList
            arr[1] = res.data.data.exchangeList
            console.log(arr)
            cb(arr)
          }).catch((err) => {
            console.log(err.message)
          })
      },
      ...mapMutations(['setSearchMode'])
    }
  }
</script>
<style lang="stylus">
  @import "~assets/stylus/variable.styl"
  .searchCcy {
    .bou {
      height: 80vh
      text-align center
      padding: 50px
    }
    .createCcy {
      border-radius: 6px
      .el-dialog__title {
        font-size: 18px
        font-weight: 700
        letter-spacing: 1px
      }
      .el-dialog__headerbtn {
        font-size: 18px
        .el-dialog__close {
          color: #454545
          &:hover {
            color: #e2bd51
          }
        }
      }
      .el-form {
        .el-input__inner {
          font-size: 16px
          height: 40px
          padding-left: 36px
          outline: none
          line-height: 40px
          background-color: #f0f0f0
          border: none
          color: #454545
        }
        .el-form-item__label {
          font-size: 16px
          color: #454545
        }
        .el-input__prefix {
          display: flex
          align-items: center
          img {
            border-radius: 12px
          }
        }
        .el-form-item {
          margin-bottom: 40px
        }
        .Btn {
          margin-bottom: 0
          .el-form-item__content {
            margin-left: 0 !important
            display: flex
            button {
              border: none
              font-size: 16px
              width: calc((100% -20px) / 2)
              &:nth-child(2) {
                background-color: #f0f0f0
                color: #454545
                &:hover {
                  color: #e2bd51
                }
              }
            }
          }
        }
      }
    }
    .el-autocomplete {
      display: block
    }
    .my-autocomplete {
      li {
        line-height: normal
        padding: 7px
        .name {
          text-overflow: ellipsis
          overflow: hidden
          display: flex
          align-items: center
          img {
            margin-right: 6px
          }
        }
        .addr {
          font-size: 12px
          color: #b4b4b4
        }
        .highlighted .addr {
          color: #ddd
        }
      }
    }
  }

</style>
