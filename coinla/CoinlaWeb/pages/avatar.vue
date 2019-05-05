<template>
  <div>
    <p v-for="(item,index) in arr"
       :key="index">
      <el-rate
        :value="item"
        disabled
        show-score
        text-color="#ff9900"
        score-template="{value}">
      </el-rate>
      <el-rate
        :value="item"
        disabled
        :colors="['#e2bd51','#e2bd51','#e2bd51']"
        disabled-void-color="#b5b5b5">
      </el-rate>
    </p>

    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <p>群消息girl：</p>
    <div>
      {{ somebody }} 说: 我 {{ age }} 了。
    </div>
    <hr>
    <v-girl-group
      :dialogVisible="dialogVisible"
      :girls="aGirls"
      :noticeGirl="noticeGirl"
      @introduce="introduceSelf"
      @de="deSelf"></v-girl-group>
  </div>
</template>

<script>
  // export default {
  //   data() {
  //     // this.$router.push('/user')
  //     return {}
  //   }
  // }
  import vGirlGroup from '~/components/childs.vue'

  export default {
    name: 'girl',
    components: {
      vGirlGroup
    },
    data() {
      return {
        arr: [],
        dialogVisible: false,
        aGirls: [{
          name: '小丽',
          age: 22
        }, {
          name: '小美',
          age: 21
        }, {
          name: '小荷',
          age: 24
        }],
        somebody: '',
        age: '',
        noticeGirl: ''
      }
    },
    mounted() {
      this.arr = [2, 3.6, 4.8, 3.4, 3.1]
    },
    methods: {
      introduceSelf(opt) {
        this.somebody = opt.name;
        this.age = opt.age;

        // 通知girl收到消息
        this.noticeGirl = opt.name + ',已收到消息';
      },
      deSelf(de) {
        this.dialogVisible = de.dialogVisible
        console.log(this.dialogVisible)
      }
    }
  }
</script>

<style scoped lang="stylus">
  /*div {
    min-height: calc(100vh - 300px)
  }*/
</style>
