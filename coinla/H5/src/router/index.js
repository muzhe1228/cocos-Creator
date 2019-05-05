import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      component: resolve => require(['components/index'], resolve)
    },
    {
      path: '/download',
      component: resolve => require(['components/download'], resolve)
    },
    {
      path: '/analyses',
      component: resolve => require(['components/analyses'], resolve)
    },
    {
      path: '/notice',
      component: resolve => require(['components/notice'], resolve)
    },
    {
      path: '/msg',
      component: resolve => require(['components/msg'], resolve)
    },
    {
      path: '/rule',
      component: resolve => require(['components/rule'], resolve)
    },
    {
      path: '/share',
      component: resolve => require(['components/shareApp'], resolve)
    },
    {
      path: '/testios',
      component: resolve => require(['components/testIosA'], resolve)
    },
    {
      path: '/billboard',
      component: resolve => require(['components/billboard'], resolve)
    },
    {
      path: '/potot',
      component: resolve => require(['components/potot'], resolve)
    },
    {
      path: '/turntable',
      component: resolve => require(['components/turntable'], resolve)
    },
    {
      path: '/wallet',
      name: 'wallet',
      component: resolve => require(['components/wallet'], resolve)
    },
    {
      path: '/lead',
      component: resolve => require(['components/lead'], resolve)
    },
    {
      path: '/assistant',
      component: resolve => require(['components/assistant'], resolve)
    },
    {
      path: '/flaunt',
      name: 'flaunt',
      component: resolve => require(['components/flaunt'], resolve)
    },
    {
      path: '/widgets',
      component: resolve => require(['components/widgets'], resolve)
    },
    {
      path: '/group',
      name: 'group',
      component: resolve => require(['components/group'], resolve)
    },
    {
      path: '/groupRecord',
      name: 'groupRecord',
      component: resolve => require(['components/groupRecord'], resolve)
    },
    {
      path: '/groupAward',
      name: 'groupAward',
      component: resolve => require(['components/groupAward'], resolve)
    },
    {
      path: '/getGroupAward',
      name: 'getGroupAward',
      component: resolve => require(['components/getGroupAward'], resolve)
    },
    {
      path: '/word',
      component: resolve => require(['components/word'], resolve)
    },
    {
      path: '/*',
      component: resolve => require(['components/download'], resolve)
    }
  ]
})
