import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Report from '@/components/report/Report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    }
  ],
  mode: 'history'
})
