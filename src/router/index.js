import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Report from '@/components/report/Report'
import CreateJob from '@/components/job/CreateJob'
import Abort from '@/components/abort/Abort'
import Feedback from '@/components/feedback/Feedback'

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
      component: Report,
      props: (route) => ({
        id: route.query.id
      })
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
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    }
  ]
})
