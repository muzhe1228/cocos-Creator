<template>
  <div>
    <el-tooltip content="Bottom center" placement="bottom" effect="light">
      <el-button>Light</el-button>
    </el-tooltip>
    <el-dialog
      title="提示"
      :close="handleClose(dialogVisible)"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <ul>
      <li v-for="(value, index) in girls" :key="index">
        {{ index }} - {{ value.name }} - {{ value.age }}
        <button @click="noticeGroup(value.name,value.age)">发送消息</button>
      </li>
    </ul>
    <div>接收来自大群的消息:{{ noticeGirl }}</div>
  </div>
</template>
<script>
  export default {
    name: 'girl-group',
    props: {
      girls: {
        type: Array,
        required: true
      },
      dialogVisible: {
        type: Boolean,
        required: true
      },
      noticeGirl: {
        type: String,
        required: false
      }
    },
    methods: {
      noticeGroup(name, age) {
        this.$emit('introduce', {
          name: name,
          age: age
        })
      },
      handleClose(done) {
        console.log(done)
        this.$emit('de', {
          dialogVisible: done
        })
      }
    },
  }
</script>
