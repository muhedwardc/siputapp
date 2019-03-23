import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import store from '@/store'
import Cookie from 'js-cookie'

import routes from './routes'

Vue.use(Router)

const router = new Router({
  routes: routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

Vue.use(Meta)

router.beforeEach((to, from, next) => {
  const userData = Cookie.getJSON('_usr')

  const dosenPages = ['/dosen']
  const akademikPages = ['/akademik']
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const authDosenRequired = dosenPages.includes(to.path)
  const authAkademikRequired = akademikPages.includes(to.path)
  const isLoggedIn = userData && userData.token
  const isDosen = userData && userData.user.is_dosen
  const isAkademik = userData && userData.user.is_akademik
  // const isOnExam = store.state.onExam.id

  if (authRequired && !isLoggedIn) {
    return next('/login')
  } else if (!authRequired && isLoggedIn) {
    return next(from.fullPath)
  } else if (to.fullPath === '/') {
    if (isDosen) return next('/dosen')
    else if (isAkademik) return next('/akademik')
  } else {
    if (authDosenRequired && isLoggedIn && !isDosen) {
      return next(from.fullPath)
    } else if (authAkademikRequired && isLoggedIn && !isAkademik) {
      return next(from.fullPath)
    }
    // else {
    //   if (!isOnExam || isOnExam == to.params.id) {
    //     return next('/ujian/' + to.params.id + '/mulai')
    //   } else if (to.params.id !== store.state.onExam.id){
    //     return next('/ujian/' + store.state.onExam.id + '/mulai')
    //   }
    // }
  }
  next()
})

export default router