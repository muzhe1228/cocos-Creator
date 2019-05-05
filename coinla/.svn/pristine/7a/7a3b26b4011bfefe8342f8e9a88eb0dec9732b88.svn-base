<template>
  <div v-show="false" class="onebook" v-if="OneBook">
    <el-dialog
      width="425px"
      hright="590px"
      top="200px"
      :close-on-click-modal="false"
      :lock-scroll="true"
      title="记一笔"
      :before-close="handleClose"
      :visible.sync="OneBook">
      <el-form :model="ruleForm" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="时间">
          <el-date-picker
            v-model="ruleForm.storageTime"
            align="right"
            type="date"
            value-format="yyyy-MM-dd"
            popper-class="dataClass"
            placeholder="选择日期"
            @change="dateHandle"
            :picker-options="pickerOptions1">
          </el-date-picker>
          <!--<el-input v-model="ruleForm.name"></el-input>-->
        </el-form-item>
        <el-form-item label="方式">
          <el-radio-group v-model="ruleForm.storageWay">
            <el-radio :label="0">买入</el-radio>
            <el-radio :label="1">卖出</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="币总价">
          <el-input v-model="ruleForm.totalPrice"></el-input>
        </el-form-item>
        <el-form-item label="币数量">
          <el-input v-model="ruleForm.storageNumber"></el-input>
        </el-form-item>
        <el-form-item label="币单价">
          <p class="singlePic">{{ruleForm.onePrice}}</p>
        </el-form-item>
        <el-form-item label="存放场所">
          <el-radio-group v-model="ruleForm.storagePlacesType">
            <el-radio :label="0">交易所</el-radio>
            <el-radio :label="1">钱包</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="">
          <el-input v-model="ruleForm.storagePlaces" @focus="opD2"></el-input>
        </el-form-item>
        <el-form-item class="form_btn">
          <el-button type="primary" @click="saveBook">保存</el-button>
          <el-button @click="handleClose()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getCoinlaSingle} from '~/assets/js/httpAll'
  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        innerVisible: false,
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }]
        },
        ruleForm: {
          bookCcyId: '',//账本中币种ID
          storageTime: '',//时间(yyyy-MM-dd)
          storageWay: 0,//方式(0-买入,1-卖出)
          totalPrice: '',//币总价
          storageNumber: '',//币数量
          onePrice: '',//币单价
          storagePlaces: '',//存放场所
          storagePlacesType: '',//存放场所类型(0-交易所,1-钱包)
          version: ''//时间戳(防止表单重复提交)
        },
      };
    },
    computed: {
      ...mapState(['Token', 'OneBook'])
    },
    mounted() {
      this.onkeydown()
    },
    methods: {
      opD2() {
        this.innerVisible = true
      },
      dateHandle(val) {
      },
      //键盘事件
      onkeydown() {
        let _this = this
        document.onkeydown = function (e) {
          let key = window.event.keyCode
          if (key === 13 && _this.OneBook) {
            _this.saveBook()
          } else if (key === 13) {
            return false
          }
        }
      },
      saveBook() {
        console.log('我提交了账本')
      },
      //dialog关闭前的回调
      handleClose() {
        this.setOneBook(false)
      },
      //提示弹窗
      openMsg(msg, type) {
        if (type === 0) {
          this.$notify({
            message: msg,
            type: 'success'
          })
        } else {
          this.$notify.error({
            message: msg
          })
        }
      },
      ...mapMutations(['setToken', 'setOneBook'])
    }
  }
</script>
<style lang="stylus">

</style>
<style scoped lang="stylus">
  .onebook {
    .singlePic {
      font-size: 16px
    }
  }
</style>
