import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Report from '@/components/report/Report'
import CreateJob from '@/components/job/CreateJob'
import Abort from '@/components/abort/Abort'
import Spinner from '@/components/common/spinner/Spinner'

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
    },
    {
      path: '/createjob',
      name: 'CreateJob',
      component: CreateJob
    },
    {
      path: '/abort',
      name: 'Abort',
      component: Abort
    },
    {
      path: '/spinner',
      name: 'Spinner',
      component: Spinner
    }
  ],
  mode: 'history'
})
